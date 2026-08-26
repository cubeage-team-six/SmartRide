import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../../../components/AppShell";
import { useCustomerProfile } from "../../../context/CustomerProfileContext";
import type { SettingsScreenProps } from "../../../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;

  const { settings, updateSettings } = useCustomerProfile();

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const languages = ["English", "Hindi", "Marathi", "Kannada", "Tamil", "Telugu"];
  const currencies = ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)", "AED (د.إ)"];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <AppShell placeholder="Search settings...">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
        ]}
        showsVerticalScrollIndicator
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Settings & Preferences
          </Text>
          <Text style={styles.subtitle}>
            Manage your alerts, communication preferences, appearance, and regional settings
          </Text>
        </View>

        {/* TOAST */}
        {toastMessage && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={20} color="#15803D" />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}

        {/* SECTION 1: NOTIFICATIONS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <Ionicons name="notifications-outline" size={22} color={BLACK} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Notifications & Alerts</Text>
              <Text style={styles.cardSubtitle}>
                Control what notifications you receive and where they are delivered
              </Text>
            </View>
          </View>

          <View style={styles.toggleList}>
            <ToggleItem
              title="Push Notifications"
              description="Receive push notifications for rental status, vehicle tracking, and pickup"
              value={settings.pushNotifications}
              onValueChange={(val) => {
                updateSettings({ pushNotifications: val });
                showToast(`Push notifications ${val ? "enabled" : "disabled"}`);
              }}
            />

            <ToggleItem
              title="Email Notifications"
              description="Receive booking confirmation receipts and trip invoices on your registered email"
              value={settings.emailNotifications}
              onValueChange={(val) => {
                updateSettings({ emailNotifications: val });
                showToast(`Email notifications ${val ? "enabled" : "disabled"}`);
              }}
            />

            <ToggleItem
              title="SMS Alerts"
              description="Receive critical trip OTPs and pickup gate passes via SMS"
              value={settings.smsNotifications}
              onValueChange={(val) => {
                updateSettings({ smsNotifications: val });
                showToast(`SMS alerts ${val ? "enabled" : "disabled"}`);
              }}
            />

            <ToggleItem
              title="WhatsApp Notifications"
              description="Get instant booking updates and digital vehicle documents on WhatsApp"
              value={settings.whatsappNotifications}
              onValueChange={(val) => {
                updateSettings({ whatsappNotifications: val });
                showToast(`WhatsApp updates ${val ? "enabled" : "disabled"}`);
              }}
            />

            <ToggleItem
              title="Vehicle Pickup & Return Reminders"
              description="Get notified 2 hours before scheduled pickup and return timings"
              value={settings.pickupReminder}
              onValueChange={(val) => {
                updateSettings({ pickupReminder: val });
                showToast(`Reminders ${val ? "enabled" : "disabled"}`);
              }}
            />
          </View>
        </View>

        {/* SECTION 2: APPEARANCE & DISPLAY */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <Ionicons name="color-palette-outline" size={22} color={BLACK} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Appearance</Text>
              <Text style={styles.cardSubtitle}>
                Customize theme mode and visual appearance
              </Text>
            </View>
          </View>

          <View style={styles.toggleList}>
            <ToggleItem
              title="Dark Mode"
              description="Switch between clean light theme and high-contrast dark theme"
              value={settings.darkMode}
              onValueChange={(val) => {
                updateSettings({ darkMode: val });
                showToast(`Theme switched to ${val ? "Dark Mode" : "Light Mode"}`);
              }}
            />
          </View>
        </View>

        {/* SECTION 3: REGIONAL & LANGUAGE */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <Ionicons name="globe-outline" size={22} color={BLACK} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Language & Region</Text>
              <Text style={styles.cardSubtitle}>
                Select preferred language, regional currency, and measurement units
              </Text>
            </View>
          </View>

          <View style={styles.selectionList}>
            <Pressable
              style={styles.selectionRow}
              onPress={() => setLanguageModalVisible(true)}
            >
              <View style={styles.selectionInfo}>
                <Text style={styles.selectionLabel}>Display Language</Text>
                <Text style={styles.selectionDesc}>Choose your app language</Text>
              </View>
              <View style={styles.selectionBadge}>
                <Text style={styles.selectionBadgeText}>{settings.language}</Text>
                <Ionicons name="chevron-forward" size={17} color={MUTED} />
              </View>
            </Pressable>

            <Pressable
              style={styles.selectionRow}
              onPress={() => setCurrencyModalVisible(true)}
            >
              <View style={styles.selectionInfo}>
                <Text style={styles.selectionLabel}>Currency</Text>
                <Text style={styles.selectionDesc}>Default price display format</Text>
              </View>
              <View style={styles.selectionBadge}>
                <Text style={styles.selectionBadgeText}>{settings.currency}</Text>
                <Ionicons name="chevron-forward" size={17} color={MUTED} />
              </View>
            </Pressable>
          </View>
        </View>

        {/* SECTION 4: PRIVACY & LEGAL QUICK LINKS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconBox}>
              <Ionicons name="shield-outline" size={22} color={BLACK} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Account & Legal</Text>
              <Text style={styles.cardSubtitle}>Terms, Privacy Policy, and Help Support</Text>
            </View>
          </View>

          <View style={styles.linksList}>
            <Pressable
              style={styles.linkRow}
              onPress={() => navigation.navigate("Help")}
            >
              <Ionicons name="help-circle-outline" size={20} color={BLACK} />
              <Text style={styles.linkText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={18} color={MUTED} style={styles.linkChevron} />
            </Pressable>

            <Pressable
              style={styles.linkRow}
              onPress={() => navigation.navigate("Terms")}
            >
              <Ionicons name="document-text-outline" size={20} color={BLACK} />
              <Text style={styles.linkText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={18} color={MUTED} style={styles.linkChevron} />
            </Pressable>

            <Pressable
              style={styles.linkRow}
              onPress={() => navigation.navigate("Privacy")}
            >
              <Ionicons name="lock-closed-outline" size={20} color={BLACK} />
              <Text style={styles.linkText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={18} color={MUTED} style={styles.linkChevron} />
            </Pressable>
          </View>
        </View>

        {/* LANGUAGE MODAL */}
        <Modal
          visible={languageModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setLanguageModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <Pressable onPress={() => setLanguageModalVisible(false)}>
                  <Ionicons name="close" size={22} color={BLACK} />
                </Pressable>
              </View>
              <View style={styles.optionsList}>
                {languages.map((lang) => {
                  const isSelected = settings.language === lang;
                  return (
                    <Pressable
                      key={lang}
                      onPress={() => {
                        updateSettings({ language: lang });
                        setLanguageModalVisible(false);
                        showToast(`Language set to ${lang}`);
                      }}
                      style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                    >
                      <Text
                        style={[
                          styles.optionItemText,
                          isSelected && styles.optionItemTextSelected,
                        ]}
                      >
                        {lang}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color={BLACK} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>

        {/* CURRENCY MODAL */}
        <Modal
          visible={currencyModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCurrencyModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Currency</Text>
                <Pressable onPress={() => setCurrencyModalVisible(false)}>
                  <Ionicons name="close" size={22} color={BLACK} />
                </Pressable>
              </View>
              <View style={styles.optionsList}>
                {currencies.map((curr) => {
                  const isSelected = settings.currency === curr;
                  return (
                    <Pressable
                      key={curr}
                      onPress={() => {
                        updateSettings({ currency: curr });
                        setCurrencyModalVisible(false);
                        showToast(`Currency set to ${curr}`);
                      }}
                      style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                    >
                      <Text
                        style={[
                          styles.optionItemText,
                          isSelected && styles.optionItemTextSelected,
                        ]}
                      >
                        {curr}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color={BLACK} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ height: 50 }} />
      </ScrollView>
    </AppShell>
  );
}

function ToggleItem({
  title,
  description,
  value,
  onValueChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleInfo}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E2E8F0", true: GREEN }}
        thumbColor={WHITE}
      />
    </View>
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
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  toastText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#166534",
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 26,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: BLACK,
  },
  cardSubtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
  toggleList: {
    gap: 16,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
    gap: 16,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: BLACK,
  },
  toggleDesc: {
    fontSize: 13,
    color: MUTED,
    marginTop: 3,
    lineHeight: 18,
  },
  selectionList: {
    gap: 12,
  },
  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  selectionInfo: {
    flex: 1,
  },
  selectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: BLACK,
  },
  selectionDesc: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
  selectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selectionBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
  },
  linksList: {
    gap: 8,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  linkText: {
    fontSize: 15,
    fontWeight: "700",
    color: BLACK,
    flex: 1,
  },
  linkChevron: {
    marginLeft: "auto",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: WHITE,
    borderRadius: 22,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: BLACK,
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  optionItemSelected: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  optionItemText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },
  optionItemTextSelected: {
    color: BLACK,
    fontWeight: "800",
  },
});
