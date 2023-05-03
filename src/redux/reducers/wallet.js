import { WALLET } from "../contstants";

// ============SIGN UP REDUCER==================
const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

export const wallet = (state = initialState, action) => {
  switch (action.type) {
    case WALLET.GET_WALLET_LOADING: {
      const { payload } = action;
      return { ...state, isLoading: payload };
    }

    case WALLET.GET_WALLET_SUCCESS: {
      const { payload } = action;
      console.log("payload",payload)
      return { ...state, data: payload, error: "", isLoading: false };
    }

    case WALLET.GET_WALLET_ERROR: {
      const { payload } = action;
      return { ...state, data: null, error: payload, isLoading: false };
    }
    case WALLET.UPDATE_WALLET_LOADING: {
        const { payload } = action;
        return { ...state, isLoading: payload };
      }
  
      case WALLET.UPDATE_WALLET_SUCCESS: {
        const { payload } = action;
        console.log("payload",payload)
        return { ...state, data: payload, error: "", isLoading: false };
      }
  
      case WALLET.UPDATE_WALLET_ERROR: {
        const { payload } = action;
        return { ...state, data: null, error: payload, isLoading: false };
      }
      case WALLET.USER_SELL_CHIPS_LOADING: {
        const { payload } = action;
        return { ...state, isLoading: payload };
      }
  
      case WALLET.USER_SELL_CHIPS_SUCCESS: {
        const { payload } = action;
        console.log("payload",payload)
        return { ...state, data: payload, error: "", isLoading: false };
      }
  
      case WALLET.USER_SELL_CHIPS_ERROR: {
        const { payload } = action;
        return { ...state, data: payload.data, error: payload.error, isLoading: false };
      }
      case WALLET.USER_BUY_CHIPS_LOADING: {
        const { payload } = action;
        return { ...state, isLoading: payload };
      }
  
      case WALLET.USER_BUY_CHIPS_SUCCESS: {
        const { payload } = action;
        console.log("payload",payload)
        return { ...state, data: payload, error: "", isLoading: false };
      }
  
      case WALLET.USER_BUY_CHIPS_ERROR: {
        const { payload } = action;
        return { ...state, data: payload.data, error: payload.error, isLoading: false };
      }
      
    default:
      return state;
  }
};