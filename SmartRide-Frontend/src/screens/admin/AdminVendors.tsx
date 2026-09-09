import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminVendors() {
  const vendors = [
    {
      name: "CityRide Rentals",
      email: "cityride@gmail.com",
      vehicles: 24,
      kyc: "Approved",
    },
    {
      name: "DriveEasy",
      email: "driveeasy@gmail.com",
      vehicles: 18,
      kyc: "Pending",
    },
    {
      name: "Urban Cars",
      email: "urbancars@gmail.com",
      vehicles: 32,
      kyc: "Approved",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vendors</Text>
      <Text style={styles.subtitle}>
        Manage RideAny vehicle vendors and KYC
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>All Vendors</Text>

        {vendors.map((vendor, index) => (
          <View style={styles.row} key={index}>
            <View style={styles.info}>
              <Text style={styles.name}>{vendor.name}</Text>
              <Text style={styles.email}>{vendor.email}</Text>
            </View>

            <Text style={styles.vehicleText}>{vendor.vehicles} vehicles</Text>

            <View style={styles.kyc}>
              <Text>{vendor.kyc}</Text>
            </View>
          </View>
        ))}
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
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  email: {
    color: "#718096",
    marginTop: 4,
  },

  vehicleText: {
    width: 150,
  },

  kyc: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
});
