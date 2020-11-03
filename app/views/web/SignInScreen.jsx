import React from 'react';
import { View, ImageBackground, Image, Animated, TextInput } from 'react-native';

import * as GoogleSignIn from "expo-google-sign-in";

import { appColors } from '../../styles';

import { Typography } from '../../components/Typography';
import { Grid } from "../../components/Grid";
import { Button } from "../../components/Button";

import {
  Authentication,
  googleProvider,
  facebookProvider,
} from "../../services/auth";
import { ThemeContext } from '../../ThemeContext';
import { UserContext } from '../../UserContext';

// Import images
const GoogleIcon = require("../../assets/images/providers/google.png");
const FacebookIcon = require("../../assets/images/providers/facebook.png");
const Banner = require("../../assets/images/banner.png");

const BlueBg = require('../../assets/images/blue-bg.jpg');

const fachadas = [
  require('../../assets/images/fachadas/fachada_0.jpg'),
  require('../../assets/images/fachadas/fachada_1.jpg'),
  require('../../assets/images/fachadas/fachada_2.jpg')
];

export const SignInScreen = ({ navigation, ...props }) => {
  const { theme } = React.useContext(ThemeContext);
  const { user, setUser } = React.useContext(UserContext);

  const [index, setIndex] = React.useState(0);
  const [message, setMessage] = React.useState(null);
  const [authentication, setAuthentication] = React.useState({
    email: '',
    password: '',
  });

  const onChangeText = (change) => (e) => {
    setAuthentication((old) => ({ ...old, [change]: e }));
  };

  async function handleSignIn() {
    setMessage('Entrando...');
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
        setMessage('Entrou com sucesso!')
        navigation.navigate("Splash");
      } else {
        console.log('Verificar usuário');
      }
    }

    checkUserLogged();
  }, [user]);

  return (
    <Animated.View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* <Animated.Image style={{ flex: 1, opacity: fadeAnimIn }} source={fachadas[index]} /> */}
      <Image style={{ flex: 1 }} source={BlueBg} />
      <View style={{ position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 400, height: 600, padding: 32, paddingTop: 8, backgroundColor: '#ffffff', borderRadius: 4, elevation: 2, justifyContent: 'space-between' }}>
          <Image source={Banner} style={{ width: 280, height: 170, alignSelf: 'center' }} resizeMode="contain" />
          <View>
            <Typography color={appColors.secondary} style={{ marginVertical: 16, textAlign: 'center' }} >Entre com sua conta existente</Typography>
            {message && <Typography paragraph color='#f00'>{message}</Typography>}
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
            <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: 8 }} >
              <Typography style={theme.styles.underscored}>Esqueceu a senha?</Typography>
              <Typography bold color={appColors.primary}>Registrar</Typography>
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
            style={{ textAlign: "center" }}
          >
            Ou entre com a sua conta
          </Typography>
          <Grid container spacingX={24} style={{ marginTop: 16 }}>
            <Grid item size={6}>
              <Button
                buttonStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: '#4081ec' }}
                textColor='#fff'
                label='Google'
                onPress={signInWithProvider(googleProvider)}
                icon={
                  <View style={{ margin: -8, padding: 8, backgroundColor: '#fff', borderRadius: 8 }}>
                    <Image style={{ width: 16, height: 16 }} source={GoogleIcon} />
                  </View>
                }
              />
            </Grid>
            <Grid item size={6}>
              <Button
                buttonStyle={{ flexGrow: 1 }}
                style={{ backgroundColor: '#4064ac' }}
                textColor='#fff'
                label='Facebook'
                onPress={signInWithProvider(facebookProvider)}
                icon={<Image style={{ width: 16, height: 16 }} source={FacebookIcon} />}
              />
            </Grid>
          </Grid>
        </View>
      </View>
    </Animated.View>
  );
}