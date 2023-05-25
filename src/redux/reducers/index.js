// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from "redux";

// Reducers
import { signUpReducer, loginReducer,socketReducer } from "./auth";
import { user } from "./user";
import { wallet } from "./wallet";
import { wallet1 } from "./buychips";

export default combineReducers({
  socketReducer,
  signUpReducer,
  loginReducer,
  user,
  wallet,
  wallet1,

  // Here you can registering another reducers.
});
