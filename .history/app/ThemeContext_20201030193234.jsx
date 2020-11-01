import React from "react";
import { Dimensions, Platform } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { windowWidth, windowHeight, screenHeight, screenWidth } from "./styles";
import { Orient } from "react-native-svg";

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
    styles: styles
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


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'purple'
  },
  container: {
    flex: 1,
    paddingHorizontal: 75,
    paddingVertical: 45
  },
  sideBarContainer: {
    top: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  spacedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenContainer: {
    // flex: 1,
    // justifyContent: "space-between",
    // alignItems: 'stretch',
    // backgroundColor: '#fff',
    // padding: 32,
    // maxWidth: 400
  },
  banner: {
    width: 460,
    height: 280,
    maxWidth: windowWidth - 64,
    maxHeight: (windowWidth - 64) * 0.58,
    marginVertical: 32
  },
  textInput: {
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 2,
    height: 48,
    backgroundColor: "#D7D7D7",
    borderColor: "#a1a1a1",
  },
  underscored: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  absoluteLeft: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topLeftGrayContainer: {
    backgroundColor: appColors.cardGray,
    padding: measure(1),
    borderRadius: measure(1),
    justifyContent: 'center',
    width: measure(23),
    height: measure(5)
  },
  button: {
    height: measure(4)
  },
  scoreBar: {
    position: 'absolute',
    right: measure(2),
    top: measure(2),
    borderRadius: measure(1),
    backgroundColor: appColors.cardGray,
    overflow: 'hidden',
    flexDirection: 'column-reverse',
    width: measure(2),
    height: measure(16)
  },
  feedbackBox: {
    position: 'absolute',
    right: measure(7),
    bottom: measure(19),
    width: measure(20),
    paddingHorizontal: measure(2),
    paddingVertical: measure(1),
    minHeight: measure(6),
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: measure(2)
  },
  avatar: {
    width: measure(15),
    height: measure(15),
    borderRadius: measure(1)
  },
  circlePadding: {
    paddingRight: measure(0.5)
  }
});