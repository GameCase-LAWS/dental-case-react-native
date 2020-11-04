import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignInScreen } from "../web/SignInScreen";
import { SignUpScreen } from "../web/SignUpScreen";
import { RedefinePasswordScreen } from "../web/RedefinePasswordScreen";
import { Platform } from "react-native";

const Stack = createStackNavigator();

export const AuthWebStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='SignIn'
    >
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen
        name='RedefinePassword'
        component={RedefinePasswordScreen}
      />
    </Stack.Navigator>
  );
};
