import * as React from "react";
import { Text } from "react-native";

export default function FaApple({ size = 16, style }) {
    return (
        <Text style={[{ fontSize: size, lineHeight: size }, style]}>
            🍎
        </Text>
    );
}