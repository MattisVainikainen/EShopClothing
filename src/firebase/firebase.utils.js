import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBlaUf9i76VDj2n2uKAZ7EFeviscTg9uAs",
  authDomain: "crwn-db-6b0ca.firebaseapp.com",
  projectId: "crwn-db-6b0ca",
  storageBucket: "crwn-db-6b0ca.appspot.com",
  messagingSenderId: "615670709987",
  appId: "1:615670709987:web:533c92f71df2d28801cfd6",
  measurementId: "G-XXYYS9KE8J",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
