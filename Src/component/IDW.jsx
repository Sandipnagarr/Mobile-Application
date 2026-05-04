import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useContext,useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { defaultTheme } from "../theme";
import { FontAwesome5 } from "@expo/vector-icons";

const IDW_MESSAGE_TYPES = {
  rainfall: "RAIN_IDW",
  wind: "WIND_IDW",
  humidity: "HUMIDITY_IDW",
  visibility: "VISIBILITY_IDW",
  temperature: "TEMPERATURE_IDW",
};

export default function IDW({ webViewRef, setLoading }) {
  const { theme } = useContext(WeatherContext);
  const safeTheme = theme || defaultTheme;
  const styles = createStyles(safeTheme);
  const [activeType, setActiveType] = useState(null);
  // console.log("IDW RENDERED WITH THEME:", theme);

  const handlePress = (type) => {
    if (!webViewRef.current) return;
    const messageType = IDW_MESSAGE_TYPES[type];
    if (!messageType) return;
    setActiveType(type);
    setLoading(true);

    webViewRef.current.postMessage(JSON.stringify({ type: messageType }));
  };
  return (
    

  <View>

    {/* YOUR EXISTING CODE (unchanged) */}
    <View style={styles.container}>

      <Pressable
        style={[
          styles.button,
          activeType === "rainfall" && styles.activeButton,
        ]}
        onPress={() => handlePress("rainfall")}
      >
        <FontAwesome5 name="cloud-rain" size={14} color="white" />
        <Text style={styles.text}> Rainfall</Text>
      </Pressable>

      <Pressable
        style={[styles.button, activeType === "wind" && styles.activeButton]}
        onPress={() => handlePress("wind")}
      >
        <FontAwesome5 name="wind" size={14} color="white" />
        <Text style={styles.text}> Wind</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          activeType === "humidity" && styles.activeButton,
        ]}
        onPress={() => handlePress("humidity")}
      >
        <FontAwesome5 name="tint" size={14} color="white" />
        <Text style={styles.text}> Humidity</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          activeType === "visibility" && styles.activeButton,
        ]}
        onPress={() => handlePress("visibility")}
      >
        <FontAwesome5 name="smog" size={14} color="white" />
        <Text style={styles.text}> Visibility</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          activeType === "temperature" && styles.activeButton,
        ]}
        onPress={() => handlePress("temperature")}
      >
        <FontAwesome5 name="temperature-high" size={14} color="white" />
        <Text style={styles.text}> Temperature</Text>
      </Pressable>

    </View>
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
      flexDirection: "row",
      alignItems: "center",
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
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
eight: "bold",
      fontSize: 11,
    },
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
eight: "bold",
      fontSize: 11,
    },
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
eight: "bold",
      fontSize: 11,
    },
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
eight: "bold",
      fontSize: 11,
    },
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
eight: "bold",
      fontSize: 11,
    },
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
    },
  });
