import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  LOGOUT,
  SET_MESSAGE,
  EDIT_USER,
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
        payload: {
          user: {
            status: data.status,
            message: data.message,
            token: data.body.token,
            firstName: null,
            lastName: null,
            id: null,
            email: null,
          },
        },
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
  return AuthService.getProfile(token).then(
    (data) => {
      console.log(token);
      console.log(data);
      dispatch({
        type: LOAD_USER,
        payload: {
          user: {
            status: data.status,
            message: data.message,
            token: token,
            firstName: data.body.firstName,
            lastName: data.body.lastName,
            id: data.body.id,
            email: data.body.email,
          },
        },
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

export const updateProfile =
  (token, firstName, lastName) => async (dispatch) => {
    return AuthService.updateProfile(token, firstName, lastName).then(
      (data) => {
        console.log(token);
        console.log(data);
        dispatch({
          type: EDIT_USER,
          payload: {
            user: {
              status: data.status,
              message: data.message,
              token: token,
              firstName: data.body.firstName,
              lastName: data.body.lastName,
              id: data.body.id,
              email: data.body.email,
            },
          },
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

    // const data = await AuthService.updateProfile(token, firstName, lastName);
    // console.log(data);
    // console.log(token);

    // dispatch({
    //   type: EDIT_USER,
    //   payload: {
    //     user: {
    //       payload: {
    //         user: {
    //           status: data.status,
    //           message: data.message,
    //           token: token,
    //           firstName: data.body.firstName,
    //           lastName: data.body.lastName,
    //           id: data.body.id,
    //           email: data.body.email,
    //         },
    //       },
    //     },
    //   },
    // });

    // return data;
  };

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
