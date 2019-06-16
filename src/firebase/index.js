import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";
import { normalizeUserData } from "../utils/normalize";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.googleAuthProvider = new app.auth.GoogleAuthProvider();

    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.getAuthStateListener = this.getAuthStateListener.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signInWithGoogle() {
    return this.auth
      .signInWithPopup(this.googleAuthProvider)
      .then(result => {
        const normalizedUser = normalizeUserData(result.user);
        return { user: normalizedUser };
      })
      .catch(error => {
        return { error: error };
      });
  }

  getAuthStateListener(fn) {
    return this.auth.onAuthStateChanged(user => {
      const normalizedUser = user ? normalizeUserData(user) : null;
      fn(normalizedUser);
    });
  }

  signOut() {
    return this.auth
      .signOut()
      .then(() => {
        return { error: null };
      })
      .catch(error => {
        return { error };
      });
  }
}

export default new Firebase();
