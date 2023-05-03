import {spawn} from "redux-saga/effects"

import authSaga from "./authSaga"
import userSaga from "./userSaga"
import walletSaga from "./walletSaga"

export default function* rootSaga(){
    yield spawn(authSaga);
    yield spawn(userSaga);
    yield spawn(walletSaga)
}