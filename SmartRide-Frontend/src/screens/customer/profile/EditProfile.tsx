import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppShell from "../../../components/AppShell";
import { useCustomerProfile } from "../../../context/CustomerProfileContext";
import type { EditProfileScreenProps } from "../../../types";

const GREEN = "#B7F000";
const BLACK = "#080909";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";
const MUTED = "#71798B";
const BORDER = "#E5E7EB";

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;
  const { profile, updateProfile } = useCustomerProfile();

  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.mobile);
  const [dob, setDob] = useState(profile.dob);
  const [gender, setGender] = useState(profile.gender || "Male");
  const [address, setAddress] = useState(profile.address || "");
  const [city, setCity] = useState(profile.city || "");
  const [state, setState] = useState(profile.state || "");
  const [pin, setPin] = useState(profile.pin || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setMobile(profile.mobile);
    setDob(profile.dob);
    setGender(profile.gender || "Male");
    setAddress(profile.address || "");
    setCity(profile.city || "");
    setState(profile.state || "");
    setPin(profile.pin || "");
  }, [profile]);

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Full name cannot be empty.");
      return;
    }

    updateProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      dob: dob.trim(),
      gender: gender.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pin: pin.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      navigation.navigate("Profile");
    }, 400);
  };

  const handleCancel = () => {
    navigation.navigate("Profile");
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
        {/* TOP BAR / BACK NAVIGATION */}
        <View style={styles.topNavRow}>
          <Pressable
            style={styles.backButton}
            onPress={handleCancel}
            accessibilityLabel="Back to Profile"
          >
            <Ionicons name="arrow-back" size={20} color={BLACK} />
            <Text style={styles.backButtonText}>Back to Profile</Text>
          </Pressable>
        </View>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.title, isMobile && styles.titleMobile]}>
            Edit Profile
          </Text>
          <Text style={styles.subtitle}>
            Update your personal details, contact info and residential address
          </Text>
        </View>

        {/* SUCCESS BANNER */}
        {savedSuccess && (
          <View style={styles.successBanner}>
            <Ionicons name="checkmark-circle" size={22} color="#15803D" />
            <Text style={styles.successBannerText}>
              Profile changes saved successfully! Redirecting...
            </Text>
          </View>
        )}

        {/* FORM CONTAINER */}
        <View style={styles.formCard}>
          {/* AVATAR PREVIEW */}
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {fullName.trim().length > 0 ? fullName.trim()[0].toUpperCase() : "A"}
              </Text>
            </View>
            <View style={styles.avatarInfo}>
              <Text style={styles.avatarName}>
                {fullName || "Your Name"}
              </Text>
              <Text style={styles.avatarRole}>Customer Account</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeading}>Personal Information</Text>

          <View style={styles.grid}>
            {/* FULL NAME */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={styles.label}>
                FULL NAME <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={19} color={MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="e.g. Arjun Mehta"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* MOBILE NUMBER */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={styles.label}>
                MOBILE NUMBER <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={19} color={MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={mobile}
                  onChangeText={setMobile}
                  keyboardType="phone-pad"
                  placeholder="+91 98765 43210"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* EMAIL */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={styles.label}>
                EMAIL ADDRESS <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={19} color={MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="arjun.mehta@gmail.com"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* DATE OF BIRTH */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={styles.label}>DATE OF BIRTH (YYYY-MM-DD)</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="calendar-outline" size={19} color={MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={dob}
                  onChangeText={setDob}
                  placeholder="1992-06-14"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* GENDER */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={styles.label}>GENDER</Text>
              <View style={styles.genderOptions}>
                {["Male", "Female", "Other"].map((item) => {
                  const isSelected = gender.toLowerCase() === item.toLowerCase();
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setGender(item)}
                      style={[
                        styles.genderChip,
                        isSelected && styles.genderChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.genderChipText,
                          isSelected && styles.genderChipTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeading}>Address Details</Text>

          <View style={styles.grid}>
            {/* ADDRESS */}
            <View style={[styles.fieldContainer, styles.fullWidth]}>
              <Text style={styles.label}>STREET ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={19} color={MUTED} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="124, 4th Cross, Indiranagar"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* CITY */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.thirdWidth]}>
              <Text style={styles.label}>CITY</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputWithoutIcon}
                  value={city}
                  onChangeText={setCity}
                  placeholder="Bangalore"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* STATE */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.thirdWidth]}>
              <Text style={styles.label}>STATE</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputWithoutIcon}
                  value={state}
                  onChangeText={setState}
                  placeholder="Karnataka"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

            {/* PIN CODE */}
            <View style={[styles.fieldContainer, isMobile ? styles.fullWidth : styles.thirdWidth]}>
              <Text style={styles.label}>PIN CODE</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputWithoutIcon}
                  value={pin}
                  onChangeText={setPin}
                  keyboardType="numeric"
                  placeholder="560001"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>
          </View>

          {/* ACTIONS */}
          <View style={styles.actionsRow}>
            <Pressable
              style={styles.cancelBtn}
              onPress={handleCancel}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={styles.saveBtn}
              onPress={handleSave}
            >
              <Ionicons name="checkmark-sharp" size={18} color={BLACK} />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ height: 60 }} />
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
    paddingTop: 28,
    paddingBottom: 60,
  },
  contentMobile: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  topNavRow: {
    marginBottom: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#EBEBEB",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: BLACK,
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
    fontSize: 15,
    color: MUTED,
  },
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },
  successBannerText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
  },
  formCard: {
    backgroundColor: WHITE,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 28,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "900",
    color: BLACK,
  },
  avatarInfo: {
    flex: 1,
  },
  avatarName: {
    fontSize: 20,
    fontWeight: "800",
    color: BLACK,
  },
  avatarRole: {
    fontSize: 14,
    color: MUTED,
    marginTop: 2,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 24,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: BLACK,
    marginBottom: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  fieldContainer: {
    marginBottom: 4,
  },
  fullWidth: {
    width: "100%",
  },
  halfWidth: {
    width: "48.5%",
  },
  thirdWidth: {
    width: "31.5%",
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#475569",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  required: {
    color: "#E11D48",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    minHeight: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: BLACK,
    paddingVertical: 12,
  },
  inputWithoutIcon: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: BLACK,
    paddingVertical: 12,
  },
  genderOptions: {
    flexDirection: "row",
    gap: 10,
    minHeight: 50,
    alignItems: "center",
  },
  genderChip: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  genderChipSelected: {
    backgroundColor: BLACK,
    borderColor: BLACK,
  },
  genderChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  genderChipTextSelected: {
    color: WHITE,
    fontWeight: "800",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  cancelBtn: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: WHITE,
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#475569",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 26,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: GREEN,
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: BLACK,
  },
});
