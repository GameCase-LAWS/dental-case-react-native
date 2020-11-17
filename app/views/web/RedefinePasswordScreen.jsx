import React from "react";
import { Image, View, TextInput, TouchableOpacity } from "react-native";

import { appColors, screenHeight, screenWidth } from "../../styles";
import { Button } from "../../components/Button";
import { BackIcon } from "../../assets/icons/index";
import { Typography } from "../../components/Typography";
import { ThemeContext } from "../../ThemeContext";
import { auth, actionSettings } from "../../database/firebase";
import { errorHandler } from "../../tools/functions";
import { Authentication } from "../../services/auth";

const Banner = require("../../assets/images/banner.png");
// const logoIcon = require("../../assets/icons/icon.png");

const BlueBg = require("../../assets/images/blue-bg.jpg");

export function RedefinePasswordScreen({ navigation, ...props }) {
  const { theme } = React.useContext(ThemeContext);
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState();
  const [verify, setVerify] = React.useState(false);

  function redefinePassword(email) {
     Authentication.sendPasswordResetEmail(email, setVerify, setMessage);
  }

  if (!verify) {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1 }} source={BlueBg} />
        <View style={[theme.styles.absolutePosition, theme.styles.center]}>
          <View
            style={{
              padding: 32,
              width: theme.measure(20),
              minWidth: theme.measure(20),
              // maxWidth:theme.measure(30),
              backgroundColor: "#ffffff",
              borderRadius: theme.measure(0.5),
              elevation: 2,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{
                  width: theme.measure(1.5),
                  height: theme.measure(1.5),
                }}
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
            {() => {
              if (!verify) {
                return;
              }
            }}
            <Typography
              variant='subtitle16'
              color={appColors.secondary}
              style={{
                marginVertical: theme.measure(3),
                paddingHorizontal: theme.measure(1),
                textAlign: "center",
              }}
            >
              Insira seu e-mail para recuperar sua conta
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
            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                style={theme.styles.textInput}
                placeholder={"E-mail"}
              ></TextInput>

              <Button
                style={{ flex: 1 }}
                variant='contained'
                backgroundColor={appColors.primary}
                label='Recuperar'
                onPress={() => redefinePassword(email)}
              ></Button>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1 }} source={BlueBg} />
        <View style={[theme.styles.absolutePosition, theme.styles.center]}>
          <View
            style={{
              padding: 32,
              width: theme.measure(20),
              minWidth: theme.measure(20),
              // maxWidth:theme.measure(30),
              backgroundColor: "#ffffff",
              borderRadius: theme.measure(0.5),
              elevation: 2,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{
                  width: theme.measure(1.5),
                  height: theme.measure(1.5),
                }}
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
              style={{
                marginVertical: theme.measure(3),
                paddingHorizontal: theme.measure(1),
                textAlign: "center",
              }}
            >
              Um e-mail de redefinição de senha foi enviado para: {email}
            </Typography>

            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{ flex: 1 }}
                variant='contained'
                backgroundColor={appColors.primary}
                label='Recuperar'
                onPress={() => navigation.navigate("SignIn")}
              ></Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
