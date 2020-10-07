import * as Network from 'expo-network';
import { firestore } from '../database/firebase';
import { LocalStorage, localStorageKeys } from './localStorage';
import { Platform } from 'react-native';

export const Cases = {
  show: async () => {
    if (Platform.OS === "web") {
      return firestore.collection('casos')
        .where('tipo', '==', 2)
        .get()
        .then(snapshot => snapshot.docs.map(d => d.data()));
    }
    const lastConnection = await LocalStorage.retrieve(localStorageKeys.LAST_CONNECTION, 0);
    const networkSatate = await Network.getNetworkStateAsync();
    if (networkSatate.isConnected && networkSatate.isInternetReachable) {
      await LocalStorage.store(localStorageKeys.LAST_CONNECTION, Date.now());
    }
    return firestore.collection('casos')
      .where('deployedAt', '>', Number(lastConnection))
      .where('tipo', '==', 2)
      .get()
      .then(snapshot => snapshot.docs.map(d => d.data()));
  }
};