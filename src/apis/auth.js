import Cookies from "js-cookie";
import { axiosConfig } from "./axiosConfig";

// USER SIGN UP
export const userSignUp = async (param) => {
  const data = await axiosConfig
    .post("/auth/signup", param)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return data;
};

// verify OTP
export const verifyOTP = async (param) => {
  // let token = await initFB();
  param = { ...param };

  const data = await axiosConfig
    .post("/auth/confirmOTP", param)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return data;
};
export const verifyOTP2 = async (param) => {
  // let token = await initFB();
  param = { ...param };

  const data = await axiosConfig
    .post("/auth/OTP", param)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return data;
};
export const loginAPI = async (payload) => {
  try {
    const data = await axiosConfig.post("/auth/login", payload);

    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const logoutAPI = async () => {
  try {
    const userId = Cookies.get("userId");
    const data = await axiosConfig.get("/auth/logout", {
      params: { userId }, // Include userId as a query parameter
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const resendOTP = async (payload) => {
  try {
    const data = await axiosConfig.post("/auth/resendOTP", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
