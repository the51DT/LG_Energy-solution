const hasPathObject = function (elemList) {
  return elemList.length > 0;
};
const pathApp = {};

pathApp.tableRowSpanCascade = function (depClasses) {
  const allDepElements = depClasses.map(dep => Array.from(document.querySelectorAll(`.${dep}`)));

  function mergeGroup(level, indexes) {
    if (level >= depClasses.length) return;

    const depElements = allDepElements[level];
    const visited = new Set();

    for (let i of indexes) {
      if (visited.has(i)) continue;

      const currentText = depElements[i].textContent.trim();
      const group = [];

      for (let j = i; j < depElements.length; j++) {
        if (indexes.includes(j) &&
            !visited.has(j) &&
            depElements[j].textContent.trim() === currentText &&
            depElements[j].innerHTML.trim() !== "") {
          group.push(j);
        } else if (group.length > 0) {
          break;
        }
      }

      if (group.length > 1) {
        // rowspan 처리
        depElements[group[0]].setAttribute("rowspan", group.length);
        for (let k = 1; k < group.length; k++) {
          depElements[group[k]].remove();
        }

        // 하위 단계로 전파
        mergeGroup(level + 1, group);
      }

      group.forEach(idx => visited.add(idx));
    }
  }

  // 시작: dep1 전체 인덱스를 기준으로 병합 시작
  const totalIndexes = allDepElements[0].map((_, i) => i);
  mergeGroup(0, totalIndexes);
};

pathApp.setUrl = function () {
  const urlSpans = document.querySelectorAll(".url span");

  urlSpans.forEach(function (span) {
    const link = span.textContent.trim();

    if (link !== "") {
      const anchor = document.createElement("a");
      anchor.href = "../public/src/" + link;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = link;

      // 기존 span 내용을 비우고 a 태그 삽입
      span.innerHTML = "";
      span.appendChild(anchor);
    }
  });
};

pathApp.setDate = function () {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();

  // 월, 일 두 자리로 맞춤
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;

  const dateElements = document.querySelectorAll("body .date");

  dateElements.forEach(function (el) {
    const spanList = Array.from(el.querySelectorAll(":scope > span")); // :scope 사용으로 자식 span만 선택
    if (spanList.length === 0 || spanList[0].textContent.trim() === "") return;

    let str = "";

    // 마지막 span의 텍스트
    const lastSpan = spanList[spanList.length - 1];
    const lastText = lastSpan.textContent.trim();
    str += "<p>" + lastText + "</p>";

    // 마지막을 제외한 span 처리
    for (let i = 0; i < spanList.length - 1; i++) {
      const text = spanList[i].textContent.trim();
      str += '<a data-date="' + text + '">○</a>';
    }

    // 마지막 span 처리
    str += '<a data-date="' + lastText + '">●</a>';

    // 기존 내용 비우고 새 내용 삽입
    el.innerHTML = str;

    // 날짜 비교하여 오늘이면 부모에 클래스 추가
    const chkDay = lastText.split(" ");
    if (chkDay.length > 0) {
      const chkDayParts = chkDay[0].split("-");
      if (
        chkDayParts[0] === String(year) &&
        chkDayParts[1] === String(month) &&
        chkDayParts[2] === String(date)
      ) {
        el.parentElement.classList.add("today");
      }
    } 
  });
};

pathApp.setPathNavMenu  = function () {
  const pathNavMenu = document.querySelectorAll("body .pathNavMenu");
  let html = "";

  html += "<ul>";
  html += "<li><a href='#' class='allMenu on'>전체보기</a></li>";

  pathApp.$dep1.forEach((el, idx) => {
    const thatTit = el.querySelector(".tit").textContent || "";
    el.setAttribute("id", "menu" + idx);
    html +=
      "<li><a href='#' class='menu' data-key=" +
      idx +
      ">0" +
      (idx + 1) +
      "." +
      thatTit +
      "<span class='countWrap'>(<em class='count'></em>/<em class='allCount'></em>) <em class='progress'></em></span></a></li>";
  });

  pathNavMenu.forEach(menu => {
    menu.innerHTML = html;
  });
};

pathApp.initPathNavMenuEvent = function () {
  pathApp.$allMenu = document.querySelector(".allMenu");
  pathApp.$menu = document.querySelectorAll(".menu");

  if (pathApp.$allMenu) {
    pathApp.$allMenu.addEventListener("click", pathApp.handleAllMenuClick);
  }

  pathApp.$menu.forEach(menuItem => {
    menuItem.addEventListener("click", pathApp.handlepathNavMenuClick);
  });
};

pathApp.handleAllMenuClick = function (event) {
  // tbody 안의 모든 tr 요소를 보이도록 설정
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach(row => {
    row.style.display = "";
  });

  // 모든 .pathNavMenu li a 요소에서 'on' 클래스 제거
  const navLinks = document.querySelectorAll(".pathNavMenu li a");
  navLinks.forEach(link => {
    link.classList.remove("on");
  });

  // 현재 클릭된 요소에 'on' 클래스 추가
  event.currentTarget.classList.add("on");

  // 형제 요소에서 'on' 클래스 제거
  const siblings = Array.from(event.currentTarget.parentElement.parentElement.children);
  siblings.forEach(li => {
    const a = li.querySelector("a");
    if (a !== event.currentTarget) {
      a.classList.remove("on");
    }
  });
};

pathApp.handlepathNavMenuClick = function (event) {
  event.preventDefault();

  // 1. 모든 .pathNavMenu li a 요소에서 'on' 클래스 제거
  const navLinks = document.querySelectorAll(".pathNavMenu li a");
  navLinks.forEach(link => {
    link.classList.remove("on");
  });

  // 2. 현재 클릭된 링크에 'on' 클래스 추가
  event.currentTarget.classList.add("on");

  // 3. 클릭된 메뉴의 data-key를 숫자로 추출
  const key = parseInt(event.currentTarget.getAttribute("data-key"), 10);

  // 4. 해당 key에 해당하는 dep1 요소와 rowspan 확인
  const dep1Elem = pathApp.$dep1[key];
  let dep1Check = parseInt(dep1Elem.getAttribute("rowspan"), 10);
  if (!dep1Check || isNaN(dep1Check)) {
    dep1Check = 1;
  }

  // 5. dep1 요소가 위치한 tr의 인덱스 확인
  const trElem = dep1Elem.closest("tr");
  const allRows = Array.from(document.querySelectorAll("tbody tr"));
  const listKey = allRows.indexOf(trElem);

  // 6. 전체 tbody > tr 숨기기
  allRows.forEach(row => {
    row.style.display = "none";
  });

  // 7. 해당 섹션만 표시
  for (let i = 0; i < dep1Check; i++) {
    const rowToShow = allRows[listKey + i];
    if (rowToShow) {
      rowToShow.style.display = "";
    }
  }
};

pathApp.initLineEvent = function () {
  const $urlLinks = document.querySelectorAll(".url a");
  const $dates = document.querySelectorAll(".date a");
  const $hoverElement = document.querySelectorAll(".pathTbl tbody th, .pathTbl tbody td");

  // URL 링크 클릭 이벤트
  // $urlLinks.forEach(link => {
  //   link.addEventListener("click", function (e) {
  //     e.preventDefault();

  //     // 현재 링크의 조부모(tr)의 자식들
  //     const row = link.closest("tr");
  //     const $activeCells = row ? Array.from(row.children) : [];

  //     // 모든 hover 대상에서 style 제거
  //     $hoverElement.forEach(elem => elem.removeAttribute("style"));

  //     // 해당 행에 배경색 적용
  //     $activeCells.forEach(cell => {
  //       cell.style.backgroundColor = "#f2f2f2";
  //     });

  //     // 모든 URL 링크에서 style 제거
  //     $urlLinks.forEach(l => l.removeAttribute("style"));
  //   });
  // });

  // hover 효과 처리
  $hoverElement.forEach(elem => {
    elem.addEventListener("mouseenter", function () {
      const row = elem.closest("tr");
      if (row) row.classList.add("on");
    });

    elem.addEventListener("mouseleave", function () {
      const row = elem.closest("tr");
      if (row) row.classList.remove("on");
    });
  });

  // 날짜 마우스 진입/이탈 처리
  $dates.forEach(dateLink => {
    dateLink.addEventListener("mouseenter", function () {
      const parent = dateLink.parentElement;
      const p = parent.querySelector("p");
      if (p) {
        p.textContent = dateLink.getAttribute("data-date");
      }
    });

    dateLink.addEventListener("mouseleave", function () {
      const parent = dateLink.parentElement;
      const p = parent.querySelector("p");
      const lastLink = parent.querySelector("a:last-of-type");
      if (p && lastLink) {
        p.textContent = lastLink.getAttribute("data-date");
      }
    });
  });
};

pathApp.initTotalCount = function () {
  const $totals = document.querySelectorAll(".total");
  const $guideUrls = document.querySelectorAll(".guide .url");
  const $urls = document.querySelectorAll(".url");
  const $guideChecks = document.querySelectorAll(".guide .check span");
  const $checks = document.querySelectorAll(".check span");

  $totals.forEach(totalElem => {
    let sum = 0;
    let sumG = 0;
    let sumMinus = 0;
    let sumMinusG = 0;
    let count = 0;
    let countG = 0;

    $urls.forEach(urlElem => {
      const span = urlElem.querySelector("span");
      if (span && span.innerHTML.trim() !== "") {
        sum++;
      } else {
        sumMinus++;
      }
    });

    $guideUrls.forEach(guideUrlElem => {
      const span = guideUrlElem.querySelector("span");
      if (span && span.innerHTML.trim() !== "") {
        sumG++;
      } else {
        sumMinusG++;
      }
    });

    $checks.forEach(checkSpan => {
      if (checkSpan.getAttribute("class") !== "icon-state comp") {
        count++;
      }
    });

    $guideChecks.forEach(guideCheckSpan => {
      console.log(guideCheckSpan.getAttribute("class"))
      if (guideCheckSpan.getAttribute("class") !== "icon-state comp") {
        countG++;
      }
    });

    const filteredCount = sum - sumG + (sumMinus - sumMinusG) - (count - countG);
    const filteredSum = sum - sumG;
    const percentage = filteredSum > 0 ? parseInt((filteredSum /filteredCount) * 100) : 0;

    const str = `
      <span>${filteredCount} / ${filteredSum} Pages</span>
      <em> (${percentage}%)</em>
    `;
    totalElem.innerHTML = `<strong>Total : </strong><span>${str}</span>`;
  });
};

pathApp.initSectionCount = function () {
  // const $countWraps = pathApp.$body.querySelectorAll(".countWrap");
  const $counts = document.querySelectorAll(".countWrap .count");
  const $allCounts = document.querySelectorAll(".countWrap .allCount");
  const $progresses = document.querySelectorAll(".countWrap .progress");
  let setCount = 0;
  let setIndex = -1;

  if ($counts.length > 0) {
    $counts.forEach(count => count.textContent = "0");
  }

  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const checkSpan = row.querySelector(".check span");
    const isComp = checkSpan && checkSpan.getAttribute("class") === "icon-state comp";

    const isDep1 = row.querySelector("th")?.classList.contains("dep1");

    if (isDep1) {
      setIndex += 1;
      setCount = 0;
      if (isComp) {
        setCount += 1;
      }
    } else {
      if (isComp) {
        setCount += 1;
      }
    }

    if ($counts[setIndex]) {
      $counts[setIndex].textContent = setCount;
    }
  });

  pathApp.$dep1.forEach((elem, idx) => {
    let thatRow = elem.getAttribute("rowspan");
    if (thatRow === null) thatRow = "1";

    if ($allCounts[idx]) {
      $allCounts[idx].textContent = thatRow;
    }

    const countText = parseInt($counts[idx]?.textContent || "0", 10);
    const allCountText = parseInt(thatRow, 10);

    if ($progresses[idx]) {
      const progress = allCountText > 0
        ? Math.floor((countText / allCountText) * 100)
        : 0;
      $progresses[idx].textContent = `진행율:${progress}%`;
    }
  });
};

pathApp.initSyntaxHighlighter = function () {
  SyntaxHighlighter.all();
};

pathApp.initPath = function () {
  pathApp.setUrl();
  pathApp.setDate();
  pathApp.setPathNavMenu();
  pathApp.initPathNavMenuEvent();
  pathApp.initLineEvent();
  pathApp.initTotalCount();
  pathApp.initSectionCount();
  
  const bodyElement = document.querySelectorAll(".code");
  hasPathObject(bodyElement) && pathApp.initSyntaxHighlighter();

};
pathApp.tableRowSpanCascade(["dep1", "dep2", "dep3", "dep4"]);


document.addEventListener("DOMContentLoaded", function () {
  pathApp.$dep1 = document.querySelectorAll(".dep1");
  pathApp.initPath();
});