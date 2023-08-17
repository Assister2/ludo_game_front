import Cookies from "js-cookie";
import { LOGIN_AUTH, USER_AUTH, LOGOUT_AUTH } from "../contstants";

// ============SIGN UP REDUCER==================

const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

const initialState2 = {
  signUpPage: null,
};

export const signupPage1 = (state = initialState2, action) => {
  switch (action.type) {
    case "ON_SIGNUPPAGE":
      return {
        ...state,
        signUpPage: action.payload,
      };

    // other cases...
    default:
      return state;
  }
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

export const loginReducer = (
  state = {
    isLoading: false,
    data: {
      isLoggedIn:
        Cookies.get("token") !== null &&
        Cookies.get("token") !== undefined &&
        Cookies.get("token") !== "",
      token: "",
    },
    error: "",
  },
  action
) => {
  switch (action.type) {
    case LOGIN_AUTH.LOGIN_LOADING: {
      const { payload } = action;
      return {
        ...state,
        data: { isLoggedIn: false, token: "" },
        isLoading: payload,
      };
    }

    case LOGIN_AUTH.LOGIN_SUCCESS: {
      const { payload } = action;

      return {
        ...state,
        data: { isLoggedIn: true, token: payload.data.jwtToken.jwtToken },
        error: "",
        isLoading: false,
      };
    }

    case LOGIN_AUTH.LOGIN_ERROR: {
      const { payload } = action;
      return {
        ...state,
        data: { isLoggedIn: false, token: "" },
        error: payload,
        isLoading: false,
      };
    }

    case LOGOUT_AUTH.LOGOUT_LOADING: {
      const { payload } = action;
      return {
        ...state,
        data: { isLoggedIn: false, token: "" },
        isLoading: payload,
      };
    }

    case LOGOUT_AUTH.LOGOUT_SUCCESS: {
      Cookies.remove("token");
      Cookies.remove("fullName");
      Cookies.remove("userId");
      localStorage.removeItem("socket_connected");

      return {
        ...state,
        data: { isLoggedIn: false, token: "" },
        error: "",
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
