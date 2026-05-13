import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Src/Screens/SplashScreen.jsx";
import AppNavigator from "./Src/Navigation/AppNavigator";
import {WeatherProvider,WeatherContext,} from "./Src/context/WeatherContext.js";
import { defaultTheme } from "./Src/theme.jsx";

//  ROOT COMPONENT (ADD THIS)
function Root() {
  const { setTheme } = useContext(WeatherContext);
  const [loadingTheme, setLoadingTheme] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const res = await fetch(
        "https://mlinfomap.org/mlwapi/get_mlw_web_theme",
        {
          method: "POST",
        },
      );

      const json = await res.json();
  //  console.log("THEME API:\n", JSON.stringify(json, null, 2));

      if (json?.status === "success" && json?.data?.length) {
        setTheme({
          ...defaultTheme,
          ...json.data[0],
        });
      } else {
        setTheme(defaultTheme);
      }
    } catch (e) {
      console.log("Theme API failed");
      setTheme(defaultTheme);
    } finally {
      setLoadingTheme(false);
    }
  };

  //  wait until theme ready
  if (loadingTheme) return null;

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}


// MAIN APP
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <WeatherProvider>
      <Root />
    </WeatherProvider>
  );
}
/**
 
 * Developed district selection feature in the React Native application
* Integrated `get_district_list` API to load districts dynamically based on selected state/circle
* Created centralized API helper function for reusable POST requests
* Added district dropdown using React Native Picker
* Implemented district zoom and highlight functionality on OpenLayers map
* Added Send Report button beside district selection component
* Implemented button enable/disable functionality based on selected circle
* Designed and developed Send Report  modal(email,district dropdown,send button )
*Connected the Send Report button to open SendReportScreen using useNavigation()

Cleaned up the related navigation/component code and did a sanity check to keep the implementation minimal and safe.
 */