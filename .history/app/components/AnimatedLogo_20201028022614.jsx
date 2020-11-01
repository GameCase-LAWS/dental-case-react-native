import React from "react";
import { Animated, Image, View, Easing } from "react-native";
import { styles, appColors, windowWidth } from "../styles";

const logo = require("../assets/icons/splash/png/Icon.png");

export const AnimatedLogo = ({progress, props, width, height}) => {
    
    return (
      <Image style={styles.layer}
    //    source={logo}
       >
        
      </Image>
    );
  };
