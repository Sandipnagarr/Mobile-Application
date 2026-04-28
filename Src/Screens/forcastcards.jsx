
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { WeatherContext } from "../context/WeatherContext";
import { defaultTheme } from "../theme"

export default function ForecastCards() {
  const { data, theme } = useContext(WeatherContext);

  // const styles = createStyles(theme);
    const safeTheme = theme || defaultTheme;
    const styles = createStyles(safeTheme);

  const [showHourly, setShowHourly] = useState(true);
  const [showDaily, setShowDaily] = useState(false);
  const [showHazard, setShowHazard] = useState(false);
  const [activeHazard, setActiveHazard] = useState("Rainfall");
  const [isToggleOn, setIsToggleOn] = useState(false);

  if (!data) {
    return <Text>Loading forecast...</Text>;
  }

  const dayForecastList = data?.forecast?.forecastday?.map((day) => ({
    date: day.date,
    temp_min: day.day.mintemp_c,
    temp_max: day.day.maxtemp_c,
    icon: `https:${day.day.condition.icon}`,
    condition_text: day.day.condition.text,
    chance_of_rain: day.day.daily_chance_of_rain,
    humidity: day.day.avghumidity,
  }));

  const currentHour = new Date().getHours();

  const getHourFromTime = (time) => {
    return Number(time.split(" ")[1].split(":")[0]);
  };

  return (
    <View style={styles.section}>
      {/* HOURLY TAB */}
      <Pressable
        style={[styles.accordionTab, showHourly && styles.activeAccordionTab]}
        onPress={() => setShowHourly(!showHourly)}
      >
        <Text
          style={[
            styles.tabTitle,
            { color: showHourly ? safeTheme.secondary_text_color : "#fff" },
          ]}
        >
          Hourly Forecast
        </Text>
        <Text style={styles.arrow}>{showHourly ? "▲" : "▼"}</Text>
      </Pressable>

      {showHourly && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.forecast?.forecastday?.[0]?.hour?.map((hour, i) => {
            const hourValue = getHourFromTime(hour?.time);
            const isCurrent = hourValue === currentHour;

            return (
              <View
                key={i}
                style={[styles.hourCard, isCurrent && styles.activeHourCard]}
              >
                <Text style={styles.hourTime}>{hour?.time?.split(" ")[1]}</Text>

                <Image
                  source={{ uri: `https:${hour?.condition?.icon}` }}
                  style={styles.hourIcon}
                />

                <Text style={styles.hourTemp}>{hour?.temp_c}°C</Text>
                <Text style={styles.hourRain}>🌧 {hour?.chance_of_rain}%</Text>
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* DAILY TAB */}
      <Pressable
        style={[styles.accordionTab, showDaily && styles.activeAccordionTab]}
        onPress={() => setShowDaily(!showDaily)}
      >
        <Text
          style={[
            styles.tabTitle,
            { color: showDaily ? safeTheme.secondary_text_color : "#fff" },
          ]}
        >
          7-Day Weather Forecast
        </Text>
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
                  backgroundColor: i === 0 ? safeTheme.hover_card_bg : "#fff",
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

              <Text style={styles.rain}>🌧️ {day.chance_of_rain}% chance</Text>

              <Text style={styles.humidity}>💧 {day.humidity}%</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* HAZARD */}
      <Pressable
        style={[styles.accordionTab, showHazard && styles.activeAccordionTab]}
        onPress={() => setShowHazard(!showHazard)}
      >
        <Text
          style={[
            styles.tabTitle,
            { color: showHazard ? safeTheme.secondary_text_color : "#fff" },
          ]}
        >
          Weather Hazards
        </Text>
        <Text style={styles.arrow}>{showHazard ? "▲" : "▼"}</Text>
      </Pressable>

      {showHazard && (
        <View style={styles.hazardCard}>
          {/* 🔹 Hazard Type Buttons (like Angular tabs) */}
          <Text style={styles.label}>Hazard Type</Text>
          <View style={styles.hazardTabs}>
            {["Rainfall", "Wind", "Humidity", "Fog", "Temperature"].map(
              (item) => {
                const isActive = activeHazard === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => setActiveHazard(item)}
                    style={[
                      styles.hazardButton,
                      isActive && styles.activeHazardButton,
                    ]}
                  >
                    <Text
                      style={{
                        color: isActive
                          ? safeTheme.secondary_text_color
                          : "#fff",
                      }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              },
            )}
          </View>

          {/* 🔹 Severity Dropdown */}
          <Text style={styles.label}>Severity</Text>
          <View style={styles.dropdown}>
            <Text style={{ color: safeTheme.secondary_text_color }}>
              Select Severity ▼
            </Text>
          </View>

          {/* 🔹 Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.label}>View on Map</Text>
            <Pressable
              style={[
                styles.toggle,
                isToggleOn && { backgroundColor: safeTheme.primary_button_bg },
              ]}
              onPress={() => setIsToggleOn(!isToggleOn)}
            >
              <View
                style={[
                  styles.toggleCircle,
                  isToggleOn && { alignSelf: "flex-end" },
                ]}
              />
            </Pressable>
          </View>

          {/* 🔹 TABLE HEADER */}
          <View style={styles.tableHeader}>
            <Text style={styles.th}>S.No</Text>
            <Text style={styles.th}>District</Text>
            <Text style={styles.th}>State</Text>
            <Text style={styles.th}>Type</Text>
            <Text style={styles.th}>Severity</Text>
          </View>

          {/* 🔹 TABLE ROW (Sample) */}
          <View style={styles.tableRow}>
            <Text style={styles.td}>1</Text>
            <Text style={styles.td}>Delhi</Text>
            <Text style={styles.td}>Delhi</Text>
            <Text style={styles.td}>Rain</Text>
            <Text style={styles.td}>High</Text>
          </View>

          {/* 🔹 No Data */}
          <Text style={styles.noData}>No data found for selected filters.</Text>
        </View>
      )}
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginTop: 15,
    },

    hourCard: {
      width: 90,
      padding: 10,
      borderRadius: 10,
      marginRight: 10,
      alignItems: "center",
      backgroundColor: theme.min_other_color,
      borderColor:"red",
    
      borderWidth: 1,
    },

    hourTime: {
      fontSize: 12,
      color: theme.secondary_text_color,
    },

    hourIcon: {
      width: 40,
      height: 40,
    },

    hourTemp: {
      fontWeight: "bold",
      color: theme.text_on_dark_bg,
    },

    hourRain: {
      fontSize: 12,
      color: theme.secondary_text_color,
    },

    accordionTab: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: theme.primary_button_bg,
      borderRadius: 10,
      marginBottom: 8,
    },

    activeAccordionTab: {
      backgroundColor: theme.accordion_active_bg,
    },

    tabTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
      color: theme.text_on_dark_bg,
    },

    arrow: {
      position: "absolute",
      right: 15,
      fontSize: 16,
      color: theme.text_on_dark_bg,
    },

    activeHourCard: {
      backgroundColor: theme.hover_card_bg,
      borderColor: theme.primary_border_color,
      borderWidth: 2,
    },

    dayCard: {
      width: 140,
      padding: 12,
      borderRadius: 12,
      marginRight: 10,
      backgroundColor: theme.hover_card_bg,
      borderWidth: 1,
    },

    date: {
      fontWeight: "600",
      marginBottom: 6,
      color: theme.secondary_text_color,
    },

    tempRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },

    minTemp: {
      fontSize: 12,
      color: theme.secondary_text_color,
    },

    maxTemp: {
      fontSize: 12,
      color: theme.secondary_text_color,
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
      color: theme.secondary_text_color,
    },

    rain: {
      fontSize: 12,
      textAlign: "center",
      color: theme.secondary_text_color,
    },

    humidity: {
      fontSize: 12,
      textAlign: "center",
      color: theme.secondary_text_color,
    },

    hazardCard: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: theme.hover_card_bg,
      borderColor: theme.primary_border_color,
      borderWidth: 1,
    },

    hazardTitle: {
      fontWeight: "bold",
      marginBottom: 5,
      color: theme.secondary_text_color,
    },

    hazardDescription: {
      color: theme.secondary_text_color,
    },
    label: {
  marginBottom: 5,
  color: theme.secondary_text_color,
  fontWeight: "600",
},

hazardTabs: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 10,
},

hazardButton: {
  backgroundColor: theme.primary_button_bg,
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 20,
},

activeHazardButton: {
  backgroundColor: theme.accordion_active_bg,
},

dropdown: {
  borderWidth: 1,
  borderColor: theme.primary_border_color,
  padding: 10,
  borderRadius: 6,
  marginBottom: 10,
},

toggleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

toggle: {
  width: 50,
  height: 25,
  borderRadius: 20,
  backgroundColor: "#ccc",
  justifyContent: "center",
  padding: 3,
},

toggleCircle: {
  width: 18,
  height: 18,
  borderRadius: 50,
  backgroundColor: "#fff",
},

tableHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderColor: theme.primary_border_color,
  paddingBottom: 5,
},

tableRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 8,
},

th: {
  flex: 1,
  fontWeight: "bold",
  fontSize: 12,
  color: theme.secondary_text_color,
},

td: {
  flex: 1,
  fontSize: 12,
  color: theme.secondary_text_color,
},

noData: {
  textAlign: "center",
  marginTop: 10,
  color: theme.secondary_text_color,
},
  });