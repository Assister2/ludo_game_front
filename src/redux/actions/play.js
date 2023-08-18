import { PLAY } from "../contstants/index";

export const getChallengesReq = (data) => {
  return {
    type: PLAY.GET_CHALLENGES_REQUEST,
    payload: data,
  };
};

export const getChallengesSuccess = (data) => {
  return {
    type: PLAY.GET_CHALLENGES_SUCCESS,
    payload: data,
  };
};

export const getChallengesError = (error) => {
  return {
    type: PLAY.GET_CHALLENGES_ERROR,
    payload: error,
  };
};
export const getChallengesLoading = (loading) => {
  return {
    type: PLAY.GET_CHALLENGES_LOADING,
    payload: loading,
  };
};
