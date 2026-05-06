
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
 
made Hazard component structure integrated it into the main screen and designed the UI
Fetched get-ndma-hazards-list API to get hazards rendered dynamic buttons and bound the data
Implemented default active hazard selection and added icons to hazard tabs
Fetched get-ndma-severity-list API to get severity types
Built a custom severity dropdown with selection handling and UI binding
Connected get-ndma-today-disasters API  to render table (facing internal server error)
Created context to share the circle across all components and rendered hazards based on the selected circle



 */