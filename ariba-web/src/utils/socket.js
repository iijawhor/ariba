import { io } from "socket.io-client";
import { BASE_URL } from "./constants.js";

export const createSocketConnection = (token) => {
  return io(BASE_URL, {
    withCredentials: true,
    transports: ["websocket"],
    auth: {
      token: token // 👈 attach your JWT or session token here
    }
  });
};
