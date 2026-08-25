import * as React from "react";
import Svg, { Rect } from "react-native-svg";

export default function LuLayoutGrid({ size = 20, color = "currentColor", style }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <Rect width="7" height="7" x="3" y="3" rx="1" />
            <Rect width="7" height="7" x="14" y="3" rx="1" />
            <Rect width="7" height="7" x="14" y="14" rx="1" />
            <Rect width="7" height="7" x="3" y="14" rx="1" />
        </Svg>
    );
}
