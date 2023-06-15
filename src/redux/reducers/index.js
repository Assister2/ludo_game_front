// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from "redux";

// Reducers
import {
  signUpReducer,
  loginReducer,
  socketReducer,
  signupPage1,
} from "./auth";
import { user } from "./user";
import { wallet } from "./wallet";
import { wallet1, displaytimer } from "./buychips";

export default combineReducers({
  signupPage1,
  socketReducer,
  signUpReducer,
  loginReducer,
  user,
  wallet,
  wallet1,
  displaytimer,

  // Here you can registering another reducers.
});
