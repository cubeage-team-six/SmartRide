import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminReports() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.subtitle}>Track RideAny platform performance</Text>

      <View style={styles.cards}>
        <View style={styles.statCard}>
          <Text style={styles.number}>18,432</Text>
          <Text style={styles.label}>Total Users</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.number}>3,891</Text>
          <Text style={styles.label}>Bookings</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.number}>₹8.4L</Text>
          <Text style={styles.label}>Revenue</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Platform Performance</Text>

        <View style={styles.chart}>
          {[40, 65, 50, 80, 60, 90, 75].map((height, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.day}>
                {["M", "T", "W", "T", "F", "S", "S"][index]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f5",
    padding: 32,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 16,
    color: "#68758a",
    marginTop: 6,
    marginBottom: 28,
  },

  cards: {
    flexDirection: "row",
    gap: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
  },

  number: {
    fontSize: 30,
    fontWeight: "800",
  },

  label: {
    color: "#718096",
    marginTop: 8,
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 24,
    padding: 28,
  },

  chartTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  chart: {
    height: 180,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    marginTop: 30,
  },

  barContainer: {
    alignItems: "center",
  },

  bar: {
    width: 35,
    backgroundColor: "#b6f500",
    borderRadius: 8,
  },

  day: {
    marginTop: 8,
    color: "#718096",
  },
});
