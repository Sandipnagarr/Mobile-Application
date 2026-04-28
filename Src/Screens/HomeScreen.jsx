// import React, { useContext, useEffect, useState, useRef } from "react";
// import { ScrollView, ActivityIndicator, View } from "react-native";
// import { WebView } from "react-native-webview";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import ReportScreen from "./ReportScreen";
// import ForecastCards from "./forcastcards";
// import { WeatherContext } from "../context/WeatherContext";
// import { fetchWeather } from "../api/Api"; //  NEW
// import SearchBar from "../component/searchbar.jsx";
// import IDW from "../component/IDW.jsx";

// export default function HomeScreen() {
//   const {
//     data,
//     setData,
//     location,
//     setLocation,
//     locationName,
//     setLocationName,
//   } = useContext(WeatherContext);
//   const [token, setToken] = useState(null);
//   const webViewRef = useRef(null);

//   useEffect(() => {
//     AsyncStorage.getItem("token").then(setToken);
//   }, []);
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const userString = await AsyncStorage.getItem("user");
//         const parsedUser = userString ? JSON.parse(userString) : null;

//         const loc = parsedUser?.location;
//         const name = parsedUser?.location_name;

//         if (loc) {
//           setLocation(loc);
//           setLocationName(name);
//           // store in context
//         }
//       } catch (e) {
//         console.log("User load error:", e);
//       }
//     };

//     loadUser();
//   }, []);

//   // async function fetchRainfallData() {
//   //   try {
//   //     const response = await fetch(
//   //       "https://mlinfomap.org/mlwapi/get-current-weather",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: "Bearer " + TOKEN,
//   //         },
//   //         body: JSON.stringify({
//   //           params: {
//   //             selectedDate: new Date().toISOString(), // you can change later
//   //           },
//   //         }),
//   //       },
//   //     );

//   //     const result = await response.json();

//   //     if (!result?.status || !Array.isArray(result.data)) {
//   //       console.log("❌ Invalid API response", result);
//   //       return [];
//   //     }

//   //     // 🔥 Convert to IDW usable format
//   //     return result.data.map((item) => ({
//   //       lon: parseFloat(item.lon || item.longitude),
//   //       lat: parseFloat(item.lat || item.latitude),
//   //       value: parseFloat(item.precip || item.rain || item.rainfall || 0),
//   //     }));
//   //   } catch (error) {
//   //     console.log("❌ IDW API error:", error);
//   //     return [];
//   //   }
//   // }

//   // useEffect(() => {
//   //   fetchRainfallData();
//   // }, []);
//   //  NEW: fetch weather whenever location changes
//   useEffect(() => {
//     if (!location) return;

//     const getWeather = async () => {
//       try {
//         setData(null);
//         const response = await fetchWeather(location);
//         setData(response);
//       } catch (e) {
//         console.log("Weather error:", e);
//       }
//     };

//     getWeather();
//   }, [location]);

//   if (!token) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

// //   const html = `
// // <!DOCTYPE html>
// // <html>
// // <head>
// // <meta name="viewport" content="width=device-width, initial-scale=1.0">

// // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
// // <script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>

// // <!-----------------------------------------ol-ext----------------->
// // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol-ext/dist/ol-ext.min.css">
// // <script src="https://cdn.jsdelivr.net/npm/ol-ext/dist/ol-ext.min.js"></script>

// // // <script>
// // // setTimeout(() => {
// // //   console.log("OL:", typeof ol);
// // //   console.log("OL-EXT:", typeof ol.ext);

// // //   if (typeof ol !== "undefined" && ol.ext) {

// // //   } else {

// // //   }
// // // }, 1000);
// // // </script>
// // <style>
// // html, body { margin:0; padding:0; height:100%; }
// // #map { width:100%; height:100%; }

// // .dropdown-container {
// //   position: absolute;
// //   top: 10px;
// //   right: 10px;
// //   z-index: 999;
// // }

// // .dropdown-container select {
// //   padding: 8px;
// //   border-radius: 8px;
// //   background: white;
// // }
// // </style>
// // </head>

// // <body>
// // <div class="dropdown-container">
// //   <select id="stateSelect" onchange="onStateChange()">
// //     <option>Loading...</option>
// //   </select>
// // </div>

// // <div id="map"></div>

// // <script>
// // const TOKEN = "${token}";
// // console.log("TOKEN:", TOKEN);

// // let map;
// // let source;
// // let indiaSource = new ol.source.Vector();
// // let stateSource = new ol.source.Vector();
//   // let districtSource = new ol.source.Vector();

// // let boundaryLoaded = false;

// // let indiaLayer = new ol.layer.Vector({
// //   source: indiaSource,
// // });

// // let stateLayer = new ol.layer.Vector({
// //   source: stateSource,
// //   style: new ol.style.Style({
// //     stroke: new ol.style.Stroke({
// //       color: "rgba(0, 0, 255, 0.8)", // Blue with opacity
// //       width: 2,
// //     }),
// //     fill: new ol.style.Fill({
// //       color: "rgba(0, 0, 255, 0.1)" // Transparent blue fill
// //     })
// //   })
// // });
// // let districtLayer = new ol.layer.Vector({
// //   source: districtSource,
// //   style: new ol.style.Style({
// //   stroke: new ol.style.Stroke({
// //       color: "rgba(3, 53, 28, 0.8)", //
// //       width: 2,
// //     }),
// //     fill: new ol.style.Fill({
// //       color: "rgba(255, 0, 0, 0.2)" //  transparent fill
// //     })
// //   })
// // });

// // function loadCircles() {
// //   fetch("https://mlinfomap.org/mlwapi/get_circle_list", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       "Authorization": "Bearer " + TOKEN
// //     },
// //     body: JSON.stringify({ circle: "All India" })
// //   })
// //   .then(res => {

// //     return res.json();
// //   })
// //   .then(res => {

// //     const circleOptions = res.data || [];

// //     const select = document.getElementById("stateSelect");
// //     select.innerHTML = "";

// //     const defaultOpt = document.createElement("option");
// //     defaultOpt.value = "All India";
// //     defaultOpt.text = "All India";
// //     select.appendChild(defaultOpt);

// //     circleOptions.forEach(opt => {
// //       const option = document.createElement("option");
// //       option.value = opt.label;
// //       option.text = opt.full_name;
// //       option.setAttribute("data-coords", opt.value);
// //       option.setAttribute("data-location-name", opt.location_name);
// //       select.appendChild(option);
// //     });

// //     loadBoundary();
// //     loadDistrict();
// //   })
// //   .catch(err => console.log("Circle API ERROR", err));
// // }

// // //  DROPDOWN CHANGE
// // function onStateChange() {
// //   const select = document.getElementById("stateSelect");
// //   const selected = select.value;

// //   const coords = select.options[select.selectedIndex].getAttribute("data-coords");
// //   const name=select.options[select.selectedIndex].getAttribute("data-location-name");
// //  window.ReactNativeWebView.postMessage(
// //    JSON.stringify({
// //      type: "LOCATION_CHANGE",
// //      coords: coords,
// //      name:name
// //    }),
// //  );

// //   // clear layers
// //   indiaSource.clear();
// //   stateSource.clear();
// //   districtSource.clear();

// //   if (selected === "All India") {
// //     loadBoundary();
// //     loadDistrict();
// //   } else {
// //     loadState(selected);

// //     //  zoom to location (NEW)
// //     if (coords) {
// //       const [lon, lat] = coords.split(",").map(Number);
// //       map.getView().animate({
// //         center: ol.proj.fromLonLat([lon, lat]),
// //         zoom: 6,
// //         duration: 800
// //       });
// //     }
// //   }
// // }

// // //  FIXED STATE FUNCTION
// // function loadState(circle) {
// //   fetch("https://mlinfomap.org/mlwapi/get_state_boundary", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       "Authorization": "Bearer " + TOKEN
// //     },
// //     body: JSON.stringify({ circle: circle })
// //   })
// //   .then(res => res.json())
// //   .then(res => {

// //     if (res.msg) {
// //       console.log("API ERROR:", res.msg);
// //       return;
// //     }

// //     const data = res.data || res;

// //     const features = new ol.format.GeoJSON().readFeatures(data, {
// //       dataProjection: "EPSG:4326",
// //       featureProjection: "EPSG:3857"
// //     });

// //     stateSource.addFeatures(features);

// //     map.getView().fit(stateSource.getExtent(), {
// //       duration: 800,
// //       padding: [20,20,20,20]
// //     });
// //   })
// //   .catch(err => {
// //     console.log("State API ERROR ❌", err);
// //   });
// // }
// // function loadBoundary() {
// //     fetch("https://mlinfomap.org/mlwapi/get_india_boundary", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "Authorization": "Bearer " + TOKEN
// //       },
// //       body: JSON.stringify({ circle: "All India" }),
// //     })
// //     .then(res => res.json())
// //     .then(res => {

// //       if (res.msg) {
// //         console.log("API ERROR:", res.msg);
// //         return;
// //       }

// //       const data = res.data || res;

// //       const features = new ol.format.GeoJSON().readFeatures(data, {
// //         dataProjection: "EPSG:4326",
// //         featureProjection: "EPSG:3857"
// //       });

// //       indiaSource.clear();
// //       indiaSource.addFeatures(features);

// //       boundaryLoaded = true;

// //       map.getView().fit(indiaSource.getExtent(), {
// //         duration: 800,
// //         padding: [20,20,20,20]
// //       });
// //     })
// //     .catch(err => {
// //       console.log("API ERROR ❌", err);
// //     });

// //   }

// // function loadDistrict() {

// //   fetch("https://mlinfomap.org/mlwapi/get_district_boundary", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       "Authorization": "Bearer " + TOKEN
// //     },
// //     body: JSON.stringify({ circle: "All India" }),
// //   })
// //   .then(res => res.json())
// //   .then(res => {

// //     if (res.msg) {
// //       console.log("API ERROR:", res.msg);
// //       return;
// //     }

// //     const data = res.data || res;

// //     const features = new ol.format.GeoJSON().readFeatures(data, {
// //       dataProjection: "EPSG:4326",
// //       featureProjection: "EPSG:3857"
// //     });

// //     districtSource.clear();
// //     districtSource.addFeatures(features);

// //     map.getView().fit(districtSource.getExtent(), {
// //       duration: 800,
// //       padding: [20,20,20,20]
// //     });
// //   })
// //   .catch(err => {
// //     console.log("District API ERROR ❌", err);
// //   });
// // }

// // window.onload = function () {

// //   source = new ol.source.Vector();

// //   const layer = new ol.layer.Vector({
// //     source: source
// //   });

// //   map = new ol.Map({
// //     target: "map",
// //     layers: [
// //       new ol.layer.Tile({
// //         source: new ol.source.OSM()
// //       }),
// //       layer,
// //       indiaLayer,
// //       districtLayer,
// //       stateLayer,
// //     ],
// //     view: new ol.View({
// //       center: ol.proj.fromLonLat([77.2090, 28.6139]),
// //       zoom: 5
// //     })
// //   });
// //  // ===== REMOVE HARDCODED HEATMAP =====

// // // ===== ADD THIS =====
// // const heatSource = new ol.source.Vector();

// // const heatLayer = new ol.layer.Heatmap({
// //   source: heatSource,
// //   blur: 35,
// //   radius: 25
// // });

// // map.addLayer(heatLayer);

// // function loadRainHeatmap() {

// //   // ✅ MATCH ANGULAR DATE FORMAT
// //  const now = new Date();

// // const selectedDate =
// //   now.getFullYear() + "-" +
// //   String(now.getMonth() + 1).padStart(2, "0") + "-" +
// //   String(now.getDate()).padStart(2, "0") + " " +
// //   String(now.getHours()).padStart(2, "0") + ":00";

// // console.log("📅 SENDING DATE:", selectedDate);
// // // console.log("📅 SENDING TOKEN:", TOKEN);

// // fetch("https://mlinfomap.org/mlwapi/get-current-weather", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //     "Authorization": "Bearer " + TOKEN
// //   },
// //   body: JSON.stringify(
// //   {params : {
// //     selectedDate: selectedDate   // ✅ FIXED (NO params)
// // }})
// // })
// // .then(res => res.json())
// // .then(res => {

// //   console.log("🔥 API RESPONSE:", JSON.stringify(res));
// //   console.log("DATA LENGTH:", res?.data?.length);

// //   if (!res?.data || res.data.length === 0) {
// //     console.log("❌ No data from API");
// //     return;
// //   }

// //   const data = res.data;

// //   const maxRain = Math.max(...data.map(x => +x.chance_of_rain || 0));

// //   heatSource.clear();

// //   data.forEach(item => {

// //     const lon = parseFloat(item.longitude || item.lon);
// //     const lat = parseFloat(item.latitude || item.lat);
// //     const rain = parseFloat(item.chance_of_rain || 0);

// //     if (isNaN(lon) || isNaN(lat)) return;

// //     const percent = maxRain === 0 ? 0 : (rain / maxRain);

// //     const feature = new ol.Feature({
// //       geometry: new ol.geom.Point(
// //         ol.proj.fromLonLat([lon, lat])
// //       ),
// //       weight: percent
// //     });

// //     heatSource.addFeature(feature);
// //   });

// //   console.log("✅ FEATURES:", heatSource.getFeatures().length);
// // })
// // }

// // // CALL IT
// // loadRainHeatmap();

// //   loadCircles(); //  ONLY THIS (IMPORTANT)
// // };

// // // added for search functionality (NEW)

// // function handleSearchMessage(event) {
// //   try {
// //     const msg = JSON.parse(event.data);

// //     console.log("MESSAGE RECEIVED:", msg); // 🔥 debug

// //     if (msg.type === "SEARCH_LOCATION") {

// //       const lon = parseFloat(msg.lon);
// //       const lat = parseFloat(msg.lat);

// //       const coords = ol.proj.fromLonLat([lon, lat]);

// //       const view = map.getView();

// //       //  move map
// //       view.setCenter(coords);
// //       view.setZoom(13);

// //       //  remove old marker
// //       source.clear();

// //       //  create marker
// //       const marker = new ol.Feature({
// //         geometry: new ol.geom.Point(coords)
// //       });

// //       marker.setStyle(
// //         new ol.style.Style({
// //        image: new ol.style.Icon({
// //   src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
// //   scale: 0.05,
// //   anchor: [0.5, 1],
// // })
// //         })
// //       );

// //       source.addFeature(marker);
// //     }

// //   } catch (e) {
// //     console.log("Search message error:", e);
// //   }
// // }

// // //  VERY IMPORTANT (add BOTH)
// // window.addEventListener("message", handleSearchMessage);
// // document.addEventListener("message", handleSearchMessage);

// // //  region idw...................

// // function getcurrentweather(circle) {
// //   fetch("https://mlinfomap.org/mlwapi/get_state_boundary", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       "Authorization": "Bearer " + TOKEN
// //     },
// //     body: JSON.stringify({ circle: circle })
// //   })
// //   .then(res => res.json())
// //   .then(res => {

// //     if (res.msg) {
// //       console.log("API ERROR:", res.msg);
// //       return;
// //     }

// //     const data = res.data || res;

// //     const features = new ol.format.GeoJSON().readFeatures(data, {
// //       dataProjection: "EPSG:4326",
// //       featureProjection: "EPSG:3857"
// //     });

// //     stateSource.addFeatures(features);

// //     map.getView().fit(stateSource.getExtent(), {
// //       duration: 800,
// //       padding: [20,20,20,20]
// //     });
// //   })
// //   .catch(err => {
// //     console.log("State API ERROR ❌", err);
// //   });
// // }

// // </script>

// // </body>
// // </html>
// //   `;

//   const html = `
// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
// <script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>

// <!-- OL-EXT (REQUIRED FOR IDW) -->
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol-ext/dist/ol-ext.min.css">
// <script src="https://cdn.jsdelivr.net/npm/ol-ext/dist/ol-ext.min.js"></script>

// <style>
// html, body { margin:0; padding:0; height:100%; }
// #map { width:100%; height:100%; }

// .dropdown-container {
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   z-index: 999;
// }
// </style>
// </head>

// <body>
// <div class="dropdown-container">
//   <select id="stateSelect" onchange="onStateChange()">
//     <option>Loading...</option>
//   </select>
// </div>

// <div id="map"></div>

// <script>
// const TOKEN = "${token}";

// let map;
// let indiaSource = new ol.source.Vector();
// let stateSource = new ol.source.Vector();
// let districtSource = new ol.source.Vector();

// let indiaLayer = new ol.layer.Vector({ source: indiaSource });
// let stateLayer = new ol.layer.Vector({ source: stateSource });
// let districtLayer = new ol.layer.Vector({ source: districtSource });

// /* =========================
//    🔥 IDW SETUP (ONLY CHANGE)
// ========================= */

// const vectorSourceRain = new ol.source.Vector();

// const idwSource = new ol.source.IDW({
//   source: vectorSourceRain,
//   weight: 'count'
// });

// const idwLayer = new ol.layer.Image({
//   source: idwSource
// });

// /* ========================= */

// function loadBoundary() {
//   fetch("https://mlinfomap.org/mlwapi/get_india_boundary", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + TOKEN
//     },
//     body: JSON.stringify({ circle: "All India" }),
//   })
//   .then(res => res.json())
//   .then(res => {

//     const data = res.data || res;

//     const features = new ol.format.GeoJSON().readFeatures(data, {
//       dataProjection: "EPSG:4326",
//       featureProjection: "EPSG:3857"
//     });

//     indiaSource.clear();
//     indiaSource.addFeatures(features);

//     map.getView().fit(indiaSource.getExtent(), {
//       duration: 800,
//       padding: [20,20,20,20]
//     });

//     // 🔥 APPLY BOUNDARY TO IDW
//     idwLayer.setExtent(indiaSource.getExtent());
//   });
// }

// function loadDistrict() {
//   fetch("https://mlinfomap.org/mlwapi/get_district_boundary", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + TOKEN
//     },
//     body: JSON.stringify({ circle: "All India" }),
//   })
//   .then(res => res.json())
//   .then(res => {

//     const data = res.data || res;

//     const features = new ol.format.GeoJSON().readFeatures(data, {
//       dataProjection: "EPSG:4326",
//       featureProjection: "EPSG:3857"
//     });

//     districtSource.clear();
//     districtSource.addFeatures(features);
//   });
// }

// /* =========================
//    🔥 IDW DATA LOAD
// ========================= */
// function cropIDWToIndia() {

//   const features = indiaSource.getFeatures();
//   if (!features.length) return;

//   // 🔥 merge all geometries
//   const indiaGeoms = features.map(f => f.getGeometry());

//   const allFeatures = vectorSourceRain.getFeatures();

//   allFeatures.forEach(f => {

//     const coord = f.getGeometry().getCoordinates();

//     // check against ALL polygons
//     const inside = indiaGeoms.some(g => g.intersectsCoordinate(coord));

//     if (!inside) {
//       vectorSourceRain.removeFeature(f);
//     }
//   });

//   console.log("✅ Proper India crop applied");
// }

// function loadRainIDW() {

//   const now = new Date();

//   const selectedDate =
//     now.getFullYear() + "-" +
//     String(now.getMonth() + 1).padStart(2, "0") + "-" +
//     String(now.getDate()).padStart(2, "0") + " " +
//     String(now.getHours()).padStart(2, "0") + ":00";

//   fetch("https://mlinfomap.org/mlwapi/get-current-weather", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + TOKEN
//     },
//     body: JSON.stringify({
//       params: {
//         selectedDate: selectedDate
//       }
//     })
//   })
//   .then(res => res.json())
//   .then(res => {

//     if (!res?.data || res.data.length === 0) return;

//     const data = res.data;

//     const maxRain = Math.max(...data.map(x => +x.chance_of_rain || 0));

//     vectorSourceRain.clear();

//     data.forEach(item => {

//       const lon = parseFloat(item.longitude || item.lon);
//       const lat = parseFloat(item.latitude || item.lat);
//       const rain = parseFloat(item.chance_of_rain || 0);

//       if (isNaN(lon) || isNaN(lat)) return;

//       const percent = maxRain === 0 ? 0 : Math.ceil((rain / maxRain) * 100);

//       const feature = new ol.Feature({
//         geometry: new ol.geom.Point(
//           ol.proj.fromLonLat([lon, lat])
//         ),
//         count: percent,
//         total: rain
//       });

//       vectorSourceRain.addFeature(feature);

//     });
//       cropIDWToIndia();

//     console.log("✅ IDW FEATURES:", vectorSourceRain.getFeatures().length);
//   });
// }

// /* ========================= */

// window.onload = function () {

//   map = new ol.Map({
//     target: "map",
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       }),
//       indiaLayer,
//       districtLayer,
//       stateLayer,
//       idwLayer   // 🔥 ADDED IDW
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([77.2090, 28.6139]),
//       zoom: 5
//     })
//   });

//   loadBoundary();
//   loadDistrict();
//   loadRainIDW();
// };
// </script>

// </body>
// </html>
// `;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView>
//         <ReportScreen />
//         <SearchBar webViewRef={webViewRef} />
//         <IDW webViewRef={webViewRef} />
//         <WebView
//           ref={webViewRef}
//           originWhitelist={["*"]}
//           source={{ html }}
//           javaScriptEnabled
//           domStorageEnabled
//           onMessage={(event) => {
//             try {
//               const msg = JSON.parse(event.nativeEvent.data);

//               //  IMPORTANT FIX
//               if (msg.type === "LOCATION_CHANGE") {
//                 console.log("NEW LOCATION:", msg.coords);

//                 setLocation(msg.coords);
//                 setLocationName(msg.name); //  THIS WAS MISSING
//               }
//             } catch (e) {
//               console.log("WEBVIEW:", event.nativeEvent.data);
//             }
//           }}
//           injectedJavaScript={`
//     (function() {
//       const oldLog = console.log;
//       console.log = function(...args) {
//         window.ReactNativeWebView.postMessage(args.join(" "));
//         oldLog.apply(console, args);
//       };
//     })();
//     true;
//   `}
//  />
//         <WebView
//           ref={webViewRef}
//           originWhitelist={["*"]}
//           source={{ html }}
//           javaScriptEnabled
//           domStorageEnabled
//           onMessage={(event) => {
//             try {
//               const msg = JSON.parse(event.nativeEvent.data);

//               //  IMPORTANT FIX
//               if (msg.type === "LOCATION_CHANGE") {
//                 console.log("NEW LOCATION:", msg.coords);

//                 setLocation(msg.coords);
//                 setLocationName(msg.name); //  THIS WAS MISSING
//               }
//             } catch (e) {
//               console.log("WEBVIEW:", event.nativeEvent.data);
//             }
//           }}
//           injectedJavaScript={`
//     (function() {
//       const oldLog = console.log;
//       console.log = function(...args) {
//         window.ReactNativeWebView.postMessage(args.join(" "));
//         oldLog.apply(console, args);
//       };
//     })();
//     true;
//   `}
//           style={{ height: 600 }}
//         />
//         <ForecastCards />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ReportScreen from "./ReportScreen";
import ForecastCards from "./forcastcards";
import { WeatherContext } from "../context/WeatherContext";
import { fetchWeather } from "../api/Api";
import SearchBar from "../component/searchbar.jsx";
import IDW from "../component/IDW.jsx";

const injectedConsoleBridge = `
  (function() {
    const oldLog = console.log;
    console.log = function(...args) {
      window.ReactNativeWebView.postMessage(args.join(" "));
      oldLog.apply(console, args);
    };
  })();
  true;
`;

function buildMapHtml(token) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol-ext/dist/ol-ext.min.css">
<script src="https://cdn.jsdelivr.net/npm/ol-ext/dist/ol-ext.min.js"></script>

<style>
html, body { margin: 0; padding: 0; height: 100%; }
#map { width: 100%; height: 100%; }

.dropdown-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  padding: 6px;
}

.dropdown-container select {
  min-width: 140px;
  border: 0;
  outline: none;
  background: transparent;
  padding: 6px;
}
</style>
</head>

<body>
<div class="dropdown-container">
  <select id="stateSelect" onchange="onStateChange()">
    <option>Loading...</option>
  </select>
</div>

<div id="map"></div>

<script>
const TOKEN = "${token}";
const DEFAULT_PADDING = [20, 20, 20, 20];

let map;
const searchSource = new ol.source.Vector();
const indiaSource = new ol.source.Vector();
const stateSource = new ol.source.Vector();
const districtSource = new ol.source.Vector();
const vectorSourceRain = new ol.source.Vector();
const vectorSourceWind = new ol.source.Vector();
const vectorSourceHumidity = new ol.source.Vector();
const vectorSourceVisibilty = new ol.source.Vector();
const vectorSourceTemprature = new ol.source.Vector();

const searchLayer = new ol.layer.Vector({
  source: searchSource
});

const indiaLayer = new ol.layer.Vector({
  source: indiaSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(175, 16, 238, 0.95)",
      width: 2
    }),
    fill: new ol.style.Fill({
      color: "rgba(175, 16, 238, 0.04)"
    })
  })
});

const stateLayer = new ol.layer.Vector({
  source: stateSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(0, 102, 255, 0.85)",
      width: 2
    }),
    fill: new ol.style.Fill({
      color: "rgba(0, 102, 255, 0.06)"
    })
  })
});

const districtLayer = new ol.layer.Vector({
  source: districtSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(16, 98, 59, 0.55)",
      width: 1
    }),
    fill: new ol.style.Fill({
      color: "rgba(16, 98, 59, 0.02)"
    })
  })
});

const idwLayer = new ol.layer.Image({
  source: new ol.source.IDW({
    source: vectorSourceRain,
    weight: "count"
  }),
  opacity: 0.75
});

function postToReactNative(payload) {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(payload));
  }
}

function hasValidExtent(extent) {
  return Array.isArray(extent) && extent.length === 4 && extent.every(Number.isFinite);
}

function fitSource(source) {
  const extent = source.getExtent();
  if (!hasValidExtent(extent)) return;

  map.getView().fit(extent, {
    duration: 800,
    padding: DEFAULT_PADDING
  });
}

function getBoundaryPolygons() {
  const polygons = [];

  indiaSource.getFeatures().forEach(feature => {
    const geometry = feature.getGeometry();
    if (!geometry) return;

    const type = geometry.getType();

    if (type === "Polygon") {
      polygons.push(geometry);
      return;
    }

    if (type === "MultiPolygon") {
      geometry.getPolygons().forEach(poly => polygons.push(poly));
    }
  });

  return polygons;
}

function cropRainPointsToIndia() {
  const polygons = getBoundaryPolygons();
  if (!polygons.length) return;

  vectorSourceRain.getFeatures().slice().forEach(feature => {
    const coord = feature.getGeometry().getCoordinates();
    const inside = polygons.some(poly => poly.intersectsCoordinate(coord));

    if (!inside) {
      vectorSourceRain.removeFeature(feature);
    }
  });
}

function clipIDWToIndia(event) {
  const ctx = event.context;
  const polygons = getBoundaryPolygons();

  if (!ctx || !map || !polygons.length) return;

  const pixelRatio = event.frameState.pixelRatio || 1;

  ctx.save();
  ctx.beginPath();

  polygons.forEach(poly => {
    poly.getLinearRings().forEach(ring => {
      ring.getCoordinates().forEach((coord, index) => {
        const pixel = map.getPixelFromCoordinate(coord);
        if (!pixel) return;

        const x = pixel[0] * pixelRatio;
        const y = pixel[1] * pixelRatio;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.closePath();
    });
  });

  try {
    ctx.clip("evenodd");
  } catch (error) {
    ctx.clip();
  }
}

idwLayer.on("prerender", clipIDWToIndia);
idwLayer.on("postrender", (event) => {
  if (event.context) {
    try {
      event.context.restore();
    } catch (error) {
      // no-op
    }
  }
});

function loadCircles() {
  return fetch("https://mlinfomap.org/mlwapi/get_circle_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: "All India" })
  })
  .then((res) => res.json())
  .then((res) => {
    const select = document.getElementById("stateSelect");
    const circleOptions = res.data || [];

    select.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "All India";
    defaultOption.text = "All India";
    select.appendChild(defaultOption);

    circleOptions.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.label;
      option.text = optionData.full_name;
      option.setAttribute("data-coords", optionData.value || "");
      option.setAttribute(
        "data-location-name",
        optionData.location_name || optionData.full_name || optionData.label
      );
      select.appendChild(option);
    });
  })
  .catch((error) => {
    console.log("Circle API ERROR", error);
  });
}

function loadBoundary() {
  return fetch("https://mlinfomap.org/mlwapi/get_india_boundary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: "All India" })
  })
  .then((res) => res.json())
  .then((res) => {
    const data = res.data || res;
    const features = new ol.format.GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });

    indiaSource.clear();
    indiaSource.addFeatures(features);

    const extent = indiaSource.getExtent();
    if (hasValidExtent(extent)) {
      idwLayer.setExtent(extent);
      fitSource(indiaSource);
    }

    idwLayer.changed();
    map.render();
  })
  .catch((error) => {
    console.log("Boundary API ERROR", error);
  });
}

function loadState(circle) {
  return fetch("https://mlinfomap.org/mlwapi/get_state_boundary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: circle })
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.msg) {
      console.log("State API ERROR", res.msg);
      return;
    }

    const data = res.data || res;
    const features = new ol.format.GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });

    stateSource.clear();
    stateSource.addFeatures(features);
    fitSource(stateSource);
  })
  .catch((error) => {
    console.log("State API ERROR", error);
  });
}

function loadDistrict(circle = "All India") {
  return fetch("https://mlinfomap.org/mlwapi/get_district_boundary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: circle })
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.msg) {
      console.log("District API ERROR", res.msg);
      return;
    }

    const data = res.data || res;
    const features = new ol.format.GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });

    districtSource.clear();
    districtSource.addFeatures(features);
  })
  .catch((error) => {
    console.log("District API ERROR", error);
  });
}

function loadRainIDW() {
  const now = new Date();
  const selectedDate =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + ":00";

  return fetch("https://mlinfomap.org/mlwapi/get-current-weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({
      params: {
        selectedDate: selectedDate
      }
    })
  })
  .then((res) => res.json())
  .then((res) => {
    if (!res?.data || res.data.length === 0) {
      vectorSourceRain.clear();
      idwLayer.changed();
      map.render();
      return;
    }

    const data = res.data;
    const maxRain = Math.max(...data.map((item) => +item.chance_of_rain || 0));

    vectorSourceRain.clear();

    data.forEach((item) => {
      const lon = parseFloat(item.longitude || item.lon);
      const lat = parseFloat(item.latitude || item.lat);
      const rain = parseFloat(item.chance_of_rain || 0);

      if (isNaN(lon) || isNaN(lat)) return;

      const percent = maxRain === 0 ? 0 : Math.ceil((rain / maxRain) * 100);

      vectorSourceRain.addFeature(
        new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
          count: percent,
          total: rain
        })
      );
    });

    cropRainPointsToIndia();
    idwLayer.changed();
    map.render();

    console.log("India-clipped IDW features:", vectorSourceRain.getFeatures().length);
  })
  .catch((error) => {
    console.log("Rain IDW ERROR", error);
  });
}

function showSearchLocation(lon, lat) {
  if (isNaN(lon) || isNaN(lat)) return;

  const coords = ol.proj.fromLonLat([lon, lat]);

  searchSource.clear();

  const marker = new ol.Feature({
    geometry: new ol.geom.Point(coords)
  });

  marker.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({ color: "#ef4444" }),
        stroke: new ol.style.Stroke({ color: "#ffffff", width: 2 })
      })
    })
  );

  searchSource.addFeature(marker);

  map.getView().animate({
    center: coords,
    zoom: 8,
    duration: 800
  });
}

function onStateChange() {
  const select = document.getElementById("stateSelect");
  const option = select.options[select.selectedIndex];
  const selected = select.value;
  const coords = option.getAttribute("data-coords");
  const name = option.getAttribute("data-location-name") || selected;

  stateSource.clear();
  districtSource.clear();

  if (coords) {
    postToReactNative({
      type: "LOCATION_CHANGE",
      coords: coords,
      name: name
    });
  }

  if (selected === "All India") {
    loadDistrict("All India");
    fitSource(indiaSource);
    return;
  }

  loadState(selected);
  loadDistrict(selected);
}

function handleNativeMessage(event) {
  try {
    const message = JSON.parse(event.data);

    if (message.type === "SEARCH_LOCATION") {
      showSearchLocation(parseFloat(message.lon), parseFloat(message.lat));
      return;
    }

    if (message.type === "RAIN_IDW") {
      loadRainIDW();
    }
  } catch (error) {
    console.log("Bridge message error", error);
  }
}

window.addEventListener("message", handleNativeMessage);
document.addEventListener("message", handleNativeMessage);

window.onload = function () {
  map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      idwLayer,
      indiaLayer,
      districtLayer,
      stateLayer,
      searchLayer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([77.2090, 28.6139]),
      zoom: 5
    })
  });

  Promise.all([
    loadBoundary(),
    loadDistrict("All India"),
    loadCircles()
  ]).then(() => {
    loadRainIDW();
  });
};
</script>

</body>
</html>
`;
}

export default function HomeScreen() {
  const { setData, location, setLocation, setLocationName } =
    useContext(WeatherContext);
  const [token, setToken] = useState(null);
  const [webViewSource, setWebViewSource] = useState(null);
  const webViewRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then(setToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    setWebViewSource({ html: buildMapHtml(token) });
  }, [token]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const parsedUser = userString ? JSON.parse(userString) : null;

        if (parsedUser?.location) {
          setLocation(parsedUser.location);
          setLocationName(parsedUser.location_name);
        }
      } catch (error) {
        console.log("User load error:", error);
      }
    };

    loadUser();
  }, [setLocation, setLocationName]);

  useEffect(() => {
    if (!location) return;

    const getWeather = async () => {
      try {
        setData(null);
        const response = await fetchWeather(location);
        setData(response);
      } catch (error) {
        console.log("Weather error:", error);
      }
    };

    getWeather();
  }, [location, setData]);

  const handleWebViewMessage = (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);

      if (msg.type === "LOCATION_CHANGE") {
        setLocation(msg.coords);
        setLocationName(msg.name);
      }
    } catch (error) {
      console.log("WEBVIEW:", event.nativeEvent.data);
    }
  };

  if (!token || !webViewSource) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ReportScreen />
        <SearchBar webViewRef={webViewRef} />
        <IDW webViewRef={webViewRef} />
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={webViewSource}
          javaScriptEnabled
          domStorageEnabled
          onMessage={handleWebViewMessage}
          injectedJavaScript={injectedConsoleBridge}
          style={{ height: 600 }}
        />
        <ForecastCards />
      </ScrollView>
    </SafeAreaView>
  );
}

/*** Fetched current weather API data for IDW layer(shwoing server error data not) debugged (params problem)
 * 
Debugged the issue where current weather data was not showing properly.
Prepared weather data and mapped latitude/longitude points for IDW.
Added vector source and connected the source for IDW layer generation.
Calculated min and max values from weather data and bound them into IDW.
Clipped the IDW layer based on India boundary so it stays inside the boundary.
Debugged and fixed the issue where IDW was not showing properly on the map.*/
