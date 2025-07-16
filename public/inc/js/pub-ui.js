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
        this.self.isPc = window.innerWidth >= 1024;
        this.self.isMobile = window.innerWidth <= 1023;

        this.self.tabCategory = document.querySelector(".activeTab");
        this.self.tabLists = document.querySelectorAll(".tab-cate-wrap [role=tablist]");
        
        this.self.selectCate = document.querySelectorAll(".select-cate.activeSelect");
        this.self.selectCateBtn = document.querySelectorAll(".select-cate.activeSelect button");
        this.self.selectMenu = document.querySelectorAll(".activeSelect .select-menu");
        

        // 글로벌 네트워크 
        this.self.networkMap = document.querySelector(".map-conts-area");
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


        if (this.self.networkMap != null && this.self.networkMap != "") {
            const networkMapInfo = this.self.networkMap.querySelector(".map-info");
            const mapInfoItem = networkMapInfo.querySelectorAll(".map-info-item > li > a");
            const mapImg = this.self.networkMap.querySelector(".map-img");
            const mapMarking = this.self.networkMap.querySelector(".map-img .active_img .active_mark");
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
                    // mapImg.classList.add("on");
                    // mapMarking.style.display = "block";

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
                // mapImg.classList.remove("on");
                // mapMarking.style.display = "none";
                mapInfoItem.forEach((item) => {
                    item.classList.remove("active");
                });
            });
        }
    },

    // sticky 대상 sticky 상태일경우, stuck 클래스를 통한 css 제어 처리 - S    
    exceptionStickyEvt: function () {    
        if (document.querySelector(".wrap")) {
            document.querySelector(".wrap").addEventListener("scroll", (e) => {
                const offsetTop = document.querySelector(".wrap").scrollTop;
                const stickyEl = document.querySelector(".page-map-wrap");

                if (!stickyEl) return;

                // pc일때만 적용
                if (pubUi.self.isPc) {
                    if (offsetTop > 400) {
                        stickyEl.classList.add("stuck");
                    } else {
                        stickyEl.classList.remove("stuck");
                    }
                }
            });
        }
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
                const tabs = tabList.querySelectorAll("li");
            
                tabs.forEach((tab) => {
                    tab.addEventListener("click", function () {
                        const id = this.getAttribute("id");
                        const tabWrap = tabList.closest(".tab-wrap");
                        const contents = tabWrap.querySelectorAll(".tab-content-box > .tab-content");
            
                        // 1. 현재 탭 카테고리 탭들 초기화
                        tabs.forEach((t) => {
                            t.classList.remove("on");
                            t.querySelector("button").setAttribute("aria-selected", false);
                        });
            
                        contents.forEach((c) => {
                            c.classList.remove("on");
                            c.setAttribute("aria-expanded", false);
                        });
            
                        // 2. 현재 클릭한 탭 활성화
                        tab.classList.add("on");
                        tab.querySelector("button").setAttribute("aria-selected", true);
            
                        const content = tabWrap.querySelector(`#${id}-content`);
                        if (content) {
                            content.classList.add("on");
                            content.setAttribute("aria-expanded", true);
                        }
            
                        // 3. 만약 하위 탭이 있다면, 첫 번째 하위 탭도 초기화 처리
                        const verticalTab = content?.querySelector(".tab-wrap.vertical");
                        if (verticalTab) {
                            const verticalTabs = verticalTab.querySelectorAll(".tab-category > li");
                            const verticalContents = verticalTab.querySelectorAll(".tab-content-box > .tab-content");
            
                            verticalTabs.forEach((vt) => {
                                vt.classList.remove("on");
                                vt.querySelector("button").setAttribute("aria-selected", false);
                            });
            
                            verticalContents.forEach((vc) => {
                                vc.classList.remove("on");
                                vc.setAttribute("aria-expanded", false);
                            });
            
                            // 첫 번째 하위 탭 on 처리
                            const firstVerticalTab = verticalTabs[0];
                            const firstVerticalContentId = firstVerticalTab.getAttribute("id") + "-content";
                            firstVerticalTab.classList.add("on");
                            firstVerticalTab.querySelector("button").setAttribute("aria-selected", true);
            
                            const firstVerticalContent = verticalTab.querySelector(`#${firstVerticalContentId}`);
                            if (firstVerticalContent) {
                                firstVerticalContent.classList.add("on");
                                firstVerticalContent.setAttribute("aria-expanded", true);
                            }
                        }
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
            $(document).on("click", ".acdItem .acd-btn", function (e) {
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
