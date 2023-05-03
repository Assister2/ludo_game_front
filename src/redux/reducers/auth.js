import Cookies from "js-cookie";
import { LOGIN_AUTH, USER_AUTH, LOGOUT_AUTH } from "../contstants";

// ============SIGN UP REDUCER==================
const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH.SIGNUP_LOADING: {
      const { payload } = action;
      return { ...state, isLoading: payload };
    }

    case USER_AUTH.SIGNUP_SUCCESS: {
      const { payload } = action;
      return { ...state, data: payload, error: "", isLoading: false };
    }

    case USER_AUTH.SIGNUP_ERROR: {
      const { payload } = action;
      return { ...state, data: null, error: payload, isLoading: false };
    }
    default:
      return state;
  }
};

export const loginReducer = (state = {
  isLoading: false,
  data: {
    isLoggedIn: Cookies.get("token") !== null &&
      Cookies.get("token") !== undefined &&
      Cookies.get("token") !== "",
    token: ""
  },
  error: ""

}, action) => {
  switch (action.type) {
    case LOGIN_AUTH.LOGIN_LOADING: {
      const { payload } = action;
      return { ...state, data: { isLoggedIn: false,token:"" }, isLoading: payload };
    }

    case LOGIN_AUTH.LOGIN_SUCCESS: {
      const { payload } = action;
      console.log("payload", payload)
      return { ...state, data: { isLoggedIn: true, token: payload.data.jwtToken.jwtToken }, error: "", isLoading: false };
    }

    case LOGIN_AUTH.LOGIN_ERROR: {
      const { payload } = action;
      return { ...state, data: { isLoggedIn: false,token:""  }, error: payload, isLoading: false };
    }


    case LOGOUT_AUTH.LOGOUT_SUCCESS: {
      console.log("logout case")
      return { ...state, data: { isLoggedIn: false ,token:""}, error: "", isLoading: false };
    }



    default:
      return state;
  }
};