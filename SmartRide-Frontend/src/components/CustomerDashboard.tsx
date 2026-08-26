import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CustomerDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Good morning, Arjun
      </Text>

      <Text style={styles.subtitle}>
        RideAny Customer Dashboard
      </Text>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.number}>14</Text>
          <Text style={styles.label}>Total Bookings</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>1</Text>
          <Text style={styles.label}>Active Rentals</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>₹41,280</Text>
          <Text style={styles.label}>Total Spent</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>2,340</Text>
          <Text style={styles.label}>Loyalty Points</Text>
        </View>
      </View>

      <View style={styles.booking}>
        <Text style={styles.bookingTitle}>
          Active Booking
        </Text>

        <Text style={styles.vehicle}>
          Mahindra Thar LX
        </Text>

        <Text style={styles.details}>
          SUV · 4WD · GoWheels Rental, Bangalore
        </Text>

        <Text style={styles.details}>
          Pickup: Aug 14, 2025
        </Text>

        <Text style={styles.details}>
          Return: Aug 17, 2025
        </Text>

        <Text style={styles.amount}>
          ₹3,850
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#F7F7F5",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0B0D0C",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 17,
    color: "#7A8494",
    marginBottom: 28,
  },

  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
  },

  card: {
    flex: 1,
    minWidth: 180,
    minHeight: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    justifyContent: "center",
  },

  number: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0B0D0C",
    marginBottom: 8,
  },

  label: {
    fontSize: 15,
    color: "#7A8494",
  },

  booking: {
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
  },

  bookingTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
  },

  vehicle: {
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 8,
  },

  details: {
    fontSize: 16,
    color: "#7A8494",
    marginBottom: 8,
  },

  amount: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },
});