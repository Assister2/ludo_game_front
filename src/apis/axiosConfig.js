import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_CLIENT_BASEURL}`,
  headers: { "Content-Type": "application/json" },
});

export const axiosConfigWallet = axios.create({
  baseURL: 'https://merchant.upigateway.com/api/create_order',
  headers: { "Content-Type": "application/json" },
});