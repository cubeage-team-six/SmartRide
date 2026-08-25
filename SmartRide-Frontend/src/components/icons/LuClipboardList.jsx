import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export default function LuClipboardList({ size = 20, color = "currentColor", style }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <Rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <Path d="M12 11h4" />
            <Path d="M12 16h4" />
            <Path d="M8 11h.01" />
            <Path d="M8 16h.01" />
        </Svg>
    );
}
