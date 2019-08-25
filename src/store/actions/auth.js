import {
  AUTH_SIGN_IN_WITH_GOOGLE_START,
  AUTH_SIGN_OUT_START
} from "./types.js";

export const signInWithGoogleAsync = () => {
  return {
    type: AUTH_SIGN_IN_WITH_GOOGLE_START
  };
};

export const signOut = () => {
  return {
    type: AUTH_SIGN_OUT_START
  };
};
