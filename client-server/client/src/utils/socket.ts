import { io, Socket } from "socket.io-client";

import axios from "axios";

let socket: Socket | null = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8000"); // Replace with your server URL
  }

  const socketToken = Math.random().toString(36).substring(7); // Generate a unique token

  localStorage.setItem("socketToken", socketToken); // Store the token in localStorage
  socket.emit("authenticate", socketToken); // Send the token to the server for authentication
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket has not been initialized.");
  }
  return socket;
};

const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your desired URL
});

export default api;
