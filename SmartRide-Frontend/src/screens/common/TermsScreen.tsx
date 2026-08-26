import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../../components/AppShell";
import type { TermsScreenProps } from "../../types";

const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

export default function TermsScreen({ navigation }: TermsScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  return (
    <AppShell placeholder="Search terms...">
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
            Terms & Conditions
          </Text>
          <Text style={styles.subtitle}>
            Last updated: August 2025 · SmartRide Vehicle Rental Platform
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>1. Eligibility & Driver Requirements</Text>
          <Text style={styles.paragraph}>
            Renters must be at least 18 years old and possess a valid, government-issued Driving Licence with minimum 1 year of driving validity for four-wheelers and commercial vehicles.
          </Text>

          <Text style={styles.sectionHeader}>2. Vehicle Usage & Speed Limits</Text>
          <Text style={styles.paragraph}>
            Vehicles must not be used for racing, towing, or unauthorized sub-leasing. Standard speed limit of 80 km/h applies for self-drive city/highway vehicles as monitored via GPS tracking.
          </Text>

          <Text style={styles.sectionHeader}>3. Security Deposits & Fuel Policy</Text>
          <Text style={styles.paragraph}>
            Security deposit amounts vary by vehicle category. Vehicles are handed over with full fuel and must be returned with the same level or fuel reimbursement charges will apply.
          </Text>

          <Text style={styles.sectionHeader}>4. Damage & Insurance Claims</Text>
          <Text style={styles.paragraph}>
            Comprehensive vehicle insurance covers major accidental damages subject to an initial deductible of ₹5,000 payable by the customer in case of driver fault.
          </Text>
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
  card: {
    backgroundColor: WHITE,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 28,
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: "800",
    color: BLACK,
    marginTop: 18,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },
});
