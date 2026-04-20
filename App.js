import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Src/Screens/SplashScreen.jsx";
import AppNavigator from "./Src/Navigation/AppNavigator";
import { WeatherProvider } from "./Src/context/WeatherContext.js";
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  //  Splash first
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // After splash → go to login/navigation
  return (
    <WeatherProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </WeatherProvider>
  );
}
