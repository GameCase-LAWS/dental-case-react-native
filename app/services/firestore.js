import * as Network from 'expo-network';
import { firestore } from '../database/firebase';
import { LocalStorage, localStorageKeys } from './localStorage';
import { Platform } from 'react-native';
import { Authentication } from './auth';
import { findObjectInListByTag } from '../tools/functions';

export const Cases = {
  index: async () => {
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

export const User = {
  show: async () => {
    const user = await Authentication.currentUser();
    if (user) {
      firestore.collection('users').doc(user.uid);
    }
  },
}

export const Attendance = {
  store: async (data, saves, userId, caso) => {
    return await firestore.doc(`users/${userId}`).collection('attendance').add({
      // selected_avatar: data.avatar,
      pontuacao: {
        anamnese: saves.anamnese?.score || 0,
        exame_clinico: saves.exame_clinico?.score || 0,
        diagnostico: saves.diagnostico?.score || 0,
        exame_complementar: saves.exame_complementar?.score || 0,
        tratamento: saves.tratamento?.score || 0,
        comunicacao: saves.comunicacao?.score || 0
      },
      caso_id: caso.id,
      caso_nome: caso.titulo,
      caso_image: findObjectInListByTag(caso.imagens, 'identificador', 'character-profile')?.arquivo || null,
      selections: data.selections,
      data: new Date()
    });
  }
}