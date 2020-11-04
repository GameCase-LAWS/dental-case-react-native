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

import { appColors } from "../../styles";

import { Typography } from "../../components/Typography";
import { Grid } from "../../components/Grid";
import { Button } from "../../components/Button";

import {
  Authentication,
  googleProvider,
  facebookProvider,
} from "../../services/auth";
import { ThemeContext } from "../../ThemeContext";
import { UserContext } from "../../UserContext";

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

export const SignInWebScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);
  const { user, setUser } = React.useContext(UserContext);

  const [index, setIndex] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [authentication, setAuthentication] = React.useState({
    email: "",
    password: "",
  });

  const onChangeText = (change) => (e) => {
    setAuthentication((old) => ({ ...old, [change]: e }));
  };

  async function handleSignIn() {
    setMessage("Entrando...");
    try {
      const user = await Authentication.signIn(authentication);
      setUser(user);
    } catch ({ message }) {
      setMessage(message);
    }
  }

  async function _syncUserWithStateAsync() {
    const user = await GoogleSignIn.signInSilentlyAsync();
    if (user) {
      setUser(user);
    }
  }

  const signInWithProvider = (provider) => async () => {
    Authentication.signInWithProvider(provider, _syncUserWithStateAsync);
  };

  React.useEffect(() => {
    async function checkUserLogged() {
      const user = await Authentication.currentUser();
      if (user) {
        setMessage("Entrou com sucesso!");
        navigation.navigate("Splash");
      } else {
        console.log("Verificar usuário");
      }
    }

    checkUserLogged();
  }, [user]);

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
            padding: 32,
            // margin: 32,
            backgroundColor: "#ffffff",
            borderRadius: theme.measure(0.5),
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
              value={authentication.email}
              onChangeText={onChangeText("email")}
              style={theme.styles.textInput}
              placeholder={"Usuário ou E-mail"}
            />
            <TextInput
              secureTextEntry={true}
              value={authentication.password}
              onChangeText={onChangeText("password")}
              style={theme.styles.textInput}
              placeholder={"Senha"}
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 8,
                marginBottom: 16,
              }}
            >
              <Typography
                style={theme.styles.underscored}
                variant={"overline10"}
                onPress={() => navigation.navigate("RedefinePassword")}
              >
                Esqueceu a senha?
              </Typography>

              <Typography
                bold
                color={appColors.primary}
                variant={"overline10"}
                onPress={() => navigation.navigate("SignUp")}
              >
                Registrar
              </Typography>
            </View>
          </View>
          <Button
            backgroundColor={appColors.primary}
            label='Login'
            onPress={handleSignIn}
            fontVariant='button14'
          />
          <Typography
            color={appColors.secondary}
            style={{ textAlign: "center", marginVertical: 16 }}
            variant={"caption12"}
          >
            Ou entre com a sua conta
          </Typography>
          <Grid container spacingX={24}>
            <Grid item size={6}>
              <Button
                buttonStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: "#4081ec" }}
                textColor='#fff'
                label='Google'
                onPress={() => signInWithProvider(googleProvider)}
                icon={
                  <View
                    style={[
                      {
                        backgroundColor: "#fff",
                        borderRadius: 4,
                        padding: 4,
                        marginRight: 4,
                      },
                    ]}
                  >
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        backgroundColor: "#fff",
                      }}
                      source={GoogleIcon}
                    />
                  </View>
                }
              />
            </Grid>
            <Grid item size={6}>
              <Button
                style={{ backgroundColor: "#4064ac" }}
                textColor='#fff'
                label='Facebook'
                onPress={() => signInWithProvider(facebookProvider)}
                icon={
                  <Image
                    style={{
                      width: 16,
                      height: 16,
                      margin: 4,
                      padding: 8,
                    }}
                    source={FacebookIcon}
                  />
                }
              />
            </Grid>
          </Grid>
        </View>
      </View>
    </Animated.View>
  );
};
