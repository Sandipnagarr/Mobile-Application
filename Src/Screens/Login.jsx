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
console.log("Login API Response:", response);
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

// import React, { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   Alert,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // 🔥 popup state
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupData, setPopupData] = useState(null);

//   // ✅ LOGIN HANDLER
//   const Loginhandel = async () => {
//     const normalizedUsername = username.trim();

//     if (!normalizedUsername || !password) {
//       Alert.alert("Missing details", "Please fill all the fields.");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const response = await fetch("https://mlinfomap.org/mlwapi/userLogin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: normalizedUsername,
//           userpassword: password,
//         }),
//       });

//       const data = await response.json();
//       console.log("LOGIN RESPONSE:", data);

//       // 🔥 HANDLE already_logged_in (MAIN FIX)
//   if (data?.status === "already_logged_in") {
//   setIsLoading(false); // 🔥 IMPORTANT
//   setPopupData(data?.data);

//   setTimeout(() => {
//     setShowPopup(true); // 🔥 FORCE RENDER AFTER STATE UPDATE
//   }, 100);

//   return;
// }

//       // ❌ other errors
//       if (!response.ok) {
//         Alert.alert(
//           "Login failed",
//           data?.msg || data?.message || "Unable to login.",
//         );
//         return;
//       }

//       // ✅ SUCCESS
//       const loginPayload = data?.data || {};
//       const token = loginPayload?.token;
//       const user = loginPayload?.resultUser;

//       if (!token) {
//         Alert.alert("Login failed", "No token received.");
//         return;
//       }

//       await AsyncStorage.setItem("user", JSON.stringify(user));
//       await AsyncStorage.setItem("token", token);

//       Alert.alert("Success", "Login successful.");
//       onLogin?.();
//     } catch (error) {
//       console.log("Login error:", error);
//       Alert.alert("Server error", "Could not connect to server.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 🔥 FORCE LOGOUT LOGIN
//   const forceLogoutLogin = async () => {
//     try {
//       setShowPopup(false);
//       setIsLoading(true);

//       const response = await fetch("https://mlinfomap.org/mlwapi/userLogin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           userpassword: password,
//           forceLogout: true, // 🔥 important
//         }),
//       });

//       const data = await response.json();

//       const loginPayload = data?.data || {};
//       const token = loginPayload?.token;
//       const user = loginPayload?.resultUser;

//       await AsyncStorage.setItem("user", JSON.stringify(user));
//       await AsyncStorage.setItem("token", token);

//       Alert.alert("Success", "Logged in after force logout.");
//       onLogin?.();
//     } catch (err) {
//       Alert.alert("Error", "Force login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome Back</Text>

//         <TextInput
//           placeholder="Username"
//           value={username}
//           onChangeText={setUsername}
//           style={styles.input}
//           autoCapitalize="none"
//         />

//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />

//         <Pressable style={styles.button} onPress={Loginhandel}>
//           <Text style={styles.buttonText}>
//             {isLoading ? "Logging..." : "Login"}
//           </Text>
//         </Pressable>
//       </View>

//       {/* 🔥 POPUP */}
//       {showPopup && (
//         <View style={styles.popupOverlay}>
//           <View style={styles.popup}>
//             <Text style={styles.popupTitle}>Already Logged In</Text>

//             <Text style={styles.popupText}>{popupData?.name}</Text>

//             <Text style={styles.popupText}>
//               📱 {popupData?.loggedin_device}
//             </Text>

//             <Text style={styles.popupText}>
//               {new Date(popupData?.login_time).toLocaleString()}
//             </Text>

//             <Text style={styles.popupNote}>
//               Do you want to logout from other device?
//             </Text>

//             <View style={styles.popupActions}>
//               <Pressable
//                 style={styles.cancelBtn}
//                 onPress={() => setShowPopup(false)}
//               >
//                 <Text>Cancel</Text>
//               </Pressable>

//               <Pressable style={styles.logoutBtn} onPress={forceLogoutLogin}>
//                 <Text style={{ color: "#fff" }}>Logout Other Device</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f172a",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     width: "90%",
//     maxWidth: 400,
//     backgroundColor: "#ffffff",
//     padding: 25,
//     borderRadius: 16,
//     elevation: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 25,
//     color: "#111",
//   },
//   input: {
//     backgroundColor: "#f1f5f9",
//     padding: 14,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#16a34a",
//     padding: 16,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },

//   // 🔥 POPUP
//   popupOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   popup: {
//     width: "85%",
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   popupText: {
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   popupNote: {
//     textAlign: "center",
//     marginTop: 10,
//     fontSize: 13,
//   },
//   popupActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 15,
//   },
//   cancelBtn: {
//     padding: 10,
//     backgroundColor: "#ddd",
//     borderRadius: 6,
//   },
//   logoutBtn: {
//     padding: 10,
//     backgroundColor: "#dc2626",
//     borderRadius: 6,
//   },
// });



/**1.integrated OpenLayers map in React Native using WebView
  2.Implemented India layers using APIs not shwoing in webview 
  2.a debugged with vishal (pass the bearerq token in header and added the layers)
  3.Implemented  State, and District boundary layers using APIs and give styling to the layers
  4.Implemented current hour highlighting in hourly weather cards and 7 days forecast card.
  5.Implemented interactive UI with accordion/tab-based forecast sections.
  6.Added dynamic state selection using dropdown for selcting the state  */

