import React from "react";
import { Animated, View } from "react-native";
import { Circle, Svg, Path } from "react-native-svg";
import { back } from "react-native/Libraries/Animated/src/Easing";
import { CloseIcon } from "../assets/icons";

const AnimPath = Animated.createAnimatedComponent(Path);

const HalfCircle = ({ width, height, fill }) => {
  return (
    <AnimPath d={"M0,50 a1,1 0 0,0 100,0"} fill={fill}>
      <Path  />;
    </AnimPath>
  );
};

export const StrokeAnimation = ({ size, progress, strokeWidth }) => {
  const svgProgress = 100 - progress;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  return (
    <View style={{ backgroundColor: "#aaa", margin: 10 }}>
      <Svg style={{}}>
        {/* <CloseIcon></CloseIcon> */}
        <Circle
          // stroke={"#3b5998"}
          fill={"#fff"}
          r={size - 5}
          cx={size}
          cy={size}
          strokeDasharray={circum}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          // strokeLinecap='round'
          transform={`rotate(-90, ${size}, ${size})`}
          strokeWidth={strokeWidth}
        ></Circle>

        <HalfCircle
          // stroke={"#1e1e1e"}
          width={50}
          height={50}
          fill={"#1e1e1e"}
          // r={size}
          // cx={size}
          // cy={size}
          // strokeWidth={strokeWidth}
        ></HalfCircle>
      </Svg>
    </View>
  );
};
