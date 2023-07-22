import Cookies from "js-cookie";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { put, call, takeLatest } from "redux-saga/effects";
import { LOGIN_AUTH, LOGOUT_AUTH, USER_AUTH } from "../contstants";
import socketNew from "../../socker";
import {
  signUpError,
  signUpLoading,
  signUpSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  loginLoading,
  logoutSuccess,
  logoutLoading,
} from "../actions/auth";
import {
  getWalletError,
  getWalletLoading,
  getWalletSuccess,
} from "../actions/wallet";
import { userSignUp, verifyOTP, logoutAPI } from "../../apis/auth";

const connectSocket = () => {
  const socket = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
    auth: {
      token: `${Cookies.get("token")}`,
    },
  });

  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      console.log("Socket.IO connected");
      resolve(socket);
    });

    socket.on("connect_error", (error) => {
      console.log("Socket.IO connection error:", error);
      reject(error);
    });
  });
};

function* signUp(param) {
  yield put(signUpLoading(true));
  const data = yield userSignUp(param.payload);

  if (data.status === 200) {
    toast.success(`OTP has sent to your number`, { hideAfter: 5 });
    const dataall = { ...param.payload, signUp: true };

    yield put({ type: "ON_SIGNUPPAGE", payload: true });

    param.navigation(`/verify-otp?p=${param.payload.phone}`, {
      state: { ...param.payload, isVerified: true },
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

  console.log("check", data);
  yield put(loginLoading(true));

  if (data.status === 200) {
    Cookies.set("token", data.data?.jwtToken?.jwtToken, { expires: 30 });
    Cookies.set("fullName", data.data?.fullName, { expires: 30 });
    Cookies.set("userId", data.data?._id, { expires: 30 });

    yield put(getWalletSuccess(data));
    // const socket = yield call(connectSocket);

    yield put({ type: "SOCKET_CONNECTED", payload: socketNew });

    yield put(loginSuccess(data));
    param.navigation(`/`);
  } else if (data.status === 400) {
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
    param.navigation(`/login`);
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

  try {
    yield put(logoutSuccess());

    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
    socketNew.disconnect();
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error(error);
  }
}

export default function* authSaga() {
  yield takeLatest(USER_AUTH.SIGNUP_REQUEST, signUp);
  yield takeLatest(LOGIN_AUTH.LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT_AUTH.LOGOUT_REQUEST, logout);
}
