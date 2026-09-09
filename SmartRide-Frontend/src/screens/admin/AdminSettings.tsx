import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminSettings() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Manage your admin account and platform settings
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Admin Profile</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Admin</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>admin@rideany.com</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>Administrator</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Platform Settings</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Text style={styles.value}>Enabled</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email Alerts</Text>
          <Text style={styles.value}>Enabled</Text>
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  label: {
    color: "#718096",
  },

  value: {
    fontWeight: "600",
  },
});
