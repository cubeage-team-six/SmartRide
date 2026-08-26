import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../components/AppShell";
import { useCustomerProfile } from "../context/CustomerProfileContext";
import type { ProfileScreenProps } from "../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const TEXT = "#0A0B0C";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

type Section =
  | "personal"
  | "documents"
  | "security"
  | "notifications"
  | "preferences";

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;
  const [activeSection, setActiveSection] = useState<Section>("personal");

  const {
    profile,
    documents,
    uploadDocument,
    settings,
    updateSettings,
  } = useCustomerProfile();

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleViewDoc = (doc: (typeof documents)[0]) => {
    Alert.alert(
      doc.title,
      `Status: ${doc.status}\n${doc.expiry}\nFile: ${doc.fileName || "Not attached"}`
    );
  };

  const handleUploadDoc = (id: number) => {
    uploadDocument(id, { name: "verified_document.pdf" });
    Alert.alert("Document Uploaded", "Your document has been uploaded and verified.");
  };

  const securityAction = (
    action: "mobile" | "email" | "pin" | "twoFactor"
  ) => {
    if (action === "mobile") {
      navigation.navigate("EditProfile");
    } else if (action === "email") {
      navigation.navigate("EditProfile");
    } else if (action === "pin") {
      Alert.alert("Set Security PIN", "Security PIN setup is active on your device.");
    } else if (action === "twoFactor") {
      Alert.alert("Two-Factor Authentication", "2FA is enabled for all logins via SMS.");
    }
  };

  return (
    <AppShell placeholder="Search...">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          isMobile && styles.contentMobile,
        ]}
        showsVerticalScrollIndicator
      >
        {/* =================================================
            PROFILE HERO
        ================================================= */}
        <View style={[styles.profileHero, isMobile && styles.profileHeroMobile]}>
          <View style={styles.heroLeft}>
            <View style={styles.heroAvatar}>
              <Text style={styles.heroAvatarText}>
                {profile.avatarLetter || "A"}
              </Text>
              <Pressable
                style={styles.editAvatar}
                onPress={handleEditProfile}
                accessibilityLabel="Edit Profile"
              >
                <Ionicons name="pencil" size={14} color={BLACK} />
              </Pressable>
            </View>

            <View style={styles.heroDetails}>
              <Text style={styles.heroName}>{profile.fullName}</Text>
              <Text style={styles.heroEmail}>{profile.email}</Text>

              <View style={styles.badges}>
                {profile.kycVerified && (
                  <View style={styles.kycBadge}>
                    <Ionicons name="checkmark-circle" size={13} color="#15803D" />
                    <Text style={styles.kycText}>KYC Verified</Text>
                  </View>
                )}

                <View style={styles.darkBadge}>
                  <Text style={styles.darkBadgeText}>{profile.role}</Text>
                </View>

                <View style={styles.darkBadge}>
                  <Text style={styles.darkBadgeText}>
                    Member since {profile.memberSince}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.stats, isMobile && styles.statsMobile]}>
            <ProfileStat value={String(profile.totalBookings)} label="Bookings" />
            <ProfileStat value={profile.totalSpent} label="Spent" />
            <ProfileStat value={String(profile.loyaltyPoints)} label="Points" />
          </View>
        </View>

        {/* =================================================
            TABS
        ================================================= */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          <ProfileTab
            title="Personal Info"
            icon="person-outline"
            active={activeSection === "personal"}
            onPress={() => setActiveSection("personal")}
          />
          <ProfileTab
            title="Documents"
            icon="document-text-outline"
            active={activeSection === "documents"}
            onPress={() => setActiveSection("documents")}
          />
          <ProfileTab
            title="Security"
            icon="shield-checkmark-outline"
            active={activeSection === "security"}
            onPress={() => setActiveSection("security")}
          />
          <ProfileTab
            title="Notifications"
            icon="notifications-outline"
            active={activeSection === "notifications"}
            onPress={() => setActiveSection("notifications")}
          />
          <ProfileTab
            title="Preferences"
            icon="settings-outline"
            active={activeSection === "preferences"}
            onPress={() => setActiveSection("preferences")}
          />
        </ScrollView>

        {/* =================================================
            TAB 1: PERSONAL INFO SECTION
        ================================================= */}
        {activeSection === "personal" && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <Text style={styles.sectionSubtitle}>
                  View and update your personal and contact details
                </Text>
              </View>

              <Pressable
                style={styles.editProfileBtn}
                onPress={handleEditProfile}
              >
                <Ionicons name="create-outline" size={17} color={BLACK} />
                <Text style={styles.editProfileBtnText}>Edit Profile</Text>
              </Pressable>
            </View>

            <View style={styles.fieldsGrid}>
              <ProfileFieldItem
                icon="person-outline"
                label="FULL NAME"
                value={profile.fullName}
              />
              <ProfileFieldItem
                icon="call-outline"
                label="MOBILE NUMBER"
                value={profile.mobile}
              />
              <ProfileFieldItem
                icon="mail-outline"
                label="EMAIL ADDRESS"
                value={profile.email}
              />
              <ProfileFieldItem
                icon="calendar-outline"
                label="DATE OF BIRTH"
                value={profile.dob || "1992-06-14"}
              />
              <ProfileFieldItem
                icon="transgender-outline"
                label="GENDER"
                value={profile.gender || "Male"}
              />
              <ProfileFieldItem
                icon="location-outline"
                label="ADDRESS"
                value={profile.address || "124, 4th Cross, Indiranagar"}
              />
              <ProfileFieldItem
                icon="business-outline"
                label="CITY"
                value={profile.city || "Bangalore"}
              />
              <ProfileFieldItem
                icon="map-outline"
                label="STATE"
                value={profile.state || "Karnataka"}
              />
              <ProfileFieldItem
                icon="pin-outline"
                label="PIN CODE"
                value={profile.pin || "560001"}
              />
            </View>
          </View>
        )}

        {/* =================================================
            TAB 2: DOCUMENTS SECTION
        ================================================= */}
        {activeSection === "documents" && (
          <View>
            <View style={styles.sectionInfoBox}>
              <Text style={styles.sectionDescription}>
                Manage your identification and driving documents. Keep them updated to ensure instant vehicle booking approvals.
              </Text>
              <Pressable
                style={styles.manageAllDocsBtn}
                onPress={() => navigation.navigate("Documents")}
              >
                <Text style={styles.manageAllDocsText}>Open Full Documents Page →</Text>
              </Pressable>
            </View>

            {documents.map((doc) => (
              <View key={doc.id} style={styles.documentCard}>
                <View style={styles.documentIconBox}>
                  <Ionicons
                    name={doc.icon}
                    size={26}
                    color={BLACK}
                  />
                </View>

                <View style={styles.documentInfo}>
                  <View style={styles.docTitleRow}>
                    <Text style={styles.documentTitle}>{doc.title}</Text>
                    {doc.uploaded ? (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={12} color="#15803D" />
                        <Text style={styles.verifiedText}>Verified</Text>
                      </View>
                    ) : (
                      <View style={styles.pendingBadge}>
                        <Text style={styles.pendingText}>Not Uploaded</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.documentExpiry}>{doc.expiry}</Text>
                </View>

                <View style={styles.documentActions}>
                  {doc.uploaded ? (
                    <Pressable
                      style={styles.viewButton}
                      onPress={() => handleViewDoc(doc)}
                    >
                      <Text style={styles.viewText}>View</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      style={styles.uploadButton}
                      onPress={() => handleUploadDoc(doc.id)}
                    >
                      <Ionicons name="cloud-upload-outline" size={16} color={BLACK} />
                      <Text style={styles.uploadText}>Upload</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* =================================================
            TAB 3: SECURITY SECTION
        ================================================= */}
        {activeSection === "security" && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Security Settings</Text>
            <Text style={styles.sectionSubtitle}>
              Control your authentication methods and login verification
            </Text>

            <View style={styles.securityList}>
              <SecurityRow
                icon="call-outline"
                title="Change Mobile Number"
                subtitle={`Currently ${profile.mobile}`}
                button="Change"
                onPress={() => securityAction("mobile")}
              />
              <SecurityRow
                icon="mail-outline"
                title="Change Email"
                subtitle={`Currently ${profile.email}`}
                button="Change"
                onPress={() => securityAction("email")}
              />
              <SecurityRow
                icon="key-outline"
                title="Set PIN / Password"
                subtitle="Add an extra layer of access protection"
                button="Manage"
                onPress={() => securityAction("pin")}
              />
              <SecurityRow
                icon="shield-outline"
                title="Two-Factor Authentication"
                subtitle="Receive OTP verification on login"
                button="Enabled"
                onPress={() => securityAction("twoFactor")}
              />
            </View>
          </View>
        )}

        {/* =================================================
            TAB 4: NOTIFICATIONS SECTION
        ================================================= */}
        {activeSection === "notifications" && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Notification Preferences</Text>
                <Text style={styles.sectionSubtitle}>
                  Choose which alerts you want to receive across different channels
                </Text>
              </View>
              <Pressable
                style={styles.manageAllDocsBtn}
                onPress={() => navigation.navigate("Notifications")}
              >
                <Text style={styles.manageAllDocsText}>View Notifications Inbox →</Text>
              </Pressable>
            </View>

            <View style={styles.toggleList}>
              <ToggleRow
                title="Booking Confirmations"
                subtitle="Instant notification when your rental is confirmed"
                value={settings.bookingConfirmation}
                onToggle={(val) => updateSettings({ bookingConfirmation: val })}
              />
              <ToggleRow
                title="Pickup & Return Reminders"
                subtitle="Reminders 2 hours before scheduled pickup and returns"
                value={settings.pickupReminder}
                onToggle={(val) => updateSettings({ pickupReminder: val })}
              />
              <ToggleRow
                title="Payment & Refund Updates"
                subtitle="Receipts, invoice alerts, and security deposit returns"
                value={settings.paymentUpdates}
                onToggle={(val) => updateSettings({ paymentUpdates: val })}
              />
              <ToggleRow
                title="Email Notifications"
                subtitle="Send transaction summaries to your registered email"
                value={settings.emailNotifications}
                onToggle={(val) => updateSettings({ emailNotifications: val })}
              />
              <ToggleRow
                title="WhatsApp Updates"
                subtitle="Receive vehicle tracking and invoice directly on WhatsApp"
                value={settings.whatsappNotifications}
                onToggle={(val) => updateSettings({ whatsappNotifications: val })}
              />
            </View>
          </View>
        )}

        {/* =================================================
            TAB 5: PREFERENCES SECTION
        ================================================= */}
        {activeSection === "preferences" && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            <Text style={styles.sectionSubtitle}>
              Customize language, currency and regional settings
            </Text>

            <View style={styles.securityList}>
              <PreferenceRow
                icon="globe-outline"
                title="Language"
                value={settings.language}
                onPress={() => {
                  const langs = ["English", "Hindi", "Marathi", "Kannada"];
                  const next = langs[(langs.indexOf(settings.language) + 1) % langs.length];
                  updateSettings({ language: next });
                }}
              />
              <PreferenceRow
                icon="cash-outline"
                title="Currency"
                value={settings.currency}
                onPress={() => {
                  const curr = ["INR (₹)", "USD ($)", "EUR (€)"];
                  const next = curr[(curr.indexOf(settings.currency) + 1) % curr.length];
                  updateSettings({ currency: next });
                }}
              />
              <PreferenceRow
                icon="moon-outline"
                title="Theme Mode"
                value={settings.darkMode ? "Dark Mode" : "Light Mode"}
                onPress={() => updateSettings({ darkMode: !settings.darkMode })}
              />
            </View>
          </View>
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </AppShell>
  );
}

/* =========================================================
   SUB-COMPONENTS
========================================================= */

function ProfileStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProfileTab({
  title,
  icon,
  active,
  onPress,
}: {
  title: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.profileTab, active && styles.profileTabActive]}
    >
      <Ionicons
        name={icon}
        size={17}
        color={active ? BLACK : MUTED}
      />
      <Text
        style={[
          styles.profileTabText,
          active && styles.profileTabTextActive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

function ProfileFieldItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.fieldItem}>
      <View style={styles.fieldLabelRow}>
        <Ionicons name={icon} size={14} color={MUTED} />
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <View style={styles.fieldValueBox}>
        <Text style={styles.fieldValueText}>{value || "—"}</Text>
      </View>
    </View>
  );
}

function SecurityRow({
  icon,
  title,
  subtitle,
  button,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle: string;
  button: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.securityRow}>
      <View style={styles.securityIconBox}>
        <Ionicons name={icon} size={20} color={BLACK} />
      </View>
      <View style={styles.securityInfo}>
        <Text style={styles.securityTitle}>{title}</Text>
        <Text style={styles.securitySubtitle}>{subtitle}</Text>
      </View>
      <Pressable style={styles.securityBtn} onPress={onPress}>
        <Text style={styles.securityBtnText}>{button}</Text>
      </Pressable>
    </View>
  );
}

function PreferenceRow({
  icon,
  title,
  value,
  onPress,
}: {
  icon: string;
  title: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.preferenceRow} onPress={onPress}>
      <View style={styles.securityIconBox}>
        <Ionicons name={icon} size={20} color={BLACK} />
      </View>
      <View style={styles.securityInfo}>
        <Text style={styles.securityTitle}>{title}</Text>
        <Text style={styles.securitySubtitle}>Click to switch</Text>
      </View>
      <View style={styles.preferenceValueBadge}>
        <Text style={styles.preferenceValueText}>{value}</Text>
        <Ionicons name="chevron-forward" size={16} color={MUTED} />
      </View>
    </Pressable>
  );
}

function ToggleRow({
  title,
  subtitle,
  value,
  onToggle,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: (val: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleInfo}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#E2E8F0", true: GREEN }}
        thumbColor={WHITE}
      />
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 60,
  },
  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileHero: {
    backgroundColor: WHITE,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  profileHeroMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
  },
  heroLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    flex: 1,
  },
  heroAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroAvatarText: {
    fontSize: 32,
    fontWeight: "900",
    color: BLACK,
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  heroDetails: {
    flex: 1,
  },
  heroName: {
    fontSize: 24,
    fontWeight: "900",
    color: BLACK,
    letterSpacing: -0.5,
  },
  heroEmail: {
    fontSize: 14,
    color: MUTED,
    marginTop: 2,
    fontWeight: "500",
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  kycBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  kycText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
  },
  darkBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  darkBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  stats: {
    flexDirection: "row",
    gap: 24,
    borderLeftWidth: 1,
    borderLeftColor: "#F0F0F0",
    paddingLeft: 24,
  },
  statsMobile: {
    borderLeftWidth: 0,
    paddingLeft: 0,
    width: "100%",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 16,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "900",
    color: BLACK,
  },
  statLabel: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
    fontWeight: "500",
  },
  tabs: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  profileTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  profileTabActive: {
    backgroundColor: BLACK,
    borderColor: BLACK,
  },
  profileTabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  profileTabTextActive: {
    color: WHITE,
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: BLACK,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: MUTED,
    marginTop: 3,
  },
  editProfileBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: GREEN,
  },
  editProfileBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: BLACK,
  },
  fieldsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  fieldItem: {
    width: "48.5%",
    minWidth: 260,
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.5,
  },
  fieldValueBox: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  fieldValueText: {
    fontSize: 15,
    fontWeight: "700",
    color: BLACK,
  },
  sectionInfoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: MUTED,
    flex: 1,
  },
  manageAllDocsBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  manageAllDocsText: {
    fontSize: 13,
    fontWeight: "700",
    color: BLACK,
  },
  documentCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  documentIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  documentInfo: {
    flex: 1,
  },
  docTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BLACK,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#15803D",
  },
  pendingBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  pendingText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  documentExpiry: {
    fontSize: 13,
    color: MUTED,
    marginTop: 3,
  },
  documentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
  },
  viewText: {
    fontSize: 13,
    fontWeight: "700",
    color: BLACK,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: GREEN,
  },
  uploadText: {
    fontSize: 13,
    fontWeight: "800",
    color: BLACK,
  },
  securityList: {
    gap: 12,
    marginTop: 16,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  securityIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: BLACK,
  },
  securitySubtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
  securityBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  securityBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: BLACK,
  },
  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  preferenceValueBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
  },
  preferenceValueText: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
  },
  toggleList: {
    gap: 16,
    marginTop: 8,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
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
  toggleSubtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2,
  },
});
