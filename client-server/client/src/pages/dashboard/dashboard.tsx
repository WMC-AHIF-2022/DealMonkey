import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/loggedIn/layout";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./dashboard.css";

const Dashboard = () => {
  const [progress, setProgress] = React.useState(50);

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
        <div className="mt-6">
        <h3>Level 01</h3>
        <Box sx={{ width: "100%", color: "#FF0000" }}>
          <LinearProgress variant="buffer" value={progress} />
        </Box>
      </div>
      <div className="h-max grid grid-cols-2 grid-rows-2 gap-2 content-center justify-center">
        <div>
          <button
            className="mt-10 bg-green-400 rounded-md mainBtn"
            id="btn-id-1"
            onClick={() => routeChange("tasks")}
          >
            Tasks
          </button>
        </div>
        <div>
          <button
            className="mt-10 bg-orange-400 rounded-md mainBtn"
            onClick={() => routeChange("progress")}
          >
            Progress
          </button>
        </div>
        <div>
          <button
            className="mt-10 bg-violet-400 rounded-md mainBtn"
            id="btn-id-3"
            onClick={() => routeChange("settings")}
          >
            Settings
          </button>
        </div>
        <div>
          <button
            className="mt-10 bg-red-400 rounded-md mainBtn"
            id="btn-id-2"
            onClick={() => routeChange("../myhabits")}
          >
            Habits
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;