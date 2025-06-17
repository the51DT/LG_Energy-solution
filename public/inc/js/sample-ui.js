
// pubUi
var pubUi = {
    init: function () {
        pubUi.bindEvents();
        pubUi.tabCateEvt();
        pubUi.exceptionStickyEvt();
        pubUi.scrollToEvt();
        pubUi.historyEvt();
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
                    if (checkingInterval) clearInterval(checkingInterval);

                    // 깜빡임 시작
                    checkingInterval = setInterval(() => {
                        if (mapMarking.style.display === "block") {
                            mapMarking.style.display = "none";
                        } else {
                            mapMarking.style.display = "block";
                        }
                    }, 1000);
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

        headerWrap.addEventListener("click", function () {
            if (headerWrap.classList.contains("on")) {
                headerWrap.classList.remove("on");
            } else {
                headerWrap.classList.add("on");
            }
        });

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
    },
    // 탭카테고리 제어 이벤트
    tabCateEvt: function () {
        const tabCategory = document.querySelectorAll(".tab-category > li");
        const tabContent = document.querySelectorAll(".tab-content-box > .tab-content");

        tabCategory.forEach((tab, idx) => {
            tab.addEventListener("click", function (e) {
                const target = e.currentTarget;
                const targetId = target.getAttribute("id");
                console.log(targetId);

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
                        
            document.querySelector("html > body").scrollTo({ top: targetOffsetY - totalHeadHeight, behavior: "smooth" });
        }        
    },
    historyEvt: function(){
        const leftItems = Array.from(document.querySelectorAll(".left-area .year-container .item"));
        const rightItems = Array.from(document.querySelectorAll(".right-area .year-container .item"));
        const yearTermLinks = Array.from(document.querySelectorAll(".year-term-container .year-item-list > a"));

        const yearClickIndex = {};
        let lastClickedRange = null;
        let isFirstClick = true;

        function parseYearRange(rangeStr) {
            const [start, end] = rangeStr.split("~").map((s) => parseInt(s.trim(), 10));
            return { start, end };
        }

        function isInRange(year, start, end) {
            return year >= start && year <= end;
        }

        function getMatchingItems(rangeStr) {
            const { start, end } = parseYearRange(rangeStr);
            return leftItems.filter((item) => {
                const year = parseInt(item.dataset.year, 10);
                return isInRange(year, start, end);
            });
        }

        function findNextGlobalIndex(currentIndex) {
            const next = currentIndex + 1;
            return next < leftItems.length ? next : null;
        }
        
        yearTermLinks.forEach((link) => {
            link.addEventListener("click", function () {
                const rangeStr = this.dataset.year;
                if (lastClickedRange !== rangeStr) {
                    yearClickIndex[rangeStr] = 0;
                    lastClickedRange = rangeStr;
                }

                const matches = getMatchingItems(rangeStr);
                let rangeIdx = yearClickIndex[rangeStr] || 0;

                // 최초 클릭 시: 기존 active 제거하고 다음 연도로 이동
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

                if (globalIndex === null || !leftItems[globalIndex]) return;

                const left = leftItems[globalIndex];
                const right = rightItems[globalIndex];

                // 초기화
                leftItems.forEach((item) => item.classList.remove("active", "prev", "next"));
                rightItems.forEach((item) => {
                    item.classList.remove("active", "prev", "next");

                    // display 제어: 클래스가 없으면 숨기기
                    item.style.display = "none";
                });

                // 활성화
                left.classList.add("active");
                right.classList.add("active");

                // 이전/다음 클래스 처리
                if (leftItems[globalIndex - 1]) leftItems[globalIndex - 1].classList.add("prev");
                if (leftItems[globalIndex + 1]) leftItems[globalIndex + 1].classList.add("next");
                if (rightItems[globalIndex - 1]) rightItems[globalIndex - 1].classList.add("prev");
                if (rightItems[globalIndex + 1]) rightItems[globalIndex + 1].classList.add("next");

                // rightItems 표시/숨김 재조정
                rightItems.forEach((item) => {
                    const show = item.classList.contains("active") || item.classList.contains("prev") || item.classList.contains("next");
                    item.style.display = show ? "" : "none";
                });


                // 타겟 연도 파싱
                const yearText = left.dataset.year; // 예: "1992"
                const yearFirst = parseInt(yearText.slice(0, 2), 10);
                const yearSecond = parseInt(yearText.slice(2, 4), 10);

                // span 요소 찾기
                const firstSpan = left.querySelector(".year .first");
                const secondSpan = left.querySelector(".year .second");

                // ✨ 숫자 + pop 애니메이션 실행
                if (firstSpan && secondSpan) {
                    animateNumber(firstSpan, yearFirst);
                    animateNumber(secondSpan, yearSecond);
                }

                // term-container on 처리
                const activeYear = parseInt(left.dataset.year, 10);
                yearTermLinks.forEach((link) => {
                    const { start, end } = parseYearRange(link.dataset.year);
                    const li = link.closest(".year-item-list");
                    li.classList.toggle("on", isInRange(activeYear, start, end));
                });
            });
        });
    }
};


(function () {
    pubUi.init();
})();
