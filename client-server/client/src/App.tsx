import Navbar from "./layout/loggedOut/layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//Styles
import "./styles/App.css";

//Pages
import About from "./pages/about/about";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Register from "./pages/registration/register";
import Habits from "./pages/habits/habits";
import Dashboard from "./pages/dashboard/dashboard";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myhabits" element={<Habits />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </LocalizationProvider>
  );
};

export default App;
