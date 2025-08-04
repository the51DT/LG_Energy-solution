var pubUi = {
    self: {},

    init: function () {
        this.settings();
        this.bindEvents();
        this.scrollToEvt();
        this.chkFileboxDisabled();
        this.fileboxInputEvt();
        this.exceptionStickyEvt();        

        this.form.init();
        this.tabList.init();
        this.acdItem.init();

        this.evtScheduleLeft();
        
        this.scrollToEvt();
        this.historyMotionEvt();
        this.historyViewEvt();

    },

    settings: function () {
        this.self = {};
        this.self.mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        this.self.isPc = window.innerWidth >= 1024;
        this.self.isMobile = window.innerWidth <= 1023;

        this.self.tabCategory = document.querySelector(".activeTab");
        this.self.tabLists = document.querySelectorAll(".tab-cate-wrap [role=tablist]");
        
        this.self.selectCate = document.querySelectorAll(".select-cate.activeSelect");
        this.self.selectCateBtn = document.querySelectorAll(".activeSelect button");
        this.self.selectMenu = document.querySelectorAll(".activeSelect .select-menu");
        
        /* content-item */
        this.self.pcOnly = document.querySelector(".pc-only");
        this.self.moOnly = document.querySelector(".mo-only");
        this.self.wrap = document.querySelector(".wrap");
        this.self.contentItem = document.querySelectorAll("[class^=content-item]");

        // console.log(this.self.contentItem);

        
    },

    bindEvents: function () {
        this.self.selectCateBtn.forEach((targetBtn) => {
            targetBtn.addEventListener("click", (e) => {
                const currentTarget = e.currentTarget;
                if (!currentTarget.closest(".select-cate").classList.contains("disabled")) {
                    this.self.selectCateBtn.forEach((otherTargetBtn) => {
                        if (otherTargetBtn !== currentTarget) {
                            otherTargetBtn.classList.remove("active");
                            otherTargetBtn.closest(".select-cate").querySelector(".select-menu").classList.remove("on");
                        }
                    });

                    const menu = currentTarget.closest(".select-cate").querySelector(".select-menu");
                    if (menu.classList.contains("on")) {
                        menu.classList.remove("on");
                        currentTarget.classList.remove("active");
                    } else {
                        menu.classList.add("on");
                        currentTarget.classList.add("active");
                    }
                }
            });
        });
        
        this.self.selectMenu.forEach((map) => {
            const pageMapCate = map.querySelectorAll("li > a");
            pageMapCate.forEach((subCate) => {
                subCate.addEventListener("click", (e) => {
                    pageMapCate.forEach((otherBox) => otherBox.classList.remove("active"));
                    subCate.classList.add("active");
                    const subCateName = subCate.innerText;
                    const button = map.closest(".select-cate").querySelector("button");
                    
                    if(!subCate.closest(".lang-wrap")) {
                        button.innerText = subCateName;
                    }
                    button.classList.add("on");
                    button.classList.remove("active");                                         
                    map.classList.remove("on");
                });
            });
        });
        
        this.self.wrap.addEventListener("scroll", function (el) {
            const historyWrap = document.querySelector(".history-wrap");
            const aside = document.querySelector(".wrap aside");
            const targetContentItem = el.target.querySelectorAll("[class^=content-item]");
            

            // 스크롤 이벤트 처리
            const nowScroll = el.target.scrollTop;
            const page_h = window.innerHeight * 0.3;
            // console.log("body scroll event");
            // console.log("nowScroll : " + nowScroll);
            // aside 표시/숨김 처리
            if (nowScroll > page_h) {
                aside && aside.style.display !== "block" && pubUi.fadeIn(aside, 500);
            } else {
                aside && (aside.style.display = "none");
            }

            // aside 클릭 시 스크롤 최상단 이동
            if (aside) {
                aside.onclick = function () {
                    el.target.scrollTo({ top: 0, behavior: "smooth" });
                };
            }

            // history-wrap 처리
            if (historyWrap && historyWrap.classList.contains("each-view")) {
                const historyViewY = historyWrap.offsetTop - 140;

                if (nowScroll > 0 && !historyWrap.getAttribute("data-scrolling")) {
                    document.body.scrollTo({ top: historyViewY, behavior: "smooth" });
                    historyWrap.setAttribute("data-scrolling", "true");
                    document.body.style.overflow = "hidden";
                    // console.log("scrollDown !!!");
                }
            }

            targetContentItem.forEach((item, idx) => {
                const itemTop = item.offsetTop - 152; // - 600; // 아이템의 상단 위치 - 600                
                const itemHeight = item.clientHeight;
                const itemBottom = itemTop + itemHeight;

                const itemDataBg = item.dataset.bgtype;
                // console.log("itemDataBg : " + itemDataBg);

                // 현재 스크롤 위치가 아이템 영역에 들어왔는지 확인
                if (nowScroll >= itemTop && nowScroll < itemBottom) {
                    // 해당 아이템에 on 클래스 추가
                    item.classList.add("on");
                    // 다른 아이템에서 on 클래스 제거
                    targetContentItem.forEach((otherItem, otherIdx) => {
                        if (otherIdx !== idx) {
                            otherItem.classList.remove("on");
                        }
                    });

                    if (itemDataBg === "dark" && item.classList.contains("on")) {
                        // dark 타입의 아이템이 on 상태일 때, 폰트 컬러 변경
                        item.style.color = "#fff";
                    }
                } else {
                    item.classList.remove("on");
                    if (itemDataBg === "dark") {
                        // 값 초기화
                        item.style.color = "revert";
                    }
                }
            });
        });
    },
    // fadeIn 함수: 요소를 서서히 나타나게 하는 함수
    fadeIn: function (element, duration) {
        element.style.opacity = 0;
        element.style.display = "block";

        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            element.style.opacity = opacity;
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    },
    // IR정보 > IR행사 모바일일경우, 상단 schedule-month 스크롤 중앙 정렬 처리
    evtScheduleLeft: function () {
        // IR행사
        let evtScheduleWrap = document.querySelector(".evt-schedule-wrap");        
        
        if (evtScheduleWrap != null) {
            let evtScheduleMonth = evtScheduleWrap.querySelector(".schedule-month");
            let evtScheduleMonthList = evtScheduleWrap.querySelectorAll(".schedule-month > li");
            evtScheduleMonthList.forEach((month) => {
                if (month.classList.contains("on")) {
                    const monthOffsetLeft = month.offsetLeft / 1.5;
                    evtScheduleMonth.scrollTo({ left: monthOffsetLeft, behavior: "smooth" });
                }
            });
        }
    },

    // sticky 대상 sticky 상태일경우, stuck 클래스를 통한 css 제어 처리 - S    
    exceptionStickyEvt: function () {    
        if (document.querySelector(".wrap")) {
            document.querySelector(".wrap").addEventListener("scroll", (e) => {
                const offsetTop = document.querySelector(".wrap").scrollTop;
                const stickyEl = document.querySelector(".page-map-wrap");

                if (!stickyEl) return;

                // pc일때만 적용
                if (pubUi.self.isPc) {
                    if (offsetTop > 400) {
                        stickyEl.classList.add("stuck");
                    } else {
                        stickyEl.classList.remove("stuck");
                    }
                }
            });
        }
    },

    scrollToEvt: function (targetId) {
        if (targetId) {
            const targetContent = document.querySelector(targetId);
            const targetOffsetY = targetContent.offsetTop;
            const pageMapHeight = document.querySelector(".page-map-wrap").clientHeight;
            const contentHeadHeight = document.querySelector(".content-area-head-tab").clientHeight;
            const totalHeadHeight = pageMapHeight + contentHeadHeight;

            document.querySelector("body").scrollTo({ top: targetOffsetY - totalHeadHeight, behavior: "smooth" });
        }
        
    },

    chkFileboxDisabled: function () {
        document.querySelectorAll(".filebox").forEach((box) => {
            const nameField = box.querySelector(".upload-name");
            const inputField = box.querySelector("input[type=file]");
            const msg = box.querySelector(".input-info");
            const disabled = nameField.disabled;
            inputField.classList.toggle("disabled", disabled);
            msg.classList.toggle("disabled", disabled);
            inputField.disabled = disabled;
        });
    },

    fileboxInputEvt: function () {
        document.querySelectorAll("input[type=file]").forEach((input) => {
            input.addEventListener("change", function () {
                const name = this.files[0]?.name || "파일첨부 (선택)";
                this.closest(".input-wrap").querySelector(".upload-name").value = name;
            });
        });

        document.querySelectorAll(".upload-name").forEach((name) => {
            name.addEventListener("click", function () {
                const input = this.closest(".input-wrap").querySelector("input[type=file]");
                if (input) input.click();
            });
        });
    },

    historyMotionEvt: function(){
        // NodeList를 일반 배열로 변환하여 배열 메서드(map, find 등) 사용 가능하도록 처리
        const leftItems = Array.from(document.querySelectorAll(".left-area .year-container .item"));
        const rightItems = Array.from(document.querySelectorAll(".right-area .year-container .item"));
        const yearTermLinks = Array.from(document.querySelectorAll(".year-term-container .year-item-list > a"));
        const historyContArea = document.querySelector(".history-cont-wrap"); // 스크롤 이벤트 타겟 영역

        const yearClickIndex = {}; // 연도 구간별 클릭 인덱스 기억
        let lastClickedRange = null; // 마지막 클릭한 연도 구간
        let isFirstClick = true; // 최초 클릭인지 여부

        // "2000~2018" 형식 문자열 → {start: 2000, end: 2018} 객체로 변환
        function parseYearRange(rangeStr) {
            const [start, end] = rangeStr.split("~").map((s) => parseInt(s.trim(), 10));
            return { start, end };
        }

        // 특정 연도가 주어진 범위 안에 포함되는지 확인
        function isInRange(year, start, end) {
            return year >= start && year <= end;
        }

        // 특정 연도 구간에 해당하는 leftItems 필터링
        function getMatchingItems(rangeStr) {
            const { start, end } = parseYearRange(rangeStr);
            return leftItems.filter((item) => {
                const year = parseInt(item.dataset.year, 10);
                return isInRange(year, start, end);
            });
        }

        // 현재 인덱스 기준 다음 연도 인덱스 찾기
        function findNextGlobalIndex(currentIndex) {
            const next = currentIndex + 1;
            return next < leftItems.length ? next : null;
        }

        // 숫자 카운트 애니메이션 함수 (숫자 증가 + pop 효과)
        function animateNumber(el, target, duration = 800) {
            let start = parseInt(el.innerText, 10);
            if (isNaN(start)) start = 0;
            if (start === target) start = target - 1;

            const frameRate = 1000 / 60;
            const totalFrames = Math.round(duration / frameRate);
            let frame = 0;

            const easeOut = (t) => 1 - Math.pow(1 - t, 3);

            const counter = setInterval(() => {
                frame++;
                const progress = easeOut(frame / totalFrames);
                const current = Math.round(start + (target - start) * progress);
                el.innerText = current.toString().padStart(2, "0");

                if (frame === 1) {
                    el.classList.add("num-pop");
                    setTimeout(() => el.classList.remove("num-pop"), 300);
                }

                if (frame >= totalFrames) {
                    clearInterval(counter);
                    el.innerText = target.toString().padStart(2, "0");
                }
            }, frameRate);
        }

        // 공통 연도 전환 처리 (좌우 영역 + 숫자 애니메이션 + 상태 클래스 제어 포함)
        function activateYearByIndex(index) {
            const left = leftItems[index];
            const right = rightItems[index];

            // right-area item의 bullet 초기화 후 모션 동작후 생성되게하기 위함
            document.querySelector(".right-area .year-item-list").classList.remove("on");
            setTimeout(function () {
                document.querySelector(".right-area .year-item-list").classList.add("on");
            }, 500);

            // 좌우 모든 아이템에서 상태 초기화
            leftItems.forEach((item) => item.classList.remove("active", "prev", "next"));
            rightItems.forEach((item) => {
                item.classList.remove("active", "prev", "next");
                item.style.display = "none";
            });

            // 현재 인덱스 항목 활성화 + 양 옆 prev/next 클래스 추가
            left.classList.add("active");
            right.classList.add("active");

            if (leftItems[index - 1]) leftItems[index - 1].classList.add("prev");
            if (leftItems[index + 1]) leftItems[index + 1].classList.add("next");
            if (rightItems[index - 1]) rightItems[index - 1].classList.add("prev");
            if (rightItems[index + 1]) rightItems[index + 1].classList.add("next");

            // right 영역 표시/숨김 처리
            rightItems.forEach((item) => {
                const show = item.classList.contains("active") || item.classList.contains("prev") || item.classList.contains("next");
                item.style.display = show ? "" : "none";
            });

            // 연도 숫자 처리 (슬라이드 애니메이션)
            const yearText = left.dataset.year;
            const firstSpan = left.closest(".year-item-list").querySelector(".year .first");
            const secondSpan = left.closest(".year-item-list").querySelector(".year .second");

            if (firstSpan && secondSpan) {
                const yearFirst = parseInt(yearText.slice(0, 2), 10);
                const yearSecond = parseInt(yearText.slice(2, 4), 10);

                const currentFirst = parseInt(firstSpan.innerText, 10);
                const currentSecond = parseInt(secondSpan.innerText, 10);

                if (currentFirst !== yearFirst) {
                    animateNumber(firstSpan, yearFirst);
                    setTimeout(() => {
                        if (currentSecond !== yearSecond) {
                            animateNumber(secondSpan, yearSecond);
                        }
                    }, 300);
                } else if (currentSecond !== yearSecond) {
                    animateNumber(secondSpan, yearSecond);
                }
            }

            // 연도 구간 탭(on) 처리
            const activeYear = parseInt(left.dataset.year, 10);
            yearTermLinks.forEach((link) => {
                const { start, end } = parseYearRange(link.dataset.year);
                const li = link.closest(".year-item-list");
                li.classList.toggle("on", isInRange(activeYear, start, end));
            });
        }

        // 연도 탭 클릭 이벤트 처리
        yearTermLinks.forEach((link) => {
            link.addEventListener("click", function () {
                const rangeStr = this.dataset.year;

                if (lastClickedRange !== rangeStr) {
                    yearClickIndex[rangeStr] = 0;
                    lastClickedRange = rangeStr;
                }

                const matches = getMatchingItems(rangeStr);
                let rangeIdx = yearClickIndex[rangeStr] || 0;

                // 최초 클릭 시 기존 active가 동일하면 다음 인덱스로 강제 이동
                if (isFirstClick && matches.length > 0) {
                    const activeLeft = document.querySelector(".left-area .item.active");
                    const matchLeft = matches[rangeIdx];

                    if (activeLeft === matchLeft) {
                        activeLeft.classList.remove("active");
                        const year = activeLeft.dataset.year;
                        const activeRight = rightItems.find((item) => item.dataset.year === year);
                        if (activeRight) activeRight.classList.remove("active");

                        rangeIdx++;
                        yearClickIndex[rangeStr] = rangeIdx;
                    }

                    isFirstClick = false;
                }

                let globalIndex = null;

                if (rangeIdx < matches.length) {
                    globalIndex = leftItems.findIndex((item) => item === matches[rangeIdx]);
                    yearClickIndex[rangeStr]++;
                } else {
                    const currentActive = document.querySelector(".left-area .item.active");
                    const currentIdx = currentActive ? leftItems.findIndex((item) => item === currentActive) : -1;
                    const nextIdx = findNextGlobalIndex(currentIdx);
                    if (nextIdx !== null) {
                        globalIndex = nextIdx;
                        const nextYear = parseInt(leftItems[nextIdx].dataset.year, 10);
                        const nextRange = yearTermLinks.find((link) => {
                            const { start, end } = parseYearRange(link.dataset.year);
                            return isInRange(nextYear, start, end);
                        });
                        if (nextRange) {
                            lastClickedRange = nextRange.dataset.year;
                            yearClickIndex[lastClickedRange] = getMatchingItems(lastClickedRange).findIndex((item) => parseInt(item.dataset.year, 10) === nextYear) + 1;
                        }
                    }
                }

                if (globalIndex !== null && leftItems[globalIndex]) {
                    activateYearByIndex(globalIndex);
                }
            });
        });

        // history-cont-wrap 내 스크롤 휠 이벤트 처리 (스크롤로 연도 이동)
        // as-is
        // if(historyContArea) {
        //     historyContArea.addEventListener("wheel", (e) => {
        //         const deltaY = e.deltaY;
        //         const isScrollingDown = deltaY > 0;
        //         const isScrollingUp = deltaY < 0;

        //         const currentActive = document.querySelector(".left-area .item.active");
        //         const currentIdx = leftItems.findIndex((item) => item === currentActive);

        //         const atFirst = currentIdx === 0;
        //         const atLast = currentIdx === leftItems.length - 1;

        //         const historyView = document.querySelector(".history-wrap.each-view");
        //         const historyViewY = historyView.offsetTop - 140;

        //         // ✅ 외부 스크롤을 허용할 조건 (맨 처음 + 위, 맨 끝 + 아래)
        //         const allowExternalScroll = (isScrollingDown && atLast) || (!isScrollingDown && atFirst);

        //         // 🔒 외부 스크롤 차단
        //         if (!allowExternalScroll) {
        //             e.preventDefault();
        //             // document.querySelector("body").style.overflow = "hidden";
        //         } else {
        //             document.querySelector("body").style.overflow = "auto";

        //             setTimeout(function(){
        //                 if (isScrollingUp) {
        //                     console.log("scrollUp !!");
        //                     document.querySelector("body").scrollTo({ top: 0, behavior: "smooth" });
        //                 }
        //             },1000)
        //         }

        //         // 연도 전환 처리
        //         const nextIdx = isScrollingDown
        //             ? Math.min(currentIdx + 1, leftItems.length - 1)
        //             : Math.max(currentIdx - 1, 0);

        //         if (nextIdx !== currentIdx) {
        //             activateYearByIndex(nextIdx);
        //         }
        //     }, { passive: false });
        // }

        // to-be mac os 대응
        if(historyContArea) {
            let isHandlingScroll = false;

            // 터치 시작 위치 저장 (iOS 터치 대응용) - ios는 휠이벤트 인식하지못해, touchpad기반이라 다른 이벤트 조건 처리되도록 예외처리 필요하다고하여 소스 수정하였음.
            historyContArea.addEventListener("touchstart", (e) => { 
                handleCustomScroll.touchStartY = e.touches[0].clientY; 
                }, { passive: true }
            );

            // 다양한 이벤트 리스너 등록
            ["wheel", "mousewheel", "DOMMouseScroll", "touchmove"].forEach((eventType) => {
                historyContArea.addEventListener(eventType, handleCustomScroll, { passive: false });
            });

            function handleCustomScroll(e) {
                // ✅ 중복 실행 방지
                if (isHandlingScroll) return;

                // ✅ 스크롤 방향 추출
                let deltaY = 0;

                if (e.type === "touchmove") {
                    if (typeof handleCustomScroll.touchStartY === "number") {
                        deltaY = handleCustomScroll.touchStartY - e.touches[0].clientY;
                    }
                } else {
                    deltaY = e.deltaY || -e.wheelDelta || e.detail || 0;
                }

                const isScrollingDown = deltaY > 5;
                const isScrollingUp = deltaY < -5;

                if (!isScrollingDown && !isScrollingUp) return;

                isHandlingScroll = true; // 🔒 debounce

                // ✅ 기존 로직 그대로 유지
                const currentActive = document.querySelector(".left-area .item.active");
                const currentIdx = leftItems.findIndex((item) => item === currentActive);

                const atFirst = currentIdx === 0;
                const atLast = currentIdx === leftItems.length - 1;

                const historyView = document.querySelector(".history-wrap.each-view");
                const historyViewY = historyView.offsetTop - 140;

                // 외부 스크롤 허용 조건
                const allowExternalScroll = (isScrollingDown && atLast) || (isScrollingUp && atFirst);

                if (!allowExternalScroll) {
                    e.preventDefault();
                    // document.querySelector("body").style.overflow = "hidden";                    
                } else {                    
                    if (isScrollingUp) {
                        // console.log("scrollUp !!!");
                        document.querySelector("body").scrollTo({ top: 0, behavior: "smooth" });
                        
                        setTimeout(function(){
                            historyView.removeAttribute("data-scrolling");
                            document.querySelector("body").style.overflow = "auto";
                        },1000)
                    }                    
                }

                // 연도 전환 처리
                const nextIdx = isScrollingDown ? Math.min(currentIdx + 1, leftItems.length - 1) : Math.max(currentIdx - 1, 0);

                if (nextIdx !== currentIdx) {
                    activateYearByIndex(nextIdx);
                }

                // ✅ debounce 해제 (500ms 후)
                setTimeout(() => {
                    isHandlingScroll = false;
                }, 500);
            }
        }

    },
    historyViewEvt: function(){

        if(document.querySelector(".history-wrap") != null) {
            const allView = document.querySelector("#allView");
            const eachView = document.querySelector("#eachView");
            const showAllBtn = document.querySelector("button[onclick*='#allView']");
            const backToEachBtn = document.querySelector("button[onclick*='#eachView']");
            
            // 한눈에 보기 클릭 시 팝업 표시
            showAllBtn.addEventListener("click", () => {
                allView.classList.add("active");
                eachView.style.display = "none";
            });

            // 하나씩 보기 클릭 시 팝업 숨기기
            backToEachBtn.addEventListener("click", () => {
                // console.log("eachView")
                allView.classList.remove("active");
                setTimeout(() => {
                    eachView.style.display = "block";
                }, 400); // transition 시간만큼 기다림

                setTimeout(function () {
                    pubUi.scrollToEvt("#eachView");
                }, 1000);
            });     
        }
    },


    form: {
        init() {
            this.bindEvents();
        },
        bindEvents() {
            $(document).on("input", ".textarea-box .textarea", function () {
                const textarea = this;
                const box = textarea.closest(".textarea-box");
                const length = textarea.value.length;
                const countEl = box.querySelector(".byte-check .count");
                const max = parseInt(textarea.getAttribute("maxlength"), 10) || 1000;
                countEl.innerText = Math.min(length, max);
                box.classList.toggle("on", length > 0);
                if (box.classList.contains("ty02")) pubUi.form.textareaResize(textarea);
            });
        },
        textareaResize(obj) {
            obj.style.height = "auto";
            obj.style.height = obj.scrollHeight + 2 + "px";
        },
    },

    tabList: {
        init() {
            this.tab();
            this.scroll();
        },
        tab() {            
            Array.from(pubUi.self.tabLists).forEach((tabList) => {
                const tabs = tabList.querySelectorAll(".activeTab > li");
            
                tabs.forEach((tab) => {
                    tab.addEventListener("click", function () {
                        const id = this.getAttribute("id");
                        const tabWrap = tabList.closest(".tab-wrap");
                        const contents = tabWrap.querySelectorAll(".tab-content-box > .tab-content");
            
                        // 1. 현재 탭 카테고리 탭들 초기화
                        tabs.forEach((t) => {
                            t.classList.remove("on");
                            t.querySelector("button").setAttribute("aria-selected", false);
                        });
            
                        contents.forEach((c) => {
                            c.classList.remove("on");
                            c.setAttribute("aria-expanded", false);
                        });
            
                        // 2. 현재 클릭한 탭 활성화
                        tab.classList.add("on");
                        tab.querySelector("button").setAttribute("aria-selected", true);
            
                        const content = tabWrap.querySelector(`#${id}-content`);
                        if (content) {
                            content.classList.add("on");
                            content.setAttribute("aria-expanded", true);
                        }
            
                        // 3. 만약 하위 탭이 있다면, 첫 번째 하위 탭도 초기화 처리
                        const secondTab = content?.querySelector("[data-tab-type='secondTab']");
                        if (secondTab) {
                            const secondTabs = secondTab.querySelectorAll(".tab-category > li");
                            const verticalContents = secondTab.querySelectorAll(".tab-content-box > .tab-content");
            
                            secondTabs.forEach((vt) => {
                                vt.classList.remove("on");
                                vt.querySelector("button").setAttribute("aria-selected", false);
                            });
            
                            verticalContents.forEach((vc) => {
                                vc.classList.remove("on");
                                vc.setAttribute("aria-expanded", false);
                            });
            
                            // 첫 번째 하위 탭 on 처리
                            const firstsecondTab = secondTabs[0];
                            const firstVerticalContentId = firstsecondTab.getAttribute("id") + "-content";
                            firstsecondTab.classList.add("on");
                            firstsecondTab.querySelector("button").setAttribute("aria-selected", true);
            
                            const firstVerticalContent = secondTab.querySelector(`#${firstVerticalContentId}`);
                            if (firstVerticalContent) {
                                firstVerticalContent.classList.add("on");
                                firstVerticalContent.setAttribute("aria-expanded", true);
                            }
                        }
                    });
                });
            });
        },
        scroll() {
            pubUi.self.tabLists.forEach((tabList) => {
                const wrap = tabList.closest(".tab-cate-wrap");
                if (pubUi.self.isMobile) {
                    wrap.classList.add("scroll");
                } else {
                    wrap.classList.remove("scroll");
                }
            });
        },
    },

    acdItem: {
        init() {
            this.tab();
        },
        tab() {
            $(document).on("click", ".acdItem .acd-btn", function (e) {
                e.preventDefault();
                const $this = $(this);
                const item = $this.closest(".acdItem");
                const expanded = $this.attr("aria-expanded") === "true";

                $this.attr("aria-expanded", !expanded);
                item.find("[role=region]").slideToggle();
                item.toggleClass("on", !expanded);

                if (!item.hasClass("tog")) {
                    item.siblings(".acdItem:not(.tog)").find("[aria-expanded]").attr("aria-expanded", false);
                    item.siblings(".acdItem:not(.tog)").find("[role=region]").slideUp();
                    item.siblings(".acdItem:not(.tog)").removeClass("on");
                }
            });
        },
    },
    popUp: {
        open(pop, btn) {
            const popEl = document.querySelector(pop);
            document.body.classList.add("noScroll");

            ["pop-s", "pop-e"].forEach((cls) => {
                const div = document.createElement("div");
                div.className = cls;
                div.setAttribute("tabindex", "0");
                cls === "pop-s" ? popEl.prepend(div) : popEl.append(div);
            });

            popEl.querySelector(".pop-wrap").setAttribute("tabindex", "0");
            popEl.classList.add("open");

            popEl.querySelectorAll(".pop-s, .pop-e").forEach((el) => {
                el.addEventListener("focus", () => popEl.querySelector(".pop-wrap").focus());
            });

            const closeBtn = popEl.querySelector("[data-action=close]");
            if (closeBtn) {
                closeBtn.addEventListener("click", () => pubUi.popUp.close(pop, btn));
            }

            if (popEl.classList.contains("tooltip")) {
                pubUi.popUp.setTooltipPosition(popEl, btn);
            }

            pubUi.popUp.scroll(pop);
        },

        close(pop, btn) {
            const popEl = document.querySelector(pop);
            document.body.classList.remove("noScroll");
            popEl.classList.remove("open");
            popEl.removeAttribute("style");
            popEl.querySelector(".pop-s")?.remove();
            popEl.querySelector(".pop-e")?.remove();
            popEl.querySelector(".pop-wrap").removeAttribute("tabindex");
            if (!popEl.classList.contains("tooltip")) {
                document.querySelector(btn).focus();
            }
        },

        scroll(pop) {
            const popEl = document.querySelector(pop);
            const content = popEl.querySelector(".pop-content");
            if (!content) return;

            const wrap = popEl.querySelector(".pop-wrap");
            const toggleClass = () => wrap.classList.toggle("scroll", content.scrollTop > 1);
            toggleClass();
            content.addEventListener("scroll", toggleClass);
        },

        setTooltipPosition(popEl, btn) {
            const padding = 8;
            const arrow = popEl.querySelector(".tooltip-arrow");

            const btnRect = btn.getBoundingClientRect();
            const popRect = popEl.getBoundingClientRect(); // 팝업 사이즈 고려

            const scrollY = window.scrollY;
            const scrollX = window.scrollX;

            let top = 0;
            let left = 0;

            document.body.classList.remove("noScroll");
            popEl.style.position = "absolute";
            popEl.style.zIndex = 100;

            // 툴팁 위치 조건별 분기
            if (arrow.classList.contains("top")) {
                // 상단 노출
                top = btnRect.top + scrollY - popRect.height - padding;

                if (arrow.classList.contains("right")) {
                    left = btnRect.right + scrollX - popRect.width + btn.offsetWidth;
                    // console.log("상단, 우측");
                } else {
                    left = btnRect.left + scrollX;
                    // console.log("상단, 좌측");
                }
            } else {
                // 하단 노출
                top = btnRect.bottom + scrollY + padding;

                if (arrow.classList.contains("right")) {
                    left = btnRect.right + scrollX - popRect.width + btn.offsetWidth;
                    // console.log("하단, 우측");
                } else {
                    left = btnRect.left + scrollX;
                    // console.log("하단, 좌측");
                }
            }

            // 위치값 적용
            popEl.style.top = `${top}px`;
            popEl.style.left = `${left}px`;
        },
    },
};

(function () {
    setTimeout(() => pubUi.init(), 1000);

    let resizeTimer;
    window.addEventListener("resize", () => {
        if (resizeTimer) cancelAnimationFrame(resizeTimer);
        resizeTimer = requestAnimationFrame(() => {
            if (!pubUi.self) return;
            pubUi.self.isPc = window.innerWidth >= 1440;
            pubUi.self.isMobile = window.innerWidth <= 768;
            pubUi.tabList.scroll();
            pubUi.evtScheduleLeft();
        });
    });     
})();
