import React, { useContext, useEffect, useState,useRef } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ReportScreen from "./ReportScreen";
import ForecastCards from "./forcastcards";
import { WeatherContext } from "../context/WeatherContext";
import { fetchWeather } from "../api/Api"; //  NEW
import SearchBar from "../component/searchbar.jsx";
import IDW from "../component/IDW.jsx";


export default function HomeScreen() {
  const {
    data,
    setData,
    location,
    setLocation,
    locationName,
    setLocationName,
  } = useContext(WeatherContext);
  const [token, setToken] = useState(null);
  const webViewRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then(setToken);
  }, []);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        const parsedUser = userString ? JSON.parse(userString) : null;

        const loc = parsedUser?.location;
        const name = parsedUser?.location_name;

        if (loc) {
          setLocation(loc);
         setLocationName(name);
          // store in context
        }
      } catch (e) {
        console.log("User load error:", e);
      }
    };

    loadUser();
  }, []);

  

  //  NEW: fetch weather whenever location changes
  useEffect(() => {
    if (!location) return;

    const getWeather = async () => {
      try {
        setData(null);
        const response = await fetchWeather(location);
        setData(response);
      } catch (e) {
        console.log("Weather error:", e);
      }
    };

    getWeather();
  }, [location]);

  if (!token) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>

<style>
html, body { margin:0; padding:0; height:100%; }
#map { width:100%; height:100%; }

.dropdown-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}

.dropdown-container select {
  padding: 8px;
  border-radius: 8px;
  background: white;
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
console.log("TOKEN:", TOKEN);

let map;
let source;
let indiaSource = new ol.source.Vector();
let stateSource = new ol.source.Vector();
let districtSource = new ol.source.Vector();
let boundaryLoaded = false;

let indiaLayer = new ol.layer.Vector({
  source: indiaSource,
});

let stateLayer = new ol.layer.Vector({
  source: stateSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(0, 0, 255, 0.8)", // Blue with opacity
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "rgba(0, 0, 255, 0.1)" // Transparent blue fill
    })
  })
});
let districtLayer = new ol.layer.Vector({
  source: districtSource,
  style: new ol.style.Style({
  stroke: new ol.style.Stroke({
      color: "rgba(3, 53, 28, 0.8)", //
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "rgba(255, 0, 0, 0.2)" //  transparent fill
    })
  })
});

function loadCircles() {
  fetch("https://mlinfomap.org/mlwapi/get_circle_list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: "All India" })
  })
  .then(res => {
console.log("Circle API Response:", JSON.stringify(res, null, 2));

    return res.json();
  })
  .then(res => {

    const circleOptions = res.data || [];
  console.log("Circle Options:", JSON.stringify(circleOptions, null, 2));

    const select = document.getElementById("stateSelect");
    select.innerHTML = "";

    const defaultOpt = document.createElement("option");
    defaultOpt.value = "All India";
    defaultOpt.text = "All India";
    select.appendChild(defaultOpt);

    circleOptions.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.label;
      option.text = opt.full_name;
      option.setAttribute("data-coords", opt.value);
      option.setAttribute("data-location-name", opt.location_name);
      select.appendChild(option);
    });

    loadBoundary();
    loadDistrict();
  })
  .catch(err => console.log("Circle API ERROR", err));
}

//  DROPDOWN CHANGE
function onStateChange() {
  const select = document.getElementById("stateSelect");
  const selected = select.value;

  const coords = select.options[select.selectedIndex].getAttribute("data-coords");
  const name=select.options[select.selectedIndex].getAttribute("data-location-name");
 window.ReactNativeWebView.postMessage(
   JSON.stringify({
     type: "LOCATION_CHANGE",
     coords: coords,
     name:name
   }),
 );

  console.log("Selected:", selected, coords);

  // clear layers
  indiaSource.clear();
  stateSource.clear();
  districtSource.clear();

  if (selected === "All India") {
    loadBoundary();
    loadDistrict();
  } else {
    loadState(selected);

    //  zoom to location (NEW)
    if (coords) {
      const [lon, lat] = coords.split(",").map(Number);
      map.getView().animate({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: 6,
        duration: 800
      });
    }
  }
}

//  FIXED STATE FUNCTION
function loadState(circle) {
  fetch("https://mlinfomap.org/mlwapi/get_state_boundary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: circle })
  })
  .then(res => res.json())
  .then(res => {

    if (res.msg) {
      console.log("API ERROR:", res.msg);
      return;
    }

    const data = res.data || res;

    const features = new ol.format.GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });

    stateSource.addFeatures(features);

    map.getView().fit(stateSource.getExtent(), {
      duration: 800,
      padding: [20,20,20,20]
    });
  })
  .catch(err => {
    console.log("State API ERROR ❌", err);
  });
}
function loadBoundary() {
    fetch("https://mlinfomap.org/mlwapi/get_india_boundary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + TOKEN
      },
      body: JSON.stringify({ circle: "All India" }),
    })
    .then(res => res.json())
    .then(res => {

      if (res.msg) {
        console.log("API ERROR:", res.msg);
        return;
      }

      const data = res.data || res;

      const features = new ol.format.GeoJSON().readFeatures(data, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857"
      });

      indiaSource.clear();
      indiaSource.addFeatures(features);

      boundaryLoaded = true;

      map.getView().fit(indiaSource.getExtent(), {
        duration: 800,
        padding: [20,20,20,20]
      });
    })
    .catch(err => {
      console.log("API ERROR ❌", err);
    });

  }

function loadDistrict() {

  fetch("https://mlinfomap.org/mlwapi/get_district_boundary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: "All India" }),
  })
  .then(res => res.json())
  .then(res => {

    if (res.msg) {
      console.log("API ERROR:", res.msg);
      return;
    }

    const data = res.data || res;

    const features = new ol.format.GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });

    districtSource.clear();
    districtSource.addFeatures(features);

    map.getView().fit(districtSource.getExtent(), {
      duration: 800,
      padding: [20,20,20,20]
    });
  })
  .catch(err => {
    console.log("District API ERROR ❌", err);
  });
}

window.onload = function () {

  source = new ol.source.Vector();

  const layer = new ol.layer.Vector({
    source: source
  });

  map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      layer,
      indiaLayer,
      districtLayer,
      stateLayer,
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([77.2090, 28.6139]),
      zoom: 5
    })
  });

  loadCircles(); //  ONLY THIS (IMPORTANT)
};

// added for search functionality (NEW) 

function handleSearchMessage(event) {
  try {
    const msg = JSON.parse(event.data);

    console.log("MESSAGE RECEIVED:", msg); // 🔥 debug

    if (msg.type === "SEARCH_LOCATION") {

      const lon = parseFloat(msg.lon);
      const lat = parseFloat(msg.lat);

      const coords = ol.proj.fromLonLat([lon, lat]);

      const view = map.getView();

      //  move map
      view.setCenter(coords);
      view.setZoom(13);

      //  remove old marker
      source.clear();

      //  create marker
      const marker = new ol.Feature({
        geometry: new ol.geom.Point(coords)
      });

      marker.setStyle(
        new ol.style.Style({
       image: new ol.style.Icon({
  src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  scale: 0.05,
  anchor: [0.5, 1],
})
        })
      );

      source.addFeature(marker);
    }

  } catch (e) {
    console.log("Search message error:", e);
  }
}

//  VERY IMPORTANT (add BOTH)
window.addEventListener("message", handleSearchMessage);
document.addEventListener("message", handleSearchMessage);

</script>

</body>
</html>
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ReportScreen />
        <SearchBar webViewRef={webViewRef} />
        <IDW />
        <WebView
          ref={webViewRef}
          originWhitelist={["*"]}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          onMessage={(event) => {
            try {
              const msg = JSON.parse(event.nativeEvent.data);

              //  IMPORTANT FIX
              if (msg.type === "LOCATION_CHANGE") {
                console.log("NEW LOCATION:", msg.coords);

                setLocation(msg.coords);
                setLocationName(msg.name); //  THIS WAS MISSING
              }
            } catch (e) {
              console.log("WEBVIEW:", event.nativeEvent.data);
            }
          }}
          injectedJavaScript={`
    (function() {
      const oldLog = console.log;
      console.log = function(...args) {
        window.ReactNativeWebView.postMessage(args.join(" "));
        oldLog.apply(console, args);
      };
    })();
    true;
  `}
          style={{ height: 600 }}
        />
        <ForecastCards />
      </ScrollView>
    </SafeAreaView>
  );
}



// this is for console logs from webview we can not use onsole directly in webview

// injectedJavaScript={`
// (function() {
//   const oldLog = console.log;
//   console.log = function(...args) {
//     window.ReactNativeWebView.postMessage(args.join(" "));
//     oldLog.apply(console, args);
//   };
// })();
// true;
// `}
/*
Implemented location search using OpenStreetMap API and integrated with Context API 60
Connected search results to weather API for dynamic weather data updation 70
Integrated WebView communication to sync search with map (center, zoom, marker)
created new idw component and Developed KPI buttons (Rainfall, Wind, Humidity, Visibility, Temperature) 
system cleanup and optimizations by rizwan sir (removed unwanted files and applications after verification) 90
installed emulator and setup virtual device (it was deletd due to system failure) 60
*/