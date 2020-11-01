import React from "react";
import {
  Platform,
  View,
  ImageBackground,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Typography } from "../components/Typography";
import { ScreenContext } from "../ScreenContextProvider";
import { Shadow } from "../components/Shadow";

const Banner = require("../assets/images/banner.png");
const BlueBackgroundImage = require("../assets/images/blue-bg.jpg");

const SplashAPNG = require("../assets/images/splash.png");

export const SplashScreen = ({ scene, navigation, ...props }) => {
  const { updateContext } = React.useContext(ScreenContext);
  const shadowOffsetWidth= 10;
  const shadowOffsetHeight= 10;
  const shadowRadius= 10;
  const shadowOpacity= 0.3;

  React.useEffect(() => {
    async function changeScreenOrientationAsync() {
      if (Platform.OS !== "web") {
        let { width, height } = Dimensions.get("screen");
        console.log("1", width, height);
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE,
        ).then(() => console.log("2", width, height));

        updateContext();
      }
      navigation.navigate("Home");
    }
    changeScreenOrientationAsync();
  }, []);

  return (
    <ImageBackground
      source={BlueBackgroundImage}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* <Image source={Banner} style={{ height: 400, width: 600 }} resizeMode="contain" /> */}
      {/* <ApngComponent src={SplashAPNG} style={{ height: 400, width: 600 }} /> */}
      {/* <Image source={SplashAPNG} /> */}
      <Shadow
        shadowOffset={[shadowOffsetWidth, shadowOffsetHeight]}
        shadowOpacity={shadowOpacity}
        shadowRadius={shadowRadius}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <Typography color='#fff' variant={'header20'}>Skip</Typography>
        </TouchableOpacity>
      </Shadow>
    </ImageBackground>
  );
};
