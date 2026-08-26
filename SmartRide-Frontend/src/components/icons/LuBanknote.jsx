import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";

export default function LuBanknote({ size = 20, color = "currentColor", style }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <Rect width="20" height="12" x="2" y="6" rx="2" />
            <Circle cx="12" cy="12" r="2" />
            <Path d="M6 12h.01M18 12h.01" />
        </Svg>
    );
}
