import Cookies from "js-cookie";
import cogoToast from "cogo-toast";
// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {USER_PROFILE} from "../contstants"
import {getUserProfileSuccess,getUserProfileError,getUserProfileLoading, updateUserProfileLoading, updateUserProfileSuccess, updateUserProfileError} from "../actions/user"
import { getUserProfileApi, updateUserProfileApi } from "../../apis/user";

// Sign up
function* getUserProfile(param) {
    yield put(getUserProfileLoading(true));
    const data = yield getUserProfileApi();
   
    if (data.status == 200) {
        
      yield put(getUserProfileSuccess(data.data));
    } else if (data.status == 400) {
      cogoToast.error(data.error);
      yield put(getUserProfileError(data.error));
    } else {
      yield put(getUserProfileError(data.error));
      cogoToast.error(data.error);
    }
  }


  function* updateUserProfile(param) {
    yield put(updateUserProfileLoading(true));
    const data = yield updateUserProfileApi(param);
    if (data.status == 200) {
        cogoToast.success("Profile updated")
        
      yield put(updateUserProfileSuccess(data.data));
    } else if (data.status == 400) {
      cogoToast.error(data.error);
      yield put(updateUserProfileError(data.error));
    } else {
      yield put(updateUserProfileError(data.error));
      cogoToast.error(data.error);
    }
  }
  

  

export default function* userSaga(){
    yield takeLatest(USER_PROFILE.USER_GET_PROFILE_REQUEST,getUserProfile)
    yield takeLatest(USER_PROFILE.USER_UPDATE_PROFILE_REQUEST,updateUserProfile)
}