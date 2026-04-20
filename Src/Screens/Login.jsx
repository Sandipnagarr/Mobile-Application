



import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Loginhandel = async () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password) {
      Alert.alert("Missing details", "Please fill all the fields.");
      return;
    }

    try {
      setIsLoading(true);


      const response = await fetch("https://mlinfomap.org/mlwapi/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedUsername,
          userpassword: password,
        }),
      });


      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Login failed",
          data?.msg || data?.message || "Unable to login."
        );
        return;
      }

      const loginPayload = data?.data || {};
      const token = loginPayload?.token;
      const user = loginPayload?.resultUser;

      if (!token) {
        Alert.alert("Login failed", "Login response did not include a token.");
        return;
      }

      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("token", token);
      }



      Alert.alert("Success", "Login successful.");
      onLogin?.();
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Server error", "Could not connect to ML Weather server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={Loginhandel}>
          <Text style={styles.buttonText}>
            {isLoading ? "Logging..." : "Login"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#111",
  },
  input: {
    backgroundColor: "#f1f5f9",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});










/**Designed responsive mobile UI layout using React Native
Developed weather dashboard interface displaying key data (temperature, humidity, wind, etc.)
Implemented SafeAreaView to handle device notch and screen boundaries
Created scrollable card layout using ScrollView for better content handling
Debugged and optimized UI layout issues related to flexbox and component alignment*/