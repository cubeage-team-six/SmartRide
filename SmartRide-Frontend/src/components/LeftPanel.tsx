import React from "react";
import { View, Text } from "react-native";
import { FaCar, FaStar } from "./icons";

export default function LeftPanel() {
    return (
        <View style={{ flex: 1, backgroundColor: "#111111", padding: 80, paddingTop: 80, paddingBottom: 32, justifyContent: "space-between" }}>
            {/* Dark glow overlay */}
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none" />

            <View>
                {/* Logo */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 64 }}>
                    <View style={{ width: 40, height: 40, backgroundColor: "#c4e900", borderRadius: 8, alignItems: "center", justifyContent: "center" }}>
                        <FaCar size={22} color="#181e00" />
                    </View>
                    <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 24, fontWeight: "900", color: "#c4e900" }}>RideAny</Text>
                </View>

                {/* Hero text */}
                <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 64, fontWeight: "900", lineHeight: 70, letterSpacing: -1.28, color: "#ffffff", marginBottom: 24 }}>
                    One platform.{"\n"}Every vehicle.
                </Text>
                <Text style={{ fontFamily: "Inter_400Regular", fontSize: 18, fontWeight: "400", lineHeight: 28.8, color: "#c4c8c1", maxWidth: 448, marginBottom: 48 }}>
                    From scooters to excavators — RideAny connects you to 12,000+ verified vehicles nationwide.
                </Text>

                {/* Stats grid */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, maxWidth: 512 }}>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }}>
                        <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", lineHeight: 38.4, color: "#c4e900", marginBottom: 4 }}>50+</Text>
                        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#c4c8c1" }}>Vehicle Types</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }}>
                        <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", lineHeight: 38.4, color: "#c4e900", marginBottom: 4 }}>12K+</Text>
                        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#c4c8c1" }}>Listings</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", lineHeight: 38.4, color: "#c4e900", marginBottom: 4 }}>4.8</Text>
                            <FaStar size={18} color="#c4e900" style={{ marginLeft: 2 }} />
                        </View>
                        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#c4c8c1" }}>Avg. Rating</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 200, backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }}>
                        <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 32, fontWeight: "700", lineHeight: 38.4, color: "#c4e900", marginBottom: 4 }}>98%</Text>
                        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#c4c8c1" }}>Success Rate</Text>
                    </View>
                </View>
            </View>

            {/* Footer */}
            <View style={{ flexDirection: "row", gap: 16, alignItems: "center", opacity: 0.6 }}>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, fontWeight: "500", lineHeight: 14.4, color: "#c4c8c1" }}>© 2025 RideAny Mobility Pvt. Ltd.</Text>
            </View>
        </View>
    );
}
