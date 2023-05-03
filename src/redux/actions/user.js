import { USER_PROFILE } from "../contstants/index";

export const getUserProfileReq = (data) =>{
    return {
      type: USER_PROFILE.USER_GET_PROFILE_REQUEST,
      payload: data,
    };
  }
  
  
  export const getUserProfileSuccess = (data) =>{
    console.log("data profile",data.data)
    return {
      type: USER_PROFILE.USER_GET_PROFILE_SUCCESS,
      payload: data.data,
    };
  }
  
  
  export const getUserProfileError = (error) =>{
    return {
      type: USER_PROFILE.USER_GET_PROFILE_ERROR,
      payload: error,
    };
  }
  export const getUserProfileLoading = (loading) =>{
    return {
      type: USER_PROFILE.USER_GET_PROFILE_LOADING,
      payload: loading,
    };
  }
  


//   user profile update actions/
  
  
  export const updateUserProfileLoading = (loading) =>{
    return {
      type: USER_PROFILE.USER_UPDATE_PROFILE_LOADING,
      payload: loading,
    };
  }
  

  export const updateUserProfileReq = (data) =>{
    return {
      type: USER_PROFILE.USER_UPDATE_PROFILE_REQUEST,
      payload: data,
    };
  }
  
  
  export const updateUserProfileSuccess = (data) =>{
    return {
      type: USER_PROFILE.USER_UPDATE_PROFILE_SUCCESS,
      payload: data.data,
    };
  }
  
  
  export const updateUserProfileError = (error) =>{
    return {
      type: USER_PROFILE.USER_UPDATE_PROFILE_ERROR,
      payload: error,
    };
  }
  
  
