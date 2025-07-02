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
    },

    settings: function () {
        this.self = {};
        this.self.mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        this.self.isPc = window.innerWidth >= 1440;
        this.self.isMobile = window.innerWidth <= 768;

        this.self.tabCategory = document.querySelector(".tab-category");
        this.self.tabLists = document.querySelectorAll(".tab-cate-wrap [role=tablist]");
        this.self.selectMenu = document.querySelectorAll(".select-menu");
        this.self.selectCate = document.querySelectorAll(".select-cate");
        this.self.selectCateBtn = document.querySelectorAll(".select-cate button");
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
                    button.innerText = subCateName;
                    button.classList.add("on");
                    button.classList.remove("active");
                    map.classList.remove("on");
                });
            });
        });
    },

    // sticky 대상 sticky 상태일경우, stuck 클래스를 통한 css 제어 처리 - S
    // sticky 붙었을경우 예외처리 클래스, 처리하려는 sticky 대상의 css의 top값이 꼭 -1px 이어야 해당 스크립트 적용됨 : top -1px로 할수없어서 로직 변경필요함 (수정필요)
    exceptionStickyEvt: function () {
        const stickyEl = document.querySelector(".page-map-wrap");
        const observer = new IntersectionObserver(([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1), {
            threshold: [1],
        });
        
        observer.observe(stickyEl);

        
    },

    scrollToEvt: function (targetId) {
        if (targetId) {
            const targetContent = document.querySelector(targetId);
            const offsetTop = targetContent.offsetTop;
            const totalHeight = document.querySelector(".select-menu-wrap").clientHeight + document.querySelector(".content-area-head-tab").clientHeight;
            document.querySelector("html, body").scrollTo({ top: offsetTop - totalHeight, behavior: "smooth" });
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
                const tabs = tabList.querySelectorAll(".tab-category > li");
                tabs.forEach((tab) => {
                    tab.addEventListener("click", function () {
                        const id = this.getAttribute("id");
                        const contents = tabList.closest(".tab-wrap").querySelectorAll(".tab-content-box > .tab-content");

                        tabs.forEach((t) => {
                            t.classList.remove("on");
                            t.querySelector("button").setAttribute("aria-selected", false);
                        });
                        contents.forEach((c) => {
                            c.classList.remove("on");
                            c.setAttribute("aria-expanded", false);
                        });

                        document.querySelector(`#${id}`).classList.add("on");
                        document.querySelector(`#${id} > button`).setAttribute("aria-selected", true);
                        document.querySelector(`#${id}-content`).classList.add("on");
                        document.querySelector(`#${id}-content`).setAttribute("aria-expanded", true);
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
            $(document).on("click", ".acdItem [aria-expanded]", function (e) {
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
        });
    });     
})();
