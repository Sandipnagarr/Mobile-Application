import React, { useState, useContext,useEffect } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { WeatherContext } from "../context/WeatherContext";
import { defaultTheme } from "../theme";
import { postrequest } from "../api/Api";
import { FontAwesome5 } from "@expo/vector-icons";

export default function WeatherForecast() {
  const [accordian, setaccordian] = useState(false);
  const [activeButton, setactiveButton] = useState("Rainfall");
  const [accuData, setaccuData] = useState([]);
  const [districtData,setdistrictData]=useState([]);
  const { theme,circle } = useContext(WeatherContext);
  const safeTheme = theme || defaultTheme;
  const styles = createStyles(safeTheme);

  let circlePayload = circle === "All India" ? "M&G" : circle;
  
  const hazards = [
    { key: "Rainfall", label: "Rainfall", icon: "cloud-rain" },
    { key: "Accu_Rainfall", label: "Accu_Rainfall", icon: "cloud-rain" },
    { key: "Wind", label: "Wind", icon: "wind" },
    { key: "Humidity", label: "Humidity", icon: "tint" },
    { key: "Visibility", label: "Visibility", icon: "eye" },
    { key: "Temperature", label: "Temperature", icon: "temperature-high" },
  ];

  const dates = ["1 Jun", "2 Jun", "3 Jun", "4 Jun", "5 Jun", "6 Jun", "7 Jun"];

  const headingMap = {
    Rainfall: "Rainfall Forecast - 7 Days",
    Accu_Rainfall: "Accu_Rainfall Forecast - 7 Days",
    Wind: "Wind Forecast - 7 Days",
    Humidity: "Humidity Forecast - 7 Days",
    Visibility: "Visibility Forecast - 7 Days",
    Temperature: "Temperature Forecast - 7 Days",
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


  const fetchaquranfallapi = async () => {
    try {
      const response = await postrequest("/fetch_accumulated_rainfall", {
        circle: circlePayload,
      });
      setaccuData(response);
      console.log("accu rainfall api response",response)
    }
    catch (error) {
      console.log("error in fetching accu rainfall api",error)
    }
  }

  // fetch api for the district wise  name

  const districnameapi = async () => {
    
    const response = await postrequest("/fetch_district_wise_KPI_values", {
      circle: circlePayload,
    });
    setdistrictData(response)
    try {
    
    } catch (error) {
      console.log("error in fetching distict name api",error)
  }
}
  useEffect(() => {
    fetchaquranfallapi();
    districnameapi();
  }, [])
 

  const setActiveHaz = (tab) => {
    setactiveButton(tab);

    // Your API Calls
    // updateWeatherHazardUserLog(tab);
    // getDateLabelshaz();
    // fetchDistrictWiseHazardValues();
  };
  const getCellData = (dayData) => {
    switch (activeButton) {
      case "Rainfall":
        return {
          value: dayData?.rain_precip,
          severity: dayData?.rain_severity,
        };

      case "Wind":
        return {
          value: dayData?.wind,
          severity: dayData?.wind_severity,
        };

      case "Humidity":
        return {
          value: dayData?.humidity,
          severity: dayData?.humidity_severity,
        };

      case "Visibility":
        return {
          value: dayData?.visibility,
          severity: dayData?.visibility_severity,
        };

      case "Temperature":
        return {
          value: dayData?.temp_max,
          severity: dayData?.temp_max_severity,
        };

      default:
        return {
          value: "-",
          severity: "",
        };
    }
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
 
  const getDateLabels = () => {
    const today = new Date();
    const datesRange = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      datesRange.push(
        d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
      );
    }

    return datesRange;
  };
  const datesRange = getDateLabels();
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
              <Pressable
                key={item.key}
                onPress={() => setActiveHaz(item.key)}
                style={[
                  styles.hazardButton,
                  activeButton === item.key && styles.activeHazardButton,
                ]}
              >
                <FontAwesome5 name={item.icon} size={14} color="#fff" />
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

                {activeButton === "Accu_Rainfall" ? (
                  <>
                    <Text style={styles.headerCell}>Day 1-3</Text>
                    <Text style={styles.headerCell}>Day 2-4</Text>
                    <Text style={styles.headerCell}>Day 3-5</Text>
                  </>
                ) : (
                  datesRange.map((date) => (
                    <Text key={date} style={styles.headerCell}>
                      {date}
                    </Text>
                  ))
                )}
              </View>

              {/* Rows */}
              {activeButton === "Accu_Rainfall"
                ? accuData?.data?.map((row) => (
                    <View key={row.district} style={styles.row}>
                      <Text style={styles.districtCell}>{row.district}</Text>

                      <Text
                        style={[
                          styles.valueCell,
                          getSeverityStyle(row.acc_1_to_3_severity),
                        ]}
                      >
                        {row.acc_1_to_3}
                      </Text>

                      <Text
                        style={[
                          styles.valueCell,
                          getSeverityStyle(row.acc_2_to_4_severity),
                        ]}
                      >
                        {row.acc_2_to_4}
                      </Text>

                      <Text
                        style={[
                          styles.valueCell,
                          getSeverityStyle(row.acc_3_to_5_severity),
                        ]}
                      >
                        {row.acc_3_to_5}
                      </Text>
                    </View>
                  ))
                : districtData?.[0]?.district_wise_kpi_values?.map((row) => (
                    <View key={row.district} style={styles.row}>
                      <Text style={styles.districtCell}>{row.district}</Text>

                      {datesRange.map((_, index) => {
                        const dayData = row[`day${index + 1}`];
                        const cellData = getCellData(dayData);

                        return (
                          <Text
                            key={index}
                            style={[
                              styles.valueCell,
                              getSeverityStyle(cellData.severity),
                            ]}
                          >
                            {cellData.value}
                          </Text>
                        );
                      })}
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
      width: 100,
      alignItems: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    activeHazardButton: {
      backgroundColor: "#9c027d",
    },

    hazardButtonText: {
      marginLeft: 8,
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
      fontSize: 10,
    },

    valueCell: {
      width: 120,
      borderWidth: 1,
      borderColor: "#0080d6",
      padding: 8,
      fontSize: 10,
      textAlign: "center",
    },
  });

  /**
   * 
Integrated Accumulated Rainfall API in wetaher forecast and mapped the reponse data for dynamic table
Integrated District-wise KPI API and mapped district forecast data for dynamic table population
Fixed district-wise API response binding issue (debugged response)
Implemented dynamic table data change based on selected hazard (Rainfall, Wind, Humidity, Visibility, Temperature)
Applied severity-based color dynamics to table cells based on API response values
Generated dynamic 7-day forecast date headers
Configured dynamic date-range headers for accumulated rainfall forecasts

    */