import { SET_USER, USER_FAIL, EDIT_USER } from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        profile: payload.userData.body,
      };
    case USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
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
