import Cookies from "js-cookie";
import socketNew from "../../socker";
import { toast } from "react-toastify";
// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { USER_PROFILE } from "../contstants";
import {
  getUserProfileSuccess,
  getUserProfileError,
  getUserProfileLoading,
  updateUserProfileLoading,
  updateUserProfileSuccess,
  updateUserProfileError,
} from "../actions/user";
import { loginError } from "../actions/auth";
import { getUserProfileApi, updateUserProfileApi } from "../../apis/user";

// Sign up
function* getUserProfile(param) {
  yield put(getUserProfileLoading(true));
  const data = yield getUserProfileApi();

  if (data.status == 200) {
    yield put(getUserProfileSuccess(data.data));
  } else if (data.status === 400) {
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
    window.location.href = "/login";
    socketNew.disconnect();

    toast.error(data.error);
    yield put(loginError(data.error));
    toast.error(data.error);
    yield put(getUserProfileError(data.error));
  } else {
    yield put(getUserProfileError(data.error));
    toast.error(data.error);
  }
}

function* updateUserProfile(param) {
  yield put(updateUserProfileLoading(true));
  const data = yield updateUserProfileApi(param);
  if (data.status == 200) {
    // toast.success("Profile updated");
    toast.success(data.data.error);

    yield put(updateUserProfileSuccess(data.data));
  } else if (data.status == 400) {
    toast.error(data.error);
    yield put(updateUserProfileError(data.error));
  } else {
    yield put(updateUserProfileError(data.error));
    toast.error(data.error);
  }
}

export default function* userSaga() {
  yield takeLatest(USER_PROFILE.USER_GET_PROFILE_REQUEST, getUserProfile);
  yield takeLatest(USER_PROFILE.USER_UPDATE_PROFILE_REQUEST, updateUserProfile);
}
