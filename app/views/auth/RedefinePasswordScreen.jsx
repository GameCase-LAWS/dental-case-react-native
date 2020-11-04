import React from "react";
import { Image, View, TextInput, Platform } from "react-native";

import { appColors, screenHeight, screenWidth } from "../../styles";
import { Button } from "../../components/Button";
import { BackIcon } from "../../assets/icons/index";
import { Typography } from "../../components/Typography";
import { ThemeContext } from "../../ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={{ flex: 1 }}>
      {/* {() => {
        if (Platform.OS === "web") {
          return <Image style={{ flex: 1 }} source={BlueBg} />
        }
      }} */}
      <Image style={{ flex: 1 }} source={BlueBg} />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 32,
            // margin: 32,
            maxWidth: 500,
            minHeight:600,
            backgroundColor: "#ffffff",
            borderRadius: theme.measure(0.5),
            elevation: 2,
            justifyContent: "space-between",
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
            style={{ margin:16, textAlign:'center'}}
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
              style={{ flex: 1 }}
              variant='contained'
              backgroundColor={appColors.primary}
              label='Recuperar'
              onPress={() => {}}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
}
