import { Platform } from 'react-native'
import { auth } from '../database/firebase';
import * as GoogleSignIn from 'expo-google-sign-in';

export const googleProvider = new auth.GoogleAuthProvider();
export const facebookProvider = new auth.FacebookAuthProvider();

export const Authentication = {
    currentUser: async () => {
        return await auth().currentUser;
    },
    signIn: async ({ email, password }) => {
        return await auth().signInWithEmailAndPassword(email, password);
    },
    signInWithProvider: async (provider, callback) => {
        if (Platform.OS === 'web') {
            await auth()
                .signInWithPopup(provider)
                .then(function (res) {
                    let token = res.credential.accessToken;
                    let user = res.user;
                    callback(user);
                })
                .catch(function (e) {
                    console.log(e)
                    let errorCode = e.code;
                    let errorMessage = e.message;
                    let email = e.email;
                    let credential = e.credential;
                });
        }
        else {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                Alert.alert("User idToken from login", user.auth.idToken);
                callback();
            } else {
                console.log("cancelled")
            }
        }
    }
}