import React, { useContext,useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet,Pressable } from "react-native";
import { WeatherContext } from "../context/WeatherContext"; 
export default function ForecastCards() {
  const { data } = useContext(WeatherContext);
  const [showHourly, setShowHourly] = useState(true);
  const [showDaily, setShowDaily] = useState(false);
  const [showHazard, setShowHazard] = useState(false);

  if (!data) {
    return <Text>Loading forecast...</Text>;
    }
    

  
  
  
  const dayForecastList = data?.forecast?.forecastday?.map((day) => ({
    date: day.date,
    temp_min: day.day.mintemp_c,
    temp_max: day.day.maxtemp_c,
    icon: `https:${day.day.condition.icon}`,
    description: day.day.condition.text,
    condition_text: day.day.condition.text,
    chance_of_rain: day.day.daily_chance_of_rain,
    humidity: day.day.avghumidity,
  }));
  return (
   <View style={styles.section}>

  {/* HOURLY TAB */}
  <Pressable
    style={[
      styles.accordionTab,
      showHourly && styles.activeAccordionTab
    ]}
    onPress={() => setShowHourly(!showHourly)}
  >
    <Text style={styles.tabTitle}>Hourly Forecast</Text>
    <Text style={styles.arrow}>{showHourly ? "▲" : "▼"}</Text>
  </Pressable>

  {showHourly && (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.forecast?.forecastday?.[0]?.hour?.map((hour, i) => (
        <View key={i} style={styles.hourCard}>
          <Text style={styles.hourTime}>
            {hour?.time?.split(" ")[1]}
          </Text>

          <Image
            source={{ uri: `https:${hour?.condition?.icon}` }}
            style={styles.hourIcon}
          />

          <Text style={styles.hourTemp}>{hour?.temp_c}°C</Text>
          <Text style={styles.hourRain}>🌧 {hour?.chance_of_rain}%</Text>
        </View>
      ))}
    </ScrollView>
  )}

  {/* DAILY TAB */}
  <Pressable
    style={[
      styles.accordionTab,
      showDaily && styles.activeAccordionTab
    ]}
    onPress={() => setShowDaily(!showDaily)}
  >
    <Text style={styles.tabTitle}>7-Day Weather Forecast</Text>
    <Text style={styles.arrow}>{showDaily ? "▲" : "▼"}</Text>
  </Pressable>

  {showDaily && (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {dayForecastList?.map((day, i) => (
        <View
          key={i}
          style={[
            styles.dayCard,
            {
              backgroundColor:
                dayForecastList[0] === day ? "#bde9df" : "#fff",
            },
          ]}
        >
          <Text style={styles.date}>{day.date}</Text>

          <View style={styles.tempRow}>
            <Text style={styles.minTemp}>min: {day.temp_min}°C</Text>
            <Text style={styles.maxTemp}>max: {day.temp_max}°C</Text>
          </View>

          <Image source={{ uri: day.icon }} style={styles.dayIcon} />

          <Text style={styles.condition}>{day.condition_text}</Text>

          <Text style={styles.rain}>
            🌧️ {day.chance_of_rain}% chance
          </Text>

          <Text style={styles.humidity}>
            💧 {day.humidity}%
          </Text>
        </View>
      ))}
    </ScrollView>
      )}
      
      {/* Hazard/bad weather warning */}
      <Pressable
        style={[
          styles.accordionTab,
          showHazard && styles.activeAccordionTab
        ]}
        onPress={() => setShowHazard(!showHazard)}
      >
        <Text style={styles.tabTitle}>Weather Warnings</Text>
        <Text style={styles.arrow}>{showHazard ? "▲" : "▼"}</Text>
      </Pressable>

      {showHazard && (
        <View style={styles.hazardCard}>
          <Text style={styles.hazardTitle}>⚠️ Weather Warning</Text>
          <Text style={styles.hazardDescription}>
            There is a high chance of severe weather conditions in your area.
          </Text>
        </View>
      )}
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  dayCard: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    elevation: 3,
  },

  date: {
    fontWeight: "600",
    marginBottom: 6,
    color: "green",
  },

  tempRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  minTemp: {
    color: "green",
    fontSize: 12,
  },

  maxTemp: {
    color: "green",
    fontSize: 12,
  },

  dayIcon: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginVertical: 5,
  },

  condition: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },

  rain: {
    fontSize: 12,
    textAlign: "center",
  },

  humidity: {
    fontSize: 12,
    textAlign: "center",
  },
  accordionTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#198b49",
    borderRadius: 10,
    marginBottom: 8,
  },

  activeAccordionTab: {
    backgroundColor: "#225f39",
  },

  tabTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },

  arrow: {
    position: "absolute",
    right: 15,
    fontSize: 16,
    color: "white",
  },
});
