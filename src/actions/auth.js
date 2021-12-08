import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  USER_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getProfile = (token) => async (dispatch) => {
  const data = await AuthService.getProfile(token);
  console.log(data);

  dispatch({
    type: SET_USER,
    payload: { userData: data },
  });

  return data;
  // return AuthService.getProfile(token).then(
  //   (data) => {
  //     dispatch({
  //       type: SET_USER,
  //       payload: { profile: data },
  //     });
  //     return Promise.resolve();
  //   },
  //   (error) => {
  //     const message =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();
  //     dispatch({
  //       type: USER_FAIL,
  //     });
  //     dispatch({
  //       type: SET_MESSAGE,
  //       payload: message,
  //     });
  //     return Promise.reject();
  //   }
  // );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
