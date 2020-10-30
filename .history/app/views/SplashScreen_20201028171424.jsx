import React from 'react';
import { Platform, View, ImageBackground, Image, Animated, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Typography } from '../components/Typography';

const Banner = require("../assets/images/banner.png");
const BlueBackgroundImage = require('../assets/images/blue-bg.jpg');

const SplashAPNG = require('../assets/images/splash.png');

export const SplashScreen = ({ scene, navigation, ...props }) => {

  React.useEffect(() => {
    async function changeScreenOrientationAsync() {
      if (Platform.OS !== "web") {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
      navigation.navigate('Home');
    }
    changeScreenOrientationAsync();
  }, []);

  return (
    <ImageBackground source={BlueBackgroundImage} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Image source={Banner} style={{ height: 400, width: 600 }} resizeMode="contain" /> */}
      {/* <ApngComponent src={SplashAPNG} style={{ height: 400, width: 600 }} /> */}
      {/* <Image source={SplashAPNG} /> */}
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <Typography color='#fff'>Skip</Typography>
      </TouchableOpacity>
    </ImageBackground>
  );
}