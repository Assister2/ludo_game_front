import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { disconnectSocket } from "../../socket";
import { put, call, takeLatest } from "redux-saga/effects";
import { LOGIN_AUTH, LOGOUT_AUTH, USER_AUTH } from "../contstants";
import {
  signUpError,
  signUpLoading,
  signUpSuccess,
  loginError,
  loginSuccess,
  loginLoading,
  logoutSuccess,
  logoutLoading,
} from "../actions/auth";
import {
  getUserWallet,
  getWalletLoading,
  getWalletReq1,
  getWalletSuccess,
  updateWalletReq,
  updateWalletSuccess,
} from "../actions/wallet";

import { userSignUp, verifyOTP, logoutAPI } from "../../apis/auth";

function* signUp(param) {
  yield put(signUpLoading(true));
  const data = yield userSignUp(param.payload);

  if (data.status === 200) {
    toast.success(`OTP has sent to your number`, { hideAfter: 5 });

    yield put({ type: "ON_SIGNUPPAGE", payload: true });
    param.navigation(`/verify-otp`, {
      state: { ...param.payload, isVerified: true, registerUser: true },
    });

    yield put(signUpSuccess(data));
  } else if (data.status === 400) {
    toast.error(data.error);
    yield put(signUpError(data.error));
  } else {
    yield put(signUpLoading(false));
    yield put(signUpError(data.error));

    toast.error(data.error);
  }
}

function* login(param) {
  let data = null;
  if (param?.payload?.register) {
    data = param?.payload?.data;
  } else {
    data = yield verifyOTP(param.payload);
  }

  yield put(loginLoading(true));
  if (data.status === 200) {
    Cookies.set("token", data.data?.jwtToken?.jwtToken, { expires: 30 });
    Cookies.set("fullName", data.data?.fullName, { expires: 30 });
    Cookies.set("userId", data.data?._id, { expires: 30 });

    yield put(updateWalletReq());
    yield put(loginSuccess(data));

    param.navigation(`/`);
  } else if (data.status === 400) {
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
    // param.navigation(`/login`);
    toast.error(data.error);
    yield put(loginError(data.error));
  } else {
    yield put(loginLoading(false));
    yield put(loginError(data.error));
    toast.error(data.error);
  }
}

function* logout(param) {
  yield put(logoutLoading(true));
  const data = yield logoutAPI();

  yield put(updateWalletSuccess());
  yield put(logoutSuccess());

  disconnectSocket();
  toast.success("Logged out successfully");
}
function* automaticLogout(param) {
  yield put(logoutLoading(true));
  const data = yield logoutAPI();

  yield put(updateWalletSuccess());
  yield put(logoutSuccess());

  disconnectSocket();
  toast.success("Logged out automatically");
}
export default function* authSaga() {
  yield takeLatest(USER_AUTH.SIGNUP_REQUEST, signUp);
  yield takeLatest(LOGIN_AUTH.LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT_AUTH.LOGOUT_REQUEST, logout);
  yield takeLatest(LOGOUT_AUTH.AUTOMATIC_LOGOUT_REQUEST, automaticLogout);
}
