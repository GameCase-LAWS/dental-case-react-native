import AsyncStorage from '@react-native-community/async-storage';

export const localStorageKeys = {
  LAST_CONNECTION: '@last_connection',
  VIBRATION_ENABLED: '@vibration_enabled',
  SOUND_ENABLED: '@sound_enabled',
  LANGUAGE: '@language'
}

export const LocalStorage = {
  store: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.error(e);
    }
  },
  retrieve: async (key, defaultValue) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value) || defaultValue;
    } catch (e) {
      // error reading value
      console.error(e);
    }
  }
}