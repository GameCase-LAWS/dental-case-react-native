import { Alert, Platform } from 'react-native'
import { auth } from '../database/firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import { errorHandler } from "../tools/functions";
import { actionSettings } from '../database/firebase'

export const googleProvider = new auth.GoogleAuthProvider();
export const facebookProvider = new auth.FacebookAuthProvider();

export const Authentication = {
    currentUser: async () => {
        return await auth().currentUser;
    },
    signIn: async ({ email, password }, callback) => {
        return await auth().signInWithEmailAndPassword(email, password).then().catch((e) => {
            if (e.code === "auth/wrong-password") { return callback("Senha inserida incorreta.") }
            if (e.code === 'auth/user-not-found') {
                return callback(`Usuário com e-mail ${email} não encontrado.`);
            } else {
                callback(e.message)
            }
        });
    },
    createUserWithEmailAndPassword: async (email, password, displayName, callback, callback2) => {
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                let user = res.user;
                Authentication.updateProfile(user, displayName);
                Authentication.sendSignInLinkToEmail(user.email, actionSettings, callback);
            })
            .catch((e) => {
                if (e.code === "auth/email-already-in-use") {
                    return callback2("Usuário com este e-mail já existe.")
                }
                else {
                    return callback2(e.message)
                }

            })
    },
    updateProfile: async (user, name, photo = null, callback = null) => {
        await user.updateProfile({
            displayName: name,
            photoURL: photo
        }).then(function () {
            callback("Perfil atualizado com sucesso.")
        }).catch(function (e) {
            console.log(e);
        });

    },
    signOut: async ({ }) => {
        await auth().signOut().then(function () {
            console.log("Logout successifull.");
        }).catch(function (e) {
            console.log(e);
        });
    },
    deleteUser: async () => {
        const user = await auth().currentUser;
        await user.delete().then(function () {
            console.log("User deleted with success.");
        }).catch(function (error) {
            console.log("User deletion failed.");
        });
    },
    reauthenticateWithCredencial: async ({ email }, password) => {
        const credential = auth().EmailAuthProvider.credential(
            email,
            password
        );
        await user.reauthenticateWithCredential(credential).then(function () {
            // User re-authenticated.
        }).catch(function (error) {
            // An error happened.
        });

    },
    signInWithProvider: async (provider, callback) => {
        if (Platform.OS === 'web') {
            await auth()
                .signInWithPopup(provider)
                .then(function (res) {
                    let token = res.credential.accessToken;
                    let user = res.user;
                    if (user.emailVerified === true) {
                        callback(user);
                    }
                })
                .catch((e) => console.log(e));
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
    },
    sendSignInLinkToEmail: (email, callback) => {
        auth()
            .sendSignInLinkToEmail(email, actionSettings)
            .then(() => {
                window.localStorage.setItem("emailForSignIn", email);
                callback(true);
            })
            .catch((e) => console.log(e));
    },
    sendPasswordResetEmail: async (email, callback, callback2) => {
        auth()
            .sendPasswordResetEmail(email, actionSettings)
            .then(() => callback(true))
            .catch((e) => {
                if (e.code === 'auth/user-not-found' && e.code !== null) {
                    callback2(`Usuário com e-mail ${email} não encontrado.`);
                }
                else {
                    console.log(e);
                }
            });
    }

}