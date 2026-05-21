import { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from "react-native";
import { defaultTheme } from "../theme";
import { WeatherContext } from "../context/WeatherContext";     
import { FontAwesome5 } from "@expo/vector-icons";
import { postrequest } from "../api/Api";

export default function TodayParameter() { 
    const safeTheme = theme || defaultTheme;
    const styles = createStyles(safeTheme);
    const { theme,circle } = useContext(WeatherContext);
    const [accordian, showAccordian] = useState(false);
    


    const fetchreportdata = () => {
        try {
            let circlePayload = circle === "All India" ? "M&G" : circle;
            
            const response = postrequest("fetch_district_names_severity_wise", {
                circle: circlePayload,
            });
            console.log("Report API Response:", JSON.stringify(response, null, 2));
        }
        catch (error) {
            console.log("report api error",error)
        }
    }
    useEffect(() => {
        fetchreportdata
    }, [circle])

    return (
      <>
        <View style={styles.section}>
          <Pressable
            style={[
              styles.accordionTab,
              accordian && styles.activeAccordionTab,
            ]}
            onPress={() => showAccordian(!accordian)}
          >
            <Text
              style={[
                styles.tabTitle,
                { color: accordian ? safeTheme.secondary_text_color : "#fff" },
              ]}
            >
              Hourly Forecast
            </Text>
            <Text style={styles.arrow}>{accordian ? "▲" : "▼"}</Text>
          </Pressable>

          {accordian && (
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View style={styles.table}>
                {/* HEADER */}

                <View style={styles.headerRow}>
                  <Text style={styles.parameterHeader}>Weather Parameters</Text>

                  <Text style={[styles.header, styles.extremeHeader]}>
                    Extreme
                  </Text>

                  <Text style={[styles.header, styles.highHeader]}>High</Text>

                  <Text style={[styles.header, styles.moderateHeader]}>
                    Moderate
                  </Text>

                  <Text style={[styles.header, styles.lowHeader]}>Low</Text>
                </View>

                {[
                  {
                    icon: "cloud-rain",
                    name: "Rainfall",
                  },

                  {
                    icon: "wind",
                    name: "Wind",
                  },

                  {
                    icon: "tint",
                    name: "Humidity",
                  },

                  {
                    icon: "eye",
                    name: "Visibility",
                  },

                  {
                    icon: "temperature-high",
                    name: "Temp (max)",
                  },

                  {
                    icon: "temperature-low",
                    name: "Temp (min)",
                  },
                ].map((item, index) => (
                  <View key={index} style={styles.row}>
                    {/* Parameter */}

                    <View style={styles.parameterCell}>
                      <View style={styles.iconCircle}>
                        <FontAwesome5 name={item.icon} size={14} color="#fff" />
                      </View>

                      <Text style={styles.parameterText}>{item.name}</Text>
                    </View>

                    {/* Extreme */}

                    <Text style={styles.valueCell}>Nil</Text>

                    {/* High */}

                    <Text style={styles.valueCell}>Nashik, Pune, Satara</Text>

                    {/* Moderate */}

                    <Text style={styles.valueCell}>
                      Ahmednagar, Solapur, Wardha
                    </Text>

                    {/* Low */}

                    <Text style={styles.valueCell}>
                      Osmanabad, Goa, Kolhapur, Aurangabad
                    </Text>
                  </View>
                ))}

                {/* Bottom legend */}

                <View style={styles.footerRow}>
                  <Text style={styles.footerCell}>Weather Parameter</Text>

                  <Text style={[styles.footerCell, styles.tempExtreme]}>
                    Extreme
                  </Text>

                  <Text style={[styles.footerCell, styles.tempHigh]}>High</Text>

                  <Text style={[styles.footerCell, styles.tempModerate]}>
                    Moderate
                  </Text>

                  <Text style={[styles.footerCell, styles.tempLow]}>
                    Low
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </>
    );
}

const createStyles = (safeTheme) =>
  StyleSheet.create({
    section: {
      marginTop: 15,
    },
    accordionTab: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 15,
      backgroundColor: safeTheme.primary_button_bg,
      marginBottom: 1,
    },

    activeAccordionTab: {
      backgroundColor: safeTheme.accordion_active_bg,
    },
    table: {
      borderWidth: 1,
      borderColor: "#0080d6",
      marginTop: 10,
    },

    headerRow: {
      flexDirection: "row",
    },

    row: {
      flexDirection: "row",
    },

    parameterHeader: {
      width: 180,
      padding: 10,
      borderWidth: 1,
      borderColor: "#0080d6",
      fontWeight: "700",
    },

    header: {
      width: 220,
      padding: 10,
      textAlign: "center",
      borderWidth: 1,
      borderColor: "#0080d6",
      fontWeight: "700",
    },

    extremeHeader: {
      backgroundColor: "red",
    },

    highHeader: {
      backgroundColor: "orange",
    },

    moderateHeader: {
      backgroundColor: "#e6ff00",
    },

    lowHeader: {
      backgroundColor: "#fff",
    },

    parameterCell: {
      width: 180,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#0080d6",
    },

    valueCell: {
      width: 220,
      padding: 15,
      textAlign: "center",
      borderWidth: 1,
      borderColor: "#0080d6",
    },

    iconCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#0080d6",

      justifyContent: "center",
      alignItems: "center",
    },

    footerRow: {
      flexDirection: "row",
    },

    footerCell: {
      width: 180,
      padding: 10,
      borderWidth: 1,
      borderColor: "#0080d6",
      textAlign: "center",
    },

    tempExtreme: {
      backgroundColor: "#3d8ce1",
      width: 220,
    },

    tempHigh: {
      backgroundColor: "#74acec",
      width: 220,
    },

    tempModerate: {
      backgroundColor: "#bad3fd",
      width: 220,
    },
      tempLow: {
          width: 220,
        
      }
  });