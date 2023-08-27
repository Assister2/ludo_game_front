import Cookies from "js-cookie";
import axios from "axios";
const token =
  Cookies.get("token") !== undefined || Cookies.get("token") !== null
    ? Cookies.get("token")
    : "";
const refreshToken = Cookies.get("refreshToken");

const axiosConfig =  axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_CLIENT_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

  axiosConfig.interceptors.response.use(
    (res) => {
      return res;
    },
    async(err) => {
      const originalAxios = err.config;
      console.log("original",originalConfig._retry);
      if (originalAxios.url !== "/auth/login" && err.response) {
        if(err.response.status === 400 && !originalAxios._retry ){
          originalAxios._retry = true;
          try{
            const rs = await axiosConfig.post("/refreshToken", {
              refreshToken: refreshToken,
            });
            const { accessToken } = rs.data;
            Cookies.set("token",accessToken.token)
            
            return axiosConfig(originalAxios);
          }catch(err){
            return Promise.reject(error)
          }
        }
      }
      return Promise.reject(err);
    }
  ) 

export default axiosConfig;

export const axiosConfigWallet = axios.create({
  baseURL: "https://merchant.upigateway.com/api/create_order",
  headers: { "Content-Type": "application/json" },
});
