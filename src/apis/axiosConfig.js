import Cookies from "js-cookie";
import axios from "axios";
const token =
  Cookies.get("token") !== undefined || Cookies.get("token") !== null
    ? Cookies.get("token")
    : "";

export const axiosConfig = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_CLIENT_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosConfigWallet = axios.create({
  baseURL: "https://merchant.upigateway.com/api/create_order",
  headers: { "Content-Type": "application/json" },
});
