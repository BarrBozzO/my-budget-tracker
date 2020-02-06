/**
 * Normalizes USER data
 * @param {Object} user
 * @returns {Object}
 */
export const normalizeUserData = user => {
  return {
    name: user.displayName,
    email: user.email,
    avatar: user.photoURL
  };
};

/**
 * Normalizes Account data
 * @param {Object} account
 * @returns {Object}
 */
export const normalizeAccountData = account => {
  return {
    currencyId: account.currency_id,
    name: account.name,
    statusId: account.status_id,
    description: account.description,
    value: account.value
  };
};

/**
 * Prepare account data for firebase request
 * @param {Object} data
 */
export const generateAccountPayload = data => {
  const payload = {
    currency_id: data.currencyId,
    status_id: data.statusId,
    name: data.name,
    description: data.description
  };

  // rework + deescription should not be rerquired for account
  for (const field in payload) {
    if (
      payload.hasOwnProperty(field) &&
      typeof payload[field] === "undefined"
    ) {
      delete payload[field];
    }
  }

  return payload;
};

/**
 * Normalizes Accounts Data
 * @param {Array} accounts
 * @returns {Array}
 */
export const normalizeAccountsData = accounts => {
  return accounts.map(account => normalizeAccountData(account));
};

/**
 * Normalizes Transaction Data
 * @param {Object} transaction
 * @returns {Object}
 */
export const normalizeTransactionData = transaction => {
  return {
    accountId: transaction.account_id,
    name: transaction.name,
    value: transaction.value,
    description: transaction.description,
    date: transaction.date && transaction.date.seconds * 1000,
    type: transaction.type
  };
};
