const functions = require("firebase-functions");
const admin = require("firebase-admin");

const STATUS_ID = "active";
const TRANSACTION_TYPES = ["debit", "credit"];

admin.initializeApp();
const db = admin.firestore();

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

exports.conductTransaction = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You should sign in"
    );
  }

  const { account_id, value, type } = data;

  if (!TRANSACTION_TYPES.includes(type)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      'Incorrect "type" passed'
    );
  }

  if (isNaN(value)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      'Incorrect "value" passed'
    );
  }

  const accountRef = db.collection("accounts").doc(account_id);

  return accountRef.get().then(_account => {
    const currentData = _account.data();

    if (_account.exists && currentData.user_id === context.auth.uid) {
      const currValue = parseFloat(currentData.value || 0);
      const inputValue = parseFloat(value);

      if (type === "credit") {
        return accountRef.update({ value: currValue + inputValue }).then(() => {
          return {
            data: {
              message: "successfully created",
              status: "success"
            }
          };
        });
      } else {
        if (currValue < inputValue) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            'Incorrect "value" passed'
          );
        }

        return accountRef.update({ value: currValue - inputValue }).then(() => {
          return {
            data: {
              message: "successfully created",
              status: "success"
            }
          };
        });
      }
    } else {
      throw new functions.https.HttpsError(
        "invalid-argument",
        'Incorrect "account_id" passed'
      );
    }
  });
});
