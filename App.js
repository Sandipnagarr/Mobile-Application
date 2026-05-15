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

/*
1. Fixed state boundary rendering issue when resetting map view to All India.
2. Updated layer loading logic to ensure state and district boundaries reload correctly.
3. Designed and enhanced React Native weather KPI UI components.
4. Integrated weather API response binding for dynamic data rendering.
5. Performed testing and debugging for map layer visibility and UI behavior.
*/


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