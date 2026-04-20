import { Pressable, StyleSheet, Text, View } from "react-native";

export default function UserScreen({ onLogout }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>User</Text>
        <Text style={styles.title}>Profile & Settings</Text>
        <Text style={styles.description}>
          Manage account information and use the button below to log out.
        </Text>
        <Pressable style={styles.button} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  eyebrow: {
    color: "#16a34a",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },
  description: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#16a34a",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
