import { StyleSheet, Text, View } from "react-native";

export default function DistrictScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>District</Text>
        <Text style={styles.title}>District Overview</Text>
        <Text style={styles.description}>
          Use this tab for district-wise weather summaries, alerts, and local
          tracking.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff6ff",
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
    color: "#1d4ed8",
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
  },
});
