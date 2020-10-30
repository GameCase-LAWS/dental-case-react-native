import React from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { appColors, styles } from "../styles";
import { Button } from "../components/Button";
import { CloseIcon, ArrowIcon } from "../assets/icons";
import { Grid } from "../components/Grid";
import { Typography } from "../components/Typography";
import { measure } from "../tools/resolution";

const icon = require("../assets/images/avatars/avatar_000.png");

export const LoadCases = ({ cases }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: "#fff",
          position: "relative",
          paddingHorizontal: 90,
          paddingVertical: 15,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ position: "absolute", right: 15, top: 15 }}
      >
        <CloseIcon color={appColors.primary} height={30} width={30} />
      </TouchableOpacity>

      <View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={icon}
            style={{
              height: measure(11),
              width: measure(11),
              marginRight: measure(2),
            }}
            resizeMode='contain'
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Typography variant='header24' bold>
                cases.category
              </Typography>
              <Typography variant='header24'> cases.value</Typography>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
