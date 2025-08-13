const LGEnSol = {
    
    headerEvent:function(){
        const eventBtn = document.querySelectorAll(".parent-event_btn"),
        eventCont = document.querySelector(".nav-wrap"),
        eventParent = document.querySelector(".header-wrap"),
        searchBtn = document.querySelector(".search-btn"),
        headerSearch = document.querySelector(".header-search"),
        header_h = eventParent.offsetHeight;
        let menu_h = [];

        function setEvent(){}
        function clearEvent(){}
        function event(){
            // eventCont.forEach((btn) => {
                eventCont.addEventListener("mouseenter", function () {
                    console.log("마우스 진입");
                    eventParent.addClass("on")
                });
                eventCont.addEventListener("mouseleave", function () {
                    console.log("마우스 탈출");
                });
            // })
            
            document.addEventListener("click", function (event) {
                const targetBox = document.querySelector(".target-box");

                // targetBox가 있고, 클릭한 요소가 targetBox 내부가 아니면
                if (targetBox && !targetBox.contains(event.target)) {
                    console.log("외부 영역 클릭됨!");
                    
                    clearEvent();
                }
            });
        }

        setEvent();
        clearEvent();
        event();
        
        // eventBtn.on("click", function () {
        //     eventParent.find(".header-cont").height();
        //     // alert(Math.max.apply(null, menu_h)
        //     if($(this).hasClass("on")){
        //         $(this).removeClass("on")
        //         eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
        //             menu_h[e] = parseInt($(this).height());
        //         }); 
        //         $(".header-wrap").removeClass("on").css("height", header_h + 1);;
        //         $(".gnb__tab-btn-wrap ul").removeClass("on").stop().slideUp(300);
        //         if(eventParent.hasClass("scroll-on")){
        //             $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI_wh.svg")
        //         }
        //     }else{
        //         eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
        //             menu_h[e] = parseInt($(this).height()+(16 * 0.88 * 4));
        //         });  
        //         $(this).addClass("on");
        //         $(".header-wrap").addClass("on").css("height", header_h + Math.max.apply(null, menu_h) + 16 * 5.88);
        //         $(".gnb__tab-btn-wrap ul").addClass("on").stop().slideDown(300);
        //         $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI.svg")
        //     };
        // });

        // searchBtn.on("click", function () {
        //     eventParent.find(".header-cont").height();
        //     // alert(Math.max.apply(null, menu_h))
        //     if($(this).hasClass("on")){
        //         $(this).removeClass("on")
        //         eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
        //             menu_h[e] = parseInt($(this).height());
        //         }); 
        //         $(".header-wrap").removeClass("on").css("height", header_h + 1);;
        //         $(".gnb__tab-btn-wrap ul").removeClass("on").stop().slideUp(300);
        //         headerSearch.show();
        //         if(eventParent.hasClass("scroll-on")){
        //             $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI_wh.svg")
        //         }
        //     }else{
        //         eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
        //             menu_h[e] = parseInt($(this).height()+(16 * 0.88 * 4));
        //         });  
        //         $(this).addClass("on");
        //         $(".header-wrap").addClass("on").css("height", header_h + Math.max.apply(null, menu_h) + 16 * 5.88);
        //         $(".gnb__tab-btn-wrap ul").addClass("on").stop().slideDown(300);
        //         $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI.svg")
        //     };
        // });
    },
    headerClearEvent:function(){},
};


$(document).ready(function($) {
    LGEnSol.headerEvent();

    //문의하기 pc 관련 스크립트 - S
    const pcSteps = document.querySelectorAll(".pc-only .stepper-wrapper  .accordion-list");
    if (pcSteps.length > 0) {
        const pcStepElements = Array.from(pcSteps).map((step) => ({
            categoryBtns: step.querySelectorAll(".cont-btn-wrap .btn"),
            nextBtn: step.querySelector(".btn-step-next"),
            subContWrap: step.querySelector(".sub-cont-wrap"),
            stepEl: step,
        }));

        let pcSelectedButtons = new Array(pcSteps.length).fill(null);

        pcStepElements.forEach((step, index) => {
            step.categoryBtns.forEach((button) =>
                button.addEventListener("click", function (e) {
                    if (index === 2) {
                        //step3 (index:2) 일때 버튼이벤트 예외처리
                        const clickedBtn = e.target.closest("button");
                        if (!clickedBtn) return;

                        // multi-btn 컨테이너 안에서만 동작
                        const multiGroup = clickedBtn.closest(".cont-btn-wrap.multi-btn");

                        const multiGroupBtn = multiGroup.querySelectorAll("button");
                        multiGroupBtn.forEach((btn) => {
                            btn.classList.remove("active");
                        });

                        if (multiGroup) {
                            // 이 줄만으로 해당 버튼의 on/off 토글, 다른 버튼 상태는 유지됨
                            clickedBtn.classList.toggle("active");
                        }
                        return; // step3는 여기서 종료 (전역 초기화 로직 실행 방지)
                    } else {
                        if (pcSelectedButtons[index] !== this) {
                            if (pcSelectedButtons[index]) pcSelectedButtons[index].classList.remove("active");
                            this.classList.add("active");
                            pcSelectedButtons[index] = this;
                            pcMaxStepReached = index;
                            if (index === 1 && step.subContWrap) step.subContWrap.style.display = "flex";
                            step.nextBtn.classList.remove("disabled");
                        }
                    }
                })
            );
        });
    }
    // - E

    //문의하기 mobile 관련 스크립트 - S
    const mobileStepIndicator = document.querySelectorAll(".mo-only .stepper-wrapper .step-indicator .step-indicator-btn");
    const mobileSteps = document.querySelectorAll(".mo-only .stepper-wrapper .faq-list > .item");

    if (mobileStepIndicator.length > 0) {
        mobileStepIndicator.forEach((indicator) => {
            indicator.addEventListener("click", (el) => {
                const targetIndicator = el.currentTarget;
                const targetIndiDataType = targetIndicator.dataset.type;
                // console.log(targetIndiDataType, targetIndicator)

                // indicator active 클래스 초기화
                mobileStepIndicator.forEach((otherIndicator) => {
                    otherIndicator.querySelector(".step").classList.remove("active");
                });
                // step item active 클래스 초기화
                mobileSteps.forEach((otherItem) => {
                    otherItem.classList.remove("on");
                });

                // target Indicator & step item 클래스 부여
                targetIndicator.querySelector(".step").classList.add("active");
                targetStepItem = document.querySelector(`#${targetIndiDataType}`);
                targetStepItem.classList.add("on");
            });
        });
    }

    if (mobileSteps.length > 0) {
        mobileSteps.forEach((step, index) => {
            const stepEl = step;
            const categoryBtns = step.querySelectorAll(".cont-btn-wrap button");
            const categoryBtnsContent = step.querySelectorAll(".cont-btn-wrap .btn-box .btn-content");

            const nextBtn = step.querySelector(".btn-primary01");
            const prevBtn = step.querySelector(".btn-outline01");
            const subContWrap = step.querySelector(".sub-cont-wrap");

            // 문의하기 step별 카테고리 버튼 클릭시, 클릭 이벤트
            categoryBtns.forEach((button) =>
                button.addEventListener("click", (e) => {
                    if (index === 2) {
                        //step3 (index:2) 일때 버튼이벤트 예외처리
                        const clickedBtn = e.target.closest("button");
                        if (!clickedBtn) return;

                        // multi-btn 컨테이너 안에서만 동작
                        const multiGroup = clickedBtn.closest(".cont-btn-wrap.multi-btn");

                        const multiGroupBtn = multiGroup.querySelectorAll("button");
                        multiGroupBtn.forEach((btn) => {
                            btn.classList.remove("active");
                        });

                        if (multiGroup) {
                            // 이 줄만으로 해당 버튼의 on/off 토글, 다른 버튼 상태는 유지됨
                            clickedBtn.classList.toggle("active");
                        }
                        return; // step3는 여기서 종료 (전역 초기화 로직 실행 방지)
                    } else {
                        //카테고리 버튼 클래스초기화
                        categoryBtns.forEach((btns) => {
                            btns.classList.remove("active");
                        });
                        //카테고리 버튼컨텐츠 클래스초기화
                        categoryBtnsContent.forEach((btnContent) => {
                            btnContent.classList.remove("active");
                        });

                        e.target.classList.add("active"); //클릭한 카테고리 active클래스 추가

                        const targetBtnId = e.target.getAttribute("id");
                        const targetBtnContent = document.querySelector(`#${targetBtnId}-content`);
                        //console.log(targetBtnId, targetBtnContent);

                        //클릭한 카테고리에 해당하는 버튼컨텐츠 active클래스 추가 - null일경우 실행하지않음
                        if (targetBtnContent != null) {
                            if (!targetBtnContent.classList.contains("active")) {
                                targetBtnContent.classList.add("active");
                            }
                        }
                    }
                })
            );
        });
    }
    // - E

        


});