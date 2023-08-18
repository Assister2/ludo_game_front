// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from "redux";

// Reducers
import { signUpReducer, loginReducer, signupPage1 } from "./auth";
import { user } from "./user";
import { socketReducer } from "./socket";
import { wallet } from "./wallet";
import { wallet1, displaytimer } from "./buychips";
import { history } from "./history";
import { play } from "./play";

export default combineReducers({
  signupPage1,
  socketReducer,
  signUpReducer,
  loginReducer,
  user,
  wallet,
  wallet1,
  history,
  play,
  displaytimer,

  // Here you can registering another reducers.
});
