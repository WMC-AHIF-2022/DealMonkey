import React from "react"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    let navigate = useNavigate();
    const routeChange = (path: string) => {
      navigate(path);
    };

  return (
    <div className="Home font">
      <div className="h-max grid grid-cols-2 grid-rows-2 gap-4 content-center justify-center">
        <div className="ml-5">
          <div className="grid-cols-1">
            <button className="mt-10 bg-orange-400 rounded-md" onClick={() => routeChange("tasks")}>
                Tasks
            </button>
            <button className="mt-10 bg-orange-400 rounded-md" onClick={() => routeChange("progress")}>
                Progress
            </button>
          </div>
          <div>
            <button className="mt-10 bg-orange-400 rounded-md" onClick={() => routeChange("settings")}>
                Settings
            </button>
         
            <button className="mt-10 bg-orange-400 rounded-md" onClick={() => routeChange("habits")}>
                Habits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;