import * as React from "react";
import { Animated,Easing, StyleSheet} from "react-native";
import Svg, {
  Defs, LinearGradient, Stop, Path,
} from "react-native-svg";
import { StrokeAnimation } from "./StrokeAnimation";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AnimatedStroke = ({ d, progress, color, strokeWidth, stroke }) => {
  // const α = interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, A],
  // });

  const [length, setLength] = React.useState(progress);
  const ref = React.useRef();
  console.log(length);

  return (
    <>
      <AnimatedPath
        onLayout = {() => setLength(ref.current.getTotalLength())}
        fill={'none'}
        d={d}
        stroke={stroke}
        strokeWidth={6}
        strokeDasharray={length}
        // strokeDashoffset ={1000}
        // strokeDashoffset ={length/2}
      />
    </>
  );
};