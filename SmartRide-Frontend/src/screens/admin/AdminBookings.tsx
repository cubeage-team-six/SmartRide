import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminBookings() {
  const bookings = [
    {
      id: "#BK1024",
      user: "Rahul Sharma",
      vehicle: "Toyota Innova",
      date: "01 Sep 2026",
      status: "Completed",
    },
    {
      id: "#BK1025",
      user: "Priya Patil",
      vehicle: "Hyundai Creta",
      date: "02 Sep 2026",
      status: "Active",
    },
    {
      id: "#BK1026",
      user: "Amit Kumar",
      vehicle: "Maruti Swift",
      date: "03 Sep 2026",
      status: "Pending",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bookings</Text>
      <Text style={styles.subtitle}>
        Monitor and manage all RideAny bookings
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Bookings</Text>

        {bookings.map((booking, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.id}>{booking.id}</Text>

            <View style={styles.user}>
              <Text style={styles.bold}>{booking.user}</Text>
              <Text style={styles.gray}>{booking.vehicle}</Text>
            </View>

            <Text style={styles.date}>{booking.date}</Text>

            <View style={styles.status}>
              <Text>{booking.status}</Text>
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

  id: {
    width: 100,
    fontWeight: "700",
  },

  user: {
    flex: 1,
  },

  bold: {
    fontWeight: "700",
  },

  gray: {
    color: "#718096",
    marginTop: 4,
  },

  date: {
    width: 140,
  },

  status: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
});
