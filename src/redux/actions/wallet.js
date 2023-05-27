import { WALLET } from "../contstants/index";

export const getWalletReq = (data) => {
  return {
    type: WALLET.GET_WALLET_REQUEST,
    payload: data,
  };
};

export const getWalletSuccess = (data) => {
  return {
    type: WALLET.GET_WALLET_SUCCESS,
    payload: data.data,
  };
};

export const getWalletError = (error) => {
  return {
    type: WALLET.GET_WALLET_ERROR,
    payload: error,
  };
};
export const getWalletLoading = (loading) => {
  return {
    type: WALLET.GET_WALLET_LOADING,
    payload: loading,
  };
};

//   user profile update actions/

export const updateWalletLoading = (loading) => {
  return {
    type: WALLET.UPDATE_WALLET_LOADING,
    payload: loading,
  };
};

export const updateWalletReq = (data) => {
  return {
    type: WALLET.UPDATE_WALLET_REQUEST,
    payload: data,
  };
};

export const updateWalletSuccess = (data) => {
  return {
    type: WALLET.UPDATE_WALLET_SUCCESS,
    payload: data.data,
  };
};

export const updateWalletError = (error) => {
  return {
    type: WALLET.UPDATE_WALLET_ERROR,
    payload: error,
  };
};

export const userBuyChipsLoading = (loading) => {
  return {
    type: WALLET.USER_BUY_CHIPS_LOADING,
    payload: loading,
  };
};

export const userBuyChipsRequest = (data) => {
  return {
    type: WALLET.USER_BUY_CHIPS_REQUEST,
    payload: data,
  };
};

export const userBuyChipsSuccess = (data) => {
  return {
    type: WALLET.USER_BUY_CHIPS_SUCCESS,
    payload: data.data,
  };
};

export const userBuyChipsError = (error) => {
  return {
    type: WALLET.USER_BUY_CHIPS_ERROR,
    payload: error,
  };
};

export const userSellChipsLoading = (loading) => {
  return {
    type: WALLET.USER_SELL_CHIPS_LOADING,
    payload: loading,
  };
};

export const userSellChipsRequest = (data) => {
  return {
    type: WALLET.USER_SELL_CHIPS_REQUEST,
    payload: data,
  };
};

export const userSellChipsSuccess = (data) => {
  return {
    type: WALLET.USER_SELL_CHIPS_SUCCESS,
    payload: data.data,
  };
};

export const userSellChipsError = (error) => {
  return {
    type: WALLET.USER_SELL_CHIPS_ERROR,
    payload: error,
  };
};
