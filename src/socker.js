import io from "socket.io-client";

// Create the socket instance
const socketNew = io("http://localhost:4002", {
  autoConnect: true,
});

export default socketNew;
