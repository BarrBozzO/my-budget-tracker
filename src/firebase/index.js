import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";
import { normalizeUserData } from "../utils/normalize";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();

    this.googleAuthProvider = new app.auth.GoogleAuthProvider();

    // Auth
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.getAuthStateListener = this.getAuthStateListener.bind(this);
    this.signOut = this.signOut.bind(this);

    // Accounts
    this.addAccount = this.addAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getAccountsListener = this.getAccountsListener.bind(this);

    this._getDocumentsListener = this._getDocumentsListener.bind(this);
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

  // ACCOUNTS

  addAccount(account) {
    return this.db
      .collection("accounts")
      .add(account)
      .then(accountRef => {
        return accountRef.id;
      })
      .catch(err => err);
  }

  getAccount(id) {
    var accountRef = this.db.collection("accounts").doc(id);

    return accountRef
      .get()
      .then(function(account) {
        if (account.exists) return { account: account.data() };
        else throw new Error("Account doesn't exist");
      })
      .catch(function(error) {
        return { error };
      });
  }

  getAccountsListener(fn) {
    var query = this.db.collection("accounts").limit(50);

    return this._getDocumentsListener(query, fn);
  }

  _getDocumentsListener(query, fn) {
    return query.onSnapshot(function(snapshot) {
      if (!snapshot.size) fn([]);

      fn(snapshot.docChanges());
    });
  }
}

export default new Firebase();
