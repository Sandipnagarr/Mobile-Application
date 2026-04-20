import React, { useContext } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { WeatherContext } from "../context/WeatherContext"; 
export default function ForecastCards() {
const { data } = useContext(WeatherContext);

  if (!data) {
    return <Text>Loading forecast...</Text>;
    }
    
    console.log("data",data)

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hourly Forecast</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.forecast?.forecastday?.[0]?.hour?.map((hour, i) => (
          <View key={i} style={styles.hourCard}>
            <Text style={styles.hourTime}>{hour?.time?.split(" ")[1]}</Text>

            <Image
              source={{ uri: `https:${hour?.condition?.icon}` }}
              style={styles.hourIcon}
            />

            <Text style={styles.hourTemp}>{hour?.temp_c}°C</Text>

            <Text style={styles.hourRain}>🌧 {hour?.chance_of_rain}%</Text>
          </View>
        ))}
          </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.forecast?.forecastday?.[0]?.hour?.map((hour, i) => (
          <View key={i} style={styles.hourCard}>
            <Text style={styles.hourTime}>{hour?.time?.split(" ")[1]}</Text>

            <Image
              source={{ uri: `https:${hour?.condition?.icon}` }}
              style={styles.hourIcon}
            />

            <Text style={styles.hourTemp}>{hour?.temp_c}°C</Text>

            <Text style={styles.hourRain}>🌧 {hour?.chance_of_rain}%</Text>
          </View>
        ))}
          </ScrollView>
          
      
    </View>
  );
}
const styles = StyleSheet.create({
  section: {
    marginTop: 15,
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#374151",
  },

  hourCard: {
    width: 90,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  hourTime: {
    fontSize: 12,
    color: "#16a34a",
  },

  hourIcon: {
    width: 40,
    height: 40,
  },

  hourTemp: {
    fontWeight: "bold",
  },

  hourRain: {
    fontSize: 12,
    color: "#6b7280",
  },
});
