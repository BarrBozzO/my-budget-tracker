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
    name: account.displayName,
    email: account.email,
    avatar: account.photoURL
  };
};
