
// pubUi
var pubUi = {
    init: function () {            
        pubUi.bindEvents();
        pubUi.tabCateEvt();
        pubUi.exceptionStickyEvt();
    },
    // bindEvents - 클릭이벤트 등 이벤트 핸들링 관련 함수
    bindEvents: function () {
        const headerWrap = document.querySelector(".header-wrap");
        const pageMap = document.querySelectorAll(".page-map");
        const mapCateBtn = document.querySelectorAll(".map-cate button");
        
        const networkMap = document.querySelector(".map-conts-area");
        const networkMapInfo = networkMap.querySelector(".map-info");
        const mapInfoCate = networkMapInfo.querySelector(".map-cate");
        const mapInfoItem = networkMapInfo.querySelectorAll(".map-info-item > li > a");
        const mapInfoCont = networkMapInfo.querySelector(".map-info-content-box");
        const mapImg = networkMap.querySelector(".map-img");        
        const mapMarking = networkMap.querySelector(".map-img .active_img .active_mark");

        mapInfoItem.forEach(item => {
            item.addEventListener("click", function(e){
                e.currentTarget.classList.add("active");
                networkMapInfo.classList.add("on");
                mapImg.classList.add("on");
                setInterval(function(){
                    mapMarking.style.display="block";
                },1000)
                
            })
        })

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
    }
};


(function () {
    pubUi.init();
})();
