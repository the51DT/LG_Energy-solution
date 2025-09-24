const locations = [
    {
        place: "LG Energy Solution",
        lat: 37.5266681,
        lng: 126.9271165,
        address: "108 Yeoui-daero, Yeongdeungpo-gu, Seoul",
        tel: "+82-2-3777-1114",
        sort: "",
        type: "Headquarter",
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
        type: "Manufacturing",
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
        type: "Manufacturing",
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
        type: "Manufacturing",
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
        type: "Manufacturing",
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
        type: "Manufacturing",
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
        type: "Marketing",
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
        type: "Marketing",
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
        type: "Marketing",
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
        type: "Manufacturing",
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
        type: "Manufacturing Facility",
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
        type: "Manufacturing Facility",
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
        type: "Sales",
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
        type: "Sales",
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
        type: "Manufacturing Facilit",
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

let map;
let markers = [];
let pcInfoBox = document.querySelector(".map-info.pc-only .map-info-content-box");
let moInfoBox = document.querySelector(".map-info.mo-only .map-info-content-box");

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

            if (targetContinent == "韩国") {
                map.setView([36.5, 127.5], 3);
            } else if (targetContinent == "亚洲 · 大洋洲") {
                map.setView([34.0479, 100.6197], 3);
            } else if (targetContinent == "美洲") {
                map.setView([39.63935570747691, -101.3754683869087], 3);
            } else if (targetContinent == "欧洲") {
                map.setView([54.526, 15.2551], 3);
            } else {
                map.setView([37.5266681, 126.9271165], 2);
            }
        });
    }
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
    const markerIcon = L.icon({
        iconUrl: "../../../inc/images/icon/icon_mark_red.svg",
        iconSize: [50, 57],
        iconAnchor: [25, 57],
    });

    const marker = L.marker([location.lat, location.lng], { icon: markerIcon }).addTo(map);

    marker.on("click", () => {
        map.setView([location.lat, location.lng], 13);
        updateInfoBox(location);
    });

    markers.push(marker);
}

function clearMarkers() {
    markers.forEach((m) => map.removeLayer(m));
    markers = [];
}

// ===== InfoBox 업데이트 =====
function updateInfoBox(targetLocation) {
    let html = "";

    html += '<div class="info-content-head">';
    html += "   <ul class='sort'>";
    if (targetLocation.type === "Headquarter") {
        html += "       <li class='filter-type1'>" + targetLocation.type + "</li>";
    } else if (targetLocation.type === "R&D") {
        html += "       <li class='filter-type2'>" + targetLocation.type + "</li>";
    } else if (targetLocation.type === "Manufacturing" || targetLocation.type === "JV" || targetLocation.type === "Manufacturing Facility") {
        html += "       <li class='filter-type3'>" + targetLocation.type + "</li>";
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
        html += '       <img src="../../../' + targetLocation.img + '" alt="" />';
        html += "   </div>";
    }
    html += '   <div class="sns-area"><ul>';
    if (targetLocation.home) html += '<li><a href="#"><img src="../../../inc/images/icon/icon_sns_home.svg" alt="home"></a></li>';
    if (targetLocation.facebook) html += '<li><a href="#"><img src="../../../inc/images/icon/icon_facebook.svg" alt="facebook"></a></li>';
    if (targetLocation.insta) html += '<li><a href="#"><img src="../../../inc/images/icon/icon_insta.svg" alt="instagram"></a></li>';
    if (targetLocation.linkedin) html += '<li><a href="#"><img src="../../../inc/images/icon/icon_in.svg" alt="linkedin"></a></li>';
    if (targetLocation.youtube) html += '<li><a href="#"><img src="../../../inc/images/icon/icon_youtube.svg" alt="youtube"></a></li>';
    if (targetLocation.blog) html += '<li><a href="#"><img src="../../../inc/images/icon/icon_blog.svg" alt="blog"></a></li>';
    html += "   </ul></div></div>";

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
document.querySelectorAll(".map-filter-list > li button").forEach((btn) => {
    btn.addEventListener("click", function () {
        const selectedText = this.textContent.trim();

        let typeMap = { 本社: "Headquarter", "R&D": "R&D", 生产: "Manufacturing", 销售: "Marketing" };
        const selectedType = typeMap[selectedText] || "";

        let filtered = locations.filter((loc) => loc.type === selectedType);

        renderMarkers(filtered);
        updateInfoList(filtered);

        bindEvents();
    });
});

// ===== Selectbox 필터 (PC/MO 공통) =====
document.querySelectorAll(".map-info .select-menu a").forEach((option) => {
    option.addEventListener("click", function () {
        const selectedText = option.textContent.trim();
        document.querySelectorAll(".map-info .select-menu a").forEach((el) => el.classList.remove("active"));
        option.classList.add("active");

        let filtered = [];
        if (selectedText === "全部" || selectedText === "All") {
            filtered = locations;
        } else if (selectedText === "本社") {
            filtered = locations.filter((loc) => loc.type === "Headquarter");
        } else if (selectedText === "R&D") {
            filtered = locations.filter((loc) => loc.type === "R&D");
        } else if (selectedText === "生产") {
            filtered = locations.filter((loc) => loc.type === "Manufacturing");
        } else if (selectedText === "销售") {
            filtered = locations.filter((loc) => loc.type === "Marketing");
        }

        renderMarkers(filtered);
        updateInfoList(filtered);
    });
});

// ===== 대륙별 탭 =====
document.querySelectorAll(".tab-category .tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab-category .tab").forEach((el) => el.classList.remove("on"));
        tab.classList.add("on");

        const tabId = tab.id;
        let regionFilter = [];
        let center, zoom;

        switch (tabId) {
            case "tab2": // 한국
                regionFilter = ["Seoul", "Gwacheon", "Cheongju", "Seocho", "Daejeon"];
                center = [36.5, 127.5];
                zoom = 7;
                break;
            case "tab3": // 아시아·오세아니아
                regionFilter = ["China", "Japan", "Taiwan", "India", "Indonesia", "Australia"];
                center = [34.0479, 100.6197];
                zoom = 3;
                break;
            case "tab4": // 미주
                regionFilter = ["USA"];
                center = [39.6393, -101.3754];
                zoom = 4;
                break;
            case "tab5": // 유럽
                regionFilter = ["Germany", "Poland"];
                center = [54.526, 15.2551];
                zoom = 5;
                break;
            default: // 전체
                regionFilter = [];
        }

        let filtered = regionFilter.length > 0 ? locations.filter((loc) => regionFilter.includes(loc.country)) : locations;

        renderMarkers(filtered);
        updateInfoList(filtered);
        bindEvents();

        if (regionFilter.length === 0) {
            let bounds = L.latLngBounds(filtered.map((loc) => [loc.lat, loc.lng]));
            map.fitBounds(bounds);
        } else {
            map.setView(center, zoom);
        }
    });
});

document.addEventListener("DOMContentLoaded", initMap);