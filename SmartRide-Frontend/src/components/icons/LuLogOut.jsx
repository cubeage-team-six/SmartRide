import * as React from "react";
import Svg, { Path, Polyline, Line } from "react-native-svg";

export default function LuLogOut({ size = 20, color = "currentColor", style }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <Polyline points="16 17 21 12 16 7" />
            <Line x1="21" x2="9" y1="12" y2="12" />
        </Svg>
    );
}
