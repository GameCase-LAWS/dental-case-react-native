import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as GoogleSignIn from "expo-google-sign-in";

import { styles, appColors, windowWidth } from "../../styles";

import { Typography } from "../../components/Typography";
import { Grid } from "../../components/Grid";
import { Button } from "../../components/Button";
import { Animation } from "../../components/Animation";
import { ArrowIcon, CloseIcon } from "../../assets/icons/index";

import {
  Authentication,
  googleProvider,
  facebookProvider,
} from "../../services/auth";

import { SideBar } from "../dialogs/SideBar";

// Import images
const GoogleIcon = require("../../assets/images/providers/google.png");
const FacebookIcon = require("../../assets/images/providers/facebook.png");
const Banner = require("../../assets/images/banner.png");

const BlueBg = require("../../assets/images/blue-bg.jpg");

const fachadas = [
  require("../../assets/images/fachadas/fachada_0.jpg"),
  require("../../assets/images/fachadas/fachada_1.jpg"),
  require("../../assets/images/fachadas/fachada_2.jpg"),
];

export const SignInScreen = ({ navigation, ...props }) => {
  const [index, setIndex] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [authentication, setAuthentication] = React.useState({
    email: null,
    password: null,
  });
  const sideBarValue = React.useRef(new Animated.Value(0)).current;
  const fadeAnimIn = React.useRef(new Animated.Value(1)).current;
  const [open, setOpen] = React.useState(false);

  const sideBarAnime = {
    transform: [
      {
        translateX: sideBarValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, windowWidth / 6],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  function handleClickSideBar() {
    sideBarValue.setValue(!open);
    setOpen(!open);
  }

  const onChangeText = (change) => (e) => {
    setAuthentication((old) => ({ ...old, [change]: e }));
  };

  async function handleSignIn() {
    // Authentication.signIn(authentication);
    navigation.navigate("Splash");
  }

  async function _syncUserWithStateAsync() {
    const user = await GoogleSignIn.signInSilentlyAsync();
    if (user) {
      navigation.navigate("Splash");
    }
  }

  const signInWithProvider = (provider) => async () => {
    Authentication.signInWithProvider(provider, _syncUserWithStateAsync);
  };

  React.useEffect(() => {
    async function startLoopAsync(inOut) {
      Animated.timing(fadeAnimIn, {
        toValue: inOut ? 1 : 0.66,
        delay: inOut ? 0 : 10000,
        duration: inOut ? 2000 : 2000,
        useNativeDriver: false,
      }).start(() => {
        if (!inOut) {
          setIndex((old) => (old === 2 ? 0 : ++old));
        }
        startLoopAsync(!inOut);
      });
    }

    startLoopAsync(true);
  }, [open]);

  return (
    <Animated.View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* <Animated.Image style={{ flex: 1, opacity: fadeAnimIn }} source={fachadas[index]} /> */}

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
            width: 400,
            height: 600,
            padding: 32,
            paddingTop: 8,
            backgroundColor: "#ffffff",
            borderRadius: 4,
            elevation: 2,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={Banner}
            style={{ width: 280, height: 170, alignSelf: "center" }}
            resizeMode='contain'
          />
          <View>
            <Typography
              color={appColors.secondary}
              style={{ marginVertical: 16, textAlign: "center" }}
            >
              Entre com sua conta existente
            </Typography>
            {message && (
              <Typography paragraph color='#f00'>
                {message}
              </Typography>
            )}
            <TextInput
              value={authentication["email"]}
              onChangeText={onChangeText("email")}
              style={styles.textInput}
              placeholder={"Usuário ou E-mail"}
            />
            <TextInput
              secureTextEntry={true}
              value={authentication["password"]}
              onChangeText={onChangeText("password")}
              style={styles.textInput}
              placeholder={"Senha"}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginVertical: 8,
              }}
            >
              <Typography style={styles.underscored}>
                Esqueceu a senha?
              </Typography>
              <Typography bold color={appColors.primary}>
                Registrar
              </Typography>
            </View>
          </View>
          <Button
            backgroundColor={appColors.primary}
            label='Login'
            onPress={handleSignIn}
          />
          <Typography
            color={appColors.secondary}
            style={{ textAlign: "center" }}
          >
            Ou entre com a sua conta
          </Typography>
          <Grid container spacingX={24} style={{ marginTop: 16 }}>
            <Grid item size={6}>
              <Button
                buttonStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: "#4081ec" }}
                textColor='#fff'
                label='Google'
                onPress={signInWithProvider(googleProvider)}
                icon={
                  <View
                    style={{
                      margin: -8,
                      padding: 8,
                      backgroundColor: "#fff",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={GoogleIcon}
                    />
                  </View>
                }
              />
            </Grid>
            <Grid item size={6}>
              <Button
                buttonStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: "#4064ac" }}
                textColor='#fff'
                label='Facebook'
                onPress={signInWithProvider(facebookProvider)}
                icon={
                  <Image
                    style={{ width: 16, height: 16 }}
                    source={FacebookIcon}
                  />
                }
              />
            </Grid>
          </Grid>
        </View>
      </View>

      {!open && (
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={open}
          onPress={() => setOpen(!open)}
          style={[
            {
              // opacity: Number(!open),
              zIndex: 1,
              position: "absolute",
              top: 0,
              right: 0,
              alignSelf: "flex-end",
              paddingHorizontal: 15,
              paddingVertical: 15,
            },
          ]}
        >
          <ArrowIcon color={appColors.primary} height={30} width={30} />
        </TouchableOpacity>
      )}
      {open && <SideBar handleOpen={handleClickSideBar} anim={sideBarAnime} />}

      <Animation />
    </Animated.View>
  );
};
