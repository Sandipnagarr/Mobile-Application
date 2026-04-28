// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import SplashScreen from "./Src/Screens/SplashScreen.jsx";
// import AppNavigator from "./Src/Navigation/AppNavigator";
// import { WeatherProvider } from "./Src/context/WeatherContext.js";
// export default function App() {
//   const [showSplash, setShowSplash] = useState(true);

//   //  Splash first
//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }

//   // After splash → go to login/navigation
//   return (
//     <WeatherProvider>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </WeatherProvider>
//   );
// }
import { StatusBar } from "expo-status-bar";
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
//  1.pass the kpi access functionality to the webview and remove the dummy functions from the IDW component

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
 * 1.Implemented global theming system in React Native using Context API(global state management)
2.Integrated dynamic theme  loading from API (get_mlw_web_theme) and Fixed runtime errors related theme values
 3.created default theme object with fallback values to ensure app stability even if API fails
4.Created Root-level theme loader to apply theme before app navigation renders
5.bound color  to UI components (Forecast cards, Login screen) to use dynamic theme-based styles instead of hardcoded colors
6.remove indus image from splash and add new ml logo and also set the bgc color rectify login screen   
idw impllemented  the kpi access functionality to the webview (but not shwoing on click)
 */
