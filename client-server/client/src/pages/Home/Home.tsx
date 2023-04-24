import { useState, ChangeEvent, FormEvent } from "react";
import saly from "./img/Saly-16.png";
import "./home.css";

const Home = () => {
  return (
    <div className="Home font">
      <h1 className="mainTitle">Welcome to DealMonkey</h1>
      <p className="subTitle">Develop good habits and improve your life</p>
      <button>Try it for free</button>
      <img id="saly" src={saly} alt="Saly"></img>
    </div>
  );
};

export default Home;
