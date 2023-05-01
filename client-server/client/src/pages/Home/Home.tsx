import { useState, ChangeEvent, FormEvent } from "react";
import saly from "./img/Saly-16.png";
import abstractShape from "./img/abstract-shape 1.png";
import logo from "./img/logo.png";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `login`;
    navigate(path);
  };

  return (
    <div className="Home font">
      <div className="h-max grid grid-cols-2 gap-4 content-center justify-center">
        <div className="ml-5">
          <h1 className="mainTitle">Welcome to DealMonkey</h1>
          <p className="subTitle">Develop good habits and improve your life</p>
          <button
            className="mt-10 bg-orange-400 rounded-md"
            onClick={routeChange}
          >
            Try it for free
          </button>
        </div>
        <div>{/*<img id="logo" src={logo} alt="logo"></img> */}</div>
      </div>
    </div>
  );
};

export default Home;