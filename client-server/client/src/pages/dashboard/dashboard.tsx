import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import { fetchRestEndpoint } from "../../utils/client-server";
import Layout from "../../layout/loggedIn/layout";
import Task from "../../components/task";
import SideNavigation from "../../components/sideNavigation";
import toast, { Toaster } from "react-hot-toast";

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
  const [tasks, setTasks] = useState<HabitItem[]>([]);

  const getTasks = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/taskQueue/" + auth()?.id,
        "GET"
      );

      const data: HabitItem[] = await response.json();
      setTasks(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
            {tasks.map((task: any) => {
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
            })}
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
