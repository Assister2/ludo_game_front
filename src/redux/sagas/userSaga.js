import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { put, call, takeLatest } from "redux-saga/effects";
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
import socketNew from "../../socket";

// Sign up
function* getUserProfile(param) {
  yield put(getUserProfileLoading(true));
  const data = yield getUserProfileApi();

  if (data.status === 200) {
    yield put(getUserProfileSuccess(data.data));
  } else if (data.status === 400) {
    // Disconnect the socket and remove cookies on profile error
    Cookies.remove("token");
    Cookies.remove("fullName");
    Cookies.remove("userId");
    socketNew.disconnect();
    yield put({ type: "SOCKET_CONNECTED", payload: null });

    window.location.href = "/login";
    toast.error(data.error);
    yield put(loginError(data.error));
    yield put(getUserProfileError(data.error));
  } else {
    yield put(getUserProfileError(data.error));
    toast.error(data.error);
  }
}

function* updateUserProfile(param) {
  yield put(updateUserProfileLoading(true));
  const data = yield updateUserProfileApi(param);
  if (data.status === 200) {
    // toast.success("Profile updated");
    toast.success(data.data.error);

    yield put(updateUserProfileSuccess(data.data));
  } else if (data.status === 400) {
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
