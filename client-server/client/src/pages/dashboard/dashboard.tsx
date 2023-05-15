import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/loggedIn/layout";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import "./dashboard.css";
import { fetchRestEndpoint } from "../../utils/client-server";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import Habit from "../../components/habit";

interface HabitItem {
  id: number;
  title: string;
  frequency: string;
  reminder: string;
  category: string;
  color: string;
  userId: number;
}

const Dashboard = () => {
  const auth = useAuthUser();
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [progress, setProgress] = useState(50);

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  const getHabits = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/habits/" + auth()?.id,
        "GET"
      );

      const data: HabitItem[] = await response.json();
      setHabits(data);
    } catch (error: any) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getHabits();
  }, []);

  return (
    <Layout>
      {/*}
      <div> 
        {habits.map((habit) => {
          return new Date(habit.reminder).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) ===
            new Date().toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }) ? (
            <Habit title={habit.title} />
          ) : (
            ""
          );
        })}
      </div>
      */}
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
            onClick={() => routeChange("settings")}
          >
            Settings
          </button>
        </div>
        <div>
          <button
            className="mt-10 bg-red-400 rounded-md mainBtn"
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
