import "./home.css";
import { useNavigate } from "react-router-dom";
import Saly from "../../components/img/Saly-19.png";
import Layout from "../../layout/loggedOut/layout";

const Home = () => {
  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="h-max grid grid-cols-2 gap-4 content-center justify-center">
        <div>
          <h1 className="mainTitle">Welcome to DealMonkey</h1>
          <p className="subTitle">Develop good habits and improve your life</p>
          <button
            className="mt-10 bg-orange-400 rounded-md"
            onClick={() => routeChange("register")}
          >
            Try it for free
          </button>
        </div>
        <div className="sm: mt-20 lg:mt-0">
          <img id="logo" src={Saly} alt="logo"></img>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
