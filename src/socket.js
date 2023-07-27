import io from "socket.io-client";
import Cookies from "js-cookie";

const socketNew = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
  autoConnect: true,
  auth: {
    token: `${Cookies.get("token")}`,
  },
});
export default socketNew;
