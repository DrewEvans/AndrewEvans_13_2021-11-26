import { SET_USER, EDIT_USER } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        profile: payload.userData.body,
      };

    case EDIT_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        profile: payload.userData.body,
      };
    default:
      return state;
  }
}
