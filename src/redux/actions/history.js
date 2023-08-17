import { HISTORY } from "../contstants/index";

export const getHistoryReq = (data) => {
  return {
    type: HISTORY.GET_HISTORY_REQUEST,
    payload: data,
  };
};

export const getHistorySuccess = (data) => {
  return {
    type: HISTORY.GET_HISTORY_SUCCESS,
    payload: data,
  };
};

export const getHistoryError = (error) => {
  return {
    type: HISTORY.GET_HISTORY_ERROR,
    payload: error,
  };
};
export const getHistoryLoading = (loading) => {
  return {
    type: HISTORY.GET_HISTORY_LOADING,
    payload: loading,
  };
};
