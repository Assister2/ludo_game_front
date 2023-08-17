import { HISTORY } from "../contstants";

// ============SIGN UP REDUCER==================
const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

export const history = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY.GET_HISTORY_LOADING: {
      return { ...state, isLoading: action.payload };
    }

    case HISTORY.GET_HISTORY_SUCCESS: {
      return { ...state, data: action.payload, error: "", isLoading: false };
    }
    case HISTORY.GET_HISTORY_ERROR: {
      return { ...state, data: null, error: action.payload, isLoading: false };
    }

    default:
      return state;
  }
};
