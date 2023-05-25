import io from "socket.io-client";

// Create the socket instance
const socketNew = io("wss://apibackend.gotiking.com", {
  autoConnect: true,
});

export default socketNew;
