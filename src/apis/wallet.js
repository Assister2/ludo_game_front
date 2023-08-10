import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { axiosConfig } from "./axiosConfig";
// const { data } = useSelector((state) => state.loginReducer)

export const buyWalletApi = async (data) => {
  const token =
    Cookies.get("token") !== undefined || Cookies.get("token") !== null
      ? Cookies.get("token")
      : "";

  try {
    const res = await axiosConfig.post(`/transaction/buy`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const sellWalletApi = async (data) => {
  const token =
    Cookies.get("token") !== undefined || Cookies.get("token") !== null
      ? Cookies.get("token")
      : "";

  try {
    const res = await axiosConfig.post(`/transaction/sell`, data.payload, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const getWalletApi = async () => {
  const token =
    Cookies.get("token") !== undefined || Cookies.get("token") !== null
      ? Cookies.get("token")
      : "";

  try {
    const res = await axiosConfig.get(`/transaction/wallet`, {
      headers: {
        Authorization: token,
      },
    });
    return res;
  } catch (error) {
    return error.response.data;
  }
};
