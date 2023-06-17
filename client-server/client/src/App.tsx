import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RequireAuth from "react-auth-kit/dist/PrivateRoute";
import { io } from "socket.io-client";

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

const socket: any = io("http://localhost:8000");

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login socket={socket} />} />
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
                  <Profile socket={socket} />
                </RequireAuth>
              }
            />

            <Route
              path="/dashboard"
              element={
                <RequireAuth loginPath="/login">
                  <Dashboard socket={socket} />
                </RequireAuth>
              }
            />

            <Route
              path="/todos"
              element={
                <RequireAuth loginPath="/login">
                  <TodoPage socket={socket} />
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
                  <Settings socket={socket} />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
};

export default App;
