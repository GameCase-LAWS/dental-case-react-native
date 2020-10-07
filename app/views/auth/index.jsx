import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { SignInScreen } from '../web/SignInScreen'
import { SignOutScreen } from './SignOutScreen'
import { RedefinePasswordScreen } from './RedefinePasswordScreen'

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignOutScreen} />
      <Stack.Screen name="RedefinePassword" component={RedefinePasswordScreen} />
    </Stack.Navigator>
  );
}