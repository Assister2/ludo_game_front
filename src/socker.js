import io from "socket.io-client";

// Create the socket instance
const socketNew = io("http://139.59.30.151:4002", {
  autoConnect: true,
});

export default socketNew;
