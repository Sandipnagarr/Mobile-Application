import React, { useContext, useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ReportScreen from "./ReportScreen";
import ForecastCards from "./forcastcards";
import { WeatherContext } from "../context/WeatherContext";

export default function HomeScreen() {
  const { data } = useContext(WeatherContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then(setToken);
  }, []);

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
    <option value="All India">All India</option>
    <option value="TN">Tamil Nadu</option>
    <option value="MH">Maharashtra</option>
    <option value="DL">Delhi</option>
    <option value="GJ">Gujarat</option>
  </select>
</div>

<div id="map"></div>

<script>
const TOKEN = "${token}";

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

function loadState() {
  console.log("Calling state API...");

  fetch("https://mlinfomap.org/mlwapi/get_state_boundary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    },
    body: JSON.stringify({ circle: "TN" }),
  })
  .then(res => res.json())
  .then(res => {
    console.log("State API Response:", res);

    if (res.msg) {
      console.log("API ERROR:", res.msg);
      return;
    }

    const data = res.data || res;

    const features = new ol.format.GeoJSON().readFeatures(data, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857"
    });

    stateSource.clear();
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
  console.log("Calling boundary API...");

  if (!boundaryLoaded) {

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
      console.log("API Response:", res);

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
}

function loadDistrict() {
  console.log("Calling district API...");

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
    console.log("District API Response:", res);

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

  loadBoundary(); // ✅ FIXED
  loadDistrict(); // ✅ FIXED
  loadState(); // ✅ FIXED
};

</script>

</body>
</html>
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>

        <ReportScreen />

        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          javaScriptEnabled
          domStorageEnabled
          style={{ height: 600 }}
        />

        <ForecastCards />

      </ScrollView>
    </SafeAreaView>
  );
}