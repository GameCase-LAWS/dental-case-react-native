import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ArrowIcon, CloseIcon } from "../../assets/icons/index";

import { Typography } from "../../components/Typography";
import { Grid } from "../../components/Grid";
import { Button } from "../../components/Button";

import { styles, appColors, windowHeight, windowWidth } from "../../styles";

export const SideBar = (props) => {
  const sideBarValue = React.useRef(new Animated.Value(0)).current;
  const outSideBarRef = React.useRef()
  // const [position, setPosition] = React.useState(0);

  const sideBarAnime = sideBarValue.interpolate({
    inputRange: [0, 1],
    outputRange: [ (windowWidth / 6 ), 0],
    extrapolate: "clamp",
  });

  console.log(sideBarValue);
  function handleClickSideBar() {
    outSideBarRef.current?.disabled(false)
    sideBarValue.setValue(1)
  }

  return (
    <View style={[styles.absolute, { zIndex: 0 }]}>
      <TouchableOpacity
        disabled={true}
        ref={outSideBarRef}
        style={{ flexGrow: 1 }}
        onPress={() => {}}
      ></TouchableOpacity>

      <View style={{ position: "absolute", right: 15, top: 15 }}>
        <TouchableOpacity activeOpacity onPress={handleClickSideBar}>
          <ArrowIcon
            color={appColors.primary}
            height={30}
            width={30}
          ></ArrowIcon>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          // styles.absoluteLeft,
          {
            // flex:1,
            // flexDirection: 'row',
            alignSelf:'flex-end'
            // right: -(windowWidth / 6 + 15),
            // right:0,  
            // zIndex: 1,
            // transform: [{ translateX: sideBarAnime }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ 
            // position: "absolute", right: (windowWidth/6 + 15), top: 15 
          }}
        >
          <CloseIcon color={appColors.primary} height={30} width={30} />
        </TouchableOpacity>
        <View
          style={[
            styles.sideBarContainer,
            {
              backgroundColor: "#fff",
              width: windowWidth / 6,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            // style={{ position: "absolute", right: 0, top: 15 }}
          >
            <Typography
              paragraph
              variant='header20'
              style={{ textAlign: "left" }}
            >
              Configurações
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            //   style={{ position: "absolute", right: 0, top: 15 }}
          >
            <Typography
              paragraph
              variant='header20'
              style={{ textAlign: "left" }}
            >
              Créditos
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            //   style={{ position: "absolute", right: 0, top: 15 }}
          >
            <Typography
              paragraph
              variant='header20'
              style={{ textAlign: "left" }}
            >
              Desconectar
            </Typography>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
