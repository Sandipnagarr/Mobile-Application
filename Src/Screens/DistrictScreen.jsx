import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../component/Map";
import IDW from "../component/IDW";
import SearchBar from "../component/searchbar";
import ForecastCards from "./forcastcards";
import TodayWeather from "../component/TodayWeather";
export default function DistrictScreen() {
  const webViewRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TodayWeather />
        <SearchBar />
        <IDW
          webViewRef={webViewRef}
        />
        <Map webViewRef={webViewRef} />
        <ForecastCards />
      </ScrollView>
    </SafeAreaView>
  );
}
