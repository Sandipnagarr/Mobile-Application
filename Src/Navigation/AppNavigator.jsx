// import { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // ⚠️ FIXED PATHS (very important)
// import HomeScreen from "../Screens/HomeScreen";
// import Loginscreen from "../Screens/Login";
// import SplashIntro from "../Screens/SplashScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);
//   const [showSplash, setShowSplash] = useState(true);

//   // ✅ Check login from storage
//   const checkLogin = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     } catch (error) {
//       setIsLoggedIn(false);
//     }
//   };

//   // ✅ Splash finished
//   const handleSplashFinish = async () => {
//     setShowSplash(false);
//     await checkLogin();
//   };

//   // ✅ Login
//   const handleLogin = async () => {
//     await AsyncStorage.setItem("token", "abc123");
//     setIsLoggedIn(true);
//   };

//   // ✅ Logout
//   const handleLogout = async () => {
//     await AsyncStorage.multiRemove(["token", "user"]);
//     setIsLoggedIn(false);
//   };

//   // 🔥 STEP 1: Splash first
//   if (showSplash) {
//     return <SplashIntro onFinish={handleSplashFinish} />;
//   }

//   // 🔥 STEP 2: Wait for login check
//   if (isLoggedIn === null) {
//     return null;
//   }

//   // 🔥 STEP 3: Navigation
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isLoggedIn ? (
//           <Stack.Screen name="Home">
//             {() => <HomeScreen onLogout={handleLogout} />}
//           </Stack.Screen>
//         ) : (
//           <Stack.Screen name="Login">
//             {() => <Loginscreen onLogin={handleLogin} />}
//           </Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Loginscreen from "../Screens/Login.jsx";
import TabNavigator from "./TabNavigator.jsx";

const SHOW_LOGIN_ON_EVERY_OPEN = true;

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        if (SHOW_LOGIN_ON_EVERY_OPEN) {
          await AsyncStorage.multiRemove(["token", "user"]);

          if (isMounted) {
            setIsLoggedIn(false);
          }

          return;
        }

        const token = (await AsyncStorage.getItem("token"))?.trim();

        if (isMounted) {
          setIsLoggedIn(Boolean(token));
        }
      } catch (error) {
        console.log("Auth restore error:", error);
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "user"]);
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setIsLoggedIn(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return isLoggedIn ? (
    <TabNavigator onLogout={handleLogout} />
  ) : (
    <Loginscreen onLogin={() => setIsLoggedIn(true)} />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
});
