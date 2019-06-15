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
    this.setUserAccessToken = this.setUserAccessToken.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  signInWithGoogle() {
    return app
      .auth()
      .signInWithPopup(this.googleAuthProvider)
      .then(result => {
        this.setUserAccessToken(result.credential.accessToken);
        this.setUser(result.user);
        return { user: this.user, error: null };
      })
      .catch(error => {
        return { error: error };
      });
  }

  setUser(user) {
    this.user = user;
  }

  setUserAccessToken(accessToken) {
    this.accessToken = accessToken;
  }
}

export default new Firebase();
