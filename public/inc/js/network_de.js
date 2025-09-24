// locations 데이터 등록 (팝업 정보도 해당 데이터에서 연동되서 동적으로 마크업 생성됨)
const locations = [
    {
        place: "LG Energy Solution",
        lat: 37.5266681,
        lng: 126.9271165,
        address: "108 Yeoui-daero, Yeongdeungpo-gu, Seoul",
        tel: "+82-2-3777-1114",
        sort: "",
        type: "Hauptsitz",
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
        type: "F&E",
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
        type: "F&E",
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
        type: "F&E",
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
        type: "F&E",
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
        type: "Produktion",
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
        type: "Produktion",
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
        type: "Produktion",
        country: "China",
        continent: "Asien · Ozeanien",
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
        address: "No.16 Hongli Road. Jiangning Street. Jiangning Zone,Nanjing, China",
        tel: "+86-25-5878-9000",
        sort: "Pouch Battery",
        type: "Produktion",
        country: "China",
        continent: "Asien · Ozeanien",
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
        type: "Produktion",
        country: "China",
        continent: "Asien · Ozeanien",
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
        type: "Vertrieb",
        country: "Japan",
        continent: "Asien · Ozeanien",
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
        type: "Vertrieb",
        country: "Taiwan",
        continent: "Asien · Ozeanien",
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
        type: "Vertrieb",
        country: "India",
        continent: "Asien · Ozeanien",
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
        continent: "Asien · Ozeanien",
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
        type: "Produktion",
        country: "Australia",
        continent: "Asien · Ozeanien",
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
        type: "Produktion Facility",
        country: "USA",
        continent: "Amerika",
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
        type: "Produktion Facility",
        country: "USA",
        continent: "Amerika",
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
        type: "Vertrieb",
        country: "USA",
        continent: "Amerika",
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
        type: "Vertrieb",
        country: "Germany",
        continent: "Europa",
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
        type: "Produktion Facilit",
        country: "Poland",
        continent: "Europa",
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

let map; // 전역 map 객체
let infowindow; // 인포윈도우 전역 선언 (중복 방지)

let mapFilterList = document.querySelectorAll(".map-filter-list > li");
let pcInfoBox = document.querySelector(".map-info.pc-only .map-info-content-box");
let moInfoBox = document.querySelector(".map-info.mo-only .map-info-content-box");

function bindEvents() {
    // 글로벌 네트워크
    let networkMap = document.querySelector(".map-conts-area");

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
            });
        });

        mapCloseBtn.addEventListener("click", function (e) {
            const targetMap = e.currentTarget.closest(".map-info");
            const targetContinent = targetMap.querySelector(".map-info-content-box").dataset.continent;
            // console.log(targetContinent);

            targetMap.classList.remove("on");

            // mapImg.classList.remove("on");
            // mapMarking.style.display = "none";
            mapInfoItem.forEach((item) => {
                item.classList.remove("active");
            });

            if (targetContinent == "Korea") {
                map.setCenter({ lat: 36.5, lng: 127.5 });
                map.setZoom(5);
            } else if (targetContinent == "Asien · Ozeanien") {
                map.setCenter({ lat: 34.0479, lng: 100.6197 });
                map.setZoom(3);
            } else if (targetContinent == "Amerika") {
                map.setCenter({ lat: 39.63935570747691, lng: -101.3754683869087 });
                map.setZoom(4);
            } else if (targetContinent == "Europa") {
                map.setCenter({ lat: 54.526, lng: 15.2551 });
                map.setZoom(5.5);
            } else {
                map.setCenter({ lat: 37.5266681, lng: 126.9271165 });
                map.setZoom(2);
            }
        });
    }
}

function initMap() {
    const styledMapType = new google.maps.StyledMapType([
        {
            featureType: "poi",
            elementType: "labels.icon",
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

    const makerIcon = new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_red.svg", null, null, null, new google.maps.Size(50, 57)); //지도 마커 아이콘 변경시 해당 소스 변경 필요

    infowindow = new google.maps.InfoWindow(); // 하나의 인포윈도우 재사용

    // 마커 생성 및 클릭 이벤트
    locations.forEach((location) => {
        const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(location.lat, location.lng),
            icon: makerIcon,
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
            const targetLocation = locations.find((loc) => loc.place === clickedText);

            if (targetLocation) {
                map.setCenter(new google.maps.LatLng(targetLocation.lat, targetLocation.lng));
                map.setZoom(18);

                // ✅ active 클래스 적용
                listItems.forEach((el) => el.classList.remove("active"));
                li.classList.add("active");
                li.closest(".map-info-item").closest(".map-info").classList.add("on");

                html = "";

                html += '<div class="info-content-head">';
                html += '   <ul class="sort">';
                if (targetLocation.type === "Hauptsitz") {
                    // 본사
                    html += '       <li class="filter-type1">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "F&E") {
                    // R&D
                    html += '       <li class="filter-type2">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "Produktion" || "JV" || "Produktion Facility") {
                    //생산
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
                    html += '       <img src="../../../' + targetLocation.img + '" alt="" />';
                    html += "   </div>";
                }
                html += '   <div class="sns-area">';
                html += "       <ul>";
                if (targetLocation.home) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_sns_home.svg" alt="home"></a></li>';
                }
                if (targetLocation.facebook) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_facebook.svg" alt="facebook"></a></li>';
                }
                if (targetLocation.insta) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_insta.svg" alt="instagram"></a></li>';
                }
                if (targetLocation.linkedin) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_in.svg" alt="linkedin"></a></li>';
                }
                if (targetLocation.youtube) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_youtube.svg" alt="youtube"></a></li>';
                }
                if (targetLocation.blog) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_blog.svg" alt="blog"></a></li>';
                }
                html += "       </ul>";
                html += "   </div>";
                html += "</div>";

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

                html += '<div class="info-content-head" style="text-align:center; margin:100% auto;">';
                html += `"${clickedText}" No location or information corresponding to can be found.`;
                html += "</div>";

                if (pcInfoBox) pcInfoBox.innerHTML = html;
                if (moInfoBox) moInfoBox.innerHTML = html;
            }
        });
    });
}

// ✅ 기능 1: 유형 필터
mapFilterList.forEach((button) => {
    button.addEventListener("click", function (e) {
        const filterType = button.className.replace("filter-type", "").trim(); // 1~4
        let typeMap = { 1: "Hauptsitz", 2: "F&E", 3: "Produktion", 4: "Vertrieb" };
        const selectedType = typeMap[filterType];

        // 지도내 유형 필터 선택한 값에 대한 텍스트 우측 selectbox에 활성화 내용 추가
        document.querySelector(".map-info.pc-only .map-info-list .select-cate button").innerText = selectedType;
        document.querySelector(".map-info.pc-only .map-info-list .select-cate button").classList.add("on");

        const filtered = locations.filter((loc) => loc.type === selectedType);
        clearMarkers();
        filtered.forEach((loc) => {
            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(loc.lat, loc.lng),
                icon: new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_red.svg", null, null, null, new google.maps.Size(50, 57)),
                title: loc.place,
            });
            markers.push(marker);

            marker.addListener("click", () => {
                map.setCenter(marker.getPosition());
                map.setZoom(15);

                // 마커클릭시, 노출되는 infowindow
                // infowindow 레이어팝업 미노출 : 노출 필요 시 주석해제
                // infowindow.setContent(`<strong>${location.place}</strong>`);
                // infowindow.open(map, marker);
            });
        });

        updateInfoList(filtered);
    });
});

// ✅ 기능 2: 탭 클릭 시 지역 필터
document.querySelectorAll(".netw .tab-category .tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".netw .tab-category .tab").forEach((el) => el.classList.remove("on"));
        tab.classList.add("on");

        const tabId = tab.id;
        const tabContryText = document.querySelector(`#${tabId} > button`).innerText;
        console.log(tabContryText);

        let regionFilter = [];
        let center, zoom;

        switch (tabId) {
            case "tab2": // 한국
                regionFilter = ["Seoul", "Gwacheon", "Cheongju", "Seocho", "Daejeon"];
                center = { lat: 36.5, lng: 127.5 };
                zoom = 7;
                break;
            case "tab3": // 아시아 오세아니아
                regionFilter = ["China", "Japan", "Taiwan", "India", "Indonesia", "Australia"];
                center = { lat: 34.0479, lng: 100.6197 };
                zoom = 3;
                break;
            case "tab4": // 아메리카
                regionFilter = ["USA"];
                center = { lat: 39.6393, lng: -101.3754 };
                zoom = 4;
                break;
            case "tab5": // 유럽
                regionFilter = ["Germany", "Poland"];
                center = { lat: 54.526, lng: 15.2551 };
                zoom = 5;
                break;
            default: // 전체
                regionFilter = []; // 전체 보여주기
                center = null;
                zoom = null;
        }

        let filtered = regionFilter.length > 0 ? locations.filter((loc) => regionFilter.includes(loc.country)) : locations;

        clearMarkers();
        filtered.forEach((loc) => {
            const marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(loc.lat, loc.lng),
                icon: new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_red.svg", null, null, null, new google.maps.Size(50, 57)),
                title: loc.place,
            });
            markers.push(marker);

            marker.addListener("click", () => {
                map.setCenter(marker.getPosition());
                map.setZoom(15);

                // 마커클릭시, 노출되는 infowindow
                // infowindow 레이어팝업 미노출 : 노출 필요 시 주석해제
                // infowindow.setContent(`<strong>${location.place}</strong>`);
                // infowindow.open(map, marker);
            });
        });

        // 🔹 전체 탭일 때는 fitBounds 로 자동 줌아웃
        if (tabId === "tab1") {
            let bounds = new google.maps.LatLngBounds();
            markers.forEach((m) => bounds.extend(m.getPosition()));
            map.fitBounds(bounds);
        } else {
            map.setCenter(center);
            map.setZoom(zoom);
        }

        updateInfoList(filtered);
    });
});

// li 클릭 → 지도 이동
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".map-info-item li").forEach(function (li) {
        li.addEventListener("click", function () {
            const clickedText = li.textContent.trim();
            const targetLocation = locations.find((loc) => loc.place === clickedText);

            // 1. li.active 클래스 처리
            document.querySelectorAll(".map-info-item li").forEach((el) => el.classList.remove("active"));
            li.classList.add("active");

            if (targetLocation) {
                const targetLatLng = new google.maps.LatLng(targetLocation.lat, targetLocation.lng);
                map.setCenter(targetLatLng);
                map.setZoom(15);

                // 리스트 내 place 클릭시, 노출되는 infowindow
                // infowindow.setContent(`<strong>${targetLocation.place}</strong>`);
                // infowindow.setPosition(targetLatLng);
                // infowindow.open(map);

                // 2. html 초기화 및 동적 생성
                let html = "";

                html += '<div class="info-content-head">';
                html += '   <ul class="sort">';
                if (targetLocation.type === "Hauptsitz") {
                    // 본사
                    html += '       <li class="filter-type1">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "F&E") {
                    // R&D
                    html += '       <li class="filter-type2">' + targetLocation.type + "</li>";
                } else if (targetLocation.type === "Vertrieb") {
                    //생산
                    html += '       <li class="filter-type4">' + targetLocation.type + "</li>";
                } else {
                    //판매
                    html += '       <li class="filter-type3">' + targetLocation.type + "</li>";
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
                    html += '       <img src="../../../' + targetLocation.img + '" alt="" />';
                    html += "   </div>";
                }
                html += '   <div class="sns-area">';
                html += "       <ul>";
                if (targetLocation.home) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_sns_home.svg" alt="home"></a></li>';
                }
                if (targetLocation.facebook) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_facebook.svg" alt="facebook"></a></li>';
                }
                if (targetLocation.insta) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_insta.svg" alt="instagram"></a></li>';
                }
                if (targetLocation.linkedin) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_in.svg" alt="linkedin"></a></li>';
                }
                if (targetLocation.youtube) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_youtube.svg" alt="youtube"></a></li>';
                }
                if (targetLocation.blog) {
                    html += '<li><a href="#"><img src="../../../inc/images/icon/icon_blog.svg" alt="blog"></a></li>';
                }
                html += "       </ul>";
                html += "   </div>";
                html += "</div>";

                // 3. PC + Mobile info 영역 모두 갱신
                if (pcInfoBox) pcInfoBox.innerHTML = html;
                if (moInfoBox) moInfoBox.innerHTML = html;
            } else {
                // console.log(`"${clickedText}" 에 해당하는 위치와 정보를 찾을 수 없습니다.`);

                let html = "";

                html += '<div class="info-content-head" style="text-align:center; margin:100% auto;">';
                html += `"${clickedText}" No location or information corresponding to can be found.`;
                html += "</div>";

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

            const selectedText = option.textContent.trim(); // '전체', '본사', 'R&D' 등

            // 2. 필터링
            let filtered = [];
            if (selectedText === "All") {
                filtered = locations;
            } else {
                filtered = locations.filter((loc) => loc.type === selectedText);
            }

            // 3. 마커 리셋 및 새로 그림
            clearMarkers();
            filtered.forEach((loc) => {
                const marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(loc.lat, loc.lng),
                    icon: new google.maps.MarkerImage("../../../inc/images/icon/icon_mark_red.svg", null, null, null, new google.maps.Size(50, 57)),
                    title: loc.place,
                });
                markers.push(marker);

                marker.addListener("click", () => {
                    map.setCenter(marker.getPosition());
                    map.setZoom(15);

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
