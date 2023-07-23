// socketReducer.js

const initialState = {
  instance: null,
  isConnected: false,
  error: null,
};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SOCKET_CONNECTED":
      return {
        ...state,
        instance: action.payload,
        isConnected: true,
        error: null,
      };
    case "SOCKET_CONNECTION_FAILED":
      return {
        ...state,
        instance: null,
        isConnected: false,
        error: action.payload,
      };
    case "SOCKET_DISCONNECTED":
      return {
        ...state,
        instance: null,
        isConnected: false,
        error: null,
      };
    case "SOCKET_DATA_RECEIVED":
      // Handle data received from the socket, if needed
      return state;
    // Add more cases for other socket-related actions, if needed
    // For example: case 'SOCKET_SEND_DATA':
    //               return state;
    default:
      return state;
  }
};
