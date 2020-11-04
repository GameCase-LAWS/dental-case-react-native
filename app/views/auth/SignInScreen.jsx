import React from "react";
import { Image, Text, View, TextInput, SafeAreaView } from "react-native";

import { appColors } from "../../styles";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";

import {
  Authentication,
  googleProvider,
  facebookProvider,
} from "../../services/auth";
import { ThemeContext } from "../../ThemeContext";

import * as GoogleSignIn from "expo-google-sign-in";
import { Grid } from "../../components/Grid";

// Import images
const GoogleIcon = require("../../assets/images/providers/google.png");
const FacebookIcon = require("../../assets/images/providers/facebook.png");
const Banner = require("../../assets/images/banner.png");

export function SignInScreen({}) {
  const { theme } = React.useContext(ThemeContext);
  const [user, setUser] = React.useState(null);
  const [authentication, setAuthentication] = React.useState({
    email: null,
    password: null,
  });
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    async function initAsync() {
      try {
        await GoogleSignIn.initAsync({
          clientId: "",
          scopes: ["profile"],
        });
        _syncUserWithStateAsync();
      } catch (e) {
        console.log(e);
      }
    }

    initAsync();
  }, []);

  const onChangeText = (change) => (e) => {
    setAuthentication((old) => ({ ...old, [change]: e }));
  };

  async function _syncUserWithStateAsync() {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  }

  async function handleSignIn() {
    Authentication.signIn(authentication);
  }

  const signInWithProvider = (provider) => async () => {
    Authentication.signInWithProvider(provider, _syncUserWithStateAsync);
  };

  return (
    // Tela de login
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{flex:1, }}>
        {/*  */}
        <View style={{ alignItems: "center", backgroundColor: "red" }}>
          <Image
            style={[theme.styles.banner, { backgroundColor: "purple" }]}
            source={Banner}
            resizeMode='contain'
          />
          <Typography
            color={appColors.secondary}
            variant='header20'
            style={{ backgroundColor: "pink" }}
          >
            Entre com sua conta existente
          </Typography>
        </View>
        <View style={{ backgroundColor: "blue" }}>
          {message && (
            <Typography paragraph color='#f00'>
              {message}
            </Typography>
          )}
          <TextInput
            value={authentication["email"]}
            onChangeText={onChangeText("email")}
            style={theme.styles.textInput}
            placeholder={"Usuário ou E-mail"}
          />
          <TextInput
            secureTextEntry={true}
            value={authentication["password"]}
            onChangeText={onChangeText("password")}
            style={theme.styles.textInput}
            placeholder={"Senha"}
          />
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Typography style={theme.styles.underscored}>
              Esqueceu a senha?
            </Typography>
            <Typography bold color={appColors.primary}>
              Registrar
            </Typography>
          </View>
        </View>

        <View style={{ backgroundColor: "blue" }}>
          <Button
            backgroundColor={appColors.primary}
            label='Login'
            onPress={handleSignIn}
          />
          <Typography
            color={appColors.secondary}
            style={{ textAlign: "center", marginVertical:theme.measure(2) }}
          >
            Ou entre com a sua conta
          </Typography>
          <Grid container spacingX={24} style={{ marginTop: 16 }}>
            <Grid item size={6}>
              <Button
                buttonStyle={{ flexGrow: 1 }}
                style={{ backgroundColor:appColors.primary}}
                textColor='#fff'
                label='Google'
                onPress={signInWithProvider(googleProvider)}
                icon={
                  <View
                    // style={{
                    //   margin: -8,
                    //   padding: 8,
                    //   backgroundColor: "#fff",
                    //   borderRadius: 8,
                    // }}
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
          {/* {user && (
          <>
            <Image
              source={{ uri: user.photoURL }}
              style={{ width: 200, height: 200 }}
            />
            <Text>{user.displayName}</Text>
          </>
        )} */}
        </View>
      </View>
    </View>
  );
}
