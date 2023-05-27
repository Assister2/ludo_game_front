import io from "socket.io-client";

// Create the socket instance
const socketNew = io("ws://localhost:4001", {
  autoConnect: true,
});

export default socketNew;
