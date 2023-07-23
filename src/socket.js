import io from "socket.io-client";
import Cookies from "js-cookie";

let socket = null;

// Function to connect the socket
const connectSocket = () => {
  if (!socket || !socket.connected) {
    // Get the WebSocket URL from the environment variable

    // Get the token from the browser's cookies
    const token = Cookies.get("token");

    // Get the connect.sid from the browser's cookies
    const connectSid = Cookies.get("connect.sid");

    // Create the socket instance with authentication
    socket = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
      // autoConnect: true, // You can enable autoConnect here if needed
      auth: {
        token: token || "",
        SID: connectSid || "",
      },
    });
  }

  return socket;
};
// Function to check if the socket is connected
const isSocketConnected = (socket) => {
  return socket && socket.connected;
};

// Function to disconnect the socket
const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};

export { connectSocket, isSocketConnected, disconnectSocket };
