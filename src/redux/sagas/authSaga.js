import Cookies from "js-cookie";
import cogoToast from "cogo-toast";
// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {LOGIN_AUTH, LOGOUT_AUTH, USER_AUTH} from "../contstants"
import {signUpError,signUpLoading,signUpSuccess,loginError,loginRequest,loginSuccess, loginLoading, logoutSuccess} from "../actions/auth"
import { userSignUp, verifyOTP } from "../../apis/auth";


// Sign up
function* signUp(param) {


    yield put(signUpLoading(true));
    const data = yield userSignUp(param.payload);
    console.log("param",param.payload)
    console.log("data",data)
    if (data.status == 200) {
      cogoToast.success(`OTP has sent to your number`, { hideAfter: 5 });
      param.navigation(`/verify-otp?p=${param.payload.phone}`,{ state: { ...param.payload } });
    // console.log("data",data)
      yield put(signUpSuccess(data));
    } else if (data.status == 400) {
      cogoToast.error(data.error);
      yield put(signUpError(data.error));
    } else {
      yield put(signUpError(data.error));
      console.log("data.error",data.error)
      cogoToast.error(data.error);
    }
  }
  
  // Sign up
function* login(param) {
  yield put(loginLoading(true));
  const data = yield verifyOTP(param.payload);
  console.log("param",param.payload)
  console.log("data",data)
  if (data.status == 200) {
    Cookies.set("token", data.data?.jwtToken?.jwtToken,{ expires: 30})
    Cookies.set("fullName", data.data?.fullName,{ expires: 30})
    Cookies.set("userId", data.data?._id,{ expires: 30})
    cogoToast.success(`loged in successfully`);
        
  // console.log("data",data)
    yield put(loginSuccess(data));
    param.navigation(`/`);

  } else if (data.status == 400) {
    cogoToast.error(data.error);
    yield put(loginError(data.error));
  } else {
    yield put(loginError(data.error));
    cogoToast.error(data.error);
  }
}

function* logout(param) {
  console.log("param",param)
try {
  yield put(logoutSuccess());
  Cookies.remove("token")
  Cookies.remove("fullName")
  Cookies.remove("userId")
  cogoToast.success("Logged out successfully")
    param.navigation("/")
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



export default function* authSaga(){
    yield takeLatest(USER_AUTH.SIGNUP_REQUEST,signUp)
    yield takeLatest (LOGIN_AUTH.LOGIN_REQUEST,login)
    yield takeLatest(LOGOUT_AUTH.LOGOUT_REQUEST,logout)
}