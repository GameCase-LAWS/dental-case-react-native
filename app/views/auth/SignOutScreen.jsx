import React from "react";
import { Image, View, TextInput } from "react-native";

import { appColors, styles } from "../../styles";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";

const BackIcon = require('../../assets/icons');
const Banner = require("../../assets/images/banner.png");

export function SignOutScreen({}) {
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");

  function createUser() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => console.log("Logged In"))
      .catch((e) => console.log("Login failed", e));
  }

  return (
    // Tela de login
    <View style={styles.screenContainer}>
      <BackIcon />
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
        Crie sua conta
      </Typography>
      <View
        style={{
          width: screenWidth,
          alignSelf: "center",
          paddingBottom: 32,
          paddingHorizontal: 32,
        }}
      >
        <TextInput
          value={username}
          onChangeText={(e) => setUsername(e)}
          style={styles.textInput}
          placeholder={"Usuário"}
        >
          {username}
        </TextInput>
        <TextInput
          value={email}
          onChangeText={(e) => setEmail(e)}
          style={styles.textInput}
          placeholder={"E-mail"}
        >
          {email}
        </TextInput>
        <TextInput
          value={password}
          onChangeText={(e) => setPassword(e)}
          style={styles.textInput}
          placeholder={"Senha"}
        >
          {password}
        </TextInput>
        <TextInput
          value={repeatedPassword}
          onChangeText={(e) => setRepeatedPassword(e)}
          style={styles.textInput}
          placeholder={"Repita a senha"}
        >
          {repeatedPassword}
        </TextInput>
      </View>
      <Button
        style={{ flex: 1, alignSelf: "center" }}
        variant='contained'
        backgroundColor={appColors.primary}
        label='Registrar'
        onPress={() => {}}
      ></Button>
    </View>
  );
}
