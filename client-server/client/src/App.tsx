import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Styles
import "./styles/App.css";
import "./styles/Login.css";

//Pages
import About from "./pages/about/about";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/registration/register";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
