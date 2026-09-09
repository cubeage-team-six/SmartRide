import { ScrollView, StyleSheet, Text, View } from "react-native";

const AdminPayments = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>SMART RIDE ADMIN</Text>

          <Text style={styles.title}>Payments</Text>

          <Text style={styles.summary}>
            Monitor and manage all payment transactions.
          </Text>
        </View>
      </View>

      <View style={styles.stats}>
        <Stat title="Total Revenue" value="$24.8k" subtitle="This month" />

        <Stat
          title="Successful Payments"
          value="1,248"
          subtitle="Completed transactions"
        />

        <Stat
          title="Pending Payments"
          value="32"
          subtitle="Awaiting confirmation"
        />

        <Stat title="Refunds" value="18" subtitle="This month" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.idColumn]}>
              Transaction
            </Text>

            <Text style={[styles.headerText, styles.userColumn]}>User</Text>

            <Text style={[styles.headerText, styles.amountColumn]}>Amount</Text>

            <Text style={[styles.headerText, styles.statusColumn]}>Status</Text>
          </View>
          <PaymentRow
            id="#PAY-1024"
            user="Rahul Sharma"
            amount="$120"
            status="Completed"
          />

          <PaymentRow
            id="#PAY-1023"
            user="Priya Patel"
            amount="$85"
            status="Completed"
          />

          <PaymentRow
            id="#PAY-1022"
            user="Amit Kumar"
            amount="$240"
            status="Pending"
          />

          <PaymentRow
            id="#PAY-1021"
            user="Sneha Joshi"
            amount="$150"
            status="Completed"
          />

          <PaymentRow
            id="#PAY-1020"
            user="Arjun Mehta"
            amount="$95"
            status="Refunded"
          />
        </View>
      </View>
    </ScrollView>
  );
};

type StatProps = {
  title: string;
  value: string;
  subtitle: string;
};

const Stat = ({ title, value, subtitle }: StatProps) => {
  return (
    <View style={styles.stat}>
      <Text style={styles.statTitle}>{title}</Text>

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
};

type PaymentRowProps = {
  id: string;
  user: string;
  amount: string;
  status: string;
};

const PaymentRow = ({ id, user, amount, status }: PaymentRowProps) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.cellText, styles.idColumn]}>{id}</Text>

      <Text style={[styles.cellText, styles.userColumn]}>{user}</Text>

      <Text style={[styles.cellText, styles.amountColumn]}>{amount}</Text>

      <View style={styles.statusColumn}>
        <View
          style={[
            styles.statusBadge,
            status === "Completed" && styles.completed,
            status === "Pending" && styles.pending,
            status === "Refunded" && styles.refunded,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              status === "Completed" && styles.completedText,
              status === "Pending" && styles.pendingText,
              status === "Refunded" && styles.refundedText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  content: {
    padding: 32,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 28,
  },

  eyebrow: {
    color: "#1C7C70",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  title: {
    color: "#14213D",
    fontSize: 30,
    fontWeight: "800",
  },

  summary: {
    color: "#687386",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },

  stats: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 30,
  },

  stat: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E7EAF0",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    padding: 18,
  },

  statTitle: {
    color: "#687386",
    fontSize: 13,
    fontWeight: "600",
  },

  statValue: {
    color: "#14213D",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 8,
  },

  statSubtitle: {
    color: "#9299A8",
    fontSize: 11,
    marginTop: 6,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E7EAF0",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  sectionTitle: {
    color: "#14213D",
    fontSize: 20,
    fontWeight: "800",
    padding: 22,
    paddingBottom: 18,
  },

  table: {
    width: "100%",
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    backgroundColor: "#F7F8FA",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E7EAF0",
    paddingHorizontal: 20,
  },

  headerText: {
    color: "#687386",
    fontSize: 12,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 65,
    borderBottomWidth: 1,
    borderBottomColor: "#E7EAF0",
    paddingHorizontal: 20,
  },

  cellText: {
    color: "#14213D",
    fontSize: 13,
    fontWeight: "500",
  },

  idColumn: {
    flex: 1.2,
  },

  userColumn: {
    flex: 1.5,
  },

  amountColumn: {
    flex: 1,
  },

  statusColumn: {
    flex: 1,
  },

  statusBadge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  completed: {
    backgroundColor: "#E8F7D0",
  },

  completedText: {
    color: "#4D7210",
  },

  pending: {
    backgroundColor: "#FFF3D6",
  },

  pendingText: {
    color: "#9A6B00",
  },

  refunded: {
    backgroundColor: "#F0E5FF",
  },

  refundedText: {
    color: "#743BB5",
  },
});

export default AdminPayments;
