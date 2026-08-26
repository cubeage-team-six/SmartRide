import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function PaymentPage() {
  const payments = [
    {
      id: "PAY-2024-0812",
      vehicle: "Mahindra Thar LX",
      date: "Aug 14, 2025",
      amount: "₹5,850",
      status: "Paid",
    },
    {
      id: "PAY-2024-0806",
      vehicle: "Toyota Innova Crysta",
      date: "Jul 22, 2025",
      amount: "₹9,200",
      status: "Paid",
    },
    {
      id: "PAY-2024-0791",
      vehicle: "Honda Activa 6G",
      date: "Aug 8, 2025",
      amount: "₹498",
      status: "Paid",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.subtitle}>
          Manage your payments and transaction history
        </Text>
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <View style={styles.iconBox}>
            <Ionicons
              name="wallet-outline"
              size={24}
              color="#111"
            />
          </View>

          <Text style={styles.summaryAmount}>₹41,280</Text>
          <Text style={styles.summaryLabel}>Total Spent</Text>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.iconBox}>
            <Ionicons
              name="receipt-outline"
              size={24}
              color="#111"
            />
          </View>

          <Text style={styles.summaryAmount}>14</Text>
          <Text style={styles.summaryLabel}>Transactions</Text>
        </View>
      </View>

      {/* PAYMENT HISTORY */}
      <Text style={styles.sectionTitle}>Payment History</Text>

      {payments.map((payment) => (
        <View key={payment.id} style={styles.paymentCard}>
          <View style={styles.paymentIcon}>
            <Ionicons
              name="card-outline"
              size={25}
              color="#111"
            />
          </View>

          <View style={styles.paymentInfo}>
            <Text style={styles.vehicleName}>
              {payment.vehicle}
            </Text>

            <Text style={styles.paymentId}>
              {payment.id}
            </Text>

            <Text style={styles.paymentDate}>
              {payment.date}
            </Text>
          </View>

          <View style={styles.paymentRight}>
            <Text style={styles.amount}>
              {payment.amount}
            </Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {payment.status}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* PAYMENT METHOD */}
      <Text style={styles.sectionTitle}>
        Payment Methods
      </Text>

      <View style={styles.methodCard}>
        <View style={styles.methodIcon}>
          <Ionicons
            name="card"
            size={25}
            color="#111"
          />
        </View>

        <View style={styles.methodInfo}>
          <Text style={styles.methodTitle}>
            HDFC Bank •••• 4821
          </Text>

          <Text style={styles.methodSubtitle}>
            Primary payment method
          </Text>
        </View>

        <Pressable>
          <Text style={styles.manageText}>
            Manage
          </Text>
        </Pressable>
      </View>

      <Pressable style={styles.addButton}>
        <Ionicons
          name="add"
          size={20}
          color="#111"
        />

        <Text style={styles.addButtonText}>
          Add Payment Method
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  content: {
    padding: 32,
    paddingBottom: 60,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0B0D0C",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#7B8493",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#B4F000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  summaryAmount: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111",
  },

  summaryLabel: {
    marginTop: 5,
    fontSize: 14,
    color: "#7B8493",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111",
    marginBottom: 14,
  },

  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  paymentIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 15,
  },

  vehicleName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
  },

  paymentId: {
    marginTop: 3,
    fontSize: 13,
    color: "#8A92A0",
  },

  paymentDate: {
    marginTop: 3,
    fontSize: 13,
    color: "#8A92A0",
  },

  paymentRight: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },

  statusBadge: {
    marginTop: 7,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#D9FBEA",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#07945B",
  },

  methodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#B4F000",
    alignItems: "center",
    justifyContent: "center",
  },

  methodInfo: {
    flex: 1,
    marginLeft: 15,
  },

  methodTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  methodSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#8A92A0",
  },

  manageText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  addButton: {
    marginTop: 14,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
});