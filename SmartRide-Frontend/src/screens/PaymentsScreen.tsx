import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../components/AppShell";
import type { PaymentsScreenProps } from "../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const MUTED = "#858C98";
const BORDER = "#E5E7EB";
const WHITE = "#FFFFFF";

export type PaymentMethod = {
  id: number;
  type: "upi" | "card" | "bank";
  title: string;
  subtitle: string;
};

export type Transaction = {
  title: string;
  id: string;
  method: string;
  date: string;
  status: "Success" | "Refunded";
  amount: string;
  refund?: boolean;
};

const initialMethods: PaymentMethod[] = [
  {
    id: 1,
    type: "upi",
    title: "Google Pay UPI",
    subtitle: "arjun@okicici",
  },
  {
    id: 2,
    type: "card",
    title: "HDFC Credit Card",
    subtitle: "•••• •••• •••• 4821",
  },
  {
    id: 3,
    type: "bank",
    title: "SBI Net Banking",
    subtitle: "Linked account",
  },
];

const transactions: Transaction[] = [
  {
    title: "Mahindra Thar LX · 3 days",
    id: "TXN-8821 · BK-2024-0871",
    method: "UPI · Google Pay",
    date: "Aug 11, 2025",
    status: "Success",
    amount: "-₹10,850",
  },
  {
    title: "Honda Activa 6G · 1 day",
    id: "TXN-8720 · BK-2024-0856",
    method: "Credit Card",
    date: "Aug 7, 2025",
    status: "Success",
    amount: "-₹998",
  },
  {
    title: "Security Deposit Refund",
    id: "DEP-8721 · BK-2024-0856",
    method: "Original source",
    date: "Aug 9, 2025",
    status: "Refunded",
    amount: "+₹500",
    refund: true,
  },
  {
    title: "Toyota Innova Crysta · 4 days",
    id: "TXN-8601 · BK-2024-0843",
    method: "Net Banking",
    date: "Jul 21, 2025",
    status: "Success",
    amount: "-₹14,800",
  },
  {
    title: "Security Deposit Refund",
    id: "DEP-8602 · BK-2024-0843",
    method: "Original source",
    date: "Jul 27, 2025",
    status: "Refunded",
    amount: "+₹6,000",
    refund: true,
  },
  {
    title: "Tata Ace · Cancellation Refund",
    id: "TXN-8520 · BK-2024-0790",
    method: "Wallet",
    date: "Jul 5, 2025",
    status: "Refunded",
    amount: "+₹1,499",
    refund: true,
  },
];

export default function PaymentsScreen({ navigation }: PaymentsScreenProps) {
  const { width } = useWindowDimensions();

  const isMobile = width < 700;
  const isTablet = width >= 700 && width < 1100;

  const [activeTab, setActiveTab] = useState<"history" | "saved">("saved");
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [defaultMethod, setDefaultMethod] = useState(1);

  /* =====================================================
     SET DEFAULT
  ===================================================== */

  const makeDefault = (id: number) => {
    const exists = methods.some((method) => method.id === id);
    if (!exists) return;
    setDefaultMethod(id);
  };

  /* =====================================================
     REMOVE PAYMENT METHOD
  ===================================================== */

  const removeMethod = (id: number) => {
    const method = methods.find((item) => item.id === id);
    if (!method) return;

    if (methods.length === 1) {
      Alert.alert(
        "Cannot remove",
        "You must keep at least one payment method."
      );
      return;
    }

    Alert.alert(
      "Remove payment method",
      `Remove ${method.title}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            const remaining = methods.filter((item) => item.id !== id);
            setMethods(remaining);
            if (defaultMethod === id && remaining.length > 0) {
              setDefaultMethod(remaining[0].id);
            }
          },
        },
      ]
    );
  };

  /* =====================================================
     ADD PAYMENT METHOD
  ===================================================== */

  const addPaymentMethod = () => {
    Alert.alert(
      "Add Payment Method",
      "Choose a payment method to add.",
      [
        {
          text: "Google Pay",
          onPress: () => {
            const exists = methods.some((item) => item.type === "upi");
            if (exists) {
              Alert.alert(
                "Already added",
                "Google Pay is already saved."
              );
              return;
            }

            const newMethod: PaymentMethod = {
              id: Date.now(),
              type: "upi",
              title: "Google Pay UPI",
              subtitle: "arjun@okicici",
            };

            setMethods((prev) => [...prev, newMethod]);
          },
        },
        {
          text: "Credit Card",
          onPress: () => {
            const newMethod: PaymentMethod = {
              id: Date.now(),
              type: "card",
              title: "HDFC Credit Card",
              subtitle: "•••• •••• •••• 4821",
            };

            setMethods((prev) => [...prev, newMethod]);
          },
        },
        {
          text: "Net Banking",
          onPress: () => {
            const newMethod: PaymentMethod = {
              id: Date.now(),
              type: "bank",
              title: "SBI Net Banking",
              subtitle: "Linked account",
            };

            setMethods((prev) => [...prev, newMethod]);
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <AppShell placeholder="Search...">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
          isTablet && styles.contentTablet,
        ]}
        showsVerticalScrollIndicator
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              isMobile && styles.titleMobile,
            ]}
          >
            Payments
          </Text>

          <Text style={styles.subtitle}>
            Transaction history and saved methods
          </Text>
        </View>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <View
          style={[
            styles.summaryRow,
            isMobile && styles.summaryRowMobile,
          ]}
        >
          <SummaryCard
            title="Total Spent"
            value="₹26,648"
            subtitle="Lifetime"
          />

          <SummaryCard
            title="Refunded"
            value="₹7,999"
            subtitle="Deposits + cancellations"
            green
          />

          <SummaryCard
            title="Net Paid"
            value="₹18,649"
            subtitle="After refunds"
          />
        </View>

        {/* =================================================
            TABS
        ================================================= */}

        <View
          style={[
            styles.tabs,
            isMobile && styles.tabsMobile,
          ]}
        >
          <Pressable
            onPress={() => setActiveTab("history")}
            style={[
              styles.tab,
              activeTab === "history" && styles.activeTab,
            ]}
          >
            <Ionicons
              name="receipt-outline"
              size={16}
              color={activeTab === "history" ? WHITE : "#5F6876"}
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.activeTabText,
              ]}
            >
              History
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("saved")}
            style={[
              styles.tab,
              activeTab === "saved" && styles.activeTab,
            ]}
          >
            <Ionicons
              name="card-outline"
              size={16}
              color={activeTab === "saved" ? WHITE : "#5F6876"}
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "saved" && styles.activeTabText,
              ]}
            >
              Saved Methods
            </Text>
          </Pressable>
        </View>

        {/* =================================================
            SAVED METHODS
        ================================================= */}

        {activeTab === "saved" && (
          <View style={styles.savedContainer}>
            {methods.map((method) => {
              const isDefault = method.id === defaultMethod;

              return (
                <SavedMethod
                  key={method.id}
                  method={method}
                  isDefault={isDefault}
                  mobile={isMobile}
                  onSetDefault={() => makeDefault(method.id)}
                  onRemove={() => removeMethod(method.id)}
                />
              );
            })}

            <Pressable
              onPress={addPaymentMethod}
              style={({ pressed }) => [
                styles.addPayment,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="add"
                size={19}
                color="#667080"
              />

              <Text style={styles.addPaymentText}>
                Add Payment Method
              </Text>
            </Pressable>
          </View>
        )}

        {/* =================================================
            HISTORY
        ================================================= */}

        {activeTab === "history" && (
          <View
            style={[
              styles.tableCard,
              isMobile && styles.tableCardMobile,
            ]}
          >
            {isMobile ? (
              <View>
                {transactions.map((transaction) => (
                  <MobileTransaction
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </View>
            ) : (
              <>
                <View style={styles.tableHeader}>
                  <Text
                    style={[
                      styles.headerText,
                      styles.transactionColumn,
                    ]}
                  >
                    TRANSACTION
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.methodColumn,
                    ]}
                  >
                    METHOD
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.dateColumn,
                    ]}
                  >
                    DATE
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.statusColumn,
                    ]}
                  >
                    STATUS
                  </Text>

                  <Text
                    style={[
                      styles.headerText,
                      styles.amountColumn,
                    ]}
                  >
                    AMOUNT
                  </Text>
                </View>

                {transactions.map((transaction, index) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    last={index === transactions.length - 1}
                  />
                ))}
              </>
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </AppShell>
  );
}

/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  title,
  value,
  subtitle,
  green,
}: {
  title: string;
  value: string;
  subtitle: string;
  green?: boolean;
}) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>
        {title}
      </Text>

      <Text
        style={[
          styles.summaryValue,
          green && styles.greenValue,
        ]}
      >
        {value}
      </Text>

      <Text style={styles.summarySubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

/* =====================================================
   SAVED METHOD
===================================================== */

function SavedMethod({
  method,
  isDefault,
  mobile,
  onSetDefault,
  onRemove,
}: {
  method: PaymentMethod;
  isDefault: boolean;
  mobile: boolean;
  onSetDefault: () => void;
  onRemove: () => void;
}) {
  const getIcon = (): string => {
    if (method.type === "upi") {
      return "phone-portrait-outline";
    }

    if (method.type === "card") {
      return "card-outline";
    }

    return "business-outline";
  };

  return (
    <View
      style={[
        styles.methodCard,
        isDefault && styles.defaultMethodCard,
        mobile && styles.methodCardMobile,
      ]}
    >
      <View style={styles.methodIcon}>
        <Ionicons
          name={getIcon()}
          size={28}
          color={BLACK}
        />
      </View>

      <View style={styles.methodInfo}>
        <View style={styles.methodTitleRow}>
          <Text numberOfLines={1} style={styles.methodTitle}>
            {method.title}
          </Text>

          {isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>
                Default
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.methodSubtitle}>
          {method.subtitle}
        </Text>
      </View>

      <View
        style={[
          styles.methodActions,
          mobile && styles.methodActionsMobile,
        ]}
      >
        {!isDefault && (
          <Pressable
            onPress={onSetDefault}
            style={({ pressed }) => [
              styles.setDefaultButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.setDefaultText}>
              Set Default
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={onRemove}
          style={({ pressed }) => [
            styles.removeButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.removeText}>
            Remove
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* =====================================================
   TRANSACTION ROW
===================================================== */

function TransactionRow({
  transaction,
  last,
}: {
  transaction: Transaction;
  last: boolean;
}) {
  return (
    <View
      style={[
        styles.transactionRow,
        last && styles.lastRow,
      ]}
    >
      <View style={styles.transactionColumn}>
        <Text numberOfLines={1} style={styles.transactionTitle}>
          {transaction.title}
        </Text>

        <Text style={styles.transactionId}>
          {transaction.id}
        </Text>
      </View>

      <View style={styles.methodColumn}>
        <Text style={styles.methodText}>
          {transaction.method}
        </Text>
      </View>

      <View style={styles.dateColumn}>
        <Text style={styles.dateText}>
          {transaction.date}
        </Text>
      </View>

      <View style={styles.statusColumn}>
        <View
          style={[
            styles.statusBadge,
            transaction.status === "Refunded"
              ? styles.refundedBadge
              : styles.successBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              transaction.status === "Refunded"
                ? styles.refundedText
                : styles.successText,
            ]}
          >
            {transaction.status}
          </Text>
        </View>
      </View>

      <View style={styles.amountColumn}>
        <Text
          style={[
            styles.amountText,
            transaction.refund && styles.refundAmount,
          ]}
        >
          {transaction.amount}
        </Text>
      </View>
    </View>
  );
}

/* =====================================================
   MOBILE TRANSACTION
===================================================== */

function MobileTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <View style={styles.mobileTransaction}>
      <View style={styles.mobileTransactionTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.transactionTitle}>
            {transaction.title}
          </Text>

          <Text style={styles.transactionId}>
            {transaction.id}
          </Text>
        </View>

        <Text
          style={[
            styles.amountText,
            transaction.refund && styles.refundAmount,
          ]}
        >
          {transaction.amount}
        </Text>
      </View>

      <View style={styles.mobileTransactionBottom}>
        <Text style={styles.methodText}>
          {transaction.method}
        </Text>

        <Text style={styles.dateText}>
          {transaction.date}
        </Text>

        <View
          style={[
            styles.statusBadge,
            transaction.status === "Refunded"
              ? styles.refundedBadge
              : styles.successBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              transaction.status === "Refunded"
                ? styles.refundedText
                : styles.successText,
            ]}
          >
            {transaction.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },

  content: {
    paddingHorizontal: 32,
    paddingTop: 36,
    paddingBottom: 60,
  },

  contentTablet: {
    paddingHorizontal: 22,
    paddingTop: 26,
  },

  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  /* HEADER */

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: BLACK,
    letterSpacing: -0.8,
  },

  titleMobile: {
    fontSize: 27,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: MUTED,
  },

  /* SUMMARY */

  summaryRow: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 28,
  },

  summaryRowMobile: {
    flexDirection: "column",
    gap: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
  },

  summaryTitle: {
    fontSize: 14,
    color: MUTED,
    fontWeight: "600",
  },

  summaryValue: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: "900",
    color: BLACK,
  },

  greenValue: {
    color: "#16A34A",
  },

  summarySubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: MUTED,
  },

  /* TABS */

  tabs: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },

  tabsMobile: {
    flexWrap: "wrap",
  },

  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },

  activeTab: {
    backgroundColor: BLACK,
    borderColor: BLACK,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5F6876",
  },

  activeTabText: {
    color: WHITE,
  },

  /* SAVED METHODS */

  savedContainer: {
    gap: 14,
  },

  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    gap: 16,
  },

  defaultMethodCard: {
    borderColor: GREEN,
    borderWidth: 1.5,
  },

  methodCardMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },

  methodIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },

  methodInfo: {
    flex: 1,
  },

  methodTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  methodTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: BLACK,
  },

  defaultBadge: {
    backgroundColor: "#EFFCE8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },

  defaultBadgeText: {
    color: "#16A34A",
    fontSize: 12,
    fontWeight: "800",
  },

  methodSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: MUTED,
  },

  methodActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  methodActionsMobile: {
    width: "100%",
    justifyContent: "flex-end",
    marginTop: 8,
  },

  setDefaultButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
  },

  setDefaultText: {
    fontSize: 13,
    fontWeight: "700",
    color: BLACK,
  },

  removeButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },

  removeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },

  addPayment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C5C9D0",
    paddingVertical: 18,
  },

  addPaymentText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4B5563",
  },

  pressed: {
    opacity: 0.7,
  },

  /* TABLE */

  tableCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
  },

  tableCardMobile: {
    padding: 16,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  headerText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.5,
  },

  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  transactionColumn: {
    flex: 2,
  },

  transactionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: BLACK,
  },

  transactionId: {
    marginTop: 2,
    fontSize: 13,
    color: MUTED,
  },

  methodColumn: {
    flex: 1.2,
  },

  methodText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },

  dateColumn: {
    flex: 1,
  },

  dateText: {
    fontSize: 14,
    color: MUTED,
  },

  statusColumn: {
    flex: 1,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  successBadge: {
    backgroundColor: "#EFFCE8",
  },

  refundedBadge: {
    backgroundColor: "#F3F4F6",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },

  successText: {
    color: "#16A34A",
  },

  refundedText: {
    color: "#6B7280",
  },

  amountColumn: {
    flex: 1,
    alignItems: "flex-end",
  },

  amountText: {
    fontSize: 15,
    fontWeight: "800",
    color: BLACK,
  },

  refundAmount: {
    color: "#16A34A",
  },

  /* MOBILE TRANSACTION */

  mobileTransaction: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 8,
  },

  mobileTransactionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  mobileTransactionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
