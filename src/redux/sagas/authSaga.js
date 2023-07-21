import Cookies from "js-cookie";
import { toast } from "react-toastify";
import io from "socket.io-client";
// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
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

// Sign up
function* signUp(param) {
  yield put(signUpLoading(true));
  const data = yield userSignUp(param.payload);

  if (data.status == 200) {
    toast.success(`OTP has sent to your number`, { hideAfter: 5 });
    var dataall = { ...param.payload, signUp: true };

    yield put({ type: "ON_SIGNUPPAGE", payload: true });

    param.navigation(`/verify-otp?p=${param.payload.phone}`, {
      state: { ...param.payload, isVerified: true },
    });

    yield put(signUpSuccess(data));
  } else if (data.status == 400) {
    toast.error(data.error);
    yield put(signUpError(data.error));
  } else {
    yield put(signUpLoading(false));
    yield put(signUpError(data.error));

    toast.error(data.error);
  }
}
const connectSocket = () => {
  // const websocketURL = process.env.REACT_APP_CLIENT_BASEURL_WS || "ws://localhost:4001";
  const socket = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
    auth: {
      token: `${Cookies.get("token")}`,
    },
  }); // Replace with your server URL
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
    console.log("checkkk1", data);
    console.log("checkkk2", data.data);

    Cookies.set("token", data.data?.jwtToken?.jwtToken, { expires: 30 });
    Cookies.set("fullName", data.data?.fullName, { expires: 30 });
    Cookies.set("userId", data.data?._id, { expires: 30 });

    // toast.success(`loged in successfully`);

    yield put(getWalletSuccess(data));
    const socket = yield call(connectSocket);
    yield put({ type: "SOCKET_CONNECTED", payload: socket });
    // const socketNew = io("http://localhost:4002");

    // console.log("data",data)
    yield put(loginSuccess(data));

    param.navigation(`/`);
    // window.location.reload();
  } else if (data.status == 400) {
    console.log("");
    localStorage.clear();
    sessionStorage.clear();
    window.localStorage.clear();
    localStorage.removeItem("wallet");
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
    // param.navigation(param.route);
  } catch (error) {
    toast.error(error);
  }

  // yield put(logoutLo(true));
  // const data = yield verifyOTP(param.payload);
  // console.log("param",param.payload)
  // console.log("data",data)
  // if (data.status == 200) {
  //   toast.success(`OTP has sent to your number`, { hideAfter: 5 });

  // // console.log("data",data)
  //   yield put(loginSuccess(data));
  //   param.navigation(`/play`);

  // } else if (data.status == 400) {
  //   toast.error(data.error);
  //   yield put(loginError(data.error));
  // } else {
  //   yield put(loginError(data.error));
  //   toast.error(data.error);
  // }
}

export default function* authSaga() {
  yield takeLatest(USER_AUTH.SIGNUP_REQUEST, signUp);
  yield takeLatest(LOGIN_AUTH.LOGIN_REQUEST, login);
  // yield takeLatest(LOGIN_AUTH.SOCKET_CONNECTION, login);
  yield takeLatest(LOGOUT_AUTH.LOGOUT_REQUEST, logout);
}
