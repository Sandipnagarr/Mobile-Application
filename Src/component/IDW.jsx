import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { defaultTheme } from "../theme";
import { FontAwesome5 } from "@expo/vector-icons";
export default function IDW({ webViewRef }) {
  const { theme } = useContext(WeatherContext);
  const safeTheme = theme || defaultTheme;
  const styles = createStyles(safeTheme);
  // console.log("IDW RENDERED WITH THEME:", theme);
  
 const handlePress = (layer) => {
   console.log("Selected:", layer);

   if (!webViewRef || !webViewRef.current) {
     console.log("❌ WebView not ready");
     return;
   }

   if (layer === "rainfall") {
     console.log("✅ Rainfall button clicked (React)");

     webViewRef.current.postMessage(
       JSON.stringify({
         type: "RAIN_IDW",
       }),
     );
   }
 };

  return (

<View style={styles.container}>
  <Pressable style={styles.button} onPress={() => handlePress("rainfall")}>
    <FontAwesome5 name="cloud-rain" size={14} color="white" />
    <Text style={styles.text}> Rainfall</Text>
  </Pressable>

  <Pressable style={styles.button} onPress={() => handlePress("wind")}>
    <FontAwesome5 name="wind" size={14} color="white" />
    <Text style={styles.text}> Wind</Text>
  </Pressable>

  <Pressable style={styles.button} onPress={() => handlePress("humidity")}>
    <FontAwesome5 name="tint" size={14} color="white" />
    <Text style={styles.text}> Humidity</Text>
  </Pressable>

  <Pressable style={styles.button} onPress={() => handlePress("fog")}>
    <FontAwesome5 name="smog" size={14} color="white" />
    <Text style={styles.text}> Visibility</Text>
  </Pressable>

  <Pressable
    style={styles.button}
    onPress={() => handlePress("temperature")}
  >
    <FontAwesome5 name="temperature-high" size={14} color="white" />
    <Text style={styles.text}> Temperature</Text>
  </Pressable>
</View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 8,
  },
button: {
  backgroundColor: theme.primary_button_bg,
  padding: 8,
  margin: 2,
  borderRadius: 6,
  flexDirection: "row",   // 👈 REQUIRED
  alignItems: "center",  // 👈 REQUIRED
},
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
  },
});
