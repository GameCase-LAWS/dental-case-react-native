import React from "react";
import { Animated, Image, View, Easing } from "react-native";
import { appColors, windowWidth, windowHeight } from "../styles";
import Svg, {
  Defs, LinearGradient, Stop, Path,
} from "react-native-svg";
import { AnimatedLogo } from "./AnimatedLogo";
import { AnimatedStroke } from "./AnimatedStroke";
import { ThemeContext } from "../ScreenThemeContext";

const blueBg = require("../assets/images/blue-bg.jpg");

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const StrokeAnimation = ({ props, width, height, margin }) => {
  const { measure, styles } = React.useContext(ThemeContext);
  const progress = React.useRef(new Animated.Value(2000)).current;

  const paths = {
    "in": "M453 228C453 352.264 352.264 453 228 453C103.736 453 3 352.264 3 228C3 103.736 103.736 3 228 3C352.264 3 453 103.736 453 228Z",
    "out": "M433 218C433 336.741 336.741 433 218 433C99.2588 433 3 336.741 3 218C3 99.2588 99.2588 3 218 3C336.741 3 433 99.2588 433 218Z",
    "one": "M132.984 231.633V92.133C132.984 92.133 130.484 49.633 80.4839 41.5C30.4839 33.3671 2.98392 81.5 2.98392 81.5C2.98392 81.5 11.9839 60.1329 23.9839 43.1329C35.9839 26.133 51.4839 17.633 63.9839 12.633C76.4839 7.63295 101.55 -1.4095 135.484 6C161.286 11.6338 184.713 29.633 197.484 49.633C210.255 69.633 218.639 97.1329 204.984 145.633C191.329 194.133 150.484 242.633 147.984 243.633C147.984 243.633 143.484 248.633 137.984 243.633C132.484 238.633 132.984 231.633 132.984 231.633Z",
    "two": "M91.7066 179.938C82.2066 181.438 60.156 158.155 44.0153 140C44.0153 140 27.0153 121 17.5153 103.5C8.0153 86 5.51532 76.5 5.01532 71.9379C4.51532 67.3757 1.70649 56.4379 8.20648 40.4379C14.7065 24.4379 29.2065 15.4379 29.2065 15.4379C29.2065 15.4379 41.2065 5.93787 60.2065 3.93787C79.2065 1.93787 91.7066 7.43787 91.7066 7.43787C91.7066 7.43787 107.484 11.5 117.484 32C127.484 52.5 121.484 71.9379 121.484 71.9379C121.484 71.9379 116.253 69.4379 111.206 69.4379C106.16 69.4379 101.86 71.5253 99.7065 74.9379C96.0986 80.6543 96.7066 88.9379 96.7066 88.9379C96.7066 88.9379 96.2066 96.4379 96.7066 116.938C97.2066 137.438 101.207 178.438 91.7066 179.938Z",
    "three": "M123.984 3C40.984 3 28.4839 20 28.4839 20C28.4839 20 5.9839 37 3.48392 77.5C0.983931 118 8.98402 152.5 8.98402 152.5C8.98402 152.5 16.484 104 53.4839 77.5C90.4839 51 123.984 52.5 123.984 52.5C123.984 52.5 159.984 48.838 196.984 77.5C233.984 106.162 236.484 152.5 236.484 152.5C236.484 152.5 246.484 127.5 244.484 80.5C242.484 33.5 222.484 20 222.484 20C222.484 20 206.984 3 123.984 3Z",
  }

  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 0,
      delay: 1000,
      duration: 2000,
      // easing: Easing.linear,
    }).start();
  }, []);

  return (
    <View style={styles.layer}>
      {/* <Background /> */}
      {/* <View style={styles.layer}>
          <AnimatedLogo progress={progress} />
        </View> */}

      <Svg
        width={width}
        height={height}
        style={styles.layer}
        viewBox={[
          0,
          0,
          width * 2,
          height * 2
        ].join(" ")}
      >

        {paths.map((d, k) => {
          <AnimatedStroke progress={progress} d={d} stroke={appColors.blue} strokeDasharray={2000} key={k} />
        })}
        {/* <AnimatedStroke progress={progress} d={paths.in}  stroke={appColors.blue} strokeDasharray={2000} rotate={"-20deg"} />
            <AnimatedStroke progress={progress} d={paths.out}  stroke={appColors.blue} strokeDasharray={2000} rotate={"-20deg"} />
            <AnimatedStroke progress={progress} d={paths.one}  stroke={appColors.blue} strokeDasharray={2000} />
            <AnimatedStroke progress={progress} d={paths.two}  stroke={appColors.blue} strokeDasharray={2000} />
            <AnimatedStroke progress={progress} d={paths.three}  stroke={appColors.blue} strokeDasharray={2000} /> */}
      </Svg>
    </View>
  );
};
