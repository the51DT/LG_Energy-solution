
// pubUi
var pubUi = {
    init: function () {
        pubUi.bindEvents();
        pubUi.tabCateEvt();
        pubUi.exceptionStickyEvt();
        pubUi.scrollToEvt();
        pubUi.historyMotionEvt();
        pubUi.historyViewEvt();
    },
    // bindEvents - 클릭이벤트 등 이벤트 핸들링 관련 함수
    bindEvents: function () {
        const headerWrap = document.querySelector(".header-wrap");
        const pageMap = document.querySelectorAll(".page-map");
        const mapCateBtn = document.querySelectorAll(".map-cate button");

        const networkMap = document.querySelector(".map-conts-area");

        if (networkMap != null && networkMap != "") {
            const networkMapInfo = networkMap.querySelector(".map-info");
            const mapInfoItem = networkMapInfo.querySelectorAll(".map-info-item > li > a");
            const mapImg = networkMap.querySelector(".map-img");
            const mapMarking = networkMap.querySelector(".map-img .active_img .active_mark");
            const mapCloseBtn = networkMapInfo.querySelector(".btn-close > button");

            let checkingInterval; // 깜빡임을 위한 인터벌 변수

            mapInfoItem.forEach((item) => {
                item.addEventListener("click", function (e) {
                    mapInfoItem.forEach((otherItem) => {
                        if (otherItem !== e.currentTarget) {
                            otherItem.classList.remove("active");
                        } else {
                            e.currentTarget.classList.add("active");
                        }
                    });

                    networkMapInfo.classList.add("on");
                    mapImg.classList.add("on");
                    mapMarking.style.display = "block";

                    // 기존 깜빡임 인터벌 제거 (중복 방지)
                    // if (checkingInterval) clearInterval(checkingInterval);

                    // // 깜빡임 시작
                    // checkingInterval = setInterval(() => {
                    //     if (mapMarking.style.display === "block") {
                    //         mapMarking.style.display = "none";
                    //     } else {
                    //         mapMarking.style.display = "block";
                    //     }
                    // }, 1000);
                });
            });

            mapCloseBtn.addEventListener("click", function (e) {
                const targetMap = e.currentTarget.closest(".map-info");
                targetMap.classList.remove("on");
                mapImg.classList.remove("on");
                mapMarking.style.display = "none";
                mapInfoItem.forEach((item) => {
                    item.classList.remove("active");
                });
            });
        }

        // headerWrap.addEventListener("click", function () {
        //     if (headerWrap.classList.contains("on")) {
        //         headerWrap.classList.remove("on");
        //     } else {
        //         headerWrap.classList.add("on");
        //     }
        // });

        mapCateBtn.forEach((targetBtn) => {
            targetBtn.addEventListener("click", function (e) {
                if (targetBtn.closest(".map-cate").querySelector(".page-map").classList.contains("on")) {
                    targetBtn.closest(".map-cate").querySelector(".page-map").classList.remove("on");
                } else {
                    targetBtn.closest(".map-cate").querySelector(".page-map").classList.add("on");
                }
            });
        });

        pageMap.forEach((map) => {
            const pageMapCate = map.querySelectorAll("li > a");
            pageMapCate.forEach((subCate) => {
                subCate.addEventListener("click", function (e) {
                    pageMapCate.forEach((otherBox) => {
                        if (otherBox !== e.currentTarget) {
                            otherBox.classList.remove("active");
                        }
                    });
                    const subCateName = subCate.innerText;
                    map.closest(".map-cate").querySelector("button").innerText = subCateName;
                    map.classList.remove("on");
                    subCate.classList.add("active");
                });
            });
        });

        
        $("body").on("scroll", function () {
            var nowScroll = $(this).scrollTop(),
                page_h = $(window).height() * 0.3;
            
            if (nowScroll > page_h) {
                $("aside").fadeIn(500);
            } else {
                $("aside").hide();
            }
            
            $(".wrap.sub_p aside").on("click", function () {
                $("body").stop().animate({ scrollTop: 0 }, 300);
            });
            
            

            if ($(".history-wrap").length > 0) {
                const historyView = document.querySelector(".history-wrap.each-view");
                const historyViewY = historyView.offsetTop - 140;
                
                // if (nowScroll === 0) {
                //     historyView.removeAttribute("data-scrolling")
                //     document.querySelector("body").style.overflow = "auto";
                //     // console.log("스크롤 최상단, isScrolledOnce 초기화");
                // }
                if (nowScroll < historyViewY && !historyView.getAttribute("data-scrolling")) {                    
                    document.querySelector("body").scrollTo({ top: historyViewY, behavior: "smooth" });
                    historyView.setAttribute("data-scrolling", true);
                    document.querySelector("body").style.overflow = "hidden"
                    // console.log(historyViewY + "히스토리 위치로 스크롤 이동");
                } 
            }
        });
    },
    // 탭카테고리 제어 이벤트
    tabCateEvt: function () {
        const tabCategory = document.querySelectorAll(".tab-category > li");
        const tabContent = document.querySelectorAll(".tab-content-box > .tab-content");

        tabCategory.forEach((tab, idx) => {
            tab.addEventListener("click", function (e) {
                const target = e.currentTarget;
                const targetId = target.getAttribute("id");
                // console.log(targetId);

                tabCategory.forEach((otherTab) => {
                    if (otherTab !== target) {
                        otherTab.classList.remove("on");
                    }
                });
                tabContent.forEach((tabCont) => {
                    tabCont.classList.remove("on");
                });

                document.querySelector(`#${targetId}`).classList.add("on");
                document.querySelector(`#${targetId}-content`).classList.add("on");
            });
        });
    },
    // sticky 대상 sticky 상태일경우, stuck 클래스를 통한 css 제어 처리 - S
    // sticky 붙었을경우 예외처리 클래스, 처리하려는 sticky 대상의 css의 top값이 꼭 -1px 이어야 해당 스크립트 적용됨
    exceptionStickyEvt: function () {
        const stickyEl = document.querySelector(".page-map-wrap");
        const observer = new IntersectionObserver(([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1), {
            threshold: [1],
        });
        observer.observe(stickyEl);
    },
    scrollToEvt: function (targetId) {

        if(targetId !== undefined && targetId != null) {
            const targetContent = document.querySelector(targetId);
            const targetOffsetY = targetContent.offsetTop;
            const pageMapHeight = document.querySelector(".page-map-wrap").clientHeight;
            const contentHeadHeight = document.querySelector(".content-area-head-tab").clientHeight;
            const totalHeadHeight = pageMapHeight + contentHeadHeight;
                        
            document.querySelector("body").scrollTo({ top: targetOffsetY - totalHeadHeight, behavior: "smooth" });
        }        
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
        if(historyContArea) {
            historyContArea.addEventListener("wheel", (e) => {
                const deltaY = e.deltaY;
                const isScrollingDown = deltaY > 0;
                const isScrollingUp = deltaY < 0;
            
                const currentActive = document.querySelector(".left-area .item.active");
                const currentIdx = leftItems.findIndex((item) => item === currentActive);
            
                const atFirst = currentIdx === 0;
                const atLast = currentIdx === leftItems.length - 1;
                
                const historyView = document.querySelector(".history-wrap.each-view");
                const historyViewY = historyView.offsetTop - 140;

                // ✅ 외부 스크롤을 허용할 조건 (맨 처음 + 위, 맨 끝 + 아래)
                const allowExternalScroll = (isScrollingDown && atLast) || (!isScrollingDown && atFirst);
            
                // 🔒 외부 스크롤 차단
                if (!allowExternalScroll) {
                    e.preventDefault();                    
                    // document.querySelector("body").style.overflow = "hidden";
                } else {
                    document.querySelector("body").style.overflow = "auto";

                    if (isScrollingUp) {
                        console.log("scrollUp")
                        document.querySelector("body").scrollTo({ top: 0, behavior: "smooth" });
                    }
                }                                                
            
                // 연도 전환 처리
                const nextIdx = isScrollingDown
                    ? Math.min(currentIdx + 1, leftItems.length - 1)
                    : Math.max(currentIdx - 1, 0);
            
                if (nextIdx !== currentIdx) {
                    activateYearByIndex(nextIdx);
                }
            }, { passive: false });
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
                allView.classList.remove("active");
                setTimeout(() => {
                    eachView.style.display = "block";
                }, 400); // transition 시간만큼 기다림

                setTimeout(function () {
                    pubUi.scrollToEvt("#eachView");
                }, 1000);
            });     
        }
    }
};


(function () {
    pubUi.init();
})();
