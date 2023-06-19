import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RequireAuth from "react-auth-kit/dist/PrivateRoute";
import { useEffect, useState } from "react";
import { initializeSocket, getSocket } from "./utils/socket";

//Styles
import "./styles/App.css";
//Pages
import About from "./pages/about/about";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login";
import Register from "./pages/registration/register";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import Settings from "./pages/settings/settings";
import HabitPage from "./pages/habits/habitPage";
import TodoPage from "./pages/todos/todos";
import DealPage from "./pages/dealPage/dealPage";
import { SocketProvider } from "./SocketContext";
import { io } from "socket.io-client";
import { Socket } from "socket.io";
import Shop from "./pages/shop/shopPage";

let socket: any;

socket = io("http://localhost:8000", {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: Infinity, // Retry connection indefinitely
});

const App = () => {
  useEffect(() => {
    return () => {
      socket = io("http://localhost:8000", {
        reconnection: true, // Enable reconnection
        reconnectionAttempts: Infinity, // Retry connection indefinitely
      });
    };
  }, []);

  return (
    <SocketProvider url="http://localhost:8000">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/myhabits"
                element={
                  <RequireAuth loginPath="/login">
                    <HabitPage socket={socket} />
                  </RequireAuth>
                }
              />

              <Route
                path="/profile"
                element={
                  <RequireAuth loginPath="/login">
                    <Profile />
                  </RequireAuth>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <RequireAuth loginPath="/login">
                    <Dashboard />
                  </RequireAuth>
                }
              />

              <Route
                path="/todos"
                element={
                  <RequireAuth loginPath="/login">
                    <TodoPage />
                  </RequireAuth>
                }
              />

              <Route
                path="/dealPage"
                element={
                  <RequireAuth loginPath="/login">
                    <DealPage />
                  </RequireAuth>
                }
              />

              <Route
                path="/settings"
                element={
                  <RequireAuth loginPath="/login">
                    <Settings />
                  </RequireAuth>
                }
              />

              <Route
                path="/shop"
                element={
                  <RequireAuth loginPath="/login">
                    <Shop />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </Router>
      </LocalizationProvider>
      {/* Your application components */}
    </SocketProvider>
  );
};

export default App;
