import Cookies from "js-cookie";

import  axiosConfig  from "./axiosConfig";
export const getUserProfileApi = async (payload) => {
  try {
    const token =
      Cookies.get("token") !== undefined || Cookies.get("token") !== null
        ? Cookies.get("token")
        : "";
    const res = await axiosConfig.get(`/user/getUserProfileData`, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response?.data;
  }
};
export const updateUserProfileApi = async (data) => {

  try {
    const token =
      Cookies.get("token") !== undefined || Cookies.get("token") !== null
        ? Cookies.get("token")
        : "";
    const res = await axiosConfig.post(
      `/user/updateUserProfile`,
      data.payload,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response.data;
  }
};
