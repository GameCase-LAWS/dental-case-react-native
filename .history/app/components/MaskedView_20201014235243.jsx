import React from "react";
import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { back } from "react-native/Libraries/Animated/src/Easing";
import { CloseIcon } from "../assets/icons";

export const MaskedView = ({ size, progress, strokeWidth }) => {
  const svgProgress = 100 - progress;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  return (
    <View style={{ backgroundColor: "#aaa", margin: 10 }}>
      <Svg style={{ }}>
        {/* <CloseIcon></CloseIcon> */}
        <Circle
          stroke={"#1e1e1e"}
          fill={"#ccc"}
          r={size}
          cx={size}
          cy={size}
          strokeWidth={strokeWidth}
        ></Circle>

        <Circle
          stroke={"#3b5998"}
          fill={"#fff"}
          r={size-1}
          cx={size}
          cy={size}
          strokeDasharray={circum}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap='round'
          transform={`rotate(-90, ${size}, ${size})`}
          strokeWidth={strokeWidth}
        ></Circle>
      </Svg>
    </View>
  );
};
