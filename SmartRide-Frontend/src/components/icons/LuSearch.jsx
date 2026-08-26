import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function LuSearch({ size = 20, color = "currentColor", style }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <Circle cx="11" cy="11" r="8" />
            <Path d="m21 21-4.3-4.3" />
        </Svg>
    );
}
