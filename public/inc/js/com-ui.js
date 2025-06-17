$(function(){
    var eventbtn = $(".nav-btn"),
        eventCont = $(".nav-wrap"),
        eventParent = $(".header-wrap"),
        header_h = eventParent.height();
        max_h = [];
    eventbtn.on("click", function () {
        eventParent.find(".header-cont").height();
        // alert(Math.max.apply(null, max_h))
        if($(this).hasClass("on")){
            $(this).removeClass("on")
            eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
                max_h[e] = parseInt($(this).height());
            }); 
            $(".header-wrap").removeClass("on").css("height", header_h + 1);;
            $(".gnb__tab-btn-wrap ul").removeClass("on").stop().slideUp(300);
            $(".header-wrap").removeClass("on")
            if(eventParent.hisClass("scroll-on")){
                $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI_wh.svg")
            }
        
            
        }else{
            eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
                max_h[e] = parseInt($(this).height()+(16 * 0.88 * 4));
            });  
            $(this).addClass("on")
            $(".header-wrap").addClass("on").css("height", header_h + Math.max.apply(null, max_h) + 16 * 5.88);
            $(".gnb__tab-btn-wrap ul").addClass("on").stop().slideDown(300);
            $(".header-wrap").addClass("on")
            $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI.svg")
        };
    });

    $(".wrap.main_p").on("scroll", function(){
        if($(this).scrollTop() > 100){
            eventParent.addClass("scroll-on");
            $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI.svg")
        }else{
            eventParent.removeClass("scroll-on");
            $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI_wh.svg")
        }
    })

    $(".content-item04 .more").on("click", function(){
        var eventBtn = $(this)
        var eventCont = eventBtn.parents("[class*=cont0]");
        eventCont.addClass("on").siblings().removeClass("on")
        eventCont.parent().attr("class", "").addClass("cont-event" + (eventCont.index() + 1))
    })
});