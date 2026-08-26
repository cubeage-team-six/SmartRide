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
import type { PrivacyScreenProps } from "../../types";

const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

export default function PrivacyScreen({ navigation }: PrivacyScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  return (
    <AppShell placeholder="Search privacy topics...">
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
            Privacy & Data Policy
          </Text>
          <Text style={styles.subtitle}>
            How SmartRide protects, manages, and stores your personal information
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeader}>1. Personal & KYC Data Collection</Text>
          <Text style={styles.paragraph}>
            We collect identity documents (Driving License, Aadhaar, PAN) solely for KYC compliance and vehicle insurance validation. Your sensitive documents are encrypted using AES-256 standards.
          </Text>

          <Text style={styles.sectionHeader}>2. Location & Telematics Tracking</Text>
          <Text style={styles.paragraph}>
            Real-time GPS coordinates are captured during active rental periods only, ensuring trip safety, roadside assistance routing, and anti-theft security.
          </Text>

          <Text style={styles.sectionHeader}>3. Data Sharing & Third Parties</Text>
          <Text style={styles.paragraph}>
            We do not sell your personal data. We only share necessary trip identifiers with verified fleet vendors and insurance claim underwriters as required by law.
          </Text>

          <Text style={styles.sectionHeader}>4. User Rights & Account Deletion</Text>
          <Text style={styles.paragraph}>
            You may request an export of your personal data or request deletion of your account and documents by contacting privacy@smartride.com.
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
