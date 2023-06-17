import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import { fetchRestEndpoint } from "../../utils/client-server";
import Layout from "../../layout/loggedIn/layout";
import Task from "../../components/task";
import SideNavigation from "../../components/sideNavigation";
import toast, { Toaster } from "react-hot-toast";

import Relax from "../../img/relax.png";
import { getAllHabits } from "../../utils/data-utils";
import { getDealById } from "../../utils/data-utils";

import { toastHandler } from "../../components/deal";
import { useNavigate } from "react-router-dom";

interface HabitItem {
  id: number;
  title: string;
  frequency: string;
  reminder: string;
  category: string;
  color: string;
  userId: number;
}

const Dashboard = ({ socket }: any) => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<HabitItem[]>([]);

  const getTasks = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/taskQueue/" + auth()?.id,
        "GET"
      );

      const data: HabitItem[] = await response.json();

      const habitData: HabitItem[] = await getAllHabits(auth()?.id);

      for (let habit of habitData) {
        for (let task of data) {
          if (habit.id === task.id) {
            task.reminder = habit.reminder;
            task.frequency = task.frequency;
          }
        }
      }

      console.log(data);

      setTasks(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTasks();

    socket.on("do habit", async (title: string, id: number) => {
      const deal = await getDealById(id);
      toastHandler(title, deal.points, id, navigate);
    });
  }, [socket]);

  const onClickHandler = async (taskId: number) => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/taskQueue/" + taskId,
        "PUT",
        JSON.parse(`{"completed": "${1}"}`)
      );

      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
    toast.success("Habit completed");
  };

  return (
    <Layout>
      <div className="grid grid-cols-6 h-max">
        <SideNavigation />

        <div className="col-span-5 px-12 mt-4">
          <div className="grid grid-cols-3 gap-1">
            {tasks.length > 0 ? (
              tasks.map((task: any) => {
                return (
                  <div key={task.id}>
                    <Task
                      id={task.id}
                      userId={task.userId}
                      title={task.title}
                      category={task.category}
                      color={task.color}
                      onClickHandler={onClickHandler}
                    />
                  </div>
                );
              })
            ) : (
              <div className="ml-56 text-center h-4/6 w-96 self-center justify-center">
                <h1 className="text-gray-400">
                  You have completed all Tasks for today
                </h1>
                <img src={Relax} alt="relax" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

/*import React, { useEffect, useState } from "react";
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
  const [progress, setProgress] = useState(30);

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
      <div className="mt-6">
        <h3>Level 01</h3>
        <Box sx={{ width: "100%", color: "#ff0000" }}>
          <LinearProgress variant="buffer" value={progress} />
        </Box>
      </div>
      <div className="h-max grid grid-cols-2 grid-rows-2 gap-2 content-center justify-center">
        <div>
          <button
            className="mt-10 bg-orange-500 rounded-md mainBtn"
            id="btn-id-1"
            onClick={() => routeChange("../todos")}
          >
            Todos
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
            className="mt-10 bg-orange-200 rounded-md mainBtn"
            id="btn-id-3"
            onClick={() => routeChange("settings")}
          >
            Settings
          </button>
        </div>
        <div>
          <button
            className="mt-10 bg-orange-300 rounded-md mainBtn"
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
*/
