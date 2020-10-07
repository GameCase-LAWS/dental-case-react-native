import AsyncStorage from '@react-native-community/async-storage';

export const localStorageKeys = {
  LAST_CONNECTION: '@last_connection'
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
      return value || defaultValue;
    } catch (e) {
      // error reading value
      console.error(e);
    }
  }
}