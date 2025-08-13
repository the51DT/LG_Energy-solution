const LGEnSol = {
    
    headerEvent:function(){
        const eventBtn = document.querySelectorAll(".parent-event_btn"),
        eventCont = document.querySelector(".nav-wrap"),
        eventParent = document.querySelector(".parent-event"),
        searchBtn = document.querySelector(".search-btn"),
        headerSearch = document.querySelector(".header-search"),
        header_h = eventParent.offsetHeight;
        let maxCount = 0,
        maxheight = 0;


        function setEvent(){
            eventParent.classList.add("on");
            eventCont.querySelectorAll(".gnb__tab-btn-wrap ul").forEach(ul => {
                const count = ul.querySelectorAll("li").length;
                if (count > maxCount) {
                    maxCount = count;
                    maxheight = maxCount  * (0.87 + 2.68 + 0.5)
                }
            });
            eventParent.style.height = 
                maxheight + "rem";
            eventCont.style.height = 
                maxheight + "rem";
            
            document.querySelectorAll(".gnb__tab-btn-wrap ul").forEach(el => {
            
            el.classList.add("on");

                el.style.removeProperty("display");
                let display = window.getComputedStyle(el).display;
                if (display === "none") display = "block";
                el.style.display = display;

                
                el.style.overflow = "hidden";
                el.style.height = "0px";

                
                requestAnimationFrame(() => {
                    el.style.transition = "height 0.3s ease";
                    el.style.height = el.scrollHeight + "px";
                });

                
                setTimeout(() => {
                    el.style.height = "";
                    el.style.overflow = "";
                    el.style.transition = "";
                }, 300);
            });
        }
        function clearEvent(){
            eventParent.classList.remove("on");
            eventParent.style.height = 
                header_h + "px";
            eventCont.style.height = 
            header_h + "px";
            
            document.querySelectorAll(".gnb__tab-btn-wrap ul").forEach(el => {
                el.classList.remove("on");

                el.style.transition = "height 0s";
                el.style.overflow = "hidden";
                el.style.height = "0rem";

                requestAnimationFrame(() => {
                    el.style.transition = "height 0s";
                    el.style.height = "0rem";
                });
            });
        }
        function event(){
            eventCont.addEventListener("mouseenter", function () {
                setEvent();
            });
            eventCont.addEventListener("mouseleave", function () {
                clearEvent();
            });
            
            document.addEventListener("click", function(e) {
                const isInside = Array.from(document.querySelectorAll(".search-reset"))
                    .some(reset => reset.contains(e.target));
                if (!isInside) {
                    pubUi.popUp.close('.header_search-area', '.header_search-btn');
                }
            });
        }
        event();
    },
};


$(document).ready(function($) {
    LGEnSol.headerEvent();
});