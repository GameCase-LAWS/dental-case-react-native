import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { AvatarScreen } from './AvatarScreen';
import { EndingScreen } from './EndingScreen';
import { GameScreen } from './GameScreen';
import { MedicalRecordScreen } from './MedicalRecordScreen';
import { InterferenceScreen } from './InterferenceScreen';

const Stack = createStackNavigator();

export const GameStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Interference">
      <Stack.Screen name="Avatar" component={AvatarScreen} />
      <Stack.Screen name="Ending" component={EndingScreen} />
      <Stack.Screen name="Gameplay" component={GameScreen} />
      <Stack.Screen name="MedicalRecord" component={MedicalRecordScreen} />
      <Stack.Screen name="Interference" component={InterferenceScreen} />
    </Stack.Navigator>
  );
}