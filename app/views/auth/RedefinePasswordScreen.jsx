import React from "react";
import { Image, View, TextInput, Platform } from "react-native";

import { appColors, screenHeight, screenWidth } from "../../styles";
import { Button } from "../../components/Button";
import { BackIcon } from "../../assets/icons/index";
import { Typography } from "../../components/Typography";
import { ThemeContext } from "../../ThemeContext";

const Banner = require("../../assets/images/banner.png");
const logoIcon = require("../../assets/icons/icon.png");

const BlueBg = require("../../assets/images/blue-bg.jpg");

export function RedefinePasswordScreen({}) {
  const { theme } = React.useContext(ThemeContext);
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  return (
    <View style={theme.styles.container}>
      {/* {() => {
        if (Platform.OS === "web") {
          return <Image style={{ flex: 1 }} source={BlueBg} />
        }
      }} */}
      {/* <BackIcon style={{width:24, height:24}} /> */}
      <Image
        // style={theme.styles.logoIcon}
        source={logoIcon}
        resizeMode={"contain"}
      ></Image>
      <Typography
        variant='header20'
        color={appColors.secondary}
      >
        Insira seu e-mail para recuperar sua conta
      </Typography>
      <View
        style={{
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <TextInput
          value={email}
          onChangeText={(e) => setEmail(e)}
          style={theme.styles.textInput}
          placeholder={"E-mail"}
        ></TextInput>

        <Button
          style={{ flex: 1, alignSelf: "center" }}
          variant='contained'
          backgroundColor={appColors.primary}
          label='Recuperar'
          onPress={() => {}}
        ></Button>
      </View>
    </View>
  );
}
