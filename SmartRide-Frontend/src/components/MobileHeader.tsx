import React from "react";
import { View, Text } from "react-native";
import { FaCar } from "./icons";

export default function MobileHeader() {
    return (
        <View style={{ backgroundColor: "#111111", padding: 24, flexShrink: 0 }}>
            {/* Logo */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 24 }}>
                <View style={{ width: 32, height: 32, backgroundColor: "#c4e900", borderRadius: 4, alignItems: "center", justifyContent: "center" }}>
                    <FaCar size={16} color="#181e00" />
                </View>
                <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 24, fontWeight: "900", color: "#c4e900" }}>RideAny</Text>
            </View>
            {/* Hero text */}
            <Text style={{ fontFamily: "ArchivoNarrow_700Bold", fontSize: 40, fontWeight: "900", lineHeight: 44, letterSpacing: -0.4, color: "#ffffff" }}>
                One platform.{"\n"}Every vehicle.
            </Text>
        </View>
    );
}
