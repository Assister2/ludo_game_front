import { PLAY } from "../contstants";

// ============SIGN UP REDUCER==================
const initialState = {
  isLoading: false,
  challenges: [],
  error: "",
};

export const play = (state = initialState, action) => {
  switch (action.type) {
    case PLAY.GET_CHALLENGES_LOADING: {
      return { ...state, isLoading: action.payload };
    }

    case PLAY.GET_CHALLENGES_SUCCESS: {
      return {
        ...state,
        challenges: action.payload,
        error: "",
        isLoading: false,
      };
    }
    case PLAY.GET_CHALLENGES_ERROR: {
      return {
        ...state,
        challenges: null,
        error: action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
