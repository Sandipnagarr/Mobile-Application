import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportScreen from "./ReportScreen"
import ForecastCards from "./forcastcards";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function HomeScreen() {
  const { data } = useContext(WeatherContext);

  const html = `
  <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #eff6ff;
  font-family: Arial;
}

/*  BIG CARD */
.container {
  height: 100%;
  box-sizing: border-box;
}

.big-card {
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* 🔝TOP SECTION */
.top-section {
  padding: 12px;
}

/* SEARCH */
.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.search-container input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.search-container button {
  padding: 10px;
  background: #045218;
  color: white;
  border: none;
  border-radius: 8px;
}

/* BUTTONS */
.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.map-btn {
  padding: 8px 10px;
  background: #045218;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
}

/* 🗺️ MAP SECTION */
.map-section {
  flex: 1;  /*  takes remaining space */
  padding: 2px;
  overflow: hidden;
}

#map {
  width: 100%;
  height: 100%;
}

/* ZOOM */
.ol-zoom {
  bottom: 20px;
  right: 20px;
  top: auto;
  left: auto;
}
</style>
</head>

<body>

<div class="container">
  <div class="big-card">

    <!-- 🔝 TOP SECTION -->
    <div class="top-section">

      <!-- SEARCH -->
      <div class="search-container">
        <input type="text" id="searchInput" placeholder="Search location..." />
        <button onclick="searchLocation()">Search</button>
      </div>

      <!-- BUTTONS -->
      <div class="button-container">
        <button class="map-btn" onclick="Rainfall()">Rainfall</button>
        <button class="map-btn" onclick="Wind()">Wind</button>
        <button class="map-btn" onclick="Humidity()">Humidity</button>
        <button class="map-btn" onclick="Temperature()">Temperature</button>
        <button class="map-btn" onclick="Visibility()">Visibility</button>
      </div>

    </div>

    <!-- 🗺️ MAP -->
    <div class="map-section">
      <div id="map"></div>
    </div>

  </div>
</div>

<script>

let map;
let source;

window.onload = function () {

  source = new ol.source.Vector();

  const layer = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#333",
        width: 1
      }),
      fill: new ol.style.Fill({
        color: "rgba(0,123,255,0.2)"
      })
    })
  });

  map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      layer
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([77.2090, 28.6139]),
      zoom: 5
    })
  });

};

//  LOAD DISTRICT
function loadDistrict() {
  fetch("https://mlinfomap.org/mlwapi/get_district_boundary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ circle: "All India" })
  })
  .then(res => res.json())
  .then(res => loadFeatures(res));
}

//  LOAD STATE
function loadState() {
  fetch("https://mlinfomap.org/mlwapi/get_state_boundary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ circle: "All India" })
  })
  .then(res => res.json())
  .then(res => loadFeatures(res));
}

// LOAD INDIA
function loadBoundary() {
  fetch("https://mlinfomap.org/mlwapi/get_india_boundary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ circle: "All India" })
  })
  .then(res => res.json())
  .then(res => loadFeatures(res));
}

// COMMON FUNCTION
function loadFeatures(res) {
  const data = res.data || res;

  const features = new ol.format.GeoJSON().readFeatures(data, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  });

  source.clear();
  source.addFeatures(features);

  const extent = source.getExtent();
  map.getView().fit(extent, {
    duration: 800,
    padding: [20, 20, 20, 20]
  });
}

//  CLEAR
function clearLayer() {
  source.clear();
}

//  ZOOM INDIA
function zoomIndia() {
  map.getView().setCenter(ol.proj.fromLonLat([78, 22]));
  map.getView().setZoom(4);
}

// 🔍 SEARCH
function searchLocation() {
  const value = document.getElementById("searchInput").value;
  if (!value) return;
}

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
          style={{ height: 900 }}
        />
        <ForecastCards />
      </ScrollView>
    </SafeAreaView>
  );
}
