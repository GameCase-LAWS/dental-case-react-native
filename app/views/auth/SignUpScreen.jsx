import React from "react";
import { Image, View, TextInput, TouchableOpacity } from "react-native";

import { appColors, screenWidth, screenHeight } from "../../styles";
import { Button } from "../../components/Button";
import { BackIcon } from "../../assets/icons/index";
import { Typography } from "../../components/Typography";
import { ThemeContext } from "../../ThemeContext";

const BlueBg = require("../../assets/images/blue-bg.jpg");
const Banner = require("../../assets/images/banner.png");
const logoIcon = require("../../assets/icons/icon.png");

export const SignUpScreen = ({}) => {
  const { theme } = React.useContext(ThemeContext);
  const [username, setUsername] = React.useState("");
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
    <View style={{ flex: 1 }}>
      <Image style={{ flex: 1 }} source={BlueBg} />
      <View
        style={[
          {
            position: "absolute",
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            padding: 32,
          },
          theme.styles.center,
        ]}
      >
        <View
          style={{
            padding: 32,
            backgroundColor: "#ffffff",
            minHeight:600,
            minWidth: 500,
            borderRadius: theme.measure(0.5),
          }}
        >
          <TouchableOpacity onPress={() => navigator}>
            <BackIcon
              style={{ width: 24, height: 24 }}
              fill={appColors.primary}
            />
          </TouchableOpacity>
          <Image
            source={Banner}
            style={{
              width: 280,
              height: 170,
              alignSelf: "center",
              marginBottom: 16,
            }}
            resizeMode='contain'
          ></Image>
          <Typography
            variant='header20'
            color={appColors.secondary}
            style={{ marginBottom: 16, alignSelf: "center" }}
          >
            Crie sua conta
          </Typography>
          <TextInput
            value={username}
            onChangeText={(e) => setUsername(e)}
            style={theme.styles.textInput}
            placeholder={"Usuário"}
          ></TextInput>
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={theme.styles.textInput}
            placeholder={"E-mail"}
          ></TextInput>
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={theme.styles.textInput}
            placeholder={"Senha"}
          ></TextInput>
          <TextInput
            value={repeatedPassword}
            onChangeText={(e) => setRepeatedPassword(e)}
            style={theme.styles.textInput}
            placeholder={"Repita a senha"}
          ></TextInput>
          <Button
            // buttonStyle={{ flexGrow: 1 }}
            backgroundColor={appColors.primary}
            label='Registrar'
            // onPress={() => {}}
          ></Button>
        </View>
      </View>
    </View>
  );
};
