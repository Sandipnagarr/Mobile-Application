import React from "react";
import { View, Text, StyleSheet, ScrollView, Image,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {useState} from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { fetchWeather } from "../api/Api";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext"; 


export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data, setData } = useContext(WeatherContext);
  
useEffect(() => {
  const fetchCurrentWeather = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const parsedUser = userString ? JSON.parse(userString) : null;

      setUser(parsedUser);

      const location = parsedUser?.location; 

      if (!location) {
        console.log("Location not found");
        return;
      }

      const response = await fetchWeather(location);
      setData(response);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  fetchCurrentWeather();
}, []);
  
  const refreshCurrentWeather = async () => {
  if (!user?.location) return;

  try {
    setLoading(true);
    const response = await fetchWeather(user.location);
    setData(response);
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    setLoading(false);
  }
};
const currentHour = new Date().getHours();

const currentHourData = data?.forecast?.forecastday?.[0]?.hour?.[currentHour];

const rainPercent = currentHourData?.chance_of_rain ?? 0;
const rainMM = currentHourData?.precip_mm ?? 0;
  
  return (
    // <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* LOCATION */}
        <Text style={styles.location}>
          {user?.location_name
            ? `${user.location_name}, ${data?.location?.region ?? ""}`
            : "Location not found"}
        </Text>

        {/* WEATHER BOX */}
        <View style={styles.box}>
          <Text style={styles.title}>TODAY'S WEATHER</Text>

          <Text style={styles.date}>
            {data?.location?.localtime || "Time not found"}
          </Text>

          {/* TOP */}
          <View style={styles.topRow}>
            <Text style={styles.percent}>{rainPercent ?? 0}%</Text>

            <View style={{ marginLeft: 20 }}>
              <Text style={styles.small}>Rain Probability</Text>
              <Text style={styles.bold}>{rainMM ?? 0} mm</Text>
            </View>
          </View>

          {/* CONDITION + ICON */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{
                uri: `https:${data?.current?.condition?.icon}`,
              }}
              style={{ width: 40, height: 40, marginRight: 8 }}
            />

            <Text style={styles.condition}>
              {data?.current?.condition?.text || "Condition not available"}
            </Text>
          </View>

          {/* DETAILS LIST */}
          <View style={styles.grid}>
            {[
              {
                icon: "thermometer",
                label: "Temp",
                value: `${data?.current?.temp_c}°C`,
              },
              {
                icon: "thermometer",
                label: "Feels",
                value: `${data?.current?.feelslike_c}°C`,
              },
              {
                icon: "speedometer",
                label: "Wind",
                value: `${data?.current?.wind_kph} kmph`,
              },
              {
                icon: "compass",
                label: "Direction",
                value: data?.current?.wind_dir,
              },
              {
                icon: "analytics",
                label: "Pressure",
                value: `${data?.current?.pressure_mb} mb`,
              },
              {
                icon: "eye",
                label: "Visibility",
                value: `${data?.current?.vis_km} km`,
              },
              {
                icon: "sunny",
                label: "UV",
                value: data?.current?.uv,
              },
              {
                icon: "water",
                label: "Humidity",
                value: `${data?.current?.humidity}%`,
              },
            ].map((item, i) => (
              <View key={i} style={styles.card}>
                <Ionicons name={item.icon} size={18} color="#dee5ec" />

                <Text style={styles.cardValue}>{item.value}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* REFRESH BUTTON */}
          <Pressable onPress={refreshCurrentWeather}>
            <Text style={styles.refresh}>
              {loading ? "Refreshing..." : "Refresh: ↻"}
            </Text>
          </Pressable>
      </View>
      
      
      </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  /*  SAFE AREA ROOT */
  safe: {
    flex: 1,
    backgroundColor: "#e5e7eb",
  },

  /* CONTENT */
  container: {
    padding: 10,
  },

  location: {
    color: "#dce1ec",
    fontWeight: "600",
    marginBottom: 8,
  },

  box: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#cdd4dd",
    borderRadius: 10,
    padding: 14,
  },

  title: {
    fontWeight: "700",
    color: "#374151",
  },

  date: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  percent: {
    fontSize: 28,
    fontWeight: "700",
  },

  small: {
    fontSize: 12,
    color: "#6b7280",
  },

  bold: {
    fontWeight: "600",
  },

  condition: {
    marginBottom: 10,
    color: "#374151",
  },

  list: {
    marginTop: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e9e5da",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  label: {
    flex: 1,
    color: "#eef1f7",
  },

  value: {
    fontWeight: "600",
    color: "#e2e3e6",
  },

  refresh: {
    marginTop: 10,
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  card: {
    width: "45%",
    backgroundColor: "#198b49",
    borderRadius: 12,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
  },

  cardValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },

  cardLabel: {
    color: "white",
    fontSize: 14,
    marginTop: 2,
  },
});
