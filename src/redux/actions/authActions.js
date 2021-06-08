import getUserProfile from "../../api/accounts/getUserProfile";
import createToken from "../../api/auth/createToken";
import getUserInfo from "../../api/auth/getUserInfo";
import refreshToken from "../../api/auth/refreshToken";
import * as authActionTypes from "../actionTypes/authActionTypes";
import { store } from "../createStore";

const parseJWT = (jwt) => {
  if (jwt !== undefined) {
    try {
      return JSON.parse(atob(jwt.split(".")[1]));
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
};

export const setAuthData = (id, email, access, type) => ({
  type: authActionTypes.AUTH_SUCCESS,
  payload: {
    id,
    email,
    access,
    type,
  },
});

export const dispatchLogout = () => async (dispatch) => {
  const blankAuthData = {
    access: undefined,
    id: undefined,
    username: undefined,
    type: undefined,
  };
  dispatch(setAuthData(blankAuthData));
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("authToken");
};

export const dispatchTokenExpiration = (expirationTime) => async (dispatch) => {
  const MIN_IN_MS = 1000 * 60;
  const minBeforeExpirationTime = expirationTime - 1 * MIN_IN_MS;
  setInterval(async () => {
    const state = store.getState();
    const authToken = state.auth.access;
    if (authToken) {
      const JWTRefresh = await refreshToken();

      if (JWTRefresh === 401) {
        dispatch(dispatchLogout());
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authToken");
      } else {
        const userData = await getUserInfo(JWTRefresh.access);
        const { id, email } = userData[0];
        const { type } = await getUserProfile(id);
        dispatch(setAuthData(id, email, JWTRefresh.access, type));
        localStorage.setItem("authToken", JWTRefresh.access);
      }
    }
  }, minBeforeExpirationTime);
};

export const dispatchLogin = (loginEmail, password) => async (dispatch) => {
  const { access, refresh } = await createToken(loginEmail, password);
  const userData = await getUserInfo(access);
  const { id, email } = userData[0];
  const { exp } = parseJWT(access);
  const expirationDate = new Date(exp * 1000);
  const timeToExpiration = expirationDate.getTime() - new Date().getTime();
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("authToken", access);
  const { type } = await getUserProfile(id);
  if (access && id && email) {
    dispatch(setAuthData(id, email, access, type));
    dispatch(dispatchTokenExpiration(timeToExpiration));
  }
};

export default dispatchLogin;
