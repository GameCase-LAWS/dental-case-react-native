import React from "react";
import { Image, View, TextInput, TouchableOpacity } from "react-native";

import { appColors, screenWidth, screenHeight } from "../../styles";
import { Button } from "../../components/Button";
import { BackIcon } from "../../assets/icons/index";
import { Typography } from "../../components/Typography";
import { ThemeContext } from "../../ThemeContext";
import { auth } from "../../database/firebase";

const BlueBg = require("../../assets/images/blue-bg.jpg");
const Banner = require("../../assets/images/banner.png");
const logoIcon = require("../../assets/icons/icon.png");

export const errorHandler = (e, setMessage) => {
  let errorCode = e.code;
  let errorMessage = e.message;
  setMessage(errorMessage);
  console.log(errorCode);
};

export const SignUpScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatedPassword, setRepeatedPassword] = React.useState("");
  const [message, setMessage] = React.useState();
  const actionSettings = {
    // url: "https://game-case-ed16c.firebaseapp.com",
    url: "https://www.dentalcase.games",
    // dynamicLinkDomain: "https://localhost",
    handleCodeInApp: true,
  };

  function createUser() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        auth()
          .sendSignInLinkToEmail(email, actionSettings)
          .then(() => window.localStorage.setItem("emailForSignIn", email))
          .catch((e) => errorHandler(e, setMessage)),
      )
      .catch((e) => errorHandler(e));
  }

  function handleLogedIn() {}

  return (
    <View style={{ flex: 1 }}>
      <Image style={{ flex: 1 }} source={BlueBg} />
      <View style={[theme.styles.absolutePosition, theme.styles.center]}>
        <View
          style={{
            padding: 32,
            backgroundColor: "#ffffff",
            width: theme.measure(20),
            // maxWidth:theme.measure(30),
            // minHeight:theme.measure(20),
            borderRadius: theme.measure(0.5),
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon
              style={{ width: theme.measure(1.5), height: theme.measure(1.5) }}
              fill={appColors.primary}
            />
          </TouchableOpacity>
          <Image
            source={Banner}
            style={{
              width: 280,
              height: 170,
              alignSelf: "center",
            }}
            resizeMode='contain'
          ></Image>

          <Typography
            variant='subtitle16'
            color={appColors.secondary}
            style={{ marginVertical: 32, alignSelf: "center" }}
          >
            Crie sua conta
          </Typography>
          {message && (
            <Typography
              variant={"overline10"}
              color='#f00'
              style={{ marginBottom: 8 }}
            >
              {message}
            </Typography>
          )}
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
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
            style={theme.styles.textInput}
            placeholder={"Senha"}
          ></TextInput>
          <TextInput
            value={repeatedPassword}
            secureTextEntry={true}
            onChangeText={(e) => setRepeatedPassword(e)}
            style={theme.styles.textInput}
            placeholder={"Repita a senha"}
          ></TextInput>
          <Button
            backgroundColor={appColors.primary}
            label='Registrar'
            onPress={() => createUser(email, password)}
          ></Button>
        </View>
      </View>
    </View>
  );
};
