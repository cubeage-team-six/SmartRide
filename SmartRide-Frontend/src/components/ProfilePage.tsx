import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfilePage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>
          Manage your account and personal information
        </Text>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Arjun Mehta</Text>
          <Text style={styles.email}>
            arjun.mehta@example.com
          </Text>

          <View style={styles.verifiedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={14}
              color="#07945B"
            />

            <Text style={styles.verifiedText}>
              Verified Account
            </Text>
          </View>
        </View>

        <Pressable style={styles.editButton}>
          <Ionicons
            name="create-outline"
            size={18}
            color="#111"
          />

          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      {/* PERSONAL INFORMATION */}
      <Text style={styles.sectionTitle}>
        Personal Information
      </Text>

      <View style={styles.infoCard}>
        <InfoRow
          icon="person-outline"
          label="Full Name"
          value="Arjun Mehta"
        />

        <InfoRow
          icon="mail-outline"
          label="Email"
          value="arjun.mehta@example.com"
        />

        <InfoRow
          icon="call-outline"
          label="Phone"
          value="+91 98765 43210"
        />

        <InfoRow
          icon="location-outline"
          label="Location"
          value="Bangalore, India"
        />
      </View>

      {/* ACCOUNT SETTINGS */}
      <Text style={styles.sectionTitle}>
        Account Settings
      </Text>

      <SettingRow
        icon="notifications-outline"
        title="Notifications"
        subtitle="Manage your notification preferences"
      />

      <SettingRow
        icon="lock-closed-outline"
        title="Security"
        subtitle="Password and account security"
      />

      <SettingRow
        icon="language-outline"
        title="Language"
        subtitle="English"
      />

      <SettingRow
        icon="help-circle-outline"
        title="Help & Support"
        subtitle="Get help with your account"
      />

      {/* SIGN OUT */}
      <Pressable style={styles.signOutButton}>
        <Ionicons
          name="log-out-outline"
          size={21}
          color="#E53935"
        />

        <Text style={styles.signOutText}>
          Sign Out
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons
          name={icon}
          size={20}
          color="#111"
        />
      </View>

      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable style={styles.settingCard}>
      <View style={styles.settingIcon}>
        <Ionicons
          name={icon}
          size={21}
          color="#111"
        />
      </View>

      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>
          {title}
        </Text>

        <Text style={styles.settingSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#8A92A0"
      />
    </Pressable>
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

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 32,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#B4F000",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111",
  },

  email: {
    marginTop: 4,
    fontSize: 14,
    color: "#7B8493",
  },

  verifiedBadge: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  verifiedText: {
    fontSize: 13,
    color: "#07945B",
    fontWeight: "700",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 22,
  },

  editText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111",
    marginBottom: 14,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    marginLeft: 14,
  },

  infoLabel: {
    fontSize: 12,
    color: "#8A92A0",
  },

  infoValue: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  settingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 17,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  settingIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#B4F000",
    alignItems: "center",
    justifyContent: "center",
  },

  settingInfo: {
    flex: 1,
    marginLeft: 14,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  settingSubtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#8A92A0",
  },

  signOutButton: {
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: "#FFD0D0",
    backgroundColor: "#FFF7F7",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  signOutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#E53935",
  },
});