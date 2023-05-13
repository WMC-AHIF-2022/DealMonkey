import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RequireAuth from "react-auth-kit/dist/PrivateRoute";
import { Notifications } from "react-push-notification";

//Styles
import "./styles/App.css";

//Pages
import About from "./pages/about/about";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/registration/register";
import Habits from "./pages/habits/habitPage";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import Settings from "./pages/settings/settings";
import HabitPage from "./pages/habits/habitPage";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Notifications />
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
                  <HabitPage />
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
              path="/settings"
              element={
                <RequireAuth loginPath="/login">
                  <Settings />
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
