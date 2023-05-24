import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://139.59.30.151:4001/api",
  headers: { "Content-Type": "application/json" },
});

export const axiosConfigWallet = axios.create({
  baseURL: "https://merchant.upigateway.com/api/create_order",
  headers: { "Content-Type": "application/json" },
});
