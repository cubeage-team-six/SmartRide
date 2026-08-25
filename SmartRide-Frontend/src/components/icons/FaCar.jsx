import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export default function FaCar({ size = 20, color = "#0d0f0e", style }) {
    return (
        <Svg fill="none" viewBox="0 0 24 24" height={size} width={size} style={style}>
            {/* Base line */}
            <Path
                d="M3 17l2-6h14l2 6"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Left wheel */}
            <Circle
                cx="7.5"
                cy="17.5"
                r="1.5"
                fill={color}
            />
            {/* Right wheel */}
            <Circle
                cx="16.5"
                cy="17.5"
                r="1.5"
                fill={color}
            />
            {/* Car roof */}
            <Path
                d="M5 11l1.5-4h11l1.5 4"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}