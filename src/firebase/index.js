import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

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
        return { user: result.user };
      })
      .catch(error => {
        return { error: error };
      });
  }

  getAuthStateListener(fn) {
    return this.auth.onAuthStateChanged(fn);
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
