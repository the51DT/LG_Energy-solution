

var pubUi = {
    self: {},
    _boundSelects: new WeakSet(), // select-cate 엘리먼트 바운드 여부 체크
    init: function () {
        this.settings();
        this.bindEvents();
        this.chkFileboxDisabled();
        this.fileboxInputEvt();
        this.exceptionStickyEvt();

        this.form.init();
        this.tabList.init();
        this.acdItem.init();
        this.swiperUi.init();
        this.calendarUi.init();

        this.evtScheduleLeft();
        this.historyMotionEvt();
        this.historyViewEvt();
        this.mobileDeviceChk();
        this.setScrollWidth();
        this.requestInquiry();

        this.scrollWrapEvt();
        this.sideStickyEvt();
        this.selectboxCtrlEvt();
    },

    settings: function () {
        this.self = {};
        this.self.mobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
        this.self.isPc = window.innerWidth >= 1280;
        this.self.isMobile = window.innerWidth <= 1279;

        this.self.tabCategory = document.querySelector(".activeTab");
        this.self.tabLists = document.querySelectorAll(".tab-cate-wrap [role=tablist]");
        this.self.tabListsNotList = document.querySelectorAll(".tab-cate-wrap :not([role=tablist]) > li"); // tablist케이스 아닌 경우, 예외처리하기 위한 변수(서비스_모바일)
        
        this.self.tabListsMo = document.querySelectorAll(".mo-only .tab-cate-wrap.new [role=tablist]");

        this.self.breadCrumbCate = document.querySelectorAll(".page-map-wrap .select-cate.activeSelect .select-menu.caseTab li > a");
        this.self.selectCate = document.querySelectorAll(".select-cate.activeSelect");
        this.self.selectCateBtn = document.querySelectorAll(".activeSelect button");
        this.self.selectMenu = document.querySelectorAll(".activeSelect .select-menu");
        this.self.selectMenuTab = document.querySelectorAll(".select-menu.caseTab");

        /* side-sticky 관련 */
        this.self.sideSticky = document.querySelectorAll(".side-sticky .side-list li > a");
        this.self.sideStickyTitle = document.querySelector(".sticky-area-tit");
        this.self.sideStickyInnerTabBtn = document.querySelectorAll(".sticky-area-tit .tab-cate-wrap .tab-category.activeTab > li > button");

        /* content-item */
        this.self.pcOnly = document.querySelector(".pc-only");
        this.self.moOnly = document.querySelector(".mo-only");
        this.self.wrap = document.querySelector(".wrap");
        this.self.contentItem = document.querySelectorAll("[class^=content-item]");

        /* search */
        this.self.searchResult = document.querySelectorAll(".searchEvt");

        /* marquee (롤링배너) */
        this.self.track = document.querySelector(".banner-track");
    },

    bindEvents: function () {
        // 바깥 클릭 시 모든 메뉴 닫기
        document.addEventListener("click", (e) => {
            this.self.selectCateBtn.forEach((btn) => {
                const cate = btn.closest(".select-cate");
                const menu = cate.querySelector(".select-menu");

                btn.classList.remove("active");
                menu.classList.remove("on");
            });
        });

        // search input deleteBtn이벤트 관련 script
        if (!this.self.searchResult) {
            return;
        } else {
            pubUi.searchTextDelEvt(this.self.searchResult);
        }

        // marquee 컴포넌트(롤링배너) 관련 script
        if (!this.self.track) {
            return;
        } else {
            const items = Array.from(this.self.track.querySelectorAll(".banner-item"));
            // 기존 아이템 복제
            items.forEach((item) => {
                const clone = item.cloneNode(true);
                this.self.track.appendChild(clone);
            });

            // 터치 시작 시 애니메이션 멈춤
            this.self.track.addEventListener("touchstart", () => {
                this.self.track.style.animationPlayState = "paused";
            });

            // 터치 끝나면 다시 재생
            this.self.track.addEventListener("touchend", () => {
                this.self.track.style.animationPlayState = "running";
            });
        }
    },
    selectboxCtrlEvt: function (selectorOrEl) {
        // 헬퍼: 개별 select-cate에 바인딩
        const bindOne = (root) => {
            if (!root || this._boundSelects.has(root)) return; // 중복 방지
            // console.log("root : " , root)
            const targetBtn = root.querySelector("button");
            const targetMenu = root.querySelector(".select-menu");

            if (targetBtn) {
                targetBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const currentSelectCate = e.currentTarget.closest(".select-cate");
                    if (currentSelectCate.classList.contains("disabled")) return;

                    // 모든 select-cate 닫기
                    this.self.selectCateBtn.forEach((otherTargetBtn) => {
                        const otherCate = otherTargetBtn.closest(".select-cate");
                        otherTargetBtn.classList.remove("active");
                        if (otherCate) otherCate.querySelector(".select-menu")?.classList.remove("on");
                    });

                    // 현재 것만 열기
                    const menu = currentSelectCate.querySelector(".select-menu");
                    if (menu) {
                        e.currentTarget.classList.add("active");
                        menu.classList.add("on");
                    }

                    // console.log("targetBtn : ", targetBtn);
                });
            }

            if (targetMenu) {
                const pageMapCate = targetMenu.querySelectorAll("li > a");
                pageMapCate.forEach((subCate) => {
                    subCate.addEventListener("click", (e) => {
                        e.stopPropagation();
                        if (targetMenu.classList.contains("caseTab")) {
                            pubUi.selectMenuClickEvt("tab", pageMapCate, targetMenu, subCate);
                        } else {
                            pubUi.selectMenuClickEvt("default", pageMapCate, targetMenu, subCate);
                        }
                        // 선택 후 닫기
                        const parentCate = targetMenu.closest(".select-cate");
                        parentCate?.querySelector(".btn-select")?.classList.remove("active");
                        targetMenu.classList.remove("on");
                    });
                });
            }

            // 바인딩 완료 표시
            this._boundSelects.add(root);
        };

        // 외부에서 특정 id/엘리먼트로 호출한 경우
        if (selectorOrEl) {
            const el = typeof selectorOrEl === "string" ? document.querySelector(selectorOrEl) : selectorOrEl;
            // 최신 버튼/메뉴 목록 갱신(닫기 루틴에서 쓰임)
            this.self.selectCateBtn = document.querySelectorAll(".activeSelect button");
            bindOne(el);
            return; // 여기서 끝
        }

        // 파라미터 없으면: 기존처럼 전체 바인딩
        this.self.selectCateBtn = document.querySelectorAll(".activeSelect button");
        this.self.selectCateBtn.forEach((btn) => {
            const root = btn.closest(".select-cate");
            bindOne(root);
        });

        // 메뉴 클릭(global)
        this.self.selectMenu.forEach((map) => {
            const root = map.closest(".select-cate");
            bindOne(root); // 개별 헬퍼가 메뉴 클릭도 처리하므로 재사용
        });
    },
    scrollWrapEvt: function () {
        // .wrap scroll
        if (!this.self.wrap) {
            return;
        } else {
            this.self.wrap.addEventListener("scroll", function (e) {
                const wrap = e.currentTarget || e.target;
                const aside = document.querySelector(".wrap aside");
                const targetContentItem = wrap.querySelectorAll("[class^='content-item']");
                const nowScroll = wrap.scrollTop;
                const page_h = window.innerHeight * 0.3;

                // aside 표시/숨김
                if (nowScroll > page_h) {
                    if (aside && aside.style.display !== "block") pubUi.fadeIn(aside, 500);
                } else {
                    if (aside) aside.style.display = "none";
                }

                // 클릭 핸들러는 스크롤마다 다시 달지 말고 한 번만!
                if (aside && !aside.dataset.bound) {
                    aside.addEventListener("click", () => {
                        wrap.scrollTo({ top: 0, behavior: "smooth" });
                        document.querySelector(".wrap").style.overflow = "auto";
                    });
                    aside.dataset.bound = "1";
                }

                if (!targetContentItem) return;

                targetContentItem.forEach((item) => {
                    const isMobile = document.querySelector(".wrap").classList.contains("mobile");
                    const itemTop = item.offsetTop - (isMobile ? 152 : 600);
                    const itemHeight = item.clientHeight;
                    const itemBottom = itemTop + itemHeight;
                    const targetSideSticky = wrap.querySelector(".side-sticky");

                    if (nowScroll >= itemTop && nowScroll < itemBottom) {
                        item.classList.add("active");

                        if (targetSideSticky) {
                            const itemId = item.id;

                            // 1) 기존 active 제거(한 번만)
                            targetSideSticky.querySelectorAll(".side-list a.active").forEach((a) => a.classList.remove("active"));

                            // 2) 현재 섹션의 앵커만 active
                            if (itemId) {
                                // CSS.escape로 특수문자 id 안전 처리
                                const link = targetSideSticky.querySelector(`.side-list a[href="#${CSS.escape(itemId)}"]`);
                                if (link) {
                                    link.classList.add("active");
                                }
                                // link가 없으면 마크업(href="#섹션ID")을 점검하세요.
                            }
                        }

                        // 다크 배경 처리
                        if (item.dataset.bgtype === "dark") {
                            item.style.color = "#fff";
                            targetSideSticky && targetSideSticky.classList.add("white");
                        } else {
                            targetSideSticky && targetSideSticky.classList.remove("white");
                        }
                    } else {
                        // 필요시 비활성화 로직
                        // item.classList.remove("active");
                    }
                });
            });
        }
    },
    searchTextDelEvt: function (el) {
        el.forEach((searchR) => {
            let searchInput = searchR.querySelector("input");
            let searchDelBtn = searchR.querySelector(".btn-delete");

            searchInput.addEventListener("input", function () {
                if (searchInput.value != "") {
                    if (searchDelBtn.classList.contains("btn-search-reset")) {
                        searchDelBtn.style.display = "flex";
                    } else {
                        searchDelBtn.style.display = "block";
                    }
                } else {
                    searchDelBtn.style.display = "none";
                }
            });

            searchDelBtn.addEventListener("click", function () {
                if (searchInput.value != "") {
                    searchInput.value = "";
                    searchDelBtn.style.display = "none";
                }
            });
        });
    },
    selectMenuClickEvt: function (type, pageMapCate, map, subCate) {
        if (type == "default") {
            // console.log("default click event");

            pageMapCate.forEach((otherBox) => otherBox.classList.remove("active"));
            subCate.classList.add("active");
            const subCateName = subCate.innerText;
            const button = map.closest(".select-cate").querySelector("button");

            if (!subCate.closest(".lang-wrap")) {
                button.innerText = subCateName;
            }
            button.classList.add("on");
            button.classList.remove("active");
            map.classList.remove("on");
        } else if (type === "tab") {
            const subCateName = subCate.innerText;

            if (subCateName == "연혁") {
                pubUi.scrollToEvt(".wrap", "top");
                // document.querySelector(".history-wrap.each-view").style.overflowY = "hidden";
                if (document.querySelector(".history-wrap.each-view")) {
                    document.querySelector(".history-wrap.each-view").removeAttribute("data-scrolling");
                } else {
                    return;
                }
            } else {
                this.self.wrap.style.overflow = "auto";
                pubUi.scrollToEvt(".wrap", "top"); //08.07 수정 page-map-wrap > selectbox 3depth 변경시, 최상단 이동 추가
            }

            // console.log("tab click event");
            pageMapCate.forEach((otherBox) => {
                //selectbox 카테고리 값 초기화
                otherBox.classList.remove("active");
                otherBox.setAttribute("aria-selected", false);
            });
            //선택한 selectbox 카테고리, active & aria-selected true 처리
            subCate.classList.add("active");
            subCate.setAttribute("aria-selected", true);

            const selectedAriaCtrl = subCate.getAttribute("aria-controls");
            const button = map.closest(".select-cate").querySelector("button");

            if (!subCate.closest(".lang-wrap")) {
                button.innerText = subCateName;
            }

            if (selectedAriaCtrl) {
                const tabContent = document.querySelector(`#${selectedAriaCtrl}`);
                // const tabContentMo = document.querySelector(`.mo-only #${selectedAriaCtrl}`);
                const selectedTabName = selectedAriaCtrl.replace("-content", "");
                const selectedTab = document.querySelector(`#${selectedTabName}`);

                // console.log(selectedAriaCtrl, selectedTabName, selectedTab);

                // [pc <-> mobile] selectbox -> tab으로 전환시, 또는 그반대전환시 선택값 active 처리 (08.12 수정 mobile, pc 파일 분리로 인해 불필요해져 주석처리하였음)
                if (tabContent) {
                    // || tabContentMo
                    // 모든 탭 콘텐츠 숨김 처리
                    const allTabContents = map.closest(".content-wrap").querySelectorAll(".content-area .pc-only .tab-content");
                    // const allTabContentsMo = map.closest(".content-wrap").querySelectorAll(".content-area .mo-only .tab-content");
                    allTabContents.forEach((content) => {
                        content.classList.remove("on");
                        content.setAttribute("aria-expanded", false);
                    });
                    // allTabContentsMo.forEach((content) => {
                    //     content.classList.remove("on");
                    //     content.setAttribute("aria-expanded", false);
                    // });
                    // 선택한 탭 콘텐츠 표시
                    tabContent.classList.add("on");
                    tabContent.setAttribute("aria-expanded", true);
                    // tabContentMo.classList.add("on");
                    // tabContentMo.setAttribute("aria-expanded", true);

                    // page-map-wrap selectbox-wrap 탭컨텐츠의 side-list 체크
                    const selectedTabContSideList = tabContent.querySelectorAll(".side-sticky .side-list > li > a");
                    if (selectedTabContSideList) {
                        setTimeout(function () {
                            selectedTabContSideList.forEach((sideList, idx) => {
                                sideList.classList.remove("active");
                                selectedTabContSideList[0].classList.add("active");
                                sideList.closest(".side-sticky").classList.remove("white");
                            });
                        }, 500);
                    }
                }
                // 선택한 selectbox와 맞는 mobile 탭 활성화
                // if (selectedTab) {
                //     const allTabMo = map.closest(".content-wrap").querySelectorAll(".content-area .mo-only .tab-cate-wrap.new .tab-category .tab");
                //     allTabMo.forEach((tabs) => {
                //         tabs.classList.remove("on");
                //         tabs.querySelector("button").setAttribute("aria-selected", false);
                //     });
                //     selectedTab.classList.add("on");
                //     selectedTab.querySelector("button").setAttribute("aria-selected", true);
                // }

                // 선택한 selectbox에 하위 탭이 있다면(data-tab-type='secondTab'), 첫 번째 하위 탭 on 처리
                const secondTab = tabContent?.querySelector("[data-tab-type='secondTab']");
                pubUi.secondTabChk(secondTab);
            }

            button.classList.add("on");
            button.classList.remove("active");
            map.classList.remove("on");
        }
    },
    secondTabChk: function (secondTab, type) {
        if (type === "reset") {
            const secondTabAll = document.querySelectorAll(".tab-wrap[data-tab-type=secondTab]");
            secondTabAll.forEach((secondTab) => {
                const secondTabCategory = secondTab.querySelectorAll(".tab-category > .tab");
                secondTabCategory.forEach((tabs) => {
                    tabs.classList.remove("on");
                });
                secondTabCategory[0].classList.add("on");
            });
        } else {
            if (secondTab) {
                const secondTabs = secondTab.querySelectorAll(".tab-category > li");
                const verticalContents = secondTab.querySelectorAll(".tab-content-box > .tab-content");

                secondTabs.forEach((vt) => {
                    vt.classList.remove("on");
                    vt.querySelector("button").setAttribute("aria-selected", false);
                });

                verticalContents.forEach((vc) => {
                    vc.classList.remove("on");
                    vc.setAttribute("aria-expanded", false);
                });

                // 첫 번째 하위 탭 on 처리
                const firstsecondTab = secondTabs[0];
                const firstVerticalContentId = firstsecondTab.getAttribute("id") + "-content";

                firstsecondTab.classList.add("on");
                firstsecondTab.querySelector("button").setAttribute("aria-selected", true);

                const firstVerticalContent = secondTab.querySelector(`#${firstVerticalContentId}`);
                if (firstVerticalContent) {
                    firstVerticalContent.classList.add("on");
                    firstVerticalContent.setAttribute("aria-expanded", true);
                }
            }
        }
    },
    // fadeIn 함수: 요소를 서서히 나타나게 하는 함수
    fadeIn: function (element, duration) {
        element.style.opacity = 0;
        element.style.display = "block";

        let start = null;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            element.style.opacity = opacity;
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    },
    // IR정보 > IR행사 모바일일경우, 상단 schedule-month 스크롤 중앙 정렬 처리
    evtScheduleLeft: function () {
        // IR행사
        let evtScheduleWrap = document.querySelector(".evt-schedule-wrap");

        if (evtScheduleWrap != null) {
            let evtScheduleMonth = evtScheduleWrap.querySelector(".schedule-month");
            let evtScheduleMonthList = evtScheduleWrap.querySelectorAll(".schedule-month > li");
            evtScheduleMonthList.forEach((month) => {
                if (month.classList.contains("on")) {
                    const monthOffsetLeft = month.offsetLeft / 1.5;
                    evtScheduleMonth.scrollTo({ left: monthOffsetLeft, behavior: "smooth" });
                }
            });
        }
    },

    // sticky 대상 sticky 상태일경우, stuck 클래스를 통한 css 제어 처리 - S
    exceptionStickyEvt: function () {
        if (document.querySelector(".wrap")) {
            document.querySelector(".wrap").addEventListener("scroll", (e) => {
                const offsetTop = document.querySelector(".wrap").scrollTop;
                const stickyEl = document.querySelector(".page-map-wrap");
                const sideStickyTit = document.querySelector(".sticky-area-tit");
                const pageContentTab = document.querySelector(".content-area-head-tab");

                if (!stickyEl) return;

                // pc일때만 적용
                if (pubUi.self.isPc) {
                    if (offsetTop > 400) {
                        stickyEl.classList.add("stuck");
                        if (sideStickyTit) sideStickyTit.style.paddingTop = "7.5rem";
                    } else {
                        stickyEl.classList.remove("stuck");
                        if (sideStickyTit) sideStickyTit.style.paddingTop = "12.5rem";
                    }
                }
            });
        }
    },
    //scrollToEvt 파라미터 인자정보
    //scrollToEvt("대상엘리멘트(target)", "스크롤타입(type)", "값(value)")
    //페이지에서 사용하는 scrolToEvt 예외적으로 적용 원할 시, 파라미터 전달값 기본방식과 다르게 전달주어야함
    // ex) 예외처리시 - scrollToEvt(targetElement, "page(type)", "처리하려는 페이지정보(value)")
    scrollToEvt: function (target, type, value) {
        // value 파라미터 빈값이거나, undefined일때 0으로 초기화
        if (value == "" || value == undefined) {
            value = 0;
        }

        if (type === "left") {
            // 가로 스크롤 이동 type
            document.querySelector(target).scrollTo({ left: value, behavior: "smooth" });
        } else if (type === "top") {
            //세로 스크롤 이동 type
            document.querySelector(target).scrollTo({ top: value, behavior: "smooth" });
        } else if (type === "page") {
            // page별 예외처리 필요할 경우
            switch (value) {
                // history 연혁 페이지
                case "history":
                    if (target) {
                        const targetContent = document.querySelector(target);
                        const targetOffsetY = targetContent.offsetTop;
                        const headerHeight = document.querySelector(".header-area").clientHeight;
                        let pageMapHeight = "";
                        let contentHeadHeight = "";
                        let totalHeadHeightMobile = "";

                        if (document.querySelector(".wrap").classList.contains("pc")) {
                            //pc
                            pageMapHeight = document.querySelector(".page-map-wrap").clientHeight;
                        } else if (document.querySelector(".wrap").classList.contains("mobile")) {
                            //mobile
                            contentHeadHeight = document.querySelector(".content-area-head-tab").clientHeight;
                            totalHeadHeightMobile = headerHeight + contentHeadHeight;
                        }

                        // console.log(targetOffsetY, pageMapHeight, totalHeadHeightMobile);

                        if (document.querySelector(".wrap").classList.contains("mobile")) {
                            document.querySelector(".wrap").scrollTo({ top: targetOffsetY - totalHeadHeightMobile, behavior: "smooth" });
                        } else {
                            document.querySelector(".wrap").scrollTo({ top: targetOffsetY - pageMapHeight, behavior: "smooth" });
                        }
                    }
                    break;
                case "vision":
                    //회사소개 > 비전 페이지 예외처리
                    if (target) {
                        const targetContent = document.querySelector(target);
                        const headerHeight = document.querySelector(".header-area").clientHeight;
                        let targetOffsetY = "";
                        let pageMapHeight = "";
                        let contentHeadHeight = "";
                        let totalHeadHeightMobile = "";

                        if (document.querySelector(".wrap").classList.contains("pc")) {
                            //pc
                            pageMapHeight = document.querySelector(".page-map-wrap").clientHeight;
                            targetOffsetY = targetContent.offsetTop - 120;
                        } else {
                            //mobile
                            targetOffsetY = targetContent.offsetTop - 178;
                            contentHeadHeight = document.querySelector(".content-area-head-tab").clientHeight;
                            totalHeadHeightMobile = headerHeight + contentHeadHeight;
                        }

                        // console.log(targetOffsetY, pageMapHeight, totalHeadHeightMobile);

                        if (document.querySelector(".wrap").classList.contains("mobile")) {
                            document.querySelector(".wrap").scrollTo({ top: targetOffsetY - totalHeadHeightMobile, behavior: "smooth" });
                        } else {
                            document.querySelector(".wrap").scrollTo({ top: targetOffsetY - pageMapHeight, behavior: "smooth" });
                        }
                    }
                    break;
                default:
                    if (target) {
                        // console.log(value);
                        const targetContent = document.querySelector(target);
                        const targetOffsetY = targetContent.offsetTop;
                        const headerHeight = document.querySelector(".header-area").clientHeight;
                        let pageMapHeight = "";
                        let contentHeadHeight = "";
                        let totalHeadHeightMobile = "";

                        if (document.querySelector(".wrap").classList.contains("pc")) {
                            //pc
                            pageMapHeight = document.querySelector(".page-map-wrap").clientHeight;
                        } else if (document.querySelector(".wrap").classList.contains("mobile")) {
                            //mobile
                            contentHeadHeight = document.querySelector(".content-area-head-tab").clientHeight;
                            totalHeadHeightMobile = headerHeight + contentHeadHeight;
                        }

                        // console.log(targetOffsetY, pageMapHeight, totalHeadHeightMobile);

                        if (document.querySelector(".wrap").classList.contains("mobile")) {
                            document.querySelector(".wrap").scrollTo({ top: targetOffsetY - totalHeadHeightMobile, behavior: "smooth" });
                        } else {
                            document.querySelector(".wrap").scrollTo({ top: targetOffsetY - pageMapHeight, behavior: "smooth" });
                        }
                    }
                    break;
            }
        } else {
            console.log("type 에러!, type값 확인 필요, 현재 type 값? " + type);
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
    sideStickyEvt: function () {
        //side_sticky 클릭시, 클릭 이벤트
        this.self.sideSticky.forEach((stickyBtn) => {
            stickyBtn.addEventListener("click", () => {
                const targetHref = stickyBtn.getAttribute("href");
                this.self.sideSticky.forEach((otherBtn) => {
                    otherBtn.classList.remove("active");
                });
                //console.log(stickyBtn, targetHref);
                stickyBtn.classList.add("active");
                if (stickyBtn.classList.contains("active")) {
                    if (document.querySelector(targetHref).dataset.bgtype == "dark") {
                        this.self.sideSticky.forEach((btn) => {
                            // console.log("버튼 화이트 클래스 추가");
                            btn.closest(".side-sticky").classList.add("white");
                        });
                    } else {
                        // console.log("버튼 화이트 클래스 제거");
                        stickyBtn.closest(".side-sticky").classList.remove("white");
                    }
                }
            });
        });
    },
    historyMotionEvt: function () {
        // NodeList를 일반 배열로 변환하여 배열 메서드(map, find 등) 사용 가능하도록 처리
        const leftItems = Array.from(document.querySelectorAll(".left-area .year-container .item"));
        const rightItems = Array.from(document.querySelectorAll(".right-area .year-container .item"));
        const yearTermLinks = Array.from(document.querySelectorAll(".year-term-container .year-item-list > a"));
        const historyContArea = document.querySelector(".history-cont-wrap"); // 스크롤 이벤트 타겟 영역

        const yearClickIndex = {}; // 연도 구간별 클릭 인덱스 기억
        let lastClickedRange = null; // 마지막 클릭한 연도 구간
        let isFirstClick = true; // 최초 클릭인지 여부

        // "2000~2018" 형식 문자열 → {start: 2000, end: 2018} 객체로 변환
        function parseYearRange(rangeStr) {
            const [start, end] = rangeStr.split("~").map((s) => parseInt(s.trim(), 10));
            return { start, end };
        }

        // 특정 연도가 주어진 범위 안에 포함되는지 확인
        function isInRange(year, start, end) {
            return year >= start && year <= end;
        }

        // 특정 연도 구간에 해당하는 leftItems 필터링
        function getMatchingItems(rangeStr) {
            const { start, end } = parseYearRange(rangeStr);
            return leftItems.filter((item) => {
                const year = parseInt(item.dataset.year, 10);
                return isInRange(year, start, end);
            });
        }

        // 현재 인덱스 기준 다음 연도 인덱스 찾기
        function findNextGlobalIndex(currentIndex) {
            const next = currentIndex + 1;
            return next < leftItems.length ? next : null;
        }

        // 숫자 카운트 애니메이션 함수 (숫자 증가 + pop 효과)
        function animateNumber(el, target, duration = 800) {
            let start = parseInt(el.innerText, 10);
            if (isNaN(start)) start = 0;
            if (start === target) start = target - 1;

            const frameRate = 1000 / 60;
            const totalFrames = Math.round(duration / frameRate);
            let frame = 0;

            const easeOut = (t) => 1 - Math.pow(1 - t, 3);

            const counter = setInterval(() => {
                frame++;
                const progress = easeOut(frame / totalFrames);
                const current = Math.round(start + (target - start) * progress);
                el.innerText = current.toString().padStart(2, "0");

                if (frame === 1) {
                    el.classList.add("num-pop");
                    setTimeout(() => el.classList.remove("num-pop"), 300);
                }

                if (frame >= totalFrames) {
                    clearInterval(counter);
                    el.innerText = target.toString().padStart(2, "0");
                }
            }, frameRate);
        }

        // 공통 연도 전환 처리 (좌우 영역 + 숫자 애니메이션 + 상태 클래스 제어 포함)
        function activateYearByIndex(index) {
            const left = leftItems[index];
            const right = rightItems[index];

            // right-area item의 bullet 초기화 후 모션 동작후 생성되게하기 위함
            document.querySelector(".right-area .year-item-list").classList.remove("on");
            setTimeout(function () {
                document.querySelector(".right-area .year-item-list").classList.add("on");
            }, 500);

            // 좌우 모든 아이템에서 상태 초기화
            leftItems.forEach((item) => item.classList.remove("active", "prev", "next"));
            rightItems.forEach((item) => {
                item.classList.remove("active", "prev", "next");
                item.style.display = "none";
            });

            // 현재 인덱스 항목 활성화 + 양 옆 prev/next 클래스 추가
            left.classList.add("active");
            right.classList.add("active");

            if (leftItems[index - 1]) leftItems[index - 1].classList.add("prev");
            if (leftItems[index + 1]) leftItems[index + 1].classList.add("next");
            if (rightItems[index - 1]) rightItems[index - 1].classList.add("prev");
            if (rightItems[index + 1]) rightItems[index + 1].classList.add("next");

            // right 영역 표시/숨김 처리
            rightItems.forEach((item) => {
                const show = item.classList.contains("active") || item.classList.contains("prev") || item.classList.contains("next");
                item.style.display = show ? "" : "none";
            });

            // 연도 숫자 처리 (슬라이드 애니메이션)
            const yearText = left.dataset.year;
            const firstSpan = left.closest(".year-item-list").querySelector(".year .first");
            const secondSpan = left.closest(".year-item-list").querySelector(".year .second");

            if (firstSpan && secondSpan) {
                const yearFirst = parseInt(yearText.slice(0, 2), 10);
                const yearSecond = parseInt(yearText.slice(2, 4), 10);

                const currentFirst = parseInt(firstSpan.innerText, 10);
                const currentSecond = parseInt(secondSpan.innerText, 10);

                if (currentFirst !== yearFirst) {
                    animateNumber(firstSpan, yearFirst);
                    setTimeout(() => {
                        if (currentSecond !== yearSecond) {
                            animateNumber(secondSpan, yearSecond);
                        }
                    }, 300);
                } else if (currentSecond !== yearSecond) {
                    animateNumber(secondSpan, yearSecond);
                }
            }

            // 연도 구간 탭(on) 처리
            const activeYear = parseInt(left.dataset.year, 10);
            yearTermLinks.forEach((link) => {
                const { start, end } = parseYearRange(link.dataset.year);
                const li = link.closest(".year-item-list");
                li.classList.toggle("on", isInRange(activeYear, start, end));
            });
        }

        // 연도 탭 클릭 이벤트 처리
        yearTermLinks.forEach((link) => {
            link.addEventListener("click", function () {
                const rangeStr = this.dataset.year;

                if (lastClickedRange !== rangeStr) {
                    yearClickIndex[rangeStr] = 0;
                    lastClickedRange = rangeStr;
                }

                const matches = getMatchingItems(rangeStr);
                let rangeIdx = yearClickIndex[rangeStr] || 0;

                // 최초 클릭 시 기존 active가 동일하면 다음 인덱스로 강제 이동
                if (isFirstClick && matches.length > 0) {
                    const activeLeft = document.querySelector(".left-area .item.active");
                    const matchLeft = matches[rangeIdx];

                    if (activeLeft === matchLeft) {
                        activeLeft.classList.remove("active");
                        const year = activeLeft.dataset.year;
                        const activeRight = rightItems.find((item) => item.dataset.year === year);
                        if (activeRight) activeRight.classList.remove("active");

                        rangeIdx++;
                        yearClickIndex[rangeStr] = rangeIdx;
                    }

                    isFirstClick = false;
                }

                let globalIndex = null;

                if (rangeIdx < matches.length) {
                    globalIndex = leftItems.findIndex((item) => item === matches[rangeIdx]);
                    yearClickIndex[rangeStr]++;
                } else {
                    const currentActive = document.querySelector(".left-area .item.active");
                    const currentIdx = currentActive ? leftItems.findIndex((item) => item === currentActive) : -1;
                    const nextIdx = findNextGlobalIndex(currentIdx);
                    if (nextIdx !== null) {
                        globalIndex = nextIdx;
                        const nextYear = parseInt(leftItems[nextIdx].dataset.year, 10);
                        const nextRange = yearTermLinks.find((link) => {
                            const { start, end } = parseYearRange(link.dataset.year);
                            return isInRange(nextYear, start, end);
                        });
                        if (nextRange) {
                            lastClickedRange = nextRange.dataset.year;
                            yearClickIndex[lastClickedRange] = getMatchingItems(lastClickedRange).findIndex((item) => parseInt(item.dataset.year, 10) === nextYear) + 1;
                        }
                    }
                }

                if (globalIndex !== null && leftItems[globalIndex]) {
                    activateYearByIndex(globalIndex);
                }
            });
        });

        // to-be mac os 대응
        if (historyContArea) {
            let isHandlingScroll = false;

            // 터치 시작 위치 저장 (iOS 터치 대응용) - ios는 휠이벤트 인식하지못해, touchpad기반이라 다른 이벤트 조건 처리되도록 예외처리 필요하다고하여 소스 수정하였음.
            historyContArea.addEventListener(
                "touchstart",
                (e) => {
                    handleCustomScroll.touchStartY = e.touches[0].clientY;
                },
                { passive: true }
            );

            // 다양한 이벤트 리스너 등록
            ["wheel", "mousewheel", "DOMMouseScroll", "touchmove"].forEach((eventType) => {
                historyContArea.addEventListener(eventType, handleCustomScroll, { passive: false });
            });

            function handleCustomScroll(e) {
                const nowScroll = document.querySelector(".wrap").scrollTop;
                if (isHandlingScroll) return;

                let deltaY = 0;
                if (e.type === "touchmove") {
                    if (typeof handleCustomScroll.touchStartY === "number") {
                        deltaY = handleCustomScroll.touchStartY - e.touches[0].clientY;
                    }
                } else {
                    deltaY = e.deltaY || -e.wheelDelta || e.detail || 0;
                }

                const isScrollingDown = deltaY > 5;
                const isScrollingUp = deltaY < -5;
                if (!isScrollingDown && !isScrollingUp) return;

                isHandlingScroll = true;

                const currentActive = document.querySelector(".left-area .item.active");
                const currentIdx = leftItems.findIndex((item) => item === currentActive);
                const atFirst = currentIdx === 0;
                const atLast = currentIdx === leftItems.length - 1;

                const historyView = document.querySelector(".history-wrap.each-view");
                const historyViewY2 = document.querySelector(".history-tit-wrap").offsetTop;
                const historyViewTop = historyView.offsetTop - 80;

                // ❗ 마지막 연도에서 아래로 스크롤 중이면 강제 스냅 금지
                if (nowScroll < 800 && !(atLast && isScrollingDown)) {
                    pubUi.scrollToEvt(".wrap", "top", historyViewTop);
                }

                // 스크롤방지 체크 변수 & "마지막에서 아래로"는 자연 스크롤 허용 변수
                const allowExternalScroll = (isScrollingDown && atLast) || (isScrollingUp && atFirst);
                const allowExternalScrollNatural = allowExternalScroll || (atLast && isScrollingDown);

                if (!allowExternalScrollNatural) {
                    // 연혁 내부 컨텐츠 안에서만 스크롤 유지
                    e.preventDefault();
                    document.querySelector(".wrap").style.overflow = "hidden";
                    pubUi.scrollToEvt(".wrap", "top", historyViewTop);
                    historyView.setAttribute("data-scrolling", true);
                } else {
                    // 외부 스크롤 허용 (.wrap 영역 스크롤)
                    historyView.removeAttribute("data-scrolling");
                    document.querySelector(".wrap").style.overflow = "auto";

                    if (isScrollingUp) {
                        // 맨 위로 빠져나갈 때 기존 동작 유지
                        pubUi.scrollToEvt(".wrap", "top", 0);
                        activateYearByIndex(0);
                    } else if (atLast && isScrollingDown) {
                        // ✨ 마지막 → 아래로: 아무 것도 강제 스크롤하지 않음 (자연 스크롤)
                        // 마지막 연도 유지
                        activateYearByIndex(leftItems.length - 1);
                    } else if (atLast) {
                        // 기존 else 분기 보완: 마지막에서 위/아래 아닌 기타 케이스 방어
                        // (필요 시 유지/삭제)
                        pubUi.scrollToEvt(".wrap", "top", historyViewY2);
                    }
                }

                // 연도 전환
                const nextIdx = isScrollingDown ? Math.min(currentIdx + 1, leftItems.length - 1) : Math.max(currentIdx - 1, 0);

                if (nextIdx !== currentIdx) {
                    activateYearByIndex(nextIdx);
                }

                // ✅ debounce 해제 (500ms 후)
                setTimeout(() => {
                    isHandlingScroll = false;
                }, 500);
            }
        }
    },
    //모바일 체크함수 추가
    mobileDeviceChk: function () {
        if (!this.self.wrap) {
            return;
        } else {
            if (this.self.isMobile || this.self.mobileDevice) {
                if (this.self.wrap.classList.contains("pc")) {
                    this.self.wrap.classList.remove("pc");
                    pubUi.secondTabChk("", "reset"); //리사이징&페이지 pc,mo전환일 경우 세컨드탭 초기화하기 위해 해당 함수 추가
                }
                this.self.wrap.classList.add("mobile");
            } else {
                if (this.self.wrap.classList.contains("mobile")) {
                    this.self.wrap.classList.remove("mobile");
                    pubUi.secondTabChk("", "reset"); //리사이징&페이지 pc,mo전환일 경우 세컨드탭 초기화하기 위해 해당 함수 추가
                }
                this.self.wrap.classList.add("pc");
            }
        }
    },
    historyViewEvt: function () {
        if (!document.querySelector(".history-wrap")) {
            return;
        } else {
            if (document.querySelector(".history-wrap") != null) {
                const allView = document.querySelector("#allView");
                const eachView = document.querySelector("#eachView");
                const showAllBtn = document.querySelector("button[onclick*='#allView']");
                const backToEachBtn = document.querySelector("button[onclick*='#eachView']");

                // 한눈에 보기 클릭 시 팝업 표시
                if (showAllBtn) {
                    showAllBtn.addEventListener("click", () => {
                        allView.classList.add("active");
                        eachView.style.display = "none";
                    });
                }

                if (backToEachBtn) {
                    // 하나씩 보기 클릭 시 팝업 숨기기
                    backToEachBtn.addEventListener("click", () => {
                        // console.log("eachView")
                        allView.classList.remove("active");
                        setTimeout(() => {
                            eachView.style.display = "block";
                        }, 400); // transition 시간만큼 기다림

                        setTimeout(function () {
                            pubUi.scrollToEvt("#eachView", "page", "history"); //페이지에서 사용하는 scrolToEvt사용 원할 시, 파라미터 전달값 : targetElement, "page(type)", "처리하려는 페이지 (value)"
                        }, 1000);
                    });
                }
            }
        }
    },
    setScrollWidth: function () {
        const apply = () => {
            const scrollEl = document.querySelector(".wrap");
            const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const scrollbarWidthPx = scrollEl.offsetWidth - scrollEl.clientWidth;
            const scrollbarWidthRem = scrollbarWidthPx / remInPx;
            document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidthRem}rem`);
        };

        if (document.readyState === "complete") {
            apply();
        } else {
            window.addEventListener("load", apply);
        }
    },
    //문의하기 이벤트
    requestInquiry: function () {
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

            // const inputBox = document.querySelectorAll(".wrap-form-input input.input-box");
            // const inputBoxDelBtn = document.querySelectorAll(".wrap-form-input input-wrap .btn-input-del");

            // inputBox.forEach((el) => {
            //     el.addEventListener("input", function (e) {
            //         if (e.target != "") {
            //             e.target.closest(".input-wrap").classList.add("on");
            //         } else {
            //             e.target.closest(".input-wrap").classList.remove("on");
            //         }
            //     });
            // });

            // inputBoxDelBtn.forEach(el => {
            //     el.addEventListener("click", function(){
            //         console.log(el.currentTarget);
            //         el.currentTarget.closest(".input-wrap").classList.remove("on");
            //     })

            // })
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
            this.scrollToTab();
        },
        tab() {
            //공통
            Array.from(pubUi.self.tabLists).forEach((tabList) => {
                const tabs = tabList.querySelectorAll(".activeTab > li");

                tabs.forEach((tab) => {
                    tab.addEventListener("click", function () {
                        const id = this.getAttribute("id");
                        const tabWrap = tabList.closest(".tab-wrap");
                        const contents = tabWrap.querySelectorAll(".tab-content-box > .tab-content");
                        const tabCateMo = tabWrap.querySelector(".tab-cate-wrap.new");

                        if (tabCateMo) {
                            pubUi.scrollToEvt(".wrap", "top");
                        } // mobile 상단탭카테고리 클릭 변경시 맨위로 스크롤 되도록

                        //08.12 수정 mobile, pc 파일 분리로 인해 불필요해져 주석처리하였음
                        //모바일 탭 카테고리 선택시, pc selectbox caseTab도 동일한 선택영역 지정되도록 기능 추가 - S
                        // if (tabCateMo) {
                        //     /* pc - breadcrumb[selectbox caseTab / tab-content] */
                        //     const tabCatePc = document.querySelector(".select-menu.caseTab");
                        //     const tabCatePcWrapBtn = tabCatePc.closest(".select-cate").querySelector("button");
                        //     const tabContPc = document.querySelectorAll(".pc-only .tab-content-box .tab-content");
                        //     const tabContPcBox = document.querySelector(".pc-only .tab-content-box");
                        //     const selectedTabCateMenu = tabCatePc.querySelector(`[aria-controls=${id}-content]`);
                        //     const selectedTabContPc = tabContPcBox.querySelector(`#${id}-content`);

                        //     pubUi.scrollToEvt(".wrap", "top"); //08.07 수정 page-map-wrap > selectbox 3depth 변경시, 최상단 이동 추가

                        //     tabCatePc.querySelectorAll("li").forEach((list) => {
                        //         list.querySelector("a").setAttribute("aria-selected", false);
                        //         list.querySelector("a").classList.remove("active");
                        //     });
                        //     tabContPc.forEach((cont) => {
                        //         cont.setAttribute("aria-expanded", false);
                        //         cont.classList.remove("on");
                        //     });

                        //     selectedTabCateMenu.classList.add("active");
                        //     selectedTabCateMenu.setAttribute("aria-selected", true);
                        //     tabCatePcWrapBtn.classList.add("on");
                        //     tabCatePcWrapBtn.innerText = selectedTabCateMenu.innerText;

                        //     selectedTabContPc.classList.add("on");
                        //     selectedTabContPc.setAttribute("aria-expanded", true);
                        // }

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
                        const secondTab = content?.querySelector("[data-tab-type='secondTab']");
                        pubUi.secondTabChk(secondTab);

                        if (this.closest(".tab-cate-wrap").classList.contains("new")) {
                            const tabOnLeftValue = document.querySelector(`#${id}`).offsetLeft;
                            setTimeout(() => {
                                requestAnimationFrame(() => {
                                    pubUi.scrollToEvt(".tab-cate-wrap.new .tab-category", "left", tabOnLeftValue);
                                });
                            }, 0);
                        }
                        // console.log(tabOnLeftValue);
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
        scrollToTab() {
            // 탭형태가아닌(role=tablist 사용안하는)  페이지 이동 형식일때, on 클래스가 존재하는 탭으로 가로스크롤 이동 (서비스 mobile 해당)
            if (pubUi.self.tabListsNotList.length > 0) {
                // console.log("테스트 : ", pubUi.self.tabListsNotList);
                const tabList = pubUi.self.tabListsNotList;
                tabList.forEach((list) => {
                    if (list.classList.contains("on")) {
                        let listLeftValue = list.offsetLeft;
                        let listParent = list.closest(".tab-category");
                        // console.log(listLeftValue);
                        listParent.scrollTo({ left: listLeftValue, behavior: "smooth" });
                    }
                });
            }
        }
    },

    acdItem: {
        init() {
            this.tab();
        },
        tab() {
            $(document).on("click", ".acdItem .acd-btn", function (e) {
                e.preventDefault();
                const $this = $(this);
                const accordContWrap = $this.closest(".accord-cont-wrap");
                const item = $this.closest(".acdItem");
                const expanded = $this.attr("aria-expanded") === "true";
                const region = item.find("[role=region]");

                // 가로 아코디언 추가
                if (accordContWrap.hasClass("horizontal")) {
                    $this.attr("aria-expanded", !expanded);
                    item.toggleClass("on", !expanded);

                    if (!expanded) {
                        // 열기 (오른쪽으로 슬라이드)
                        region.show().css({ opacity: 0 }).animate({ opacity: 1 }, 400);
                    } else {
                        // 닫기 (왼쪽으로 접기)
                        region.animate({ opacity: 0 }, 400);
                    }

                    if (!item.hasClass("tog")) {
                        item.siblings(".acdItem:not(.tog)").find("[aria-expanded]").attr("aria-expanded", false);
                        item.siblings(".acdItem:not(.tog)").find("[role=region]").animate({ opacity: 0 }, 400);
                        item.siblings(".acdItem:not(.tog)").removeClass("on");
                    }
                } else {
                    // 기존 세로 아코디언
                    $this.attr("aria-expanded", !expanded);
                    region.slideToggle();
                    item.toggleClass("on", !expanded);

                    if (!item.hasClass("tog")) {
                        item.siblings(".acdItem:not(.tog)").find("[aria-expanded]").attr("aria-expanded", false);
                        item.siblings(".acdItem:not(.tog)").find("[role=region]").slideUp();
                        item.siblings(".acdItem:not(.tog)").removeClass("on");
                    }
                }
            });
        },
    },
    popUp: {
        open(pop, btn) {
            const popEl = document.querySelector(pop);
            const popElType = popEl.getAttribute("class");
            if (popElType === "modal-pop tooltip") {
                // console.log("툴팁", popElType);
            }

            if (popEl != null && popEl.classList.contains("toast")) {
                const popBtn = document.querySelector(btn);
                const targetBtnTop = popBtn.offsetTop;
                const targetBtnTopTotal = targetBtnTop + popBtn.clientHeight;

                // console.log(targetBtnTopTotal);
                popEl.style.opacity = "1";

                if (document.querySelector(".wrap").classList.contains("mobile")) {
                    popEl.querySelector(".pop-content").style.top = `${targetBtnTopTotal + 10}px`;
                    popEl.querySelector(".pop-content").style.transform = "revert";
                    popEl.querySelector(".pop-content").style.maxWidth = "20.1rem";
                    popEl.querySelector(".pop-content").style.left = "revert";
                    popEl.querySelector(".pop-content").style.right = "1.25rem";
                } else {
                    popEl.querySelector(".pop-content").style.top = "80%";
                    popEl.querySelector(".pop-content").style.maxWidth = "880px";
                    popEl.querySelector(".pop-content").style.transform = "translateX(-50%)";
                    popEl.querySelector(".pop-content").style.left = "50%";
                    popEl.querySelector(".pop-content").style.right = "revert";
                }
                setTimeout(() => {
                    popEl.style.opacity = "0";
                    popEl.querySelector(".pop-content").style.top = "revert";
                }, 2000);
            } else {
                document.body.querySelector(".wrap").classList.add("noScroll");

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
            }
        },

        close(pop, btn) {
            const popEl = document.querySelector(pop);
            document.body.querySelector(".wrap").classList.remove("noScroll");
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

            document.body.querySelector(".wrap").classList.remove("noScroll");
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
    swiperUi: {
        init() {
            this.type01Swiper();
            this.type02Swiper();
            this.type03Swiper();
            this.bAroundMoSwiper();
        },
        // swiper default 타입 : type01Swiper
        type01Swiper() {
            const targetSwiper = document.querySelectorAll(".type01Swiper");

            if (targetSwiper.length > 0) {
                //newsroom 상세 사용중
                var swiper1 = new Swiper(".type01Swiper", {
                    pagination: {
                        el: ".swiper-pagination",
                        type: "fraction",
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
            } else {
                return;
            }
        },
        type02Swiper() {
            const targetSwiper = document.querySelectorAll(".type02Swiper");

            if (targetSwiper.length > 0) {
                //회사소개 > 소개 사용중
                var swiper2 = new Swiper(".type02Swiper", {
                    pagination: {
                        el: ".swiper-pagination",
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
            } else {
                return;
            }
        },
        type03Swiper() {
            //slidePerView 케이스
            const targetSwiper = document.querySelectorAll(".type03Swiper");

            if (targetSwiper.length > 0) {
                //회사소개 > 소개 서비스영역 사용중
                var swiper3 = new Swiper(".type03Swiper", {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                });
            } else {
                return;
            }
        },
        bAroundMoSwiper() {
            const targetSwiper = document.querySelectorAll(".baround-swiper");

            if (targetSwiper.length > 0) {
                //newsroom 상세 사용중
                var swiper2 = new Swiper(".baround-swiper", {
                    pagination: {
                        el: ".swiper-pagination",
                        type: "bullets",
                        clickable: true,
                    },
                    loop: true,
                });
            } else {
                return;
            }
        },
    },
    calendarUi: {
        toDay: new Date(),
        nowDate: new Date(),
        targetBtn: null,
        selectedDates: {},
        month: {},
        init() {
            this.bindEvents();
        },

        bindEvents() {
            document.body.addEventListener("click", (e) => {
                const calendarEl = document.querySelector(".scriptCalendar");

                if (calendarEl) {
                    // 캘린더 버튼 클릭
                    const btn = e.target.closest(".calendar-btn");
                    if (btn) {
                        this.targetBtn = btn;

                        // 클릭한 좌표값 및 스크린너비 변수에 저장
                        const targetX = e.clientX;
                        const targetY = e.clientY;
                        const targetScreenWidth = window.screen.width;
                        const targetId = this.targetBtn.getAttribute("id");

                        this.buildCalendar();

                        document.querySelector(`#${targetId}Calendar`).classList.add("on");
                        document.querySelector(`#${targetId}Calendar`).style.position = "absolute";
                        document.querySelector(`#${targetId}Calendar`).style.backgroundColor = "#fff";
                        document.querySelector(`#${targetId}Calendar`).style.borderColor = "#C9CED1";

                        if (document.querySelector(".wrap").classList.contains("mobile")) {
                            document.querySelector(".wrap.mobile").classList.add("open-calendar");
                            document.querySelector(".wrap.mobile aside").style.display = "none";
                            document.querySelector(`#${targetId}Calendar`).style.top = "50%";
                            document.querySelector(`#${targetId}Calendar`).style.left = "50%";
                            document.querySelector(`#${targetId}Calendar`).style.transform = "translate(-50%, -50%)";
                            document.querySelector(`#${targetId}Calendar`).style.width = `${targetScreenWidth - 40}px`;
                            document.querySelector(`#${targetId}Calendar`).style.maxWidth = `360px`;
                        } else {
                            document.querySelector(`#${targetId}Calendar`).style.left = targetX + "px";
                            document.querySelector(`#${targetId}Calendar`).style.top = targetY + "px";
                            if (document.querySelector(".wrap").classList.contains("open-calendar")) {
                                document.querySelector(".wrap").classList.remove("open-calendar");
                            }
                        }

                        return;
                    }

                    // 이전달 버튼
                    if (e.target.closest("#btnPrevCalendar")) {
                        this.prevCalendar();
                        return;
                    }

                    // 다음달 버튼
                    if (e.target.closest("#nextNextCalendar")) {
                        this.nextCalendar();
                        return;
                    }

                    // 날짜 셀 클릭
                    const dayCell = e.target.closest(".scriptCalendar > tbody.box-day td");
                    if (dayCell) {
                        const calendarID = dayCell.closest(".scriptCalendar").id;
                        const targetId = calendarID.replace("Calendar", "");
                        this.hideCalendar(targetId, dayCell);
                        return;
                    }

                    // 바깥 클릭 시 닫기
                    if (calendarEl.classList.contains("on") && !e.target.closest(".scriptCalendar") && !e.target.closest(".calendar-btn")) {
                        calendarEl.classList.remove("on");
                        if (document.querySelector(".wrap").classList.contains("open-calendar")) {
                            document.querySelector(".wrap").classList.remove("open-calendar");
                        }
                    }
                }
            });
        },

        hideCalendar(targetId, targetDay) {
            const targetCalBtn = document.querySelector(`#${targetId}`);
            const targetCalendar = document.querySelector(`#${targetId}Calendar`);
            const selectedYear = targetCalendar.querySelector("#calYear").innerText;
            let selectedMonth = targetCalendar.querySelector("#calMonth").innerText;
            const selectedDay = targetDay.innerText;
            let selectedDate = "";

            // calendarUi 영문일 경우, 달력 일자형식 예외처리 내용 추가 - 영문도 inputbox 노출 시에는 yyyy-mm-dd로 노출시키기 위해 해당 switch문 추가함
            if (targetCalendar.classList.contains("en")) {
                switch (selectedMonth) {
                    case "January":
                        selectedMonth = "01";
                        break;
                    case "February":
                        selectedMonth = "02";
                        break;
                    case "March":
                        selectedMonth = "03";
                        break;
                    case "April":
                        selectedMonth = "04";
                        break;
                    case "May":
                        selectedMonth = "05";
                        break;
                    case "June":
                        selectedMonth = "06";
                        break;
                    case "July":
                        selectedMonth = "07";
                        break;
                    case "August":
                        selectedMonth = "08";
                        break;
                    case "September":
                        selectedMonth = "09";
                        break;
                    case "October":
                        selectedMonth = 10;
                        break;
                    case "November":
                        selectedMonth = 11;
                        break;
                    case "December":
                        selectedMonth = 12;
                        break;
                }
                selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
            } else {
                selectedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
            }

            // console.log(targetDay);
            targetCalBtn.querySelector(".title").innerText = selectedDate;
            targetCalBtn.querySelector(".title").classList.add("on");

            targetDay.classList.add("selected");
            targetDay.setAttribute("data-selected", true);

            //선택한 날짜값 저장
            this.selectedDates[targetId] = selectedDate;

            targetCalendar.classList.remove("on");
            if (document.querySelector(".wrap").classList.contains("open-calendar")) {
                document.querySelector(".wrap").classList.remove("open-calendar");
            }
        },

        prevCalendar() {
            this.toDay = new Date(this.toDay.getFullYear(), this.toDay.getMonth() - 1, this.toDay.getDate());
            this.buildCalendar();
        },

        nextCalendar() {
            this.toDay = new Date(this.toDay.getFullYear(), this.toDay.getMonth() + 1, this.toDay.getDate());
            this.buildCalendar();
        },
        chkMonth() {
            const calendarBox = document.querySelector(".calendar-box");
            if (calendarBox.classList.contains("en")) {
                month = this.autoLeftPad(this.toDay.getMonth() + 1, 2);
                // console.log("달 : " + month);
                switch (month) {
                    case "01":
                        month = "January";
                        break;
                    case "02":
                        month = "February";
                        break;
                    case "03":
                        month = "March";
                        break;
                    case "04":
                        month = "April";
                        break;
                    case "05":
                        month = "May";
                        break;
                    case "06":
                        month = "June";
                        break;
                    case "07":
                        month = "July";
                        break;
                    case "08":
                        month = "August";
                        break;
                    case "09":
                        month = "September";
                        break;
                    case 10 :
                        month = "October";
                        break;
                    case 11 :
                        month = "November";
                        break;
                    case 12 :
                        month = "December";
                        break;
                }
            } else {
                month = this.autoLeftPad(this.toDay.getMonth() + 1, 2);
            }
            
        },
        buildCalendar() {
            const doMonth = new Date(this.toDay.getFullYear(), this.toDay.getMonth(), 1);
            const lastDate = new Date(this.toDay.getFullYear(), this.toDay.getMonth() + 1, 0);        
            const tbCalendar = document.querySelector(".scriptCalendar > tbody.box-day");
            
            document.getElementById("calYear").innerText = this.toDay.getFullYear();
            
            this.chkMonth();
            document.getElementById("calMonth").innerText = month;
            

            while (tbCalendar.rows.length > 0) {
                tbCalendar.deleteRow(tbCalendar.rows.length - 1);
            }

            let row = tbCalendar.insertRow();
            let dom = 1;
            const daysLength = Math.ceil((doMonth.getDay() + lastDate.getDate()) / 7) * 7 - doMonth.getDay();

            for (let day = 1 - doMonth.getDay(); daysLength >= day; day++) {
                let column = row.insertCell();

                if (Math.sign(day) === 1 && lastDate.getDate() >= day) {
                    column.innerText = this.autoLeftPad(day, 2);
                    if (dom % 7 === 1) column.style.color = "#FF4D4D";
                    if (dom % 7 === 0) {
                        column.style.color = "#4D4DFF";
                        row = tbCalendar.insertRow();
                    }

                    // 이미 저장된 선택날짜와 같으면 selected 클래스 추가
                    const calendarId = this.targetBtn?.getAttribute("id");
                    const savedDate = this.selectedDates[calendarId];
                    const currentDate = `${this.toDay.getFullYear()}-${this.autoLeftPad(this.toDay.getMonth() + 1, 2)}-${this.autoLeftPad(day, 2)}`;
                    if (savedDate === currentDate) {
                        column.classList.add("selected");
                    }
                } else {
                    let exceptDay = new Date(doMonth.getFullYear(), doMonth.getMonth(), day);
                    column.innerText = this.autoLeftPad(exceptDay.getDate(), 2);
                    column.style.color = "#A9A9A9";
                }

                // 색상, 클릭 이벤트 설정
                this.setDayCellStyle(column, day, lastDate);

                dom++;
            }
        },

        setDayCellStyle(column, day, lastDate) {
            if (!column.classList.contains("selected")) {
                if (this.toDay.getFullYear() === this.nowDate.getFullYear()) {
                    if (this.toDay.getMonth() === this.nowDate.getMonth()) {
                        if (this.nowDate.getDate() > day && Math.sign(day) === 1) {
                            //(현재일 기준 해당달 이전 날짜 색상 비활성화 컬러 색상 활성화 원할시 해당 부분 주석 해제)
                            // column.style.backgroundColor = "#E5E5E5";
                        } else if (this.nowDate.getDate() < day && lastDate.getDate() >= day) {
                            //column.style.backgroundColor = "#FFFFFF";
                            column.style.cursor = "pointer";
                        } else if (this.nowDate.getDate() === day) {
                            //today 날짜
                            column.classList.add("today"); //today 클래스 추가 (css로 today 클래스 스타일 정의)
                        }
                    } else if (this.toDay.getMonth() < this.nowDate.getMonth()) {
                        if (Math.sign(day) === 1 && day <= lastDate.getDate()) {
                            //(현재일 기준 이전달 날짜 색상 비활성화 컬러 색상 활성화 원할시 해당 부분 주석 해제)
                            // column.style.backgroundColor = "#E5E5E5"; 
                        }
                    } else {
                        if (Math.sign(day) === 1 && day <= lastDate.getDate()) {
                            //column.style.backgroundColor = "#FFFFFF";
                            column.style.cursor = "pointer";
                        }
                    }
                } else if (this.toDay.getFullYear() < this.nowDate.getFullYear()) {
                    if (Math.sign(day) === 1 && day <= lastDate.getDate()) {
                        //(현재일 기준 작년도 날짜 색상 비활성화 컬러 색상 활성화 원할시 해당 부분 주석 해제)
                        // column.style.backgroundColor = "#E5E5E5";
                    }
                } else {
                    if (Math.sign(day) === 1 && day <= lastDate.getDate()) {
                        //column.style.backgroundColor = "#FFFFFF";
                        column.style.cursor = "pointer";
                    }
                }
            }
        },

        autoLeftPad(num, digit) {
            if (String(num).length < digit) {
                num = new Array(digit - String(num).length + 1).join("0") + num;
            }
            return num;
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
            pubUi.self.isPc = window.innerWidth >= 1280;
            pubUi.self.isMobile = window.innerWidth <= 1279;
            pubUi.tabList.scroll();
            pubUi.evtScheduleLeft();
            pubUi.mobileDeviceChk(); //모바일 체크함수 추가
        });
    });
})();
