import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Expo dependencies
import * as Font from 'expo-font';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import views
import { MenuScreen } from './app/views/MenuScreen';
import { SplashScreen } from './app/views/SplashScreen';
import { CreditsScreen } from './app/views/CreditsScreen';

import { AuthStack } from "./app/views/auth";
import { AuthWebStack } from "./app/views/web/index";
import { GameStack } from './app/views/gameplay';

import { ThemeContextProvider } from './app/ThemeContext';
import { UserContextProvider } from './app/UserContext';
import { HistoryScreen } from './app/views/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          // ...Ionicons.font,
          'roboto-regular': require('./app/assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold': require('./app/assets/fonts/Roboto-Bold.ttf'),
          'roboto-italic': require('./app/assets/fonts/Roboto-Italic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false, headerTitle: 'Dental Case' }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Credits" component={CreditsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />

            {/* Aditional Stacks */}
            {() => {
              if (Platform.OS === "web") {
                {/* Web */ }
                <Stack.Screen name="Auth" component={AuthStack} />
              }
            }
            }
            {/* Mobile */}
            <Stack.Screen name="Auth" component={AuthWebStack} />
            <Stack.Screen name="Game" component={GameStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}