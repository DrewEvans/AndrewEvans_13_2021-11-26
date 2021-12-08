import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";

const rootReducer = combineReducers({
  auth,
  message,
  user,
});

export default rootReducer;
