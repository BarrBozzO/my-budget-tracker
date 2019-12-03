import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";
import { normalizeUserData, normalizeAccountData } from "../utils/normalize";

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
    this.updateAccount = this.updateAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getStatuses = this.getStatuses.bind(this);
    this.getAccountsListener = this.getAccountsListener.bind(this);

    this._getDocumentsListener = this._getDocumentsListener.bind(this);
    this._getMetaData = this._getMetaData.bind(this);
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
    const { currentUser } = this.auth;

    return this.db
      .collection("accounts")
      .add({ user_id: currentUser.uid, ...account })
      .then(accountRef => {
        return { id: accountRef.id };
      })
      .catch(error => ({
        error
      }));
  }

  updateAccount(account) {
    return this.db
      .collection("accounts")
      .doc(account.id)
      .set({ ...account })
      .then(accountRef => {
        return { id: accountRef.id };
      })
      .catch(error => ({
        error
      }));
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

  removeAccount(id) {
    var accountRef = this.db.collection("accounts").doc(id);

    return accountRef
      .delete()
      .then(function() {
        return {};
      })
      .catch(function(error) {
        return { error };
      });
  }

  // CURRENCIES

  getCurrencies() {
    const collection = this.db.collection("currencies");

    return collection
      .get()
      .then(function(data) {
        if (!Array.isArray(data.docs))
          throw new Error("There was error during currencies fetch!");

        const normalizedData = data.docs.map(function(doc) {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        return { data: normalizedData };
      })
      .catch(function(error) {
        return { error };
      });
  }

  getStatuses() {
    const collection = this.db.collection("statuses");

    return collection
      .get()
      .then(function(data) {
        if (!Array.isArray(data.docs))
          throw new Error("There was error during statuses fetch!");

        const normalizedData = data.docs.map(function(doc) {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        return { data: normalizedData };
      })
      .catch(function(error) {
        return { error };
      });
  }

  get({ collectionName, documentId, normalizeFn } = {}) {
    let ref = this.db.collection(collectionName);

    if (documentId) ref = ref.doc(documentId);

    return ref
      .get()
      .then(function(data) {
        if (!Array.isArray(data.docs))
          throw new Error(`Error occured during ${collectionName} data fetch`);

        const normalizedData = data.docs.map(function(doc) {
          return {
            id: doc.id,
            ...(typeof normalizeFn === "function"
              ? normalizeFn(doc.data())
              : doc.data())
          };
        });
        return { data: normalizedData };
      })
      .catch(function(error) {
        return { error };
      });
  }

  remove({ collectionName, documentId } = {}) {
    var ref = this.db.collection(collectionName).doc(documentId);

    return ref
      .delete()
      .then(function() {
        return {
          id: documentId
        };
      })
      .catch(function(error) {
        return { error };
      });
  }

  update({ collectionName, documentId, data } = {}) {
    const ref = this.db.collection(collectionName).doc(documentId);

    return ref
      .update({ ...data })
      .then(documentRef => {
        return { id: documentRef.id };
      })
      .catch(error => ({
        error
      }));
  }

  add({ collectionName, data } = {}) {
    const { currentUser } = this.auth;
    const ref = this.db.collection(collectionName);

    return ref
      .add({ user_id: currentUser.uid, ...data })
      .then(documentRef => {
        return { id: documentRef.id };
      })
      .catch(error => ({
        error
      }));
  }

  getAccountsListener(fn) {
    const { currentUser } = this.auth;

    if (!currentUser) return () => {};

    var query = this.db
      .collection("accounts")
      .where("user_id", "==", currentUser.uid)
      .limit(50);

    return this._getDocumentsListener(query, fn, normalizeAccountData);
  }

  /**
   *
   * @param {*} doc
   */
  _getMetaData(doc) {
    return { _pending: doc.metadata && doc.metadata.hasPendingWrites };
  }

  _getDocumentsListener(query, fn, normalize) {
    const _this = this;
    return query.onSnapshot(function(snapshot) {
      if (!snapshot.size) fn([]);

      const data = snapshot.docChanges().map(change => {
        const data =
          typeof normalize === "function"
            ? normalize(change.doc.data())
            : change.doc.data();
        const metadata = _this._getMetaData(change.doc.metadata);

        return {
          id: change.doc.id,
          ...data,
          metadata
        };
      });

      fn(data);
    });
  }
}

export default new Firebase();
