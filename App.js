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

/****
 Implemented a React Native accordion component for the Weather Forecast section 
 added useState and Pressable for expand/collapse functionality
 Enhanced Weather Forecast UI by adding dynamic buttons improved  styling 
 Investigated lag in map zoom when selecting a country/county boundary in the weather dashboard
 Analyzed map selection flow and identified delay caused by repeated boundary processing 
 Optimized selected country/province zoom behavior for faster map focus with smoother response
 Added protection for rapid repeated selections so only the latest map action completes
 resolve the fullscreen issue idw not cretaed and added auto zoom  fix it,deployed (with ravi sir )
 
 * */


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