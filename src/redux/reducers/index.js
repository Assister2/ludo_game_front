// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from "redux";

// Reducers
import {
  signUpReducer,
  loginReducer
} from "./auth";
import { user } from "./user";
import { wallet } from "./wallet";



export default combineReducers({
  signUpReducer,
  loginReducer,
  user,
wallet

  // Here you can registering another reducers.
});
