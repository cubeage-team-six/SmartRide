import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../../components/AppShell";
import type { HelpScreenProps } from "../../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

export default function HelpScreen({ navigation }: HelpScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const faqs = [
    {
      q: "How do I extend my active vehicle booking?",
      a: "Go to 'My Bookings', select your active booking, and tap 'Extend Rental'. Subject to vehicle availability.",
    },
    {
      q: "When will my security deposit be refunded?",
      a: "Security deposits are processed within 24–48 hours after vehicle inspection upon return.",
    },
    {
      q: "What documents are mandatory for verification?",
      a: "A valid Government Driving Licence and Aadhaar / Passport ID are required for all rentals.",
    },
    {
      q: "What is the cancellation and refund policy?",
      a: "Free cancellation up to 6 hours before scheduled pickup. 50% refund within 6 hours of pickup.",
    },
  ];

  return (
    <AppShell placeholder="Search help topics...">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
        ]}
        showsVerticalScrollIndicator
      >
        <View style={styles.header}>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Help & Support Center
          </Text>
          <Text style={styles.subtitle}>
            Find quick answers or connect with 24/7 SmartRide customer support
          </Text>
        </View>

        {/* CONTACT CHANNELS */}
        <View style={styles.contactRow}>
          <Pressable
            style={styles.contactCard}
            onPress={() => Alert.alert("Customer Care", "Calling SmartRide 24/7 hotline at 1800-419-7433")}
          >
            <View style={styles.contactIconBox}>
              <Ionicons name="call-outline" size={24} color={BLACK} />
            </View>
            <Text style={styles.contactTitle}>24/7 Hotline</Text>
            <Text style={styles.contactDesc}>1800-419-RIDE (7433)</Text>
          </Pressable>

          <Pressable
            style={styles.contactCard}
            onPress={() => Alert.alert("Live Chat", "Connecting with a live support agent...")}
          >
            <View style={styles.contactIconBox}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={BLACK} />
            </View>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDesc}>Instant in-app support</Text>
          </Pressable>

          <Pressable
            style={styles.contactCard}
            onPress={() => Alert.alert("Email Support", "Emailing support@smartride.com")}
          >
            <View style={styles.contactIconBox}>
              <Ionicons name="mail-outline" size={24} color={BLACK} />
            </View>
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactDesc}>support@smartride.com</Text>
          </Pressable>
        </View>

        {/* FAQS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <View style={styles.faqQRow}>
                  <Ionicons name="help-circle-outline" size={18} color={BLACK} />
                  <Text style={styles.faqQ}>{faq.q}</Text>
                </View>
                <Text style={styles.faqA}>{faq.a}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </AppShell>
  );
}

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
  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: BLACK,
    letterSpacing: -0.8,
  },
  titleMobile: {
    fontSize: 26,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: MUTED,
  },
  contactRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  contactCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 20,
    alignItems: "center",
  },
  contactIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BLACK,
  },
  contactDesc: {
    fontSize: 13,
    color: MUTED,
    marginTop: 3,
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 28,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: BLACK,
    marginBottom: 18,
  },
  faqList: {
    gap: 16,
  },
  faqItem: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  faqQRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  faqQ: {
    fontSize: 16,
    fontWeight: "800",
    color: BLACK,
  },
  faqA: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    paddingLeft: 26,
  },
});
