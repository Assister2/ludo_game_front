import Cookies from "js-cookie";
import cogoToast from "cogo-toast";
import io from "socket.io-client";
// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { LOGIN_AUTH, LOGOUT_AUTH, USER_AUTH } from "../contstants";
import {
  signUpError,
  signUpLoading,
  signUpSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  loginLoading,
  logoutSuccess,
} from "../actions/auth";
import {
  getWalletError,
  getWalletLoading,
  getWalletSuccess,
} from "../actions/wallet";
import { userSignUp, verifyOTP } from "../../apis/auth";

// Sign up
function* signUp(param) {
  yield put(signUpLoading(true));
  const data = yield userSignUp(param.payload);

  if (data.status == 200) {
    cogoToast.success(`OTP has sent to your number`, { hideAfter: 5 });
    var dataall = { ...param.payload, signUp: true };

    yield put({ type: "ON_SIGNUPPAGE", payload: true });

    param.navigation(`/verify-otp?p=${param.payload.phone}`, {
      state: { ...param.payload, isVerified: true },
    });

    yield put(signUpSuccess(data));
  } else if (data.status == 400) {
    cogoToast.error(data.error);
    yield put(signUpError(data.error));
  } else {
    yield put(signUpError(data.error));

    cogoToast.error(data.error);
  }
}
const connectSocket = () => {
  const socket = io("ws://localhost:4001"); // Replace with your server URL

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

// Sign up
function* login(param) {
  var data = null;
  if (param?.payload?.register) {
    data = param?.payload?.data;
  } else {
    data = yield verifyOTP(param.payload);
  }

  console.log("check", data);
  yield put(loginLoading(true));
  if (data.status == 200) {
    localStorage.clear();
    sessionStorage.clear();
    window.localStorage.clear();
    localStorage.removeItem("wallet");
    Cookies.remove();

    Cookies.set("token", data.data?.jwtToken?.jwtToken, { expires: 30 });
    Cookies.set("fullName", data.data?.fullName, { expires: 30 });
    Cookies.set("userId", data.data?._id, { expires: 30 });
    // cogoToast.success(`loged in successfully`);

    yield put(getWalletSuccess(data));
    const socket = yield call(connectSocket);
    yield put({ type: "SOCKET_CONNECTED", payload: socket });
    // const socketNew = io("http://localhost:4002");

    // console.log("data",data)
    yield put(loginSuccess(data));

    param.navigation(`/`);
    // window.location.reload();
  } else if (data.status == 400) {
    cogoToast.error(data.error);
    yield put(loginError(data.error));
  } else {
    yield put(loginError(data.error));
    cogoToast.error(data.error);
  }
}

function* logout(param) {
  console.log("param", param);
  try {
    yield put(logoutSuccess());
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
    cogoToast.success("Logged out successfully");
    param.navigation("/");
  } catch (error) {
    cogoToast.error(error);
  }

  // yield put(logoutLo(true));
  // const data = yield verifyOTP(param.payload);
  // console.log("param",param.payload)
  // console.log("data",data)
  // if (data.status == 200) {
  //   cogoToast.success(`OTP has sent to your number`, { hideAfter: 5 });

  // // console.log("data",data)
  //   yield put(loginSuccess(data));
  //   param.navigation(`/play`);

  // } else if (data.status == 400) {
  //   cogoToast.error(data.error);
  //   yield put(loginError(data.error));
  // } else {
  //   yield put(loginError(data.error));
  //   cogoToast.error(data.error);
  // }
}

export default function* authSaga() {
  yield takeLatest(USER_AUTH.SIGNUP_REQUEST, signUp);
  yield takeLatest(LOGIN_AUTH.LOGIN_REQUEST, login);
  // yield takeLatest(LOGIN_AUTH.SOCKET_CONNECTION, login);
  yield takeLatest(LOGOUT_AUTH.LOGOUT_REQUEST, logout);
}
