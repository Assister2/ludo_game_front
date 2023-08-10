import Cookies from "js-cookie";
import { toast } from "react-toastify";
// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { WALLET } from "../contstants";

import { getUserProfileApi, updateUserProfileApi } from "../../apis/user";
import {
  updateWalletError,
  updateWalletLoading,
  updateWalletSuccess,
  userBuyChipsError,
  userBuyChipsLoading,
  userBuyChipsSuccess,
  userSellChipsError,
  userSellChipsLoading,
  userSellChipsSuccess,
} from "../actions/wallet";
import { buyWalletApi, sellWalletApi } from "../../apis/wallet";

// Sign up

function* updateWallet(param) {
  yield put(updateWalletLoading(true));
  const data = yield updateUserProfileApi(param);
  if (data.status == 200) {
    toast.success("Profile updated");

    yield put(updateWalletSuccess(data.data));
  } else if (data.status == 400) {
    toast.error(data.error);
    yield put(updateWalletError(data.error));
  } else {
    yield put(updateWalletError(data.error));
    toast.error(data.error);
  }
}

function* userBuySaga(param) {
  yield put(userBuyChipsLoading(true));
  const data = yield buyWalletApi(param);

  if (data.status == 200) {
<<<<<<< HEAD
    const Url = data.data.data;
    if (Url) {
      window.location.href = Url;
    }else{
         toast.success("Chips added successfully");
=======
    if (process.env.NODE_ENV === "production") {
      const Url = data.data.data;
      window.location.href = Url;
    } else {
      toast.success("Chips added successfully");
>>>>>>> db0fb1a9400636345bb8b97c0c9f2dfeb0dddf50
    }

    yield put(userBuyChipsSuccess(data.data));
  } else if (data.status == 400) {
    toast.error(data.error);
    yield put(userBuyChipsError(data));
  } else {
    yield put(userBuyChipsError(data));
    toast.error(data.error);
  }
}

function* userSellSaga(param) {
  yield put(userSellChipsLoading(true));
  const data = yield sellWalletApi(param);
  if (data.status == 200) {
    toast.success("Withdraw successfull");

    yield put(userSellChipsSuccess(data.data));
  } else if (data.status == 400) {
    toast.error(data.error);
    yield put(userSellChipsError(data));
  } else {
    yield put(userSellChipsError(data));
    toast.error(data.error);
  }
}

export default function* userSaga() {
  yield takeLatest(WALLET.UPDATE_WALLET_REQUEST, updateWallet);
  yield takeLatest(WALLET.USER_BUY_CHIPS_REQUEST, userBuySaga);
  yield takeLatest(WALLET.USER_SELL_CHIPS_REQUEST, userSellSaga);
}
