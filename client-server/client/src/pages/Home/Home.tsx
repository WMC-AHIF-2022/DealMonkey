import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  return (
    /*<div className="Home font">
      <div className="h-max grid grid-cols-2 gap-4 content-center justify-center">
        <div className="ml-5">*/
    <div className="bg-white py-24 md:py-32 Home font">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 content-center justify-center">
        <div className="ml-5">
          <h1 className="mainTitle">Welcome to DealMonkey</h1>
          <p className="subTitle">Develop good habits and improve your life</p>
          <button
            className="mt-10 bg-orange-400 rounded-md"
            onClick={() => routeChange("register")}
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
