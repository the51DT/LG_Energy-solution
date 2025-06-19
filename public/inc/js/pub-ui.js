
// pubUi
var pubUi = {
    init: function () {
        pubUi.settings();
        pubUi.bindEvents();
        // pubUi.exceptionStickyEvt();
        pubUi.scrollToEvt();
        pubUi.chkFileboxDisabled();
        pubUi.fileboxInputEvt();

        form.init();
        tabList.init();
        acdItem.init();
    },
    settings: function(){
        self = this;
        self.tabCategory = document.querySelector(".tab-category");
        self.mobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);        
        self.isPc = window.innerWidth >= 1440;
        self.isMobile = window.innerWidth <= 768;

        self.tabLists = document.querySelectorAll(".tab-wrap [role=tablist]");

        self.selectMenu = document.querySelectorAll(".select-menu");
        self.selectCate = document.querySelectorAll(".select-cate");
        self.selectCateBtn = document.querySelectorAll(".select-cate button");        

    },
    // bindEvents - 클릭이벤트 등 이벤트 핸들링 관련 함수
    bindEvents: function () {        
        self.selectCateBtn.forEach((targetBtn) => {
            targetBtn.addEventListener("click", function (e) {
                const currentTarget = e.currentTarget;

                // 클릭한 타겟 selectbox 이외 다른 selectbox 모두 숨기기
                self.selectCateBtn.forEach(otherTargetBtn => {
                    if(otherTargetBtn != currentTarget) {
                        otherTargetBtn.classList.remove("active");
                        otherTargetBtn.closest(".select-cate").querySelector(".select-menu").classList.remove("on");
                    }
                })
                
                if (targetBtn.closest(".select-cate").querySelector(".select-menu").classList.contains("on")) {
                    targetBtn.closest(".select-cate").querySelector(".select-menu").classList.remove("on");
                    targetBtn.classList.remove("active");
                } else {
                    targetBtn.closest(".select-cate").querySelector(".select-menu").classList.add("on");
                    targetBtn.classList.add("active");
                }                
            });
        });        

        self.selectMenu.forEach((map) => {
            const pageMapCate = map.querySelectorAll("li > a");
            pageMapCate.forEach((subCate) => {
                subCate.addEventListener("click", function (e) {
                    pageMapCate.forEach((otherBox) => {
                        if (otherBox !== e.currentTarget) {
                            otherBox.classList.remove("active");
                        }
                    });
                    const subCateName = subCate.innerText;
                    map.closest(".select-cate").querySelector("button").innerText = subCateName;
                    map.closest(".select-cate").querySelector("button").classList.add("on");
                    map.classList.remove("on");
                    subCate.classList.add("active");
                });
            });
        });
    },    
    // sticky 대상 sticky 상태일경우, stuck 클래스를 통한 css 제어 처리 - S
    // sticky 붙었을경우 예외처리 클래스, 처리하려는 sticky 대상의 css의 top값이 꼭 -1px 이어야 해당 스크립트 적용됨
    exceptionStickyEvt: function () {
        const stickyEl = document.querySelector(".select-menu-wrap");
        const observer = new IntersectionObserver(([e]) => e.target.classList.toggle("stuck", e.intersectionRatio < 1), {
            threshold: [1],
        });
        observer.observe(stickyEl);
    },
    scrollToEvt: function (targetId) {
        if (targetId !== undefined && targetId != null) {
            const targetContent = document.querySelector(targetId);
            const targetOffsetY = targetContent.offsetTop;
            const pageMapHeight = document.querySelector(".select-menu-wrap").clientHeight;
            const contentHeadHeight = document.querySelector(".content-area-head-tab").clientHeight;
            const totalHeadHeight = pageMapHeight + contentHeadHeight;

            document.querySelector("html > body").scrollTo({ top: targetOffsetY - totalHeadHeight, behavior: "smooth" });
        }
    },
    chkFileboxDisabled: function() {
        const filebox = document.querySelectorAll(".filebox");

        filebox.forEach((box, index) => {
            const fileUploadName = box.querySelector(".upload-name");
            const fileAttachBtn = box.querySelector("input[type=file]");
            const fileInputMsg = box.querySelector(".input-info");
            if(fileUploadName.disabled == true) {
                fileAttachBtn.classList.add("disabled");
                fileInputMsg.classList.add("disabled");
                fileAttachBtn.setAttribute("disabled", true);
            } else {
                fileAttachBtn.classList.remove("disabled");
                fileInputMsg.classList.remove("disabled");
                fileAttachBtn.removeAttribute("disabled");
            }

        })

    },
    fileboxInputEvt: function() {
        // 파일 첨부 input 이벤트 리스너
        // 파일 첨부 input의 change 이벤트를 감지하여 파일 이름을 표시
        const fileInputs = document.querySelectorAll("input[type=file]");
        const uploadName = document.querySelectorAll(".upload-name");

        fileInputs.forEach(function (fileInput) {
            
            // fileInput.addEventListener("click", function (e) {
            //     if(fileInput.classList.contains("disabled")) {
            //         e.preventDefault();
            //     }
            // });
            fileInput.addEventListener("change", function (e) {
                const fileName = this.files[0]?.name || "파일첨부 (선택)";
                e.target.closest(".input-wrap").querySelector(".upload-name").value = fileName;
                e.target.closest(".input-wrap").querySelector(".upload-name").setAttribute("readonly", true);
            });            
        });

        // 파일 첨부 input을 클릭할 수 있는 label 요소에 이벤트 리스너 추가
        // label 요소를 클릭하면 해당 input[type=file]을 클릭하도록 설정
        uploadName.forEach((name) => {
            name.addEventListener("click", function () {
                const fileInput = this.closest(".input-wrap").querySelector("input[type=file]");
                if (fileInput) {
                    fileInput.click();
                }
            });
        });
    },
};
var form = {
    init: function () {
        form.bindEvents();
    },
    bindEvents: function () {
        $(document).on("keydown keyup input", ".textarea-box .textarea", function (e) {
            //12.19 수정 :: textarea 입력 폼 로직 변경으로 js 수정 : 입력시 역카운트처리
            var target = e.currentTarget;
            var textareaBox = target.closest(".textarea-box");
            var textLength = target.value.length;
            var maxLength = document.querySelector(".textarea-box .textarea").getAttribute("maxlength");

            // err케이스일 때 예외처리, 입력시 카운트 노출, (개발 처리 필요할 것으로 판단되어 주석처리함)
            // if (textareaBox.closest(".wrap-form-input").classList.contains("err")) {
            //     textareaBox.querySelector(".textarea-bot").style.display = "none";
            //     textareaBox.querySelector(".byte-check").style.display = "block";
            //     if (textareaBox.querySelector(".byte-check .count").innerText == "1000") {
            //         textareaBox.querySelector(".textarea-bot").style.display = "block";
            //         textareaBox.querySelector(".byte-check").style.display = "none";
            //     }
            // }

            if (textLength) {
                textareaBox.classList.add("on");
            } else {
                textareaBox.classList.remove("on");
            }

            // 숫자 카운트 역카운트 처리 원할시 (입력가능한 글자수 카운트되도록 노출시키고 싶을 경우)
            // 글자 수 체크간 0 보다 작은 경우 -1 이 나오는 오류 수정
            // var textLengthCount = maxLength - textLength;
            // textLengthCount = textLengthCount < 0 ? 0 : textLengthCount;
            // //textarea 글자수 full 일 경우, count 컬러 변경(디자인 변경에 따른 스크립트 수정)
            // if (textareaBox.querySelector(".byte-check .count").innerText == "0") {
            //     textareaBox.classList.remove("on");
            // }
            

            // 숫자 카운트 기본 처리 원할시 (입력한 글자수가 카운트되도록 노출시키고 싶을 경우)
            var textLengthCount = textLength;
            textLengthCount = textLength > 1000 ? 1000 : textLengthCount;
            //textarea 글자수 full 일 경우, count 컬러 변경(디자인 변경에 따른 스크립트 수정)
            if (textareaBox.querySelector(".byte-check .count").innerText == "1000") {
                textareaBox.classList.remove("on");
            }

            textareaBox.querySelector(".byte-check .count").innerText = textLengthCount;

            if (textareaBox.classList.contains("ty02")) form.textareaResize(this);
        });
    },
    textareaResize: function (obj) {
        console.log(obj)
        obj.style.height = "auto";
        obj.style.height = obj.scrollHeight + 2 + "px";
    },
};


// pop_layer
var popUp = {
    open: function (pop, btn) {
        //$('body').removeClass('scroll');
        document.querySelector("body").classList.add("noScroll");

        if (document.querySelector(".modal_pop.open").length) {
            var _zindex = parseInt(document.querySelector(pop).style.zIndex);
            var _length = document.querySelector(".modal_pop.open").length;

            document.querySelector(pop).style.zIndex = _zindex + _length;
        }

        document.querySelector(pop).prepend('<div class="pop_s" tabindex="0"></div>');
        document.querySelector(pop).append('<div class="pop_e" tabindex="0"></div>');
        document.querySelector(pop).querySelector(".pop_wrap").setAttribute("tabindex", "0");

        document.querySelector(pop).classList.add("open");

        document
            .querySelector(pop)
            .querySelector(".pop_s, .pop_e")
            .addEventListener("focus", function () {
                document.querySelector(pop).querySelector(".pop_wrap").focus();
            });

        document
            .querySelector(pop)
            .querySelector("[data-action=close]")
            .on("click", function () {
                popUp.close(pop, btn);
            });

        popUp.scroll(pop);
        // pubUi.setMetaViewport(pop);
    },
    close: function (pop, btn) {
        //12.01 추가
        const btnText = document.querySelector(pop).querySelector("[data-action=close]").text();
        if (btnText) {
            localStorage.setItem("btnTxt", btnText);
        }

        document.querySelector(pop).classList.remove("open");

        document.querySelector(pop).removeAttribute("style");
        document.querySelector(pop).querySelector(".pop_s, .pop_e").remove();
        document.querySelector(pop).querySelector(".pop_wrap").removeAttribute("tabindex");

        if (document.querySelector(".modal_pop.open").length < 1) {
            document.querySelector("body").classList.remove("noScroll");
            //$('body').addClass('scroll');
        }

        document.querySelector(btn).focus();
    },
    scroll: function (pop) {
        var _scroll = document.querySelector(pop).querySelector(".pop_content").scrollTop;

        if (1 < _scroll) {
            document.querySelector(pop).querySelector(".pop_wrap").classList.add("scroll");
        } else {
            document.querySelector(pop).querySelector(".pop_wrap").classList.remove("scroll");
        }

        document
            .querySelector(pop)
            .querySelector(".pop_content")
            .addEventListener("scroll", function () {
                var _scroll = document.querySelector(pop).querySelector(".pop_content").scrollTop;

                if (1 < _scroll) {
                    document.querySelector(pop).querySelector(".pop_wrap").classList.add("scroll");
                } else {
                    document.querySelector(pop).querySelector(".pop_wrap").classList.remove("scroll");
                }
            });
    },
};

// tab
var tabList = {
    init: function () {
        tabList.tab();        
    },
    // 탭카테고리 제어 이벤트
    tab: function () {                
        Array.from(self.tabLists).forEach(function (tabList, index) {
            const tabCategory = tabList.querySelectorAll(".tab-category > li");
            tabCategory.forEach((tab, idx) => {
                tab.addEventListener("click", function (e) {
                    const target = e.currentTarget;
                    const targetId = target.getAttribute("id");
                    const tabContent = tabList.closest(".tab-wrap").querySelectorAll(".tab-content-box > .tab-content");``                    

                    tabCategory.forEach((otherTab) => {
                        if (otherTab !== target) {
                            otherTab.classList.remove("on");
                            otherTab.querySelector("button").setAttribute("aria-selected", false);
                        }
                    });
                    tabContent.forEach((tabCont) => {
                        tabCont.classList.remove("on");
                        tabCont.setAttribute("aria-expanded", false);
                    });

                    document.querySelector(`#${targetId}`).classList.add("on");
                    document.querySelector(`#${targetId} > button`).setAttribute("aria-selected", true);
                    document.querySelector(`#${targetId}-content`).classList.add("on");                    
                    document.querySelector(`#${targetId}-content`).setAttribute("aria-expanded", true);
                });
            });
        });
    },
    scroll: function () {
        Array.from(self.tabLists).forEach(function (tabList, index) {
            // mobile일 경우, scroll 클래스 추가하여 탭 스크롤 방식으로 변경
            if (self.isMobile) {
                tabList.classList.add("scroll");
            } else {
                tabList.classList.remove("scroll");
            }
        });
    },
};

// accordion
var acdItem = {
    init: function () {
        acdItem.tab();
    },
    tab: function () {
        $(document).on("click", ".acdItem [aria-expanded]", function (e) {
            e.preventDefault();
            var _this = $(this);
            var _thisItem = _this.closest(".acdItem");

            if (_this.attr("aria-expanded") == "true") {
                _this.attr("aria-expanded", false);
                _thisItem.find("[role=region]").slideUp();
                _thisItem.removeClass("on");
            } else {
                _this.attr("aria-expanded", true);
                _thisItem.find("[role=region]").slideDown();
                _thisItem.addClass("on");

                if (_thisItem.hasClass("tog")) {
                } else {
                    _thisItem.siblings(".acdItem:not(.tog)").find("[aria-expanded]").attr("aria-expanded", false);
                    _thisItem.siblings(".acdItem:not(.tog)").find("[role=region]").slideUp();
                    _thisItem.siblings(".acdItem:not(.tog)").removeClass("on");
                }
            }
        });
    },
};


(function () {
    setTimeout(function () {
        pubUi.init();
    }, 1000);

    // 리사이즈 대응
    window.addEventListener("resize", () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            tabList.scroll();
        }, 500);
    });
})();
