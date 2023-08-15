import { USER_AUTH, LOGIN_AUTH, LOGOUT_AUTH } from "../contstants/index";

// =====SIGN UP ACTIONS=========
export const signUpRequest = (data, history) => {
  return {
    type: USER_AUTH.SIGNUP_REQUEST,
    payload: data,
    navigation: history,
  };
};

export const signUpSuccess = (data) => {
  return {
    type: USER_AUTH.SIGNUP_SUCCESS,
    payload: data,
  };
};

export const signUpError = (error) => {
  return {
    type: USER_AUTH.SIGNUP_ERROR,
    payload: error,
  };
};

export const signUpLoading = (load) => {
  return {
    type: USER_AUTH.SIGNUP_LOADING,
    payload: load,
  };
};
// // =====LOG IN ACTIONS=========

export const loginRequest = (data, history) => {
  return {
    type: LOGIN_AUTH.LOGIN_REQUEST,
    payload: data,
    navigation: history,
  };
};
export const socketConnection = () => {
  return {
    type: LOGIN_AUTH.SOCKET_CONNECTION,
    // payload: data,
    // navigation: history,
  };
};
export const loginSuccess = (data) => {
  return {
    type: LOGIN_AUTH.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_AUTH.LOGIN_ERROR,
    payload: error,
  };
};

export const loginLoading = (load) => {
  return {
    type: LOGIN_AUTH.LOGIN_LOADING,
    payload: load,
  };
};

// // =====LOGOUT ACTIONS=========

export const logoutRequest = (data, history, route) => {
  return {
    type: LOGOUT_AUTH.LOGOUT_REQUEST,
    navigation: history,
    route: route
  };
};

export const logoutSuccess = (data) => {
  return {
    type: LOGOUT_AUTH.LOGOUT_SUCCESS,
    payload: data,
  };
};

export const logoutLoading = (load) => {
  return {
    type: LOGOUT_AUTH.LOGOUT_LOADING,
    payload: load,
  };
};