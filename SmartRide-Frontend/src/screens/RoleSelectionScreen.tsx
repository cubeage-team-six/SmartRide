import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView, useWindowDimensions, Animated } from "react-native";
import { ROLES } from "../theme";
import { FaHome, FaUser, FaBell, FaCog, FaCheck, FaArrowRight, FaGoogle, FaApple, FaQuestionCircle } from "../components/icons";
import LeftPanel from "../components/LeftPanel";
import MobileHeader from "../components/MobileHeader";
import type { RoleScreenProps, Role } from "../types";
const ICON_MAP: Record<string, React.FC<any>> = { FaHome, FaUser, FaBell, FaCog };
function CheckmarkAnimated() {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: false }),
                Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 200, useNativeDriver: false }),
            ]),
        ]).start();
    }, [opacityAnim, scaleAnim]);
    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim, alignItems: "center", justifyContent: "center" }}>
            <FaCheck size={12} color="#181e00" />
        </Animated.View>
    );
}
export default function RoleSelectionScreen({ navigation }: RoleScreenProps) {
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    const [selectedRole, setSelectedRole] = React.useState<Role>(ROLES[0]);
    const handleContinue = () => {
        navigation.navigate("Phone", { selectedRole });
    };
    const renderContent = () => (
        <View style={{ width: "100%", maxWidth: 448, alignSelf: "center" }}>
            {/* Header */}
            <View style={{ marginBottom: 32 }}>
                <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", lineHeight: 38.4, color: "#1b1c1c", marginBottom: 8 }}>Welcome back</Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16, fontWeight: "400", lineHeight: 24, color: "#454933" }}>Select your role to continue</Text>
            </View>
            {/* Role cards */}
            <View style={{ gap: 12, marginBottom: 32 }}>
                {ROLES.map((role) => {
                    const isSelected = selectedRole.id === role.id;
                    const RoleIcon = ICON_MAP[role.iconName];
                    return (
                        <Pressable
                            key={role.id}
                            onPress={() => setSelectedRole(role)}
                            style={({ pressed }) => [
                                {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 16,
                                    borderRadius: 12,
                                    backgroundColor: isSelected ? role.bgSelected : "#ffffff",
                                    borderWidth: isSelected ? 2 : 1,
                                    borderColor: isSelected ? role.borderColor : "#c5c9ad",
                                },
                                pressed && { transform: [{ scale: 0.995 }] },
                            ]}
                        >
                            {/* Icon container */}
                            <View
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                    borderColor: isSelected ? "#c5c9ad" : "#e4e2e2",
                                    backgroundColor: isSelected ? "#ffffff" : "#ffffff",
                                    marginRight: 16,
                                    flexShrink: 0,
                                }}
                            >
                                <RoleIcon size={20} color={isSelected ? "#1b1c1c" : "#454933"} />
                            </View>
                            {/* Text content */}
                            <View style={{ flex: 1, minWidth: 0 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#1b1c1c" }}>{role.title}</Text>
                                    <View style={{ backgroundColor: "#e4e2e2", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 9999 }}>
                                        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 10, fontWeight: "600", color: "#454933" }}>{role.badge}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#454933" }}>{role.desc}</Text>
                            </View>
                            {/* Checkmark / radio */}
                            <View
                                style={{
                                    flexShrink: 0,
                                    marginLeft: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: isSelected ? 24 : 20,
                                    height: isSelected ? 24 : 20,
                                    borderRadius: 9999,
                                    backgroundColor: isSelected ? "#c4e900" : "transparent",
                                    borderWidth: isSelected ? 0 : 2,
                                    borderColor: isSelected ? "transparent" : "#c5c9ad",
                                }}
                            >
                                {isSelected && <CheckmarkAnimated />}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
            {/* CTA Button */}
            <Pressable
                onPress={handleContinue}
                style={({ pressed }) => ({
                    width: "100%",
                    backgroundColor: "#C4E900",
                    paddingVertical: 16,
                    borderRadius: 9999,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 32,
                    opacity: pressed ? 0.9 : 1,
                })}
            >
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#556600" }}>Continue as {selectedRole.title}</Text>
                <FaArrowRight size={16} color="#181e00" />
            </Pressable>
            {/* Divider */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: "#e4e2e2" }} />
                <Text style={{ marginHorizontal: 16, fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#454933", backgroundColor: "#fbf9f8", paddingHorizontal: 8 }}>or continue with</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: "#e4e2e2" }} />
            </View>
            {/* Social buttons */}
            <View style={{ flexDirection: "row", gap: 16 }}>
                <Pressable
                    style={({ pressed }) => ({
                        flex: 1,
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: "#c5c9ad",
                        paddingVertical: 12,
                        borderRadius: 9999,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        opacity: pressed ? 0.8 : 1,
                    })}
                >
                    <FaGoogle size={16} color="#1b1c1c" />
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#1b1c1c" }}>Google</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => ({
                        flex: 1,
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: "#c5c9ad",
                        paddingVertical: 12,
                        borderRadius: 9999,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        opacity: pressed ? 0.8 : 1,
                    })}
                >
                    <FaApple size={16} color="#ba1a1a" />
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, fontWeight: "600", lineHeight: 16.8, color: "#1b1c1c" }}>Apple</Text>
                </Pressable>
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
