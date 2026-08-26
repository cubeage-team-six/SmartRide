import * as React from "react";
import Svg, { Rect } from "react-native-svg";

export default function FaGoogle({ size = 16, color = "currentColor", style }) {
    return (
        <Svg
            stroke={color}
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height={size}
            width={size}
            style={style}
        >
            <Rect width="7" height="9" x="3" y="3" rx="1" />
            <Rect width="7" height="5" x="14" y="3" rx="1" />
            <Rect width="7" height="9" x="14" y="12" rx="1" />
            <Rect width="7" height="5" x="3" y="16" rx="1" />
        </Svg>
    );
}