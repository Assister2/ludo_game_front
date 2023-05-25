import { WALLET } from "../contstants";

// ============SIGN UP REDUCER==================
const initialState = {
  isLoading: false,
  data: {},
  error: "",
};

export const wallet1 = (state = initialState, action) => {
  switch (action.type) {
    case WALLET.GET_WALLET_REQUEST1: {
      const { payload } = action;

      return { ...state, data: payload, error: "", isLoading: false };
    }

    default:
      return state;
  }
};
