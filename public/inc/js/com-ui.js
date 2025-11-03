const LGEnSol = {
    headerEvent: function () {
        const eventCont = document.querySelector(".pc-only .nav-wrap"),
            moEventBtn = document.querySelector(".header-area.mo-only .nav-btn"),
            moEventCont = document.querySelector(".header-area.mo-only .nav-pop"),
            eventParent = document.querySelector(".parent-event"),
            header_h = eventParent.offsetHeight;
        let maxSum = 0,
            maxheight = 0;

        function setEvent() {
            eventParent.classList.add("on");
            document.querySelectorAll(".gnb__tab-btn-wrap ul").forEach((el) => {
            el.classList.add("on");
            el.style.removeProperty("display");

            let display = window.getComputedStyle(el).display;
            if (display === "none") display = "block";
            el.style.display = display;

            el.style.overflow = "hidden";
            el.style.height = "0px";

            requestAnimationFrame(() => {
                el.style.transition = "height 0.3s ease";

                const maxHeight = el.scrollHeight; // 현재 ul의 실제 높이
                el.style.height = maxHeight + "px";

                // 부모/컨테이너 높이 맞추기 → 여러 ul 중 최댓값 계산
                const allHeights = Array.from(document.querySelectorAll(".gnb__tab-btn-wrap ul"))
                .map(ul => ul.scrollHeight);
                const biggest = Math.max(...allHeights);

                eventParent.style.height = (biggest + 124) + "px";
                eventCont.style.height   = (biggest + 124) + "px";

                // console.log("각 ul 높이:", maxHeight, "최댓값:", biggest);
            });
            });
            
        }

        function clearEvent() {
            eventParent.classList.remove("on");
            eventParent.style.height = header_h + "px";
            eventCont.style.height = header_h + "px";

            document.querySelectorAll(".gnb__tab-btn-wrap ul").forEach((el) => {
                el.classList.remove("on");
                el.style.transition = "height 0s";
                el.style.overflow = "hidden";
                // el.style.height = "0rem";

                requestAnimationFrame(() => {
                    el.style.transition = "height 0s";
                    el.style.height = "0rem";
                });
            });
        }

        function setEventMo() {
            moEventCont.classList.add("on");
            moEventBtn.classList.add("on");
        }

        function clearEventMo() {
            moEventCont.classList.remove("on");
            moEventBtn.classList.remove("on");
        }

        function event() {
            if (eventCont) {
                eventCont.addEventListener("mouseenter", function () {
                    setEvent();
                });
                eventCont.addEventListener("mouseleave", function () {
                    clearEvent();
                });
            }

            if (moEventCont) {
                moEventBtn.addEventListener("click", function () {
                    if (!this.classList.contains("on")) {
                        setEventMo();
                    } else {
                        clearEventMo();
                    }
                });

                document.querySelectorAll(".nav-pop .depth01 > a").forEach((depOneBtn) => {
                    depOneBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        const li = this.parentElement;
                        const siblings = li.parentElement.children;
                        const siblingsDep2 = li.querySelectorAll("ul li").length;
                        const siblingsDep2H = 68 + siblingsDep2 * 28.8 + ((siblingsDep2 - 1) * 12 + 24) + "px";

                        Array.from(siblings).forEach((sib) => {
                            sib.classList.remove("on");
                            sib.style.height = "68px";
                        });
                        li.classList.add("on");
                        li.style.height = siblingsDep2H;
                    });
                });
                document.querySelector(".header_search-btn").addEventListener("click", function () {
                    clearEventMo();
                });
            }
            document.addEventListener("click", function (e) {
                const isInside = Array.from(document.querySelectorAll(".search-reset")).some((reset) => reset.contains(e.target));
                if (!isInside && document.querySelector(".header_search-area").classList.contains("open")) {
                    pubUi.popUp.close(".header_search-area", ".header_search-btn");
                }
            });
        }
        event();
    },
};

$(document).ready(function($) {
    LGEnSol.headerEvent();
    
    
});