import React from "react";
import { Animated, Image, View, Easing } from "react-native";
import { appColors, windowWidth } from "../styles";
import { ThemeContext } from "../ScreenThemeContext";

const logo = require("../assets/icons/splash/png/Icon.png");

export const AnimatedLogo = ({ progress, props, width, height }) => {
  const { measure, styles } = React.useContext(ThemeContext);

  return (
    <Image style={[styles.layer, { transform: [{}] }]}
    //    source={logo}
    >

    </Image>
  );
};
