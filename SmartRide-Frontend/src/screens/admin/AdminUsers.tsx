import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AdminUsers() {
  const users = [
    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      status: "Active",
      bookings: 12,
    },
    {
      name: "Priya Patil",
      email: "priya@gmail.com",
      status: "Active",
      bookings: 8,
    },
    {
      name: "Amit Kumar",
      email: "amit@gmail.com",
      status: "Inactive",
      bookings: 3,
    },
    {
      name: "Riya Joshi",
      email: "riya@gmail.com",
      status: "Active",
      bookings: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <Text style={styles.subtitle}>
          Manage all customers registered on RideAny
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>All Users</Text>

        {users.map((user, index) => (
          <View key={index} style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>

            <Text style={styles.bookings}>{user.bookings} bookings</Text>

            <View
              style={[
                styles.status,
                user.status === "Active" ? styles.active : styles.inactive,
              ]}
            >
              <Text>{user.status}</Text>
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

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111",
  },

  subtitle: {
    fontSize: 16,
    color: "#68758a",
    marginTop: 6,
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

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#b6f500",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
  },

  userInfo: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  email: {
    color: "#718096",
    marginTop: 4,
  },

  bookings: {
    width: 130,
    color: "#555",
  },

  status: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  active: {
    backgroundColor: "#dcfce7",
  },

  inactive: {
    backgroundColor: "#f1f1f1",
  },
});
