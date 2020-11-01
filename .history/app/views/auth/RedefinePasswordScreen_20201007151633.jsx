import React from "react";
import { Image, View, TextInput } from "react-native";

import { appColors, styles } from "../../styles";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";

const BackIcon = require('../../assets/icons');
const Banner = require("../../assets/images/banner.png");

export function RedefinePasswordScreen({}) {
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  return (
    // Tela de login
    <View
      style={styles.screenContainer}
    >
      <BackIcon/>
      <Image
        style={styles.logoIcon}
        source={logoIcon}
        resizeMode={"contain"}
      ></Image>
      <Typography
        style={styles.headerText}
        variant='header20'
        color={appColors.secondary}
        onPress={() => {
          alert("oi");
        }}
      >
        Insira seu e-mail para recuperar sua conta
      </Typography>
      <View
        style={{
          height: 168 + 64,
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <TextInput
          value={email}
          onChangeText={(e) => setEmail(e)}
          style={styles.textInput}
          placeholder={"E-mail"}
        >
          {email}
        </TextInput>

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
