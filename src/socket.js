// socketUtils.js
import io from "socket.io-client";
import Cookies from "js-cookie";

let socketInstance = null;

export const connectSocket = () => {
  if (!socketInstance) {
    socketInstance = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
      auth: {
        token: `${Cookies.get("token")}`,
        userId: `${Cookies.get("userId")}`,
        userNewSession: `${Cookies.get("connect.sid")}`,
      },
    });
  }

  return socketInstance;
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
