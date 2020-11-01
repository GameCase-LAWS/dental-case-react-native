import React from "react";
import { Animated, Image, View } from "react-native";
// import MaskedView from '@react-native-community/masked-view';
import { MaskedView } from "../components/MaskedView";
import { ArrowIcon, CloseIcon } from "../assets/icons/index";

const blueBg = require("../assets/images/blue-bg.jpg");

export const Animation = ({ props }) => {
  return (
    <MaskedView
    //   style={{ position:'absolute' }}
    //   maskElement={<Image source={blueBg} />}
    progress={90}
    size={50}
    strokeWidth ={5}
    >
      {/* <CloseIcon width={50} height={50}/> */}
    </MaskedView>
  );
};
