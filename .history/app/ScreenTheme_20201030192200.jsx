import React from "react";
import { Dimensions, Platform } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { windowWidth, windowHeight, screenHeight, screenWidth } from "./styles";
import { Orient } from "react-native-svg";
// import { measure } from "./tools/resolution";

export const ThemeContext = React.createContext({
  context: {},
  setContext: () => {},
});

async function calcMeasure() {
  let refHeight, refWidth, resolution;
  if (Platform.OS === "web") {
    refHeight = windowHeight;
    refWidth = windowWidth;
    resolution = refWidth / refHeight;
  } else {
    if (
      (await ScreenOrientation.getOrientationAsync()) ===
      ScreenOrientation.OrientationLock.PORTRAIT
    ) {
      refHeight = screenHeight;
      refWidth = screenWidth;
      resolution = refHeight / refWidth;
    } else {
      refHeight = screenWidth;
      refWidth = screenHeight;
      resolution = refWidth / refHeight;
    }
  }

  console.log("values", refWidth, refHeight);

  let height, width, _measure;

  if (resolution < 16 / 9) {
    // HEIGHT acima do adequado, ajustar em HEIGHT
    height = (9 / 16) * screenWidth;
    width = screenWidth;
    _measure = screenWidth / 64;
  } else {
    // WIDTH acima do adequado, ajustar em WIDTH
    width = (16 / 9) * screenHeight;
    height = screenHeight;
    _measure = screenHeight / 36;
  }
  console.log(width, height, _measure, resolution);
  return { _measure, width, height };
}

export const ThemeContext = (props) => {
  const [context, setContext] = React.useState({
    screenContainer: {},
    measure: 0,
  });
  const measure = (measures) => {
    console.log(context);
    return context * measures;
  };

  const updateContext = async () => {
    const measures = await calcMeasure();
    setContext({
      screenContainer: {
        width: measures.width,
        height: measures.height,
        marginRight: "auto",
        marginLeft: "auto",
      },
      measure: measures._measure,
    });
  };

  const initState = {
    context,
    setContext,
    updateContext,
    measure,
  };

  return (
    <ThemeContext.Provider value={initState}>
      {props.children}
    </ThemeContext.Provider>
  );
};
