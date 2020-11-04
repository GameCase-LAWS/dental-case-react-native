import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignInScreen } from "./SignInScreen";
import { SignInWebScreen } from "../web/SignInWebScreen";
import { SignUpScreen } from "./SignUpScreen";
import { RedefinePasswordScreen } from "./RedefinePasswordScreen";
import { Platform } from "react-native";

const Stack = createStackNavigator();

export const AuthStack = () => {
  if (Platform.OS === "web") {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='SignInWeb'
      >
        <Stack.Screen name='SignInWeb' component={SignInWebScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen
          name='RedefinePassword'
          component={RedefinePasswordScreen}
        />
      </Stack.Navigator>
    );
  }
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
