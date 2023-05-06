import "./home.css";
import { useNavigate } from "react-router-dom";
import Saly from "../../components/img/Saly-19.png";
import Footer from "../../components/footer";

const Home = () => {
  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="font mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="h-max grid grid-cols-2 gap-4 content-center justify-center">
          <div>
            <h1 className="mainTitle">Welcome to DealMonkey</h1>
            <p className="subTitle">
              Develop good habits and improve your life
            </p>
            <button
              className="mt-10 bg-orange-400 rounded-md"
              onClick={() => routeChange("register")}
            >
              Try it for free
            </button>
          </div>
          <div>
            <img id="logo" src={Saly} alt="logo"></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
