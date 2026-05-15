import React, { useContext, useState } from "react";
import { StackedBarChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { defaultTheme } from "../theme";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherBreakdown() {
  const { theme } = useContext(WeatherContext);
  const safeTheme = theme || defaultTheme;
  const styles = createStyles(safeTheme);
  const [accordian, setAccordian] = useState(true);

  return (
    <View style={styles.section}>
      {/* HOURLY TAB */}
      <Pressable
        style={[styles.accordionTab, accordian && styles.activeAccordionTab]}
        onPress={() => setAccordian(!accordian)}
      >
        <Text
          style={[
            styles.tabTitle,
            { color: accordian ? safeTheme.secondary_text_color : "#fff" },
          ]}
        >
          weather parameter breakdown
        </Text>
        <Text style={styles.arrow}>{accordian ? "▲" : "▼"}</Text>
      </Pressable>
      {accordian && (
        <ScrollView>
          <StackedBarChart
            data={{
              labels: ["Temp", "Humidity", "Rain", "Wind", "Visibility"],

              legend: ["Min", "Max"],

              data: [
                [22, 46],

                [14, 75],

                [20, 70],

                [20, 61],

                [9, 10],
              ],

              barColors: ["#bd8e17", "#0d74b8"],
            }}
            width={screenWidth}
            height={260}
            chartConfig={{
              backgroundColor: "#fff",

              backgroundGradientFrom: "#fff",

              backgroundGradientTo: "#fff",

              decimalPlaces: 0,

color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
labelColor: (opacity = 1) =>`rgba(80,80,80,${opacity})`,

              propsForBackgroundLines: {
                stroke: "#e5e7eb",
              },
            }}
            style={{
              borderRadius: 20,

              marginTop: 15,
            }}
            hideLegend={true}
          />
        </ScrollView>
      )}
    </View>
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

    tabTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 14,
      fontWeight: "600",
      color: safeTheme.text_on_dark_bg,
    },

    arrow: {
      position: "absolute",
      right: 15,
      fontSize: 16,
      color: safeTheme.text_on_dark_bg,
    },

    activeHourCard: {
      backgroundColor: safeTheme.hover_card_bg,
      borderColor: safeTheme.primary_border_color,
      borderWidth: 1,
      color: "red",
    },

    header: {
      flexDirection: "row",

      justifyContent: "space-between",

      alignItems: "center",
    },

    title: {
      fontSize: 18,

      fontWeight: "700",
    },

    infoBox: {
      marginTop: 20,

      gap: 10,
    },
    noData: {
      textAlign: "center",
      marginTop: 10,
      color: safeTheme.secondary_text_color,
    },
  });
/**
 * 
/* Fixed map layer rendering issue while switching back to All India after selecting a state (state not loaded)
   Changed the position of the layers as in the web application
   Added a new Weather KPI component and developed circular Weather KPI UI with styling
   Fetched API "get_circle_weather_min_max" to get max, min, and bound data in KPI
   Debugged undefined data issues  checked API response in Postman and fixed them
   Added icon-based weather indicators using FontAwesome5
   Created a new component and implemented an accordion-based weather parameter breakdown section
   Integrated stacked bar chart visualization in the weather parameter accordion tab

 */