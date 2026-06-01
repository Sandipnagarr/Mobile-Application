import React, { useState, useContext } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { WeatherContext } from "../context/WeatherContext";
import { defaultTheme } from "../theme";

export default function WeatherForecast() {
  const [accordian, setaccordian] = useState(false);
  const [activeButton, setactiveButton] = useState("cyclone");

  const { theme } = useContext(WeatherContext);

  const safeTheme = theme || defaultTheme;
  const styles = createStyles(safeTheme);

  const hazards = [
    { key: "cyclone", label: "Cyclone" },
    { key: "lightning", label: "Lightning" },
    { key: "flood", label: "Flood" },
    { key: "avalanche", label: "Avalanche" },
    { key: "snowfall", label: "Snowfall" },
    { key: "fog", label: "Fog" },
  ];

  const dates = ["1 Jun", "2 Jun", "3 Jun", "4 Jun", "5 Jun", "6 Jun", "7 Jun"];

  const headingMap = {
    cyclone: "Cyclone Forecast - 7 Days",
    lightning: "Lightning Forecast - 7 Days",
    flood: "Flood Forecast - 7 Days",
    avalanche: "Avalanche Forecast - 7 Days",
    snowfall: "Snowfall Forecast - 7 Days",
    fog: "Fog Forecast - 7 Days",
  };

  const hazardData = [
    {
      district: "Ahmednagar",
      day1: "No Risk",
      day1_severity: "low",
      day2: "Moderate",
      day2_severity: "moderate",
      day3: "High",
      day3_severity: "high",
      day4: "Extreme",
      day4_severity: "extreme",
      day5: "Low",
      day5_severity: "low",
      day6: "Moderate",
      day6_severity: "moderate",
      day7: "High",
      day7_severity: "high",
    },
    {
      district: "Akola",
      day1: "Low",
      day1_severity: "low",
      day2: "Low",
      day2_severity: "low",
      day3: "Moderate",
      day3_severity: "moderate",
      day4: "Moderate",
      day4_severity: "moderate",
      day5: "High",
      day5_severity: "high",
      day6: "Extreme",
      day6_severity: "extreme",
      day7: "High",
      day7_severity: "high",
    },
  ];

  const setActiveHaz = (tab) => {
    setactiveButton(tab);

    // Your API Calls
    // updateWeatherHazardUserLog(tab);
    // getDateLabelshaz();
    // fetchDistrictWiseHazardValues();
  };

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case "extreme":
        return { backgroundColor: "#ff0000" };

      case "high":
        return { backgroundColor: "#ffa500" };

      case "moderate":
        return { backgroundColor: "#e6ff00" };

      case "low":
        return { backgroundColor: "#ffffff" };

      default:
        return {};
    }
  };

  return (
    <View style={styles.section}>
      <Pressable
        onPress={() => setaccordian(!accordian)}
        style={styles.accordionTab}
      >
        <Text style={styles.sectionTitle}>Hazard Forecast</Text>

        <Text style={styles.arrow}>{accordian ? "▲" : "▼"}</Text>
      </Pressable>

      {accordian && (
        <>
          {/* Hazard Buttons */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.buttonContainer}
          >
                      {hazards.map((item) => (
                          <Pressable key={item.key}
                onPress={() => setActiveHaz(item.key)}
                style={[
                  styles.hazardButton,
                  activeButton === item.key && styles.activeHazardButton,
                ]}
              >
                <Text style={styles.hazardButtonText}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{headingMap[activeButton]}</Text>
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            <Text style={styles.legendTitle}>Legend</Text>

            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "red" }]} />
              <Text>Extreme</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "orange" }]} />
              <Text>High</Text>
            </View>

            <View style={styles.legendItem}>
              <View
                style={[styles.legendBox, { backgroundColor: "#e6ff00" }]}
              />
              <Text>Moderate</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendBox, { backgroundColor: "#fff" }]} />
              <Text>Low</Text>
            </View>
          </View>

          {/* Table */}
          <ScrollView horizontal>
            <View style={styles.table}>
              {/* Header */}
              <View style={styles.row}>
                <Text style={styles.headerCell}>District</Text>

                {dates.map((date) => (
                  <Text key={date} style={styles.headerCell}>
                    {date}
                  </Text>
                ))}
              </View>

              {/* Rows */}
              {hazardData.map((row) => (
                <View key={row.district} style={styles.row}>
                  <Text style={styles.districtCell}>{row.district}</Text>

                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <Text
                      key={day}
                      style={[
                        styles.valueCell,
                        getSeverityStyle(row[`day${day}_severity`]),
                      ]}
                    >
                      {row[`day${day}`]}
                    </Text>
                  ))}
                </View>
              ))}
                      </View>
                      
          </ScrollView>
        </>
      )}
    </View>
  );
}

{
    const fruits = ["apple", "banana", "cherry"];
    fruits.map((fruit) => (
       console.log(fruit)
    ))
   
}

const createStyles = (safeTheme) =>
  StyleSheet.create({
    section: {
      marginTop: 1,
    },

    accordionTab: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: safeTheme.primary_button_bg,
      paddingHorizontal: 15,
      paddingVertical: 15,
    },

    sectionTitle: {
      fontWeight: "700",
        color: safeTheme.text_on_dark_bg,
    
    },

    arrow: {
      color: safeTheme.text_on_dark_bg,
    },

    buttonContainer: {
      marginVertical: 10,
    },

    hazardButton: {
      backgroundColor: "#0077b6",
      paddingHorizontal: 7,
      paddingVertical: 9,
      borderRadius: 10,
      marginRight: 6,
        marginLeft: 6,
        width: 90,
        alignItems: "center",
    },

    activeHazardButton: {
      backgroundColor: "#9c027d",
    },

    hazardButtonText: {
      color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    
    },

    headingContainer: {
      backgroundColor: "#0080d6",
      paddingVertical: 8,
    },

    headingText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "700",
      fontSize: 12,
    },

    legendRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      padding: 10,
      gap: 20,
    },

    legendTitle: {
      fontWeight: "700",
    },

    legendItem: {
      flexDirection: "row",
      alignItems: "center",
    },

    legendBox: {
      width: 15,
      height: 15,
      marginRight: 5,
      borderWidth: 1,
      borderColor: "#000",
    },

    table: {
      borderWidth: 1,
      borderColor: "#0080d6",
      marginBottom: 20,
    },

    row: {
      flexDirection: "row",
    },

    headerCell: {
      width: 120,
      borderWidth: 1,
      borderColor: "#0080d6",
      padding: 8,
      textAlign: "center",
      fontWeight: "700",
      backgroundColor: "#f0f0f0",
    },

    districtCell: {
      width: 120,
      borderWidth: 1,
      borderColor: "#0080d6",
      padding: 8,
    },

    valueCell: {
      width: 120,
      borderWidth: 1,
      borderColor: "#0080d6",
      padding: 8,
      textAlign: "center",
    },
  });

  