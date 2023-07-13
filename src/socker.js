import io from "socket.io-client";
import Cookies from "js-cookie";
// Get the WebSocket URL from environment variable

// Create the socket instance
const socketNew = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
  // autoConnect: true,
  auth: {
    token: `${Cookies.get("token")}`,
  },
});

export default socketNew;
