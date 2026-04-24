import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function IDW() {
  const handlePress = (layer) => {
    console.log("Selected:", layer);

    // dummy functions
    if (layer === "rainfall") console.log("Rainfall IDW called");
    if (layer === "wind") console.log("Wind IDW called");
    if (layer === "humidity") console.log("Humidity IDW called");
    if (layer === "fog") console.log("Visibility IDW called");
    if (layer === "temperature") console.log("Temperature IDW called");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => handlePress("rainfall")}>
        <Text style={styles.text}>Rainfall</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => handlePress("wind")}>
        <Text style={styles.text}>Wind</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => handlePress("humidity")}>
        <Text style={styles.text}>Humidity</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => handlePress("fog")}>
        <Text style={styles.text}>Visibility</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => handlePress("temperature")}
      >
        <Text style={styles.text}>Temperature</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
  },
  button: {
    backgroundColor: "#198b49",
    padding: 8,
    margin: 2,
    borderRadius: 6,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
