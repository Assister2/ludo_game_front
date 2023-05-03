import Cookies from "js-cookie";
import { USER_PROFILE } from "../contstants";

// ============SIGN UP REDUCER==================
const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE.USER_GET_PROFILE_LOADING: {
      const { payload } = action;
      return { ...state, isLoading: payload };
    }

    case USER_PROFILE.USER_GET_PROFILE_SUCCESS: {
      const { payload } = action;
      console.log("payload",payload)
      return { ...state, data: payload, error: "", isLoading: false };
    }

    case USER_PROFILE.USER_GET_PROFILE_ERROR: {
      const { payload } = action;
      return { ...state, data: null, error: payload, isLoading: false };
    }
    case USER_PROFILE.USER_UPDATE_PROFILE_LOADING: {
        const { payload } = action;
        return { ...state, isLoading: payload };
      }
  
      case USER_PROFILE.USER_UPDATE_PROFILE_SUCCESS: {
        const { payload } = action;
        console.log("payload",payload)
        return { ...state, data: payload, error: "", isLoading: false };
      }
  
      case USER_PROFILE.USER_UPDATE_PROFILE_ERROR: {
        const { payload } = action;
        return { ...state, data: null, error: payload, isLoading: false };
      }
    default:
      return state;
  }
};