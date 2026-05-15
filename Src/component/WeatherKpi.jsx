import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WeatherContext } from "../context/WeatherContext";
import { postrequest } from "../api/Api";
import { FontAwesome5 } from "@expo/vector-icons";


const radius = 110;
export default function WeatherKpi() {
  const {circle} = useContext(WeatherContext);
  const [weatherKPIs, setWeatherKPIs] = useState([]);
  
  useEffect(() => {
    fetchweatherKPIs();
  }, [circle]);
  
  // call api for min max kpi data..............
  const fetchweatherKPIs = async () => {
  try {
    let circlePayload = circle === "All India" ? 'M&G' : circle;
    const response = await postrequest("/get_circle_weather_min_max", {
      circle: circlePayload,
    });

    const today = response?.data?.[0] || {};
    const formatted = [
      {
        label: "Temp",

        min: `${today.temp_min}°C`,

        max: `${today.temp_max}°C`,

        icon: "temperature-high",
      },

      {
        label: "Humidity",

        min: `${today.humidity_min}%`,

        max: `${today.humidity_max}%`,

        icon: "tint",
      },

      {
        label: "Rain",

        min: `${today.rain_min} mm`,

        max: `${today.rain_max} mm`,

        icon: "cloud-rain",
      },

      {
        label: "Wind",

        min: `${today.wind_min} kmph`,

        max: `${today.wind_max} kmph`,

        icon: "wind",
      },

      {
        label: "Visibility",

        min: `${today.visibility_min} km`,

        max: `${today.visibility_max} km`,

        icon: "smog",
      },
    ];

  setWeatherKPIs(formatted);
  } catch (error) {
    console.log("API ERROR", error);
  }
};
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>TODAY'S WEATHER</Text>

      <View style={styles.outerCircle}>
        {weatherKPIs.map((item, index) => {
          const angle =(index * (360 / weatherKPIs.length) - 90) * (Math.PI / 180);
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <View
              key={index}
              style={[
                styles.kpiWrapper,

                {
                  transform: [{ translateX: x }, { translateY: y }],
                },
              ]}
            >
              <View style={styles.kpiBubble}>
                <Text style={styles.max}>{item.max}</Text>

                <FontAwesome5
                  name={item.icon}
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />

                <Text style={styles.min}>{item.min}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },

  heading: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 40,
  },

  outerCircle: {
    width: 320,
    height: 320,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  kpiWrapper: {
    position: "absolute",
  },

  kpiBubble: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#add8e6",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },

  max: {
    color: "#d48806",
    fontWeight: "800",
  },

  min: {
    fontWeight: "700",
  },

  icon: {
    width: 35,
    height: 35,
    textAlign: "center",
    backgroundColor: "#0d74b8",
    color: "#fff",
    borderRadius: 20,
    paddingTop: 8,
  },
});
