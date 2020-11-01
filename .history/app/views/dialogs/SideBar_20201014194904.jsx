import React, { useState } from "react";
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
import { asin } from "react-native-reanimated";

export const SideBar = ({
  open,
  handleOpen,
  anim,
  value,
  children,
  ...props
}) => {
  function handleClickSideBar() {
    value.setValue(!open);
    handleOpen();
  }

  React.useEffect(() => {}, []);

  if (open) {
    return (
      <View
        style={[
          styles.absolute,
          {
            zIndex: 0,
            display: "flex",
            flexDirection: "row",
            // overflow: "hidden",
          },
        ]}
      >
        <TouchableOpacity
          disabled={false}
          style={{ flexGrow: 1, order: 0 }}
          onPress={handleClickSideBar}
        />

        <Animated.View
          style={[
            anim,
            {
              display: "flex",
              flexDirection: "row",
            },
          ]}
        >
          <View
            style={[
              styles.sideBarContainer,
              {
                backgroundColor: "#fff",
                width: windowWidth / 6,
              },
            ]}
          >
            <TouchableOpacity activeOpacity={0.9}>
              <Typography
                paragraph
                variant='header20'
                style={{ textAlign: "left" }}
              >
                Configurações
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9}>
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
  } else {
    return <View>{children}</View>;
  }
};
