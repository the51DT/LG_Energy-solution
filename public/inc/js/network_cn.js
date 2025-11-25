// - 퍼블테스트용(개발은 따로 존재) - S
const locations = [
    {
        place: "LG Energy Solution",
        lat: 37.5266681,
        lng: 126.9271165,
        address: "108 Yeoui-daero, Yeongdeungpo-gu, Seoul",
        tel: "+82-2-3777-1114",
        sort: "",
        type: "本社",
        country: "Seoul",
        continent: "Korea",
        year: "2020",
        img: "inc/images/img/img_popup_korea1.png",
        home: false,
        insta: false,
        facebook: true,
        youtube: true,
        linkedin: true,
        blog: true,
    },
    {
        place: "R&D Campus Magok (LG Science Park)",
        lat: 37.5628546,
        lng: 126.83131,
        address: "LG Science Park, 30, Magokjungang 10-ro, Gangseo-gu, Seoul",
        tel: "+82-2-6987-4777",
        sort: "",
        type: "R&D",
        country: "Seoul",
        continent: "Korea",
        year: "2018",
        img: "inc/images/img/img_popup_korea2.png",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "R&D Campus Gwacheon",
        lat: 37.463046,
        lng: 127.0310853,
        address: "36, JangEUnmaeul-3gil, Gwacheon-si, Gyeonggi-do",
        tel: "+82-2-2206-0511",
        sort: "",
        type: "R&D",
        country: "Gwacheon",
        continent: "Korea",
        year: "2018",
        img: "inc/images/img/img_popup_korea3.png",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "R&D Campus Daejeon",
        lat: 36.388109,
        lng: 127.3981654,
        address: "188, Munji-ro, Yuseong-gu, Daejeon",
        tel: "+82-42-866-2114",
        sort: "",
        type: "R&D",
        country: "Daejeon",
        continent: "Korea",
        year: "1979",
        img: "inc/images/img/img_popup_korea4.png",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "R&D Campus Seocho",
        lat: 37.4611145,
        lng: 127.0347418,
        address: "19, Yangjaedaero 11-gil, Seocho-gu, Seoul",
        tel: "+82-2-3777-1114",
        sort: "",
        type: "R&D",
        country: "Seocho",
        continent: "Korea",
        year: "2025",
        img: "", //inc/images/img/img_popup_korea5.png
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "Ochang Energy Plant",
        lat: 36.695833,
        lng: 127.4153271,
        address: "29, Gwahaksaneop 3-ro, Oksan-myeon, Heungdeok-gu, Cheongju-si, Chungcheongbuk-do",
        tel: "+82-43-219-7114",
        sort: "Cylindrical Battery, Pouch Battery",
        type: "生产",
        country: "Cheongju",
        continent: "Korea",
        year: "2004",
        img: "inc/images/img/img_popup_korea6.png",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "Ochang Energy Plant 2",
        lat: 36.7322241,
        lng: 127.4443533,
        address: "81, 2sandan-ro, Ochang-eup, Cheongwon-gu, Cheongju-si, Chungcheongbuk-do",
        tel: "+82-43-718-0015",
        sort: "Cylindrical Battery, Pouch Battery",
        type: "生产",
        country: "Cheongju",
        continent: "Korea",
        year: "2012",
        img: "", //inc/images/img/img_popup_korea7.png
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution Battery (Nanjing) Co., Ltd.",
        lat: 31.862120083007227,
        lng: 118.56925100611296,
        address: "No.79 Hengtong Road, Nanjing Economical&Technological Development Zone,Nanjing, China",
        tel: "+86-25-5878-2000",
        sort: "Cylindrical Battery, Pouch Battery",
        type: "生产",
        country: "China",
        continent: "Asia·Oceania",
        year: "2014",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution Technology (Nanjing) Co., Ltd.",
        lat: 31.851233373477672,
        lng: 118.56839489592646,
        address: "No.17-18 Hengyi Road. No.26 Hengfei Road.Nanjing Economical & Technological Development Zone,Nanjing, China",
        tel: "+86-25-5878-9000",
        sort: "Pouch Battery",
        type: "生产",
        country: "China",
        continent: "Asia·Oceania",
        year: "2018",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution (Nanjing) Co., Ltd.",
        lat: 32.15618986915028,
        lng: 118.88463864322954,
        address: "No.17-18 Hengyi Road. No.26 Hengfei Road.Nanjing Economical & Technological Development Zone,Nanjing, China",
        tel: "+86-25-8560-3000",
        sort: "Cylindrical Battery, Pouch Battery",
        type: "生产",
        country: "China",
        continent: "Asia·Oceania",
        year: "2003",
        img: "inc/images/img/img_popup_china3.png",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution Japan Co., Ltd.",
        lat: 35.66180676114204,
        lng: 139.74411564019047,
        address: "Holland Hills Mori Tower 17F, 5-11-2, Toranomon, Minato-ku, Tokyo, Japan",
        tel: "+81-3-6403-1861",
        sort: "",
        type: "销售",
        country: "Japan",
        continent: "Asia·Oceania",
        year: "2024",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution (Taiwan), Ltd.",
        lat: 25.074442450255834,
        lng: 121.57558165718939,
        address: "No. 58, Ruihu Street, Neihu District, Taipei City, Taiwan",
        tel: "+886-2-8752-3225 (+188)",
        sort: "",
        type: "销售",
        country: "Taiwan",
        continent: "Asia·Oceania",
        year: "2020",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution India Private Limited",
        lat: 28.55165156307117,
        lng: 77.12198127287986,
        address: "Unit No. 203, Worldmark 2, Asset No. 8, Aerocity, New Delhi 110037",
        tel: "+91-98-7180-4348",
        sort: "",
        type: "销售",
        country: "India",
        continent: "Asia·Oceania",
        year: "2023",
        img: "",
        home: true,
        insta: true,
        facebook: true,
        youtube: false,
        linkedin: true,
        blog: false,
    },
    {
        place: "PT. HLI GREEN POWER",
        lat: 42.75656883513447,
        lng: -86.06943931544865,
        address: "KNIC(Karawang New Industry City), Jalan Raya Trans Heksa Km 7, Wanajaya, Telukjambe Barat, Karawang, Jawa Barat, Indonesia 41361",
        tel: "+62-812-8540-0888",
        sort: "Pouch Battery",
        type: "JV",
        country: "Indonesia",
        continent: "Asia·Oceania",
        year: "2024",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution Australia Pty Ltd",
        lat: -37.9102156003814,
        lng: 145.15749915588557,
        address: "Unit 12, 35 Dunlop Rd, Mulgrave, VIC, Australia 3170",
        tel: "+61-1300-178-064",
        sort: "",
        type: "生产",
        country: "Australia",
        continent: "Asia·Oceania",
        year: "2017",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution Michigan, Inc.",
        lat: 42.75551737036205,
        lng: -86.06946755963091,
        address: "1 LG Way, Holland, MI 49423, USA",
        tel: "+1-616-494-7190",
        sort: "Automotive",
        type: "生产",
        country: "USA",
        continent: "Americas",
        year: "2000",
        img: "inc/images/img/img_popup_usa1.png",
        home: true,
        insta: true,
        facebook: true,
        youtube: true,
        linkedin: false,
        blog: false,
    },
    {
        place: "LG Energy Solution Arizona",
        lat: 33.30364329972844,
        lng: -111.5530038150412,
        address: "US Arizona Queen Creek 335 e W Pecos Rd",
        tel: "+1-213-905-0024",
        sort: "Mobility, ES",
        type: "生产",
        country: "USA",
        continent: "Americas",
        year: "2020",
        img: "",
        home: true,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: true,
        blog: true,
    },
    {
        place: "LG Energy Solution Vertech, Inc",
        lat: 42.275498864180555,
        lng: -71.56809300197115,
        address: "155 Flanders Road Westborough, MA 01581",
        tel: "+1-508-497-7319",
        sort: "",
        type: "销售",
        country: "USA",
        continent: "Americas",
        year: "2023",
        img: "",
        home: true,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: true,
        blog: false,
    },
    {
        place: "LG Energy Solution Europe GmbH",
        lat: 50.130908023067555,
        lng: 8.518309298260847,
        address: "Otto-Volger Str. 7C, 65843 Sulzbach (Taunus) Germany",
        tel: "+49-6196-5719-660",
        sort: "",
        type: "销售",
        country: "Germany",
        continent: "Europe",
        year: "2020",
        img: "",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: true,
    },
    {
        place: "LG Energy Solution Wroclaw sp. z o.o.",
        lat: 51.01729056534418,
        lng: 16.88145408479877,
        address: "ul. LG 1a, Biskupice Podgorne, 55-040 Kobierzyce, NIP : 8961550941, Wroclaw, Poland",
        tel: "+48-71-733-8103",
        sort: "Automotive",
        type: "生产",
        country: "Poland",
        continent: "Europe",
        year: "2016",
        img: "inc/images/img/img_popup_poland1.png",
        home: true,
        insta: false,
        facebook: true,
        youtube: true,
        linkedin: true,
        blog: false,
    },
];

// 페이지 언어 감지 + 표준화 (KO/EN/ZH/PL/DE), 기본값 KO
const languageCode = (() => {
    const attrLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    const dataLang = (document.body?.dataset?.lang || "").toLowerCase();
    const lang = attrLang || dataLang; // <html lang="en"> 또는 <body data-lang="en">
    if (lang.startsWith("ko")) return "KO";
    if (lang.startsWith("en")) return "EN";
    if (lang.startsWith("zh-CH") || lang.startsWith("zh") || lang.startsWith("cn")) return "ZH";
    if (lang.startsWith("pl")) return "PL";
    if (lang.startsWith("de")) return "DE";
    return "KO";
})();
// - 퍼블테스트용(개발은 따로 존재) - E

//11.12 수정 - 해당 영역부터 적용 필요 : S
let map;
let markers = [];
let pcInfoBox = document.querySelector(".map-info.pc-only .map-info-content-box");
let moInfoBox = document.querySelector(".map-info.mo-only .map-info-content-box");
let selectedText = ""; // '전체', '본사', 'R&D' 등
let targetContinent = "";
let selectedType = "";
let regionFilter = [];
let center, zoom;

// 11.11 수정 : bindEvents 변경
function bindEvents() {
    // 글로벌 네트워크
    let networkMap = document.querySelector(".netw");

    if (networkMap != null && networkMap != "") {
        const networkMapInfo = networkMap.querySelector(".map-info");
        const mapInfoItem = networkMapInfo.querySelectorAll(".map-info-item > li > a");
        const mapImg = networkMap.querySelector(".map-img");
        const mapMarking = networkMap.querySelector(".map-img .active_img .active_mark");
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

                // // 깜빡임 시작secondTab
                // checkingInterval = setInterval(() => {
                //     if (mapMarking.style.display === "block") {
                //         mapMarking.style.display = "none";
                //     } else {
                //         mapMarking.style.display = "block";
                //     }
                // }, 1000);

                // 네트워크(사업장) 정보 영역 활성화/비활성화에 따라 지도 너비값 변경 추가 (11.04)
                defaultMapSizeChk();
            });
        });

        document.addEventListener("click", function (e) {
            if (e.target.closest(".map-info-content-box .btn-close > button")) {
                const targetMap = e.currentTarget.querySelector(".map-info");
                targetContinent = targetMap.querySelector(".map-info-content-box").dataset.continent;
                // console.log(targetContinent);

                targetMap.classList.remove("on");

                // mapImg.classList.remove("on");
                // mapMarking.style.display = "none";
                mapInfoItem.forEach((item) => {
                    item.classList.remove("active");
                });

                if (targetContinent == "韩国") {
                    map.setView([36.5, 127.5], 5);
                } else if (targetContinent == "亚洲 · 大洋洲") {
                    map.setView([34.0479, 100.6197], 3);
                } else if (targetContinent == "美洲") {
                    map.setView([39.63935570747691, -101.3754683869087], 4);
                } else if (targetContinent == "欧洲") {
                    map.setView([54.526, 15.2551], 5);
                } else {
                    // 전체 보기: 등록된 마커 위치로 bounds 계산
                    if (markers.length > 0) {
                        let bounds = L.latLngBounds(markers.map((m) => m.getLatLng()));
                        map.fitBounds(bounds, { padding: [50, 50] });
                    } else {
                        map.setView([37.5266681, 126.9271165], 2); // fallback
                    }
                }

                defaultMapSizeChk();
            }
        });
        defaultMapSizeChk();
    }

    // COUNT
    let filter = [];
    filter = ["서울", "과천", "청주", "서초", "대전", "Seoul", "Korea"];
    let countryCount = locations.filter((loc) => filter.includes(loc.country)).length;
    $("#tab2 .count").text("(" + countryCount + ")");

    filter = ["중국", "일본", "대만", "인도", "인도네시아", "호주", "China", "Japan", "Taiwan", "India", "Indonesia", "Hongkong", "Australia", "Thailand"];
    countryCount = locations.filter((loc) => filter.includes(loc.country)).length;
    $("#tab3 .count").text("(" + countryCount + ")");

    filter = ["미국", "USA", "Mexico", "Canada"];
    countryCount = locations.filter((loc) => filter.includes(loc.country)).length;
    $("#tab4 .count").text("(" + countryCount + ")");

    filter = ["독일", "폴란드", "Germany", "Poland", "France"];
    countryCount = locations.filter((loc) => filter.includes(loc.country)).length;
    $("#tab5 .count").text("(" + countryCount + ")");

    countryCount = locations.length;
    $("#tab1 .count").text("(" + countryCount + ")");
}

// ===== 지도 초기화 =====
function initMap() {
    map = L.map("googleMap", { zoomControl: false }).setView([37.5266681, 126.9271165], 3);

    // OSM 타일
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // 줌컨트롤 (구글맵처럼 오른쪽 하단)
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // 전체 마커 렌더링
    renderMarkers(locations);
    updateInfoList(locations);

    bindEvents();
}

// ===== 마커 렌더링 =====
function renderMarkers(list) {
    clearMarkers();
    list.forEach((loc) => addMarker(loc));
}

function addMarker(location) {
    let markerImg = "";

    if (location.type === "본사" || location.type === "Headquarter" || location.type === "本社" || location.type === "Siedziba główna" || location.type === "Hauptsitz") {
        markerImg = "../../../inc/images/icon/icon_mark_black.svg";
    } else if (location.type == "R&D") {
        markerImg = "../../../inc/images/icon/icon_mark_blue.svg";
    } else if (location.type === "생산" || location.type === "生产" || location.type === "Produkcja" || location.type === "Produktion" || location.type === "Manufacturing" || location.type === "Manufacturing Facility") {
        markerImg = "../../../inc/images/icon/icon_mark_green.svg";
    } else if (location.type == "JV") {
        markerImg = "../../../inc/images/icon/icon_mark_green.svg";
    } else {
        //판매
        markerImg = "../../../inc/images/icon/icon_mark_pink.svg";
    }

    const markerIcon = L.icon({
        iconUrl: markerImg,
        iconSize: [32, 32],
        iconAnchor: [25, 57],
    });

    const marker = L.marker([location.lat, location.lng], { icon: markerIcon }).addTo(map);

    marker.on("click", () => {
        map.setView([location.lat, location.lng], 13);
        updateInfoBox(location);
    });

    markers.push(marker);
}

// 공통 : 네트워크(사업장) 정보 영역 활성화/비활성화에 따라 지도 너비값 변경 함수 추가 (11.04)
function defaultMapSizeChk() {
    const networkMap = document.querySelector(".map-conts-area");
    const networkMapInfo = document.querySelector(".map-info");
    const mapImg = networkMap.querySelector(".map-img");
    const networkMapWidth = mapImg.querySelector(".default_img");

    if (networkMapInfo.classList.contains("on")) {
        networkMapWidth.style.width = "calc(100vw - 59.25rem)";
    } else {
        networkMapWidth.style.width = "calc(100vw - 33rem)";
    }
}

function clearMarkers() {
    markers.forEach((m) => map.removeLayer(m));
    markers = [];
}

// ===== InfoBox 업데이트 =====
function updateInfoBox(targetLocation) {
    let html = "";

    // 11.11 수정 : map-info-content-box 마크업 구조 변경 - S
    html += '<div class="info-conts-wrap">';
    html += '<div class="info-content-head">';
    html += "   <ul class='sort'>";
    if (targetLocation.type === "본사" || targetLocation.type === "Headquarter" || targetLocation.type === "本社" || targetLocation.type === "Siedziba główna" || targetLocation.type === "Hauptsitz") {
        html += "       <li class='filter-type1'>" + targetLocation.type + "</li>";
    } else if (targetLocation.type === "R&D" || targetLocation.type === "B+R" || targetLocation.type === "F&E") {
        html += "       <li class='filter-type2'>" + targetLocation.type + "</li>";
    } else if (
        targetLocation.type === "생산" ||
        targetLocation.type === "生产" ||
        targetLocation.type === "Produkcja" ||
        targetLocation.type === "Produktion" ||
        targetLocation.type === "Manufacturing" ||
        targetLocation.type === "Manufacturing Facility"
    ) {
        html += "       <li class='filter-type3'>" + targetLocation.type + "</li>";
    } else if (targetLocation.type == "JV") {
        html += '       <li class="filter-type3">' + targetLocation.type + "</li>";
    } else {
        html += "       <li class='filter-type4'>" + targetLocation.type + "</li>";
    }
    html += "       <li class='country'>" + targetLocation.country + "</li>";
    html += "       <li class='year'>" + targetLocation.year + "</li>";
    html += "   </ul>";
    html += "   <h3 class='title'>" + targetLocation.place + "</h3>";
    html += "</div>";
    html += '<div class="info-content-body">';
    html += "   <ul>";
    html += '       <li><img src="../../../inc/images/icon/icon_address.svg" alt="" /><p>' + targetLocation.address + "</p></li>";
    html += '       <li><img src="../../../inc/images/icon/icon_phone.svg" alt="" /><p>' + targetLocation.tel + "</p></li>";
    if (targetLocation.sort) {
        html += '       <li><img src="../../../inc/images/icon/icon_package.svg" alt="" /><p>' + targetLocation.sort + "</p></li>";
    }
    html += "   </ul>";
    if (targetLocation.img) {
        html += '   <div class="img-area">';
        html += '       <img src="' + targetLocation.img + '" alt="" />';
        html += "   </div>";
    }
    html += '   <div class="sns-area"><ul>';
    if (targetLocation.home) {
        html += `<li><a href="${targetLocation.homeUrl}" target="_blank"><img src="../../../inc/images/icon/icon_sns_home.svg" alt="home"></a></li>`;
    }
    if (targetLocation.facebook) {
        html += `<li><a href="${targetLocation.facebookUrl}"  target="_blank"><img src="../../../inc/images/icon/icon_facebook.svg" alt="facebook"></a></li>`;
    }
    if (targetLocation.insta) {
        html += `<li><a href="${targetLocation.instaUrl}"  target="_blank"><img src="../../../inc/images/icon/icon_insta.svg" alt="instagram"></a></li>`;
    }
    if (targetLocation.linkedin) {
        html += `<li><a href="${targetLocation.linkedinUrl}"  target="_blank"><img src="../../../inc/images/icon/icon_in.svg" alt="linkedin"></a></li>`;
    }
    if (targetLocation.youtube) {
        html += `<li><a href="${targetLocation.youtubeUrl}"  target="_blank"><img src="../../../inc/images/icon/icon_youtube.svg" alt="youtube"></a></li>`;
    }
    if (targetLocation.blog) {
        html += `<li><a href="${targetLocation.blogUrl}"  target="_blank"><img src="../../../inc/images/icon/icon_blog.svg" alt="blog"></a></li>`;
    }
    html += "   </ul></div></div>";
    html += "   <div class='btn-close'>";
    html += "       <button type='button'><img src='../../../inc/images/icon/icon_close_btn.svg' alt='닫기 버튼'/></button>";
    html += "   </div>";
    html += "</div>";
    // 11.11 수정 : map-info-content-box 마크업 구조 변경 - E

    if (pcInfoBox) pcInfoBox.innerHTML = html;
    if (moInfoBox) moInfoBox.innerHTML = html;
}

// ===== 리스트 갱신 =====
function updateInfoList(filtered) {
    const infoList = document.querySelector(".map-info-item");
    if (!infoList) return;
    infoList.innerHTML = "";

    filtered.forEach((loc) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="javascript:;">${loc.place}</a>`;
        li.addEventListener("click", () => {
            map.setView([loc.lat, loc.lng], 15);
            updateInfoBox(loc);
        });
        infoList.appendChild(li);
    });
}

// ===== 유형 필터 버튼 =====
// 11.11 수정 : 유형 필터 클릭시, 활성화된 지역 기준으로, 선택한 필터값에맞는 리스트 출력되도록 구조 변경 - S
document.querySelectorAll(".map-filter-list > li").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const filterType = btn.className.replace("filter-type", "").trim(); // 1~4

        // 언어별 유형 맵핑 - JV 추가 : S (11.25 수정)
        let typeMap = {};
        
        if (languageCode == "KO")
		    typeMap = { 1: "본사", 2: "R&D", 3: "생산", 4: "판매", 5: "JV" };
        else if (languageCode == "EN")
            typeMap = { 1: "Headquarter", 2: "R&D", 3: "Manufacturing", 4: "Marketing", 5: "JV" };
        else if (languageCode == "ZH")
            typeMap = { 1: "本社", 2: "R&D", 3: "生产", 4: "销售", 5: "JV" };
        else if (languageCode == "PL")
            typeMap = { 1: "Siedziba główna", 2: "B+R", 3: "Produkcja", 4: "Sprzedaż", 5: "JV" };
        else if (languageCode == "DE")
            typeMap = { 1: "Hauptsitz", 2: "F&E", 3: "Produktion", 4: "Vertrieb", 5: "JV" };
        // 언어별 유형 맵핑 - JV 추가 : E (11.25 수정)

        selectedType = typeMap[filterType];

        // 유형 필터 분기처리 추가 (생산+JV / JV / 이외) : S (11.25 수정)
        let filterTypes = [];
        if (["생산","Manufacturing","生产","Produkcja","Produktion"].includes(selectedType)) {
            filterTypes = [selectedType, "JV"]; // 생산 + JV
        } else if (selectedType === "JV") {
            filterTypes = ["JV"]; // JV
        } else {
            filterTypes = [selectedType]; // 이외
        }

        let filtered = locations.filter((loc) => filterTypes.includes(loc.type));
         // 유형 + 대륙 기준으로 데이터 필터
        if (regionFilter.length > 0) {
            filtered = filtered.filter((loc) => regionFilter.includes(loc.country));
        }
        // 유형 필터 분기처리 추가 (생산+JV / JV / 이외) : E (11.25 수정)
        console.log(selectedType);

        // 현재 활성화된 대륙 탭 기준 필터링
        const activeTab = document.querySelector(".netw .tab-category .tab.on");
        regionFilter = [];

        if (activeTab) {
            switch (activeTab.id) {
                case "tab2": // 한국
                    regionFilter = ["Seoul", "Gwacheon", "Cheongju", "Seocho", "Daejeon", "Korea"];
                    break;
                case "tab3": // 아시아·오세아니아
                    regionFilter = ["China", "Japan", "Taiwan", "India", "Indonesia", "Hongkong", "Australia", "Thailand"];
                    break;
                case "tab4": // 아메리카
                    regionFilter = ["USA", "Mexico", "Canada"];
                    break;
                case "tab5": // 유럽
                    regionFilter = ["Germany", "Poland", "France"];
                    break;
                default:
                    regionFilter = []; //전체
            }
        }

       

        // 우측 selectbox 업데이트 (언어별 텍스트 표시)
        const pcSelectBtn = document.querySelector(".map-info.pc-only .map-info-list .select-cate button");
        const pcSelectMenu = document.querySelectorAll(".map-info.pc-only .map-info-list .select-menu > li");

        /* 11.12 수정 : 유형필터 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - S */
        const mapInfo = document.querySelector(".map-info.pc-only");
        if (mapInfo.classList.contains("on")) {
            mapInfo.classList.remove("on");
        } /* 11.12 수정 : 유형필터 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - E */

        if (pcSelectBtn) {
            console.log(selectedType);
            pcSelectBtn.innerText = selectedType;

            pcSelectBtn.classList.add("on");
            pcSelectMenu.forEach((menu) => {
                const menuText = menu.querySelector("a").innerText;
                menu.querySelector("a").classList.remove("active");
                if (menuText == pcSelectBtn.innerText) {
                    menu.querySelector("a").classList.add("active");
                }
            });
        }

        renderMarkers(filtered);
        updateInfoList(filtered);
        bindEvents();
        defaultMapSizeChk();        

        // 지도 자동 이동 (해당 지역 기준)
        if (regionFilter.length > 0) {
            const bounds = L.latLngBounds(filtered.map((loc) => [loc.lat, loc.lng]));
            if (filtered.length > 0) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    });
});

// ===== Selectbox 필터 (PC/MO 공통) =====
// 11.11 수정 : 활성화된 대륙 탭 기준으로 필터링되도록 변경 - S
document.querySelectorAll(".map-info .select-menu a").forEach((option) => {
    option.addEventListener("click", function () {
        selectedText = option.textContent.trim();
        document.querySelectorAll(".map-info .select-menu a").forEach((el) => el.classList.remove("active"));
        option.classList.add("active");

        // 현재 활성화된 대륙 탭 가져오기
        const activeTab = document.querySelector(".tab-category .tab.on");
        regionFilter = [];

        if (activeTab) {
            switch (activeTab.id) {
                case "tab2": // 한국
                    regionFilter = ["Seoul", "Gwacheon", "Cheongju", "Seocho", "Daejeon", "Korea"];
                    break;
                case "tab3": // 아시아·오세아니아
                    regionFilter = ["China", "Japan", "Taiwan", "India", "Indonesia", "Hongkong", "Australia", "Thailand"];
                    break;
                case "tab4": // 미주
                    regionFilter = ["USA", "Mexico", "Canada"];
                    break;
                case "tab5": // 유럽
                    regionFilter = ["Germany", "Poland", "France"];
                    break;
                default:
                    regionFilter = [];
            }
        }

        // 언어별 “전체” 매핑
        const allText = languageCode === "ZH" ? "全部" : "All";
        let filtered = [];

        // Selectbox 선택 값에 따라 필터링
        if (selectedText === "전체" || selectedText === "All" || selectedText === "全部") {
            filtered = locations;
        } else {
            // 유형 이름이 한글/중문/영문/혼합일 수 있으므로 넓게 필터링
            filtered = locations.filter((loc) => loc.type === selectedText || loc.type.toLowerCase() === selectedText.toLowerCase());
        }

        // 활성화된 대륙 탭 기준으로 필터링
        if (regionFilter.length > 0) {
            filtered = filtered.filter((loc) => regionFilter.includes(loc.country));
        }

        // PC/MO Selectbox 버튼 텍스트 업데이트
        const pcSelectBtn = document.querySelector(".map-info.pc-only .map-info-list .select-cate button");
        const moSelectBtn = document.querySelector(".map-info.mo-only .map-info-list .select-cate button");

        const pcSelectMenu = document.querySelectorAll(".map-info.pc-only .map-info-list .select-menu > li");

        /* 11.12 수정 : selectbox 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - S */
        const mapInfo = document.querySelector(".map-info.pc-only");
        if (mapInfo.classList.contains("on")) {
            mapInfo.classList.remove("on");
        } /* 11.12 수정 : selectbox 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - E */


        if (pcSelectBtn) {
            pcSelectBtn.innerText = selectedText;
            pcSelectBtn.classList.add("on");

            pcSelectMenu.forEach((menu) => {
                menu.querySelector("a").classList.remove("active");
            });
            pcSelectMenu[0].querySelector("a").classList.add("active");
        }
        if (moSelectBtn) {
            moSelectBtn.innerText = selectedText;
            moSelectBtn.classList.add("on");
        }

        // 마커 및 리스트 갱신
        renderMarkers(filtered);
        updateInfoList(filtered);
        bindEvents();
    });
});
// 11.11 수정 : 활성화된 대륙 탭 기준으로 필터링되도록 변경 - E

// ===== 대륙별 탭 =====
document.querySelectorAll(".netw .tab-category .tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".netw .tab-category .tab").forEach((el) => el.classList.remove("on"));
        tab.classList.add("on");

        const tabId = tab.id;
        targetContinent = document.querySelector(`#${tabId} > button`).innerText.trim();

        regionFilter = [];
        let center, zoom;

        switch (tabId) {
            case "tab2": // 한국
                regionFilter = ["Seoul", "Gwacheon", "Cheongju", "Seocho", "Daejeon", "Korea"];
                center = [36.5, 127.5];
                zoom = 7;
                break;
            case "tab3": // 아시아·오세아니아
                regionFilter = ["China", "Japan", "Taiwan", "India", "Indonesia", "Hongkong", "Australia", "Thailand"];
                center = [34.0479, 100.6197];
                zoom = 3;
                break;
            case "tab4": // 미주
                regionFilter = ["USA", "Mexico", "Canada"];
                center = [39.6393, -101.3754];
                zoom = 4;
                break;
            case "tab5": // 유럽
                regionFilter = ["Germany", "Poland", "France"];
                center = [54.526, 15.2551];
                zoom = 5;
                break;
            default: // 전체
                regionFilter = [];
        }

        // 해당 대륙 전체 데이터 불러오기
        let filtered = regionFilter.length > 0 ? locations.filter((loc) => regionFilter.includes(loc.country)) : locations;

        // 탭 클릭 시 Selectbox 텍스트를 “전체”로 초기화
        const pcSelectBtn = document.querySelector(".map-info.pc-only .map-info-list .select-cate button");
        const pcSelectMenu = document.querySelectorAll(".map-info.pc-only .map-info-list .select-menu > li");

        /* 11.12 수정 : 대륙탭 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - S */
        const mapInfo = document.querySelector(".map-info.pc-only");
        if (mapInfo.classList.contains("on")) {
            mapInfo.classList.remove("on");
        } /* 11.12 수정 : 대륙탭 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - E */

        if (pcSelectBtn) {
            pcSelectBtn.innerText = languageCode === "ZH" ? "全部" : "전체";
            pcSelectBtn.classList.add("on");

            pcSelectMenu.forEach((menu) => {
                menu.querySelector("a").classList.remove("active");
            });
            pcSelectMenu[0].querySelector("a").classList.add("active");
        }
        selectedText = "";

        renderMarkers(filtered);
        updateInfoList(filtered);
        bindEvents();
        defaultMapSizeChk();

        if (regionFilter.length === 0) {
            let bounds = L.latLngBounds(filtered.map((loc) => [loc.lat, loc.lng]));
            map.fitBounds(bounds);
        } else {
            map.setView(center, zoom);
        }

        // 11.12 추가 : 지역탭 선택 시, 해당 지역의 type만 Selectbox와 필터에 표시 - S        
        const availableTypes = [...new Set(filtered.map((loc) => loc.type))]; // 현재 지역에 존재하는 type 추출
        const isAllTab = tabId === "tab1"; // 전체 탭 체크용

        // 2. 언어별 type 매핑 정의
        const typeMapping = {
            KO: { 1: "본사", 2: "R&D", 3: "생산", 4: "판매" },
            EN: { 1: "Headquarter", 2: "R&D", 3: "Manufacturing", 4: "Marketing" },
            ZH: { 1: "本社", 2: "R&D", 3: "生产", 4: "销售" },
            PL: { 1: "Siedziba główna", 2: "B+R", 3: "Produkcja", 4: "Sprzedaż" },
            DE: { 1: "Hauptsitz", 2: "F&E", 3: "Produktion", 4: "Vertrieb" },
        };
        const activeTypeMap = typeMapping[languageCode] || typeMapping["KO"];

        // 3. 유형 필터 버튼 표시/숨김
        document.querySelectorAll(".map-filter-list > li").forEach((li) => {
            if (isAllTab) {
                // 전체 탭일 때는 전부 표시
                li.style.display = "block";
                return;
            }
            const className = li.className.replace("filter-type", "").trim();
            const typeText = activeTypeMap[className];
            if (availableTypes.includes(typeText)) {
                li.style.display = "block";
            } else {
                li.style.display = "none";
            }
        });

        // 4. Selectbox 메뉴 표시/숨김
        document.querySelectorAll(".map-info .select-menu > li").forEach((li) => {
            const text = li.textContent.trim();
            // “전체”, “All” 등은 항상 보이게 처리
            if (["전체", "All", "全部", "Alle", "Wszystkie"].includes(text) || availableTypes.includes(text)) {
                li.style.display = "block";
            } else if (isAllTab) {
                li.style.display = "block";
            } else {
                li.style.display = "none";
            }
        });
        // 11.12 추가 : 지역탭 선택 시, 해당 지역의 type만 Selectbox와 필터에 표시 - E
    });
});

document.addEventListener("DOMContentLoaded", initMap);
//11.12 수정 - 해당 영역부터 적용 필요 : E
