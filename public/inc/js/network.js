// locations 데이터 등록 (팝업 정보도 해당 데이터에서 연동되서 동적으로 마크업 생성됨)
// - 퍼블테스트용(개발은 따로 존재) - S
const locations = [
    {
        place: "본사",
        lat: 37.5266681,
        lng: 126.9271165,
        address: "서울특별시 영등포구 여의대로 108",
        tel: "02-3777-1114",
        sort: "",
        type: "본사",
        country: "서울",
        continent: "한국",
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
        place: "마곡R&D캠퍼스 (LG사이언스파크)",
        lat: 37.5628546,
        lng: 126.83131,
        address: "서울특별시 강서구 마곡중앙10로 30(마곡동) LG사이언스파크",
        tel: "02-6987-4777",
        sort: "",
        type: "R&D",
        country: "서울",
        continent: "한국",
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
        place: "과천R&D캠퍼스",
        lat: 37.463046,
        lng: 127.0310853,
        address: "경기도 과천시 장군마을 3길 36",
        tel: "02-2206-0511",
        sort: "",
        type: "R&D",
        country: "과천",
        continent: "한국",
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
        place: "기술연구원",
        lat: 36.388109,
        lng: 127.3981654,
        address: "대전광역시 유성구 문지로 188",
        tel: "042-866-2114",
        sort: "",
        type: "R&D",
        country: "대전",
        continent: "한국",
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
        place: "서초 R&D캠퍼스",
        lat: 37.4611145,
        lng: 127.0347418,
        address: "서울 서초구 양재대로 11길 19",
        tel: "02-3777-1114",
        sort: "",
        type: "R&D",
        country: "서초",
        continent: "한국",
        year: "2025",
        img: "", // inc/images/img/img_popup_korea5.png
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "오창 에너지플랜트",
        lat: 36.695833,
        lng: 127.4153271,
        address: "충청북도 청주시 흥덕구 옥산면 과학산업3로 29",
        tel: "043-219-7114",
        sort: "",
        type: "생산",
        country: "청주",
        continent: "한국",
        year: "2024",
        img: "inc/images/img/img_popup_korea6.png",
        home: false,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: false,
        blog: false,
    },
    {
        place: "오창 에너지플랜트 2",
        lat: 36.7322241,
        lng: 127.4443533,
        address: "충청북도 청주시 청원구 오창읍 2산단로 81",
        tel: "043-718-0015",
        sort: "원통형, 파우치전지, ESS전지",
        type: "생산",
        country: "청주",
        continent: "한국",
        year: "2024",
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
        sort: "자동차 전지, 소형 전지, ESS",
        type: "생산",
        country: "중국",
        continent: "아시아·오세아니아",
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
        address: "No.79 Hengtong Road, Nanjing Economical&Technological Development Zone,Nanjing, China",
        tel: "+86-25-5878-9000",
        sort: "자동차 전지, 소형 전지, ESS",
        type: "생산",
        country: "중국",
        continent: "아시아·오세아니아",
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
        sort: "자동차 전지, 소형 전지, ESS",
        type: "생산",
        country: "중국",
        continent: "아시아·오세아니아",
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
        sort: "자동차 전지, 소형 전지, ESS",
        type: "판매",
        country: "일본",
        continent: "아시아·오세아니아",
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
        type: "판매",
        country: "대만",
        continent: "아시아·오세아니아",
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
        type: "판매",
        country: "인도",
        continent: "아시아·오세아니아",
        year: "2023",
        img: "",
        home: true,
        insta: true,
        facebook: true,
        youtube: false,
        linkedin: true,
        blog: true,
    },
    {
        place: "PT. HLI GREEN POWER",
        lat: 42.75656883513447,
        lng: -86.06943931544865,
        address: "KNIC(Karawang New Industry City), Jalan Raya Trans Heksa Km 7, Wanajaya, Telukjambe Barat, Karawang, Jawa Barat, Indonesia 41361",
        tel: "+62-812-8540-0888",
        sort: "파우치 전지",
        type: "JV/생산",
        country: "인도네시아",
        continent: "아시아·오세아니아",
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
        type: "판매",
        country: "호주",
        continent: "아시아·오세아니아",
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
        sort: "자동차 전지",
        type: "생산",
        country: "미국",
        continent: "아메리카",
        year: "2000",
        img: "inc/images/img/img_popup_usa1.png",
        home: true,
        insta: true,
        facebook: true,
        youtube: true,
        linkedin: false,
        blog: true,
    },
    {
        place: "LG Energy Solution Arizona",
        lat: 33.30364329972844,
        lng: -111.5530038150412,
        address: "US Arizona Queen Creek 335 e W Pecos Rd",
        tel: "+1-213-905-0024",
        sort: "소형 전지, ESS",
        type: "생산",
        country: "미국",
        continent: "아메리카",
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
        type: "판매",
        country: "미국",
        continent: "아메리카",
        year: "2023",
        img: "",
        home: true,
        insta: false,
        facebook: false,
        youtube: false,
        linkedin: true,
        blog: true,
    },
    {
        place: "LG Energy Solution Europe GmbH",
        lat: 50.130908023067555,
        lng: 8.518309298260847,
        address: "Otto-Volger Str. 7C, 65843 Sulzbach (Taunus) Germany",
        tel: "+49-6196-5719-660",
        sort: "",
        type: "판매",
        country: "독일",
        continent: "유럽",
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
        sort: "자동차 전지",
        type: "생산",
        country: "폴란드",
        continent: "유럽",
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
let map; // 전역 map 객체
let infowindow; // 인포윈도우 전역 선언 (중복 방지)

let mapFilterList = document.querySelectorAll(".map-filter-list > li");
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
    let networkMap = document.querySelector(".map-conts-area");

    if (networkMap != null && networkMap != "") {
        const networkMapInfo = networkMap.querySelector(".map-info");
        const mapInfoItem = networkMapInfo.querySelectorAll(".map-info-item > li > a");
        const mapImg = networkMap.querySelector(".map-img");
        const mapMarking = networkMap.querySelector(".map-img .active_img .active_mark");
        const mapCloseBtn = networkMapInfo.querySelector(".map-info-content-box .btn-close > button"); // 11.11 수정 : mapCloseBtn 변수 선택자 변경

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
                const targetMap = e.target.closest(".map-info");
                const continentBox = targetMap.querySelector(".map-info-content-box");
                const targetContinent = continentBox?.dataset.continent || "";

                targetMap.classList.remove("on");

                // 지도 위치 복원
                if (targetContinent == "한국" || targetContinent == "Korea" || targetContinent == "韩国") {
                    map.setCenter({ lat: 36.5, lng: 127.5 });
                    map.setZoom(5);
                } else if (["아시아·오세아니아", "Asia·Oceania", "亚洲 · 大洋洲", "Asien · Ozeanien", "Azja · Oceania"].includes(targetContinent)) {
                    map.setCenter({ lat: 34.0479, lng: 100.6197 });
                    map.setZoom(3);
                } else if (["아메리카", "Americas", "美洲", "Amerika", "Ameryki"].includes(targetContinent)) {
                    map.setCenter({ lat: 39.6393, lng: -101.3754 });
                    map.setZoom(4);
                } else if (["유럽", "Europe", "欧洲", "Europa"].includes(targetContinent)) {
                    map.setCenter({ lat: 54.526, lng: 15.2551 });
                    map.setZoom(5.5);
                } else {
                    map.setCenter({ lat: 37.5266681, lng: 126.9271165 });
                    map.setZoom(2);
                }

                defaultMapSizeChk();
            }
        });

        // 네트워크(사업장) 정보 영역 활성화/비활성화에 따라 지도 너비값 변경 추가 (11.04)
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

function initMap() {
    const styledMapType = new google.maps.StyledMapType([
        {
            featureType: "poi",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "water",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        },
    ]);

    const mapOptions = {
        center: new google.maps.LatLng(37.5266681, 126.9271165),
        zoom: 4,
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");

    infowindow = new google.maps.InfoWindow(); // 하나의 인포윈도우 재사용

    let markerIcon = "";

    //const makerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_red.svg", null, null, null, new google.maps.Size(50, 57)); //지도 마커 아이콘 변경시 해당 소스 변경 필요

    // 마커 생성 및 클릭 이벤트
    locations.forEach((location) => {
        if (location.type === "본사" || location.type === "Headquarter" || location.type === "本社" || location.type === "Siedziba główna" || location.type === "Hauptsitz") {
            markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_black.svg", null, null, null, new google.maps.Size(32, 32));
        } else if (location.type === "R&D" || location.type === "B+R" || location.type === "F&E") {
            markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_blue.svg", null, null, null, new google.maps.Size(32, 32));
        } else if (location.type === "생산" || location.type === "Manufacturing" || location.type === "生产" || location.type === "Produkcja" || location.type === "Produktion") {
            //생산 , JV/생산
            markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_green.svg", null, null, null, new google.maps.Size(32, 32));
        } else if (location.type == "JV") {
            markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_green.svg", null, null, null, new google.maps.Size(32, 32));
        } else {
            markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_pink.svg", null, null, null, new google.maps.Size(32, 32));
        }

        $(".map-info-item").append('<li><a href="javascript:;">' + location.place + "</a></li>");
        const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(location.lat, location.lng),
            icon: markerIcon,
            title: location.place,
        });

        // ❗️중요: markers 배열에 저장
        markers.push(marker);

        marker.addListener("click", () => {
            map.setCenter(marker.getPosition());
            map.setZoom(15);

            // 마커클릭시, 노출되는 infowindow
            //infowindow 레이어팝업 미노출 : 노출 필요 시 주석해제
            // infowindow.setContent(`<strong>${location.place}</strong>`);
            // infowindow.open(map, marker);
        });
    });

    bindEvents();
}

let markers = []; // 모든 마커 저장

// 공통 : 네트워크(사업장) 정보 영역 활성화/비활성화에 따라 지도 너비값 변경 함수 추가 (11.04)
function defaultMapSizeChk() {
    const networkMap = document.querySelector(".map-conts-area");
    const networkMapInfo = networkMap.querySelector(".map-info");
    const mapImg = networkMap.querySelector(".map-img");
    const networkMapWidth = mapImg.querySelector(".default_img");

    if (networkMapInfo.classList.contains("on")) {
        networkMapWidth.style.width = "calc(100vw - 59.25rem)";
    } else {
        networkMapWidth.style.width = "calc(100vw - 33rem)";
    }
}

// 공통: 마커 클리어 함수
function clearMarkers() {
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
}

// 공통: 리스트 갱신 함수
function updateInfoList(filtered) {
    const infoList = document.querySelector(".map-info-item");
    if (!infoList) return;
    infoList.innerHTML = "";

    // 1. 리스트 다시 그리기
    filtered.forEach((loc) => {
        const html = `<li><a href="javascript:;">${loc.place}</a></li>`;
        infoList.insertAdjacentHTML("beforeend", html);
    });

    // 2. 리스트 항목 클릭 이벤트 재등록
    const listItems = document.querySelectorAll(".map-info-item li");
    listItems.forEach(function (li) {
        li.addEventListener("click", function () {
            const clickedText = li.textContent.trim();
            const targetLocation = locations.find((loc) => loc.place.trim() === clickedText.replace("&", "&amp;").trim());
            map.setZoom(15);
            if (targetLocation) {
                console.log("HERE3");
                console.log(targetLocation.lat + ", " + targetLocation.lng);
                const targetLatLng = new google.maps.LatLng(targetLocation.lat, targetLocation.lng);
                let projection = map.getProjection();
                if (projection) {
                    const scale = Math.pow(2, map.getZoom());
                    const worldPoint = projection.fromLatLngToPoint(targetLatLng);

                    const pixelOffset = 250 / scale; // ← 오른쪽 이동량 (픽셀 기준, 조정 가능)
                    const newPoint = new google.maps.Point(
                        worldPoint.x + pixelOffset, // ← 왼쪽으로 중심 이동 (마커가 오른쪽으로 보임)
                        worldPoint.y
                    );

                    const newCenter = projection.fromPointToLatLng(newPoint);
                    map.setCenter(newCenter);
                } else {
                    // projection 준비 전일 경우, idle 이벤트로 지연 실행
                    google.maps.event.addListenerOnce(map, "idle", () => {
                        const scale = Math.pow(2, map.getZoom());
                        const worldPoint = map.getProjection().fromLatLngToPoint(targetLatLng);
                        const pixelOffset = 250 / scale;
                        const newPoint = new google.maps.Point(worldPoint.x + pixelOffset, worldPoint.y);
                        map.setCenter(map.getProjection().fromPointToLatLng(newPoint));
                    });
                }

                //map.setCenter(new google.maps.LatLng(targetLocation.lat, targetLocation.lng));

                // ✅ active 클래스 적용
                listItems.forEach((el) => el.classList.remove("active"));
                li.classList.add("active");
                li.closest(".map-info-item").closest(".map-info").classList.add("on");

                html = "";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - S
                html += '<div class="info-conts-wrap">';
                html += '<div class="info-content-head">';
                html += '   <ul class="sort">';
                if (targetLocation.type === "본사" || targetLocation.type === "Headquarter" || targetLocation.type === "本社" || targetLocation.type === "Siedziba główna" || targetLocation.type === "Hauptsitz") {
                    // 본사
                    html += '       <li class="filter-type1">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "R&D" || targetLocation.type === "B+R" || targetLocation.type === "F&E") {
                    // R&D
                    html += '       <li class="filter-type2">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "생산" || targetLocation.type === "生产" || targetLocation.type === "Produkcja" || targetLocation.type === "Produktion" || targetLocation.type === "JV" || targetLocation.type === "Manufacturing") {
                    //생산
                    html += '       <li class="filter-type3">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "JV") {
                    //JV
                    html += '       <li class="filter-type3">' + targetLocation.type + "</li>";
                } else {
                    //판매
                    html += '       <li class="filter-type4">' + targetLocation.type + "</li>";
                }
                html += '       <li class="country">' + targetLocation.country + "</li>";
                html += '       <li class="year">' + targetLocation.year + "</li>";
                html += "   </ul>";
                html += '   <h3 class="title">' + targetLocation.place + "</h3>";
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
                html += '   <div class="sns-area">';
                html += "       <ul>";
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
                html += "           </ul>";
                html += "       </div>";
                html += "   </div>";
                html += "   <div class='btn-close'>";
                html += "       <button type='button'><img src='../../../inc/images/icon/icon_close_btn.svg' alt='닫기 버튼'/></button>";
                html += "   </div>";
                html += "</div>";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - E

                // 3. PC + Mobile info 영역 모두 갱신
                if (pcInfoBox) {
                    pcInfoBox.dataset.continent = targetLocation.continent;
                    pcInfoBox.innerHTML = html;
                }
                if (moInfoBox) {
                    moInfoBox.dataset.continent = targetLocation.continent;
                    moInfoBox.innerHTML = html;
                }
            } else {
                // console.log(`"${clickedText}" 에 해당하는 위치와 정보를 찾을 수 없습니다.`);

                let html = "";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - S
                html += '<div class="info-conts-wrap">';
                html += '   <div class="info-content-head" style="margin-top:100%;">';
                html += `   "${clickedText}" 에 해당하는 위치와 정보를 찾을 수 없습니다.`;
                html += "   </div>";
                html += "   <div class='btn-close'>";
                html += "       <button type='button'><img src='../../../inc/images/icon/icon_close_btn.svg' alt='닫기 버튼'/></button>";
                html += "   </div>";
                html += "</div>";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - E

                if (pcInfoBox) pcInfoBox.innerHTML = html;
                if (moInfoBox) moInfoBox.innerHTML = html;
            }
        });
    });
    bindEvents();
}

// 11.11 수정 : 유형 필터 클릭시, 활성화된 지역 기준으로, 선택한 필터값에맞는 리스트 출력되도록 구조 변경 - S
// ✅ 기능 1: 유형 필터
mapFilterList.forEach((button) => {
    button.addEventListener("click", function (e) {
        const filterType = button.className.replace("filter-type", "").trim(); // 1~4

        // 언어별 유형 맵핑
        let typeMap = {};
        if (languageCode == "KO")
            typeMap = { 1: "본사", 2: "R&D", 3: "생산", 4: "판매", 5: "JV" }; //11.11 수정 : JV 제거
        else if (languageCode == "EN")
            typeMap = { 1: "Headquarter", 2: "R&D", 3: "Manufacturing", 4: "Marketing", 5: "JV" }; //11.11 수정 : JV 제거
        else if (languageCode == "ZH")
            typeMap = { 1: "本社", 2: "R&D", 3: "生产", 4: "销售", 5: "JV" }; //11.11 수정 : JV 제거
        else if (languageCode == "PL")
            typeMap = { 1: "Siedziba główna", 2: "B+R", 3: "Produkcja", 4: "Sprzedaż", 5: "JV" }; //11.11 수정 : JV 제거
        else if (languageCode == "DE") typeMap = { 1: "Hauptsitz", 2: "F&E", 3: "Produktion", 4: "Vertrieb", 5: "JV" }; //11.11 수정 : JV 제거

        selectedType = typeMap[filterType];

        console.log(selectedText + "^" + targetContinent + "^" + selectedType + " CHECK3");

        // ✅ 현재 활성화된 지역 탭 확인
        const activeTab = document.querySelector(".netw .tab-category .tab.on");
        let activeRegionFilter = [];
        if (activeTab) {
            const tabId = activeTab.id;
            switch (tabId) {
                case "tab2": // 한국
                    activeRegionFilter = ["서울", "과천", "청주", "서초", "대전", "Seoul", "Korea"];
                    break;
                case "tab3": // 아시아 오세아니아
                    activeRegionFilter = ["중국", "일본", "대만", "인도", "인도네시아", "호주", "China", "Japan", "Taiwan", "India", "Indonesia", "Hongkong", "Australia", "Thailand"];
                    break;
                case "tab4": // 아메리카
                    activeRegionFilter = ["미국", "USA", "Mexico", "Canada"];
                    break;
                case "tab5": // 유럽
                    activeRegionFilter = ["독일", "폴란드", "Germany", "Poland", "France"];
                    break;
                default:
                    activeRegionFilter = []; // 전체
            }
        }

        // ✅ 필터링
        let filtered = locations.filter((loc) => loc.type === selectedType);
        if (activeRegionFilter.length > 0) {
            filtered = filtered.filter((loc) => activeRegionFilter.includes(loc.country));
        }

        // ✅ 우측 selectbox 업데이트 (언어별 텍스트 표시)
        const pcSelectBtn = document.querySelector(".map-info.pc-only .map-info-list .select-cate button");
        const moSelectBtn = document.querySelector(".map-info.mo-only .map-info-list .select-cate button");
        const pcSelectMenu = document.querySelectorAll(".map-info.pc-only .map-info-list .select-menu > li");

        if (pcSelectBtn) {
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
        if (moSelectBtn) {
            moSelectBtn.innerText = selectedType;
            moSelectBtn.classList.add("on");
        }

        // ✅ 마커 갱신
        clearMarkers();
        filtered.forEach((loc) => {
            let markerIcon = "";
            if (["본사", "Headquarter", "本社", "Siedziba główna", "Hauptsitz"].includes(loc.type)) {
                markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_black.svg", null, null, null, new google.maps.Size(32, 32));
            } else if (["R&D", "B+R", "F&E"].includes(loc.type)) {
                markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_blue.svg", null, null, null, new google.maps.Size(32, 32));
            } else if (["생산", "Manufacturing", "生产", "Produkcja", "Produktion", "JV"].includes(loc.type)) {
                markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_green.svg", null, null, null, new google.maps.Size(32, 32));
            } else {
                markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_pink.svg", null, null, null, new google.maps.Size(32, 32));
            }

            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(loc.lat, loc.lng),
                icon: markerIcon,
                title: loc.place,
            });
            markers.push(marker);

            marker.addListener("click", () => {
                map.setZoom(15);
                map.setCenter(marker.getPosition());
            });
        });

        // ✅ 리스트 갱신
        updateInfoList(filtered);

        // ✅ 지도 크기 조정
        defaultMapSizeChk();
    });
});
// 11.11 수정 : 유형 필터 클릭시, 활성화된 지역 기준으로, 선택한 필터값에맞는 리스트 출력되도록 구조 변경 - E

// 11.11 수정 - 기능 2 구조 변경(지역탭 선택시 해당 국가에 맞는 전체값 리스트 노출되도록 구조 변경) - S
// ✅ 기능 2: 탭 클릭 시 지역 필터
document.querySelectorAll(".netw .tab-category .tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        // 탭 active 처리
        document.querySelectorAll(".netw .tab-category .tab").forEach((el) => el.classList.remove("on"));
        tab.classList.add("on");

        const tabId = tab.id;
        targetContinent = document.querySelector(`#${tabId} > button`).innerText.trim();

        // 지역별 필터 조건
        switch (tabId) {
            case "tab2": // 한국
                regionFilter = ["서울", "과천", "청주", "서초", "대전", "Seoul", "Korea"];
                center = { lat: 36.5, lng: 127.5 };
                zoom = 7;
                break;
            case "tab3": // 아시아 오세아니아
                regionFilter = ["중국", "일본", "대만", "인도", "인도네시아", "호주", "China", "Japan", "Taiwan", "India", "Indonesia", "Hongkong", "Australia", "Thailand"];
                center = { lat: 34.0479, lng: 100.6197 };
                zoom = 3;
                break;
            case "tab4": // 아메리카
                regionFilter = ["미국", "USA", "Mexico", "Canada"];
                center = { lat: 39.6393, lng: -101.3754 };
                zoom = 4;
                break;
            case "tab5": // 유럽
                regionFilter = ["독일", "폴란드", "Germany", "Poland", "France"];
                center = { lat: 54.526, lng: 15.2551 };
                zoom = 5;
                break;
            default: // 전체
                regionFilter = [];
                center = null;
                zoom = null;
        }

        // selectbox 및 필터 초기화
        selectedText = ""; // type 필터 해제

        const langMap = {
            KO: "전체",
            EN: "All",
            ZH: "全部",
            PL: "Wszystkie",
            DE: "Alle",
        };
        const resetText = langMap[languageCode] || "전체";

        const pcSelectBtn = document.querySelector(".map-info.pc-only .map-info-list .select-cate button");
        const moSelectBtn = document.querySelector(".map-info.mo-only .map-info-list .select-cate button");

        const pcSelectMenu = document.querySelectorAll(".map-info.pc-only .map-info-list .select-menu > li");
        /* 11.11 수정 : 지역탭 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - S */
        const mapInfo = document.querySelector(".map-info.pc-only");
        if (mapInfo.classList.contains("on")) {
            mapInfo.classList.remove("on");
        } /* 11.11 수정 : 지역탭 선택시, map-info 영역 활성화되어있을경우, 비활성화 처리(창닫히게) - E */
        
        if (pcSelectBtn) {
            pcSelectBtn.innerText = resetText;
            pcSelectBtn.classList.remove("on");

            pcSelectMenu.forEach((menu) => {
                menu.querySelector("a").classList.remove("active");
            });
            pcSelectMenu[0].querySelector("a").classList.add("active");
        }
        if (moSelectBtn) {
            moSelectBtn.innerText = resetText;
            moSelectBtn.classList.remove("on");
        }

        // 실제 데이터도 전체 기준으로 필터링
        let filtered = [];
        if (regionFilter.length > 0) {
            filtered = locations.filter((loc) => regionFilter.includes(loc.country));
        } else {
            filtered = locations; // 전체
        }

        // 마커/리스트 초기화 및 갱신
        clearMarkers();
        filtered.forEach((loc) => {
            let iconPath = "../../../inc/images/icon/";
            let iconFile = "icon_mark_pink.svg";
            if (["본사", "Headquarter", "本社", "Siedziba główna", "Hauptsitz"].includes(loc.type)) {
                iconFile = "icon_mark_black.svg";
            } else if (["R&D", "B+R", "F&E"].includes(loc.type)) {
                iconFile = "icon_mark_blue.svg";
            } else if (["생산", "Manufacturing", "生产", "Produkcja", "Produktion", "JV"].includes(loc.type)) {
                iconFile = "icon_mark_green.svg";
            }
            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(loc.lat, loc.lng),
                icon: new google.maps.MarkerImage(iconPath + iconFile, null, null, null, new google.maps.Size(32, 32)),
                title: loc.place,
            });
            markers.push(marker);

            marker.addListener("click", () => {
                map.setZoom(15);
                map.setCenter(marker.getPosition());
            });
        });

        // 줌/센터 조정
        if (tabId === "tab1") {
            let bounds = new google.maps.LatLngBounds();
            markers.forEach((m) => bounds.extend(m.getPosition()));
            map.fitBounds(bounds);
        } else {
            map.setCenter(center);
            map.setZoom(zoom);
        }

        defaultMapSizeChk();
        updateInfoList(filtered);
    });
});
// 11.11 수정 - 기능 2 구조 변경(지역탭 선택시 해당 국가에 맞는 전체값 리스트 노출되도록 구조 변경) - E

// li 클릭 → 지도 이동
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".map-info-item li").forEach(function (li) {
        li.addEventListener("click", function () {
            const clickedText = li.textContent.trim();
            targetLocation = locations.find((loc) => loc.place.trim() === clickedText.replace("&", "&amp;").trim());

            // 1. li.active 클래스 처리
            document.querySelectorAll(".map-info-item li").forEach((el) => el.classList.remove("active"));
            li.classList.add("active");

            if (targetLocation) {
                console.log("HERE4");
                const targetLatLng = new google.maps.LatLng(targetLocation.lat, targetLocation.lng);
                map.setZoom(15);

                let projection = map.getProjection();
                if (projection) {
                    const scale = Math.pow(2, map.getZoom());
                    const worldPoint = projection.fromLatLngToPoint(targetLatLng);

                    const pixelOffset = 250 / scale; // ← 오른쪽 이동량 (픽셀 기준, 조정 가능)
                    const newPoint = new google.maps.Point(
                        worldPoint.x + pixelOffset, // ← 왼쪽으로 중심 이동 (마커가 오른쪽으로 보임)
                        worldPoint.y
                    );

                    const newCenter = projection.fromPointToLatLng(newPoint);
                    map.setCenter(newCenter);
                } else {
                    // projection 준비 전일 경우, idle 이벤트로 지연 실행
                    google.maps.event.addListenerOnce(map, "idle", () => {
                        const scale = Math.pow(2, map.getZoom());
                        const worldPoint = map.getProjection().fromLatLngToPoint(targetLatLng);
                        const pixelOffset = 250 / scale;
                        const newPoint = new google.maps.Point(worldPoint.x + pixelOffset, worldPoint.y);
                        map.setCenter(map.getProjection().fromPointToLatLng(newPoint));
                    });
                }
                //map.setCenter(targetLatLng);

                // 리스트 내 place 클릭시, 노출되는 infowindow
                // infowindow.setContent(`<strong>${targetLocation.place}</strong>`);
                // infowindow.setPosition(targetLatLng);
                // infowindow.open(map);

                // 2. html 초기화 및 동적 생성
                let html = "";

                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - S
                html += '<div class="info-conts-wrap">';
                html += '<div class="info-content-head">';
                html += '   <ul class="sort">';
                if (targetLocation.type === "본사" || targetLocation.type === "Headquarter" || targetLocation.type === "本社" || targetLocation.type === "Siedziba główna" || targetLocation.type === "Hauptsitz") {
                    // 본사
                    html += '       <li class="filter-type1">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "R&D" || targetLocation.type === "B+R" || targetLocation.type === "F&E") {
                    // R&D
                    html += '       <li class="filter-type2">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "생산" || targetLocation.type === "Manufacturing" || targetLocation.type === "生产" || targetLocation.type === "Produkcja" || targetLocation.type === "Produktion") {
                    //판매
                    html += '       <li class="filter-type3">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "JV") {
                    //JV
                    html += '       <li class="filter-type3">' + targetLocation.type + "</li>";
                } else {
                    //생산
                    html += '       <li class="filter-type4">' + targetLocation.type + "</li>";
                }
                html += '       <li class="country">' + targetLocation.country + "</li>";
                html += '       <li class="year">' + targetLocation.year + "</li>";
                html += "   </ul>";
                html += '   <h3 class="title">' + targetLocation.place + "</h3>";
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
                html += '   <div class="sns-area">';
                html += "       <ul>";
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
                html += "           </ul>";
                html += "       </div>";
                html += "   </div>";
                html += "<div class='btn-close'>";
                html += "   <button type='button'><img src='../../../inc/images/icon/icon_close_btn.svg' alt='닫기 버튼'/></button>";
                html += "</div>";
                html += "</div>";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - E

                // 3. PC + Mobile info 영역 모두 갱신
                if (pcInfoBox) pcInfoBox.innerHTML = html;
                if (moInfoBox) moInfoBox.innerHTML = html;
            } else {
                // console.log(`"${clickedText}" 에 해당하는 위치와 정보를 찾을 수 없습니다.`);

                let html = "";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - S
                html += '<div class="info-conts-wrap">';
                html += '   <div class="info-content-head" style="margin-top:100%;">';
                html += `   "${clickedText}" 에 해당하는 위치와 정보를 찾을 수 없습니다.`;
                html += "   </div>";
                html += "   <div class='btn-close'>";
                html += "       <button type='button'><img src='../../../inc/images/icon/icon_close_btn.svg' alt='닫기 버튼'/></button>";
                html += "   </div>";
                html += "</div>";
                // 11.11 수정 : map-info-content-box 마크업 구조 변경 - E

                if (pcInfoBox) pcInfoBox.innerHTML = html;
                if (moInfoBox) moInfoBox.innerHTML = html;
            }
        });
    });

    // ✅ 기능 3: selectbox (전체/본사/R&D/생산/판매) 선택 시 필터링
    document.querySelectorAll(".map-info .select-menu a").forEach((option) => {
        option.addEventListener("click", function () {
            // 1. 모든 항목에서 active 제거 후 클릭한 곳에 active 부여
            const allOptions = option.closest("ul").querySelectorAll("a");
            allOptions.forEach((opt) => opt.classList.remove("active"));
            option.classList.add("active");

            selectedText = option.textContent.trim(); // '전체', '본사', 'R&D' 등
            console.log(selectedText + "^" + targetContinent + "^" + selectedType + "CHECK1");

            // 2. 필터링
            let filtered = [];
            if (selectedText === "전체" || selectedText === "All" || selectedText === "全部" || selectedText === "Alle" || selectedText === "Wszystkie") {
                filtered = locations;
            } else {
                filtered = locations.filter((loc) => loc.type === selectedText);
            }

            if (targetContinent != "") filtered = filtered.filter((loc) => regionFilter.includes(loc.country));

            // 3. 마커 리셋 및 새로 그림
            clearMarkers();
            filtered.forEach((loc) => {
                let location = loc;
                if (location.type === "본사" || location.type === "Headquarter" || location.type === "本社" || location.type === "Siedziba główna" || location.type === "Hauptsitz") {
                    markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_black.svg", null, null, null, new google.maps.Size(32, 32));
                } else if (location.type === "R&D" || location.type === "B+R" || location.type === "F&E") {
                    markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_blue.svg", null, null, null, new google.maps.Size(32, 32));
                } else if (location.type === "생산" || location.type === "JV" || location.type === "Manufacturing" || location.type === "生产" || location.type === "Produkcja" || location.type === "Produktion") {
                    //생산 , JV/생산
                    markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_green.svg", null, null, null, new google.maps.Size(32, 32));
                } else {
                    markerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_pink.svg", null, null, null, new google.maps.Size(32, 32));
                }

                $(".map-info-item").append('<li><a href="javascript:;">' + location.place + "</a></li>");
                const marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(location.lat, location.lng),
                    icon: markerIcon,
                    title: location.place,
                });

                markers.push(marker);

                marker.addListener("click", () => {
                    map.setZoom(15);
                    map.setCenter(marker.getPosition());

                    // 마커클릭시, 노출되는 infowindow
                    // infowindow 레이어팝업 미노출 : 노출 필요 시 주석해제
                    // infowindow.setContent(`<strong>${location.place}</strong>`);
                    // infowindow.open(map, marker);
                });
            });

            // 4. 리스트도 업데이트
            updateInfoList(filtered);
        });
    });
});

window.initMap = initMap;
//11.12 수정 - 해당 영역부터 적용 필요 : E
