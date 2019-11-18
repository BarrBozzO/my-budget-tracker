const functions = require("firebase-functions");

const STATUS_ID = "active";

exports.createAccount = functions.firestore
  .document("accounts/{accountId}")
  .onCreate(snap => {
    return snap.ref.set(
      {
        status_id: STATUS_ID,
        value: 0
      },
      { merge: true }
    );
  });
