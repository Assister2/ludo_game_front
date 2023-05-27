import { axiosConfig } from "./axiosConfig";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

// const initFB = async () => {
//   try {
//     const firebaseConfig = {
//       apiKey: "AIzaSyDCEr29Ji7Y_f5W9gzeOEViad1rNLl1mlw",
//       authDomain: "ludo-b0877.firebaseapp.com",
//       projectId: "ludo-b0877",
//       storageBucket: "ludo-b0877.appspot.com",
//       messagingSenderId: "327439659478",
//       appId: "1:327439659478:web:4d116c366c60bd9004b477",
//       measurementId: "G-F1NBS76HRH",
//     };
//     const firebaseApp = initializeApp(firebaseConfig);
//     const messaging = getMessaging(firebaseApp);
//     let token = await getToken(messaging);

//     if (token) return token;
//     return "";
//   } catch (err) {

//     return "";
//   }
// };

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
export const resendOTP = async (payload) => {
  try {
    const data = await axiosConfig.post("/auth/resendOTP", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
