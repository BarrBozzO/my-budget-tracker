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
    description: account.description
  };
};

/**
 * Normalizes Accounts Data
 * @param {Array} account
 * @returns {Array}
 */
export const normalizeAccountsData = accounts => {
  return accounts.map(account => normalizeAccountData(account));
};
