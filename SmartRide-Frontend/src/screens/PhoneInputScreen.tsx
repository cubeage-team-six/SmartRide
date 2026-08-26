import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, useWindowDimensions, Alert } from "react-native";
import { FaArrowLeft, FaQuestionCircle, FaHome, FaUser, FaBell, FaCog } from "../components/icons";
import LeftPanel from "../components/LeftPanel";
import MobileHeader from "../components/MobileHeader";
import type { PhoneScreenProps } from "../types";

const ICON_MAP: Record<string, React.FC<any>> = { FaHome, FaUser, FaBell, FaCog };

export default function PhoneInputScreen({ navigation, route }: PhoneScreenProps) {
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    const selectedRole = route.params?.selectedRole;
    const [phoneNumber, setPhoneNumber] = useState<string>("9876543210");
    const RoleIcon = (selectedRole?.iconName && ICON_MAP[selectedRole.iconName]) || FaHome;

    const handleSendOTP = () => {
        if (!phoneNumber || phoneNumber.trim().length !== 10) {
            Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
            return;
        }
        navigation.navigate("OTP", { selectedRole, phoneNumber });
    };

    const renderContent = () => (
        <View style={{ width: "100%", maxWidth: 448, alignSelf: "center", gap: 32 }}>
            {/* Back button */}
            <Pressable
                onPress={() => navigation.navigate("Role")}
                style={{ flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start" }}
            >
                <FaArrowLeft size={12} color="#5e5f60" />
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#5e5f60" }}>Back to role select</Text>
            </Pressable>

            {/* Role card */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: "#f5f3f3", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e4e2e2" }}>
                <View style={{ width: 48, height: 48, backgroundColor: "#ffffff", borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e4e2e2", flexShrink: 0 }}>
                    <RoleIcon size={20} color="#1b1c1c" />
                </View>
                <View>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#1b1c1c" }}>{selectedRole?.title || "Customer"}</Text>
                    <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#5e5f60" }}>Signing in as this role</Text>
                </View>
            </View>

            {/* Heading */}
            <View style={{ gap: 8 }}>
                <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: isDesktop ? 48 : 40, fontWeight: "900", lineHeight: isDesktop ? 52.8 : 44, color: "#1b1c1c" }}>Sign in</Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16, fontWeight: "400", lineHeight: 24, color: "#5e5f60" }}>Enter your mobile number to receive an OTP</Text>
            </View>

            {/* Phone input form */}
            <View style={{ gap: 24 }}>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#1b1c1c" }}>Mobile Number</Text>
                    <View style={{ flexDirection: "row", height: 56, borderRadius: 8, overflow: "hidden", borderWidth: 1, borderColor: "#c5c9ad", backgroundColor: "#ffffff" }}>
                        <View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 16, backgroundColor: "#f5f3f3", borderRightWidth: 1, borderRightColor: "#c5c9ad" }}>
                            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16, fontWeight: "400", color: "#1b1c1c" }}>+91</Text>
                        </View>
                        <TextInput
                            style={{ flex: 1, paddingHorizontal: 16, fontFamily: "Inter_400Regular", fontSize: 16, fontWeight: "400", color: "#1b1c1c" }}
                            placeholder="98765 43210"
                            placeholderTextColor="#757961"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                </View>
                <Pressable
                    onPress={handleSendOTP}
                    style={({ pressed }) => ({
                        width: "100%",
                        height: 56,
                        backgroundColor: "#C4E900",
                        borderRadius: 9999,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: pressed ? 0.9 : 1,
                    })}
                >
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#556600" }}>Send OTP</Text>
                </Pressable>
            </View>

            {/* Email link */}
            <View style={{ alignItems: "center", marginTop: 8 }}>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#5e5f60" }}>
                    Also sign in with{" "}
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontWeight: "700", color: "#1b1c1c", textDecorationLine: "underline" }}>Email</Text>
                </Text>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, flexDirection: isDesktop ? "row" : "column", backgroundColor: "#fbf9f8" }}>
            {!isDesktop && <MobileHeader />}
            {isDesktop && <LeftPanel />}

            <View style={{ flex: 1, backgroundColor: "#fbf9f8" }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: isDesktop ? 48 : 24 }}>
                    {renderContent()}
                </ScrollView>

                {/* Help button */}
                <Pressable
                    style={({ pressed }) => ({
                        position: "absolute",
                        bottom: 24,
                        right: 24,
                        width: 48,
                        height: 48,
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: "#c5c9ad",
                        borderRadius: 9999,
                        alignItems: "center",
                        justifyContent: "center",
                        transform: [{ scale: pressed ? 1.05 : 1 }],
                    })}
                >
                    <FaQuestionCircle size={22} color="#454933" />
                </Pressable>
            </View>
        </View>
    );
}
