/* ──────────────────────────────────────────
            유틸
            ────────────────────────────────────────── */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (s, e, t) => s + (e - s) * t;
const easeInOut = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

// "10%" | "400px" → px (base는 섹션 높이 등)
const pxOrPercent = (str, base) => {
  if (!str) return 0;
  str = String(str).trim();
  if (str.endsWith("%")) return ((parseFloat(str) || 0) * (base || 0)) / 100;
  return parseFloat(str) || 0;
};

// "73.25rem" / "58.25%" / "100vw" 등 단위 유지 파서
const parseValueWithUnit = (val) => {
  if (val == null) return null;
  const m = String(val)
    .trim()
    .match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  return m ? { num: parseFloat(m[1]), unit: (m[2] || "px").trim() } : null;
};
const parseRadius = parseValueWithUnit;

/* ──────────────────────────────────────────
            Lenis (컨테이너: .wrap)
            ────────────────────────────────────────── */
const wrapper = document.querySelector(".wrap");
const content = wrapper.querySelector(".main-scroll-area");
const lenis = new Lenis({
  wrapper,
  content,
  duration: 1.0,
  smoothWheel: true,
  autoRaf: true,
});

/* ──────────────────────────────────────────
            아이템 수집
            ────────────────────────────────────────── */
const items = Array.from(wrapper.querySelectorAll(".anim-item")).map((el) => {
  const section = el.closest(".anim-section"); // 없으면 화면 기준
  const ds = el.dataset;

  // 클래스 토글 대상: data-class-target 지정 시 우선, 없으면 .anim-box/.box, 없으면 자기 자신
  const classTarget =
    (ds.classTarget ? el.querySelector(ds.classTarget) : null) ||
    el.querySelector(".anim-box, .box") ||
    el;

  // transform/size 대상: .anim-box/.box 우선, 없으면 자기 자신
  const box = el.querySelector(".anim-box, .box") || el;

  const num = (k) => (k in ds ? +ds[k] : undefined);
  const str = (k) => (k in ds ? String(ds[k]) : undefined);

  return {
    el,
    section,
    box,
    classTarget,

    // 뷰포트 게이트(진입/이탈 지점 조절): 기본 0.85 / 0.15
    gateIn: "gateIn" in ds ? +ds.gateIn : 0.85,
    gateOut: "gateOut" in ds ? +ds.gateOut : 0.15,

    // start/end (문자열 허용: "99%" / "400px")
    startStr: ds.start || "0%",
    endStr: ds.end || "100%",

    // 진행 길이 직접 지정(px). 없으면 start/end 참고값 차이로 추정
    spanPx: num("span"),

    // 진행 속도 감각(곡선 강화): t' = easeInOut( t ^ speed ), 기본 1.0
    speed: "speed" in ds ? Math.max(0.1, +ds.speed) : 1.0,

    // 숫자 보간 값
    X0: num("x0"),
    X1: num("x1"),
    Y0: num("y0"),
    Y1: num("y1"),
    // Y 별칭
    T0: num("t0"),
    T1: num("t1"),
    S0: "s0" in ds ? +ds.s0 : undefined,
    S1: "s1" in ds ? +ds.s1 : undefined,
    O0: "o0" in ds ? +ds.o0 : undefined,
    O1: "o1" in ds ? +ds.o1 : undefined,
    R0: num("r0"),
    R1: num("r1"),
    RX0: num("rx0"),
    RX1: num("rx1"),
    RY0: num("ry0"),
    RY1: num("ry1"),
    BL0: num("bl0"),
    BL1: num("bl1"),

    // 단위 포함 가능 (문자열 그대로 보관)
    W0: str("w0"),
    W1: str("w1"),
    H0: str("h0"),
    H1: str("h1"),

    // border-radius (전체/모서리별, 단위 포함)
    BR0: str("br0"),
    BR1: str("br1"),
    BRTL0: str("brtl0"),
    BRTL1: str("brtl1"),
    BRTR0: str("brtr0"),
    BRTR1: str("brtr1"),
    BRBR0: str("brbr0"),
    BRBR1: str("brbr1"),
    BRBL0: str("brbl0"),
    BRBL1: str("brbl1"),

    // BG parallax (px)
    BGX0: num("bgx0"),
    BGX1: num("bgx1"),
    BGY0: num("bgy0"),
    BGY1: num("bgy1"),

    // progress/counter
    bar: el.querySelector(".progress .bar"),
    P0: num("p0"),
    P1: num("p1"),
    counterEl: el.querySelector(".counter"),
    C0: num("c0"),
    C1: num("c1"),

    // 센터 정렬: '', 'x', 'y', 'both'
    center: (ds.center || "").toLowerCase(),
    __centerInit: false,

    repeat: ds.repeat === "1",

    // 런타임 값
    start: 0, // 스크롤 기준 시작 px
    end: 0, // 스크롤 기준 종료 px
    armed: false, // 한 번이라도 화면에 들어와 세팅되었는가
  };
});

/* ──────────────────────────────────────────
            클래스 토글 (영역 도달 시에만)
            ────────────────────────────────────────── */
function updateClasses(it, scroll) {
  // 아직 armed 전이면 어떤 클래스도 붙지 않게
  if (!it.armed) {
    it.classTarget.classList.remove("passed-start", "is-active", "passed-end");
    return;
  }

  const inRange = scroll > it.start && scroll < it.end;
  it.classTarget.classList.toggle("passed-start", scroll >= it.start);
  it.classTarget.classList.toggle("is-active", inRange);
  it.classTarget.classList.toggle("passed-end", scroll >= it.end);
}
/* ──────────────────────────────────────────
            1프레임 적용
            ────────────────────────────────────────── */
function apply(it, tRaw) {
  const t01 = clamp(tRaw, 0, 1);
  // 속도 감각(느리게/빠르게) → t^speed 후 ease
  const shaped = easeInOut(Math.pow(t01, it.speed));

  // width / height (단위 유지)
  const w0 = parseValueWithUnit(it.W0);
  const w1 = parseValueWithUnit(it.W1);
  const h0 = parseValueWithUnit(it.H0);
  const h1 = parseValueWithUnit(it.H1);
  if (w0 && w1) {
    const unit = w1.unit || w0.unit || "px";
    it.box.style.width = lerp(w0.num, w1.num, shaped) + unit;
  }
  if (h0 && h1) {
    const unit = h1.unit || h0.unit || "px";
    it.box.style.height = lerp(h0.num, h1.num, shaped) + unit;
  }

  // transform 합성
  const tr = [];

  // 센터 정렬(최초 1회, position/좌표 세팅)
  if (it.center && !it.__centerInit) {
    it.box.style.position = "absolute";
    if (it.center === "x" || it.center === "both") it.box.style.left = "50%";
    if (it.center === "y" || it.center === "both") it.box.style.top = "50%";
    it.__centerInit = true;
  }
  if (it.center === "both") tr.push("translate(-50%, -50%)");
  else if (it.center === "x") tr.push("translateX(-50%)");
  else if (it.center === "y") tr.push("translateY(-50%)");

  // translate3d (X/Y + T(Y))
  const hasX = it.X0 !== undefined || it.X1 !== undefined;
  const hasY =
    it.Y0 !== undefined ||
    it.Y1 !== undefined ||
    it.T0 !== undefined ||
    it.T1 !== undefined;
  if (hasX || hasY) {
    const x = lerp(it.X0 || 0, it.X1 || 0, shaped);
    const y0 = it.Y0 !== undefined ? it.Y0 : it.T0 !== undefined ? it.T0 : 0;
    const y1 = it.Y1 !== undefined ? it.Y1 : it.T1 !== undefined ? it.T1 : 0;
    const y = lerp(y0, y1, shaped);
    tr.push(`translate3d(${x}px, ${y}px, 0)`);
  }

  // scale/rotate
  if (it.S0 !== undefined && it.S1 !== undefined)
    tr.push(`scale(${lerp(it.S0, it.S1, shaped)})`);
  if (it.R0 !== undefined && it.R1 !== undefined)
    tr.push(`rotate(${lerp(it.R0, it.R1, shaped)}deg)`);
  if (it.RX0 !== undefined && it.RX1 !== undefined)
    tr.push(`rotateX(${lerp(it.RX0, it.RX1, shaped)}deg)`);
  if (it.RY0 !== undefined && it.RY1 !== undefined)
    tr.push(`rotateY(${lerp(it.RY0, it.RY1, shaped)}deg)`);

  if (tr.length) it.box.style.transform = tr.join(" ");

  // opacity
  if (it.O0 !== undefined && it.O1 !== undefined)
    it.box.style.opacity = String(lerp(it.O0, it.O1, shaped));

  // border-radius (전체/모서리별)
  const brAll0 = parseRadius(it.BR0);
  const brAll1 = parseRadius(it.BR1);
  const brTL0 = parseRadius(it.BRTL0),
    brTL1 = parseRadius(it.BRTL1);
  const brTR0 = parseRadius(it.BRTR0),
    brTR1 = parseRadius(it.BRTR1);
  const brBR0 = parseRadius(it.BRBR0),
    brBR1 = parseRadius(it.BRBR1);
  const brBL0 = parseRadius(it.BRBL0),
    brBL1 = parseRadius(it.BRBL1);
  const tl =
    brTL0 && brTL1
      ? lerp(brTL0.num, brTL1.num, shaped) + (brTL1.unit || brTL0.unit || "px")
      : brAll0 && brAll1
        ? lerp(brAll0.num, brAll1.num, shaped) +
          (brAll1.unit || brAll0.unit || "px")
        : "";
  const trr =
    brTR0 && brTR1
      ? lerp(brTR0.num, brTR1.num, shaped) + (brTR1.unit || brTR0.unit || "px")
      : brAll0 && brAll1
        ? lerp(brAll0.num, brAll1.num, shaped) +
          (brAll1.unit || brAll0.unit || "px")
        : "";
  const brb =
    brBR0 && brBR1
      ? lerp(brBR0.num, brBR1.num, shaped) + (brBR1.unit || brBR0.unit || "px")
      : brAll0 && brAll1
        ? lerp(brAll0.num, brAll1.num, shaped) +
          (brAll1.unit || brAll0.unit || "px")
        : "";
  const bl =
    brBL0 && brBL1
      ? lerp(brBL0.num, brBL1.num, shaped) + (brBL1.unit || brBL0.unit || "px")
      : brAll0 && brAll1
        ? lerp(brAll0.num, brAll1.num, shaped) +
          (brAll1.unit || brAll0.unit || "px")
        : "";
  if (tl || trr || brb || bl)
    it.box.style.borderRadius = `${tl} ${trr} ${brb} ${bl}`;

  // blur
  if (it.BL0 !== undefined && it.BL1 !== undefined)
    it.box.style.filter = `blur(${lerp(it.BL0, it.BL1, shaped)}px)`;

  // BG parallax
  if (
    (it.BGX0 !== undefined && it.BGX1 !== undefined) ||
    (it.BGY0 !== undefined && it.BGY1 !== undefined)
  ) {
    const bx = lerp(it.BGX0 || 0, it.BGX1 || 0, shaped);
    const by = lerp(it.BGY0 || 0, it.BGY1 || 0, shaped);
    it.box.style.backgroundPosition = `${bx}px ${by}px`;
  }

  // progress
  if (it.bar && it.P0 !== undefined && it.P1 !== undefined) {
    it.bar.style.width = lerp(it.P0, it.P1, shaped) + "%";
  }

  // counter
  if (it.counterEl && it.C0 !== undefined && it.C1 !== undefined) {
    const n = Math.round(lerp(it.C0, it.C1, shaped));
    it.counterEl.textContent = n.toLocaleString();
  }
}

/* ──────────────────────────────────────────
            도우미: span 추정 / start/end 오프셋 계산
            ────────────────────────────────────────── */
function computeFallbackSpan(it) {
  const secH = it.section?.offsetHeight || 0;
  const s = pxOrPercent(it.startStr, secH);
  const e = pxOrPercent(it.endStr, secH);
  return Math.max(1, Math.abs(e - s));
}
function startOffsetPx(it) {
  const secH = it.section?.offsetHeight || 0;
  return pxOrPercent(it.startStr, secH);
}
function endOffsetPx(it) {
  const secH = it.section?.offsetHeight || 0;
  return pxOrPercent(it.endStr, secH);
}

/* ──────────────────────────────────────────
            IO: "한 번이라도 보이면" start/end 기준만 세팅
            실제 동작 여부는 아래 스크롤/뷰포트 게이트에서 판단
            ────────────────────────────────────────── */
const byEl = new Map(items.map((it) => [it.el, it]));
const io = new IntersectionObserver(
  (entries) => {
    const cur = lenis.scroll;
    entries.forEach((entry) => {
      const it = byEl.get(entry.target);
      if (!it) return;

      if (entry.isIntersecting) {
        if (!it.armed || it.repeat) {
          const sOff = startOffsetPx(it);
          const eOff = endOffsetPx(it);
          const guessedSpan = Math.max(1, Math.abs(eOff - sOff));
          const span = it.spanPx ?? guessedSpan;
          it.start = cur + sOff;
          it.end = it.start + span;
          it.armed = true;
          apply(it, 0);
          updateClasses(it, cur);
        }
      } else {
        if (it.repeat) it.armed = false;
      }
    });
  },
  {
    root: wrapper,
    threshold: 0,
    rootMargin: "0px 0px -10%",
  }
);
items.forEach((it) => io.observe(it.el));

/* ──────────────────────────────────────────
            스크롤 진행도 + 뷰포트 게이트로 “영역 도달 시만” 작동
            ────────────────────────────────────────── */
lenis.on("scroll", ({ scroll }) => {
  const vh = window.innerHeight;

  items.forEach((it) => {
    // 요소의 화면 내 위치
    const rect = it.el.getBoundingClientRect();
    const elTop = rect.top + scroll;
    const elBottom = rect.bottom + scroll;

    // 게이트 계산 (조절 가능: data-gate-in / data-gate-out)
    const visibleStart = elTop - vh * it.gateIn; // 진입 시점
    const visibleEnd = elBottom - vh * it.gateOut; // 이탈 시점

    // “화면 안”에 있는 동안만 동작
    if (scroll >= visibleStart && scroll <= visibleEnd) {
      if (!it.armed) {
        // 혹시 IO 전에 들어온 경우에도 안전하게 세팅
        const sOff = startOffsetPx(it);
        const eOff = endOffsetPx(it);
        const guessedSpan = Math.max(1, Math.abs(eOff - sOff));
        const span = it.spanPx ?? guessedSpan;
        it.start = scroll + sOff;
        it.end = it.start + span;
        it.armed = true;
      }

      // 진행도 반영
      const t = clamp(
        (scroll - it.start) / Math.max(1, it.end - it.start),
        0,
        1
      );
      apply(it, t);
      updateClasses(it, scroll);
    } else if (scroll > visibleEnd) {
      // 이미 지나감
      apply(it, 1);
      updateClasses(it, scroll);
    } else {
      // 아직 도달 전
      apply(it, 0);
      updateClasses(it, scroll);
      if (it.repeat) it.armed = false; // 재진입 시 다시 세팅
    }
  });
});

/* ──────────────────────────────────────────
            초기 1프레임 적용
            ────────────────────────────────────────── */
items.forEach((it) => apply(it, 0));

/* ──────────────────────────────────────────
            리사이즈(필요 시 전략 확장 가능)
            ────────────────────────────────────────── */
window.addEventListener("resize", () => {
  // armed 유지. 필요 시 여기서 재계산 로직 추가 가능
});
