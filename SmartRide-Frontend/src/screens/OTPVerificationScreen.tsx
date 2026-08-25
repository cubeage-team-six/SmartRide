import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, useWindowDimensions } from "react-native";
import { FaArrowLeft, FaCheck, FaQuestionCircle, FaHome, FaUser, FaBell, FaCog } from "../components/icons";
import LeftPanel from "../components/LeftPanel";
import MobileHeader from "../components/MobileHeader";
import type { OTPScreenProps } from "../types";

const ICON_MAP: Record<string, React.FC<any>> = { FaHome, FaUser, FaBell, FaCog };

export default function OTPVerificationScreen({ navigation, route }: OTPScreenProps) {
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    const selectedRole = route.params?.selectedRole;
    const phoneNumber = route.params?.phoneNumber;
    const RoleIcon = ICON_MAP[selectedRole?.iconName] || FaHome;
    const [otp, setOtp] = useState<string>("");

    const handleVerify = () => {
        if (!otp || otp.trim().length !== 6) {
            alert("Please enter a valid 6-digit OTP.");
            return;
        }
        if (selectedRole?.id === "driver") {
            navigation.navigate("Dashboard", { selectedRole });
        } else {
            alert(`Dashboard for ${selectedRole?.title || "this role"} is not available yet.`);
        }
    };

    const renderContent = () => (
        <View style={{ width: "100%", maxWidth: 448, alignSelf: "center" }}>
            {/* Back button */}
            <Pressable
                onPress={() => navigation.navigate("Role")}
                style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 32, alignSelf: "flex-start" }}
            >
                <FaArrowLeft size={14} color="#454933" />
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#454933" }}>Back to role select</Text>
            </Pressable>

            {/* Role card */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 16, backgroundColor: "#f5f3f3", borderWidth: 1, borderColor: "#e4e2e2", borderRadius: 12, padding: 16, marginBottom: 40 }}>
                <View style={{ width: 40, height: 40, borderRadius: 9999, backgroundColor: "#efeded", alignItems: "center", justifyContent: "center" }}>
                    <RoleIcon size={18} color="#1b1c1c" />
                </View>
                <View>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#1b1c1c" }}>{selectedRole?.title}</Text>
                    <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#454933", marginTop: 2 }}>Signing in as this role</Text>
                </View>
            </View>

            {/* Heading */}
            <View style={{ marginBottom: 32 }}>
                <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", lineHeight: 38.4, color: "#1b1c1c", marginBottom: 8, letterSpacing: -0.5 }}>Sign in</Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16, fontWeight: "400", lineHeight: 24, color: "#454933" }}>Enter your mobile number to receive an OTP</Text>
            </View>

            {/* OTP Sent Banner */}
            <View style={{ backgroundColor: "#f0fad4", borderWidth: 1, borderColor: "rgba(196,233,0,0.5)", borderRadius: 12, padding: 16, flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <FaCheck size={16} color="#546500" />
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16, fontWeight: "400", lineHeight: 24, color: "#1b1c1c" }}>OTP sent to +91 {phoneNumber || "98765 43210"}</Text>
            </View>

            {/* OTP Form */}
            <View style={{ gap: 24 }}>
                <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#454933" }}>Enter 6-digit OTP</Text>
                    <TextInput
                        style={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            borderWidth: 1,
                            borderColor: "#e4e2e2",
                            borderRadius: 12,
                            paddingHorizontal: 24,
                            paddingVertical: 16,
                            fontFamily: "ArchivoNarrow_700Bold",
                            fontSize: 24,
                            fontWeight: "700",
                            textAlign: "center",
                            color: "#1b1c1c",
                            letterSpacing: 16,
                            /* @ts-ignore - outlineStyle not in default React Native types */
                            outlineStyle: 'none',
                        }}
                        placeholder="• • • • • •"
                        placeholderTextColor="#c5c9ad"
                        maxLength={6}
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                    />
                </View>
                <Pressable
                    onPress={handleVerify}
                    style={({ pressed }) => ({
                        width: "100%",
                        backgroundColor: "#C4E900",
                        paddingVertical: 16,
                        borderRadius: 9999,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 8,
                        opacity: pressed ? 0.9 : 1,
                    })}
                >
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#556600" }}>Verify & Sign In</Text>
                </Pressable>
            </View>

            {/* Resend OTP */}
            <View style={{ marginTop: 32, alignItems: "center" }}>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#454933" }}>
                    Didn't get it?{" "}
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontWeight: "600", color: "#1b1c1c", textDecorationLine: "underline" }}>Resend OTP</Text>
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
                        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                        elevation: 2,
                        transform: [{ scale: pressed ? 1.05 : 1 }],
                    })}
                >
                    <FaQuestionCircle size={22} color="#454933" />
                </Pressable>
            </View>
        </View>
    );
}
