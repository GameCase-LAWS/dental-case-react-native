import { Vibration as RNVibration, Platform } from "react-native";
import { LocalStorage, localStorageKeys } from "./localStorage";

export const GameVibration = {
  vibrate: async (pattern, repeat) => {
    if (Platform.OS !== 'web') {
      const enabled = await LocalStorage.retrieve(localStorageKeys.VIBRATION_ENABLED, 1);
      if (enabled) {
        RNVibration.vibrate(pattern, repeat);
      }
    }
  },
  stop: async () => {
    if (Platform.OS !== 'web') {
      RNVibration.cancel();
    }
  }
}