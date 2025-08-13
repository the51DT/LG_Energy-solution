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
});