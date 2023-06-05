import io from "socket.io-client";

// Get the WebSocket URL from environment variable


// Create the socket instance
const socketNew = io(process.env.REACT_APP_CLIENT_BASEURL_WS, {
  autoConnect: true,
});

export default socketNew;
