import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { WeatherContext } from "../context/WeatherContext";
import { defaultTheme } from "../theme";

const IDW_MESSAGE_TYPES = {
  rainfall: "RAIN_IDW",
  wind: "WIND_IDW",
  humidity: "HUMIDITY_IDW",
  visibility: "VISIBILITY_IDW",
  temperature: "TEMPERATURE_IDW",
};

const IDW_OPTIONS = [
  { key: "rainfall", label: "Rainfall", icon: "cloud-rain" },
  { key: "wind", label: "Wind", icon: "wind" },
  { key: "humidity", label: "Humidity", icon: "tint" },
  { key: "visibility", label: "Visibility", icon: "smog" },
  { key: "temperature", label: "Temperature", icon: "temperature-high" },
];

export default function IDW({ webViewRef, setLoading, activeType = null }) {
  const { theme } = useContext(WeatherContext);
  const safeTheme = theme || defaultTheme;
  const styles = createStyles(safeTheme);

  const handlePress = (type) => {
    if (!webViewRef.current) return;

    const messageType = IDW_MESSAGE_TYPES[type];
    if (!messageType) return;

    setLoading(true);
    webViewRef.current.postMessage(JSON.stringify({ type: messageType }));
  };

  return (
    <View style={styles.container}>
      {IDW_OPTIONS.map((option) => (
        <Pressable
          key={option.key}
          style={[
            styles.button,
            activeType === option.key && styles.activeButton,
          ]}
          onPress={() => handlePress(option.key)}
        >
          <FontAwesome5 name={option.icon} size={14} color="#fff" />
          <Text style={styles.text}> {option.label}</Text>
        </Pressable>
      ))}
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
      color: "#fff",
      fontWeight: "bold",
      fontSize: 11,
    },
    activeButton: {
      backgroundColor: theme.secondary_button_bg || "#381405",
    },
  });
