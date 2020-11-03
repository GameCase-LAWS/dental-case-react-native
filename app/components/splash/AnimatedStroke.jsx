import * as React from "react";
import { Animated } from "react-native";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AnimatedStroke = ({ d, progress, strokeDasharray, stroke, rotate, ...props }) => {
  // const ref = React.useRef();

  return (
    <AnimatedPath
      // onLayout = {() => setLength(ref.current.getTotalLength())}
      // ref={ref}
      fill='none'
      d={d}
      stroke={stroke}
      strokeWidth={6}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={progress}
      strokeLinejoin={"round"}
      {...props}
    />
  );
};