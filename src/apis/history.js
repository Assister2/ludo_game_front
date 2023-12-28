import Cookies from "js-cookie";
// import axiosConfig from "./axiosConfig";
import { axiosConfig } from "./axiosConfig";

const token = Cookies.get("token");

export const getHistoryApi = async () => {
  try {
    const token =
      Cookies.get("token") !== undefined || Cookies.get("token") !== null
        ? Cookies.get("token")
        : "";

    const res = await axiosConfig.get(`/history`, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
