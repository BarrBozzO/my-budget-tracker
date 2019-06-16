/**
 * Normalizes data for state use.
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
