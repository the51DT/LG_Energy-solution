$(document).ready(function($) {
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
            if(eventParent.hisClass("scroll-on")){
                $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI_wh.svg")
            }
        }else{
            eventCont.find(".gnb__tab-btn-wrap ul").each(function (e) {
                max_h[e] = parseInt($(this).height()+(16 * 0.88 * 4));
            });  
            $(this).addClass("on");
            $(".header-wrap").addClass("on").css("height", header_h + Math.max.apply(null, max_h) + 16 * 5.88);
            $(".gnb__tab-btn-wrap ul").addClass("on").stop().slideDown(300);
            $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI.svg")
        };
    });



    $(".content-item04 .more").on("click", function(){
        var eventBtn = $(this)
        var eventCont = eventBtn.parents("[class*=cont0]");
        eventCont.addClass("on").siblings().removeClass("on")
        eventCont.parent().attr("class", "").addClass("cont-event" + (eventCont.index() + 1))
    })
    $(".content-item02 .event-item02").on("click", function(){
        var eventBtn = $(this),
            eventCont = eventBtn.parents(".area1"),
            eventVideo = eventCont.find(".video"),
            eventVideoSrc = eventVideo.find("source");
        if(eventVideoSrc.hasClass("video1")){
            return
        }else if(eventVideoSrc.hasClass("video2")){
            eventVideoSrc.attr("class","");
            eventVideoSrc.addClass("video1").attr("src","../../../inc/video/2_Main_battery(pouch).mp4")
            eventVideo[0].load();
            eventVideo[0].play();
        }else{
            eventVideoSrc.attr("class","")
            eventVideoSrc.addClass("video1").attr("src","../../../inc/video/2_Main_battery(pouch).mp4")
            eventVideo[0].load();
            eventVideo[0].play();
        }
            
    })
    $(".content-item02 .event-item01").on("click", function(){
        var eventBtn = $(this),
            eventCont = eventBtn.parents(".area1"),
            eventVideo = eventCont.find(".video"),
            eventVideoSrc = eventVideo.find("source");
        if(eventVideoSrc.hasClass("video2")){
            return
        }else if(eventVideoSrc.hasClass("video1")){
            eventVideoSrc.attr("class","");
            eventVideoSrc.addClass("video2").attr("src","../../../inc/video/3_Main_battery(cylinder).mp4")
            eventVideo[0].load();
            eventVideo[0].play();
        }else{
            eventVideoSrc.attr("class","")
            eventVideoSrc.addClass("video2").attr("src","../../../inc/video/3_Main_battery(cylinder).mp4")
            eventVideo[0].load();
            eventVideo[0].play();
        }
            
    })
    if($(".wrap.main_p").length > 0){
        var cont_top01 = $('.content-item01').offset().top,
            cont_top02 = $('.content-item02').offset().top,
            cont_top03 = $('.content-item03').offset().top,
            cont_top04 = $('.content-item04').offset().top,
            cont_top05 = $('.content-item05').offset().top,
            cont_top06 = $('.content-item06').offset().top,
            cont_top07 = $('.content-item07').offset().top;
    }else{
        return;
    }
    

    $(".wrap.main_p").on("scroll", function(){
        var nowScroll = $(this).scrollTop(),
            page_h = $(window).height();
        if(nowScroll > 100){
            eventParent.addClass("scroll-on");
            $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI.svg")
        }else{
            
            eventParent.removeClass("scroll-on");
            $(".main_p .ci").find("img").attr("src","../../../inc/images/symbol/CI_wh.svg")
        }
        if(nowScroll > page_h){
            console.log(page_h)
            $("aside").fadeIn(500);
        }else {
            $("aside").hide();
        }
        console.log(cont_top01 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top02 - (page_h * 0.4))
        if(cont_top01 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top02){
            if(!$('.content-item01').hasClass("scroll-on")){
                countUp();
            }
            $('.content-item01').addClass("scroll-on")
        }else if(cont_top02 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top03 - (page_h * 0.4)){
            $('.content-item02').addClass("scroll-on")
        }else if(cont_top03 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top04 - (page_h * 0.4)){
            $('.content-item03').addClass("scroll-on")
        }else if(cont_top04 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top05 - (page_h * 0.4)){
            $('.content-item04').addClass("scroll-on")
        }else if(cont_top05 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top06 - (page_h * 0.4)){
            $('.content-item05').addClass("scroll-on")
        }else if(cont_top06 - (page_h * 0.4) < nowScroll && nowScroll <= cont_top07 - (page_h * 0.4)){
            $('.content-item06').addClass("scroll-on")
        }

        // if(nowScroll )
    });
    $("aside").on("click",function(){
        $(".wrap.main_p").stop().animate({"scrollTop":0},300)
    });
    function countUp() {
        var start = 0,
        end1 = 25.6,
        end2 = 1.1,
        end3 = 32071,
        end4 = 69631,
        end5 = 4527;
        $({ val : start }).animate({ val : end1 }, {
            duration: 1000,
            step: function() {
                var num = numberWithCommas(this.val.toFixed(1));
                $(".count").text(num);
            },
            complete: function() {
                var num = numberWithCommas(this.val.toFixed(1));
                $(".count").text(num);
            }
        });

        $({ val : start }).animate({ val : end2 }, {
            duration: 1000,
            step: function() {
                var num = numberWithCommas(this.val.toFixed(1));
                $(".count2").text(num);
            },
            complete: function() {
                var num = numberWithCommas(this.val.toFixed(1));
                $(".count2").text(num);
            }
        });
        $({ val : start }).animate({ val : end3 }, {
            duration: 1000,
            step: function() {
                var num = numberWithCommas(Math.floor(this.val));
                $(".count3").text(num);
            },
            complete: function() {
                var num = numberWithCommas(Math.floor(this.val));
                $(".count3").text(num);
            }
        });
        $({ val : start }).animate({ val : end4 }, {
            duration: 1000,
            step: function() {
                var num = numberWithCommas(Math.floor(this.val));
                $(".count4").text(num);
            },
            complete: function() {
                var num = numberWithCommas(Math.floor(this.val));
                $(".count4").text(num);
            }
        });
        $({ val : start }).animate({ val : end5 }, {
            duration: 1000,
            step: function() {
                var num = numberWithCommas(Math.floor(this.val));
                $(".count5").text(num);
            },
            complete: function() {
                var num = numberWithCommas(Math.floor(this.val));
                $(".count5").text(num);
            }
        });
    }
    

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

});