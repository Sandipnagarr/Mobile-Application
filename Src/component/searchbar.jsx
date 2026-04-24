import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet,Pressable } from "react-native";
import { WeatherContext } from "../context/WeatherContext";

export default function SearchBar({ webViewRef }) {
  const [query, setQuery] = useState("");

  const { setLocation, setLocationName } = useContext(WeatherContext);

const handleSearch = async () => {
  if (!query) return;

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query,
    )}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "weather-app",
        Accept: "application/json",
      },
    });

    const text = await res.text();

    //  DEBUG (see actual response)
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    if (data.length === 0) {
      alert("Location not found");
      return;
    }

    const place = data[0];

    const lat = place.lat;
    const lon = place.lon;
    const name = place.display_name;

    setLocation(`${lat},${lon}`);
    setLocationName(name);

    webViewRef.current?.postMessage(
      JSON.stringify({
        type: "SEARCH_LOCATION",
        lat,
        lon,
        name,
      }),
    );
  } catch (error) {
    console.log("Search error:", error);
  }
};

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search location..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button
        style={styles.Button}
        title="Search"
        color="#198b49"
        onPress={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
  },
  Button: {
    backgroundColor: "#198b49",
    color: "white",
  },
});
