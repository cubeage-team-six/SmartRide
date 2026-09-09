import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminVehicles() {
  const vehicles = [
    {
      vehicle: "Toyota Innova",
      number: "MH 12 AB 1234",
      vendor: "CityRide Rentals",
      status: "Available",
    },
    {
      vehicle: "Hyundai Creta",
      number: "MH 14 CD 5678",
      vendor: "DriveEasy",
      status: "Booked",
    },
    {
      vehicle: "Maruti Swift",
      number: "MH 12 EF 9012",
      vendor: "Urban Cars",
      status: "Available",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vehicles</Text>
      <Text style={styles.subtitle}>Manage all vehicles listed on RideAny</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vehicle List</Text>

        {vehicles.map((vehicle, index) => (
          <View style={styles.row} key={index}>
            <View style={styles.info}>
              <Text style={styles.name}>{vehicle.vehicle}</Text>
              <Text style={styles.number}>{vehicle.number}</Text>
            </View>

            <Text style={styles.vendor}>{vehicle.vendor}</Text>

            <View style={styles.status}>
              <Text>{vehicle.status}</Text>
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

  number: {
    color: "#718096",
    marginTop: 4,
  },

  vendor: {
    width: 180,
  },

  status: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
});
