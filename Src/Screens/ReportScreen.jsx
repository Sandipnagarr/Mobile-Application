import { ScrollView, } from "react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TodayWeather from "../component/TodayWeather";
import Map from "../component/Map";
export default function ReportScreen() {
    const webViewRef = useRef(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <TodayWeather/>
        <Map webViewRef={webViewRef} />
      </ScrollView>
    </SafeAreaView>
  );
}