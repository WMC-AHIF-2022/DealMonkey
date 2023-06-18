import React from "react";
import { useState, useEffect, useContext } from "react";
import Layout from "../../layout/loggedIn/layout";
import { fetchRestEndpoint } from "../../utils/client-server";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import SlidingPaneCom from "../../components/slidingPane";
import "react-toastify/dist/ReactToastify.css";
import HabitList from "../../components/habitList";
import dayjs, { Dayjs } from "dayjs";
import Form from "../../components/form";
import toast, { Toaster } from "react-hot-toast";
import SideNavigation from "../../components/sideNavigation";
import { useNavigate } from "react-router-dom";
import { getAllHabits, getDealById, addHabit } from "../../utils/data-utils";

import { toastHandler } from "../../components/deal";

interface HabitItem {
  id: number;
  title: string;
  frequency: string;
  reminder: string;
  category: string;
  color: string;
  userId: number;
}

const HabitPage = ({ socket }: any) => {
  let navigate = useNavigate();
  const auth = useAuthUser();
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [color, setColor] = useState("#fff");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [reminder, setReminder] = React.useState<Dayjs | null>(
    dayjs(new Date().toISOString())
  );

  const [deleteBtn, setDeleteBtn] = useState(false);
  const [saveBtn, setSaveBtn] = useState(true);
  const [updateBtn, setUpdateBtn] = useState(false);

  const habitOnClickHandler = () => {
    setSaveBtn(false);
    setDeleteBtn(true);
    setUpdateBtn(true);
  };

  const getHabits = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/habits/" + auth()?.id,
        "GET"
      );

      const data: HabitItem[] = await response.json();
      setHabits(data);
      console.log(data, auth()?.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/tasks/" + id,
        "DELETE"
      );

      toast.success("Habit deleted");
    } catch (error: any) {
      toast.error(error.message);
    }

    getHabits();
  };

  const updateHabit = async (habit: HabitItem) => {
    try {
      await fetchRestEndpoint("http://localhost:8000/api/habits", "PUT", habit);
      toast.success("Habit updated");
    } catch (error: any) {
      toast.error(error.message);
    }

    getHabits();
  };

  const onAdd = async (event: any) => {
    event.preventDefault();

    try {
      // make the API call
      let timeString: string = dayjs(reminder).toISOString();

      let hours = dayjs(reminder).get("hour") - new Date().getHours();
      let minutes = dayjs(reminder).get("minute") - new Date().getMinutes();
      let seconds = dayjs(reminder).get("seconds") - new Date().getSeconds();

      let totalSeconds: number = hours * 3600 + minutes * 60 + seconds;

      console.log(totalSeconds);

      const id = await addHabit(
        title,
        frequency,
        timeString,
        category,
        color,
        auth()?.id
      );
      toast.success("Habit created");

      if (totalSeconds > 0) {
        totalSeconds += totalSeconds + 24 * 3600;
        socket.emit("new habit", totalSeconds, title, id);
      }

      console.log(timeString);

      //Todo: clear form fields
    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      const response = await getAllHabits(auth()?.id);
      setHabits(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setFrequency("");
    setCategory("");
    setColor("#fff");
    setReminder(dayjs("2022-04-17T15:30"));
    setSaveBtn(true);
    setDeleteBtn(false);
    setUpdateBtn(false);
  };

  const sendDeal = () => {
    console.log("hello");
    socket.emit("new habit", 1, "Walk Tiger", 1);
  };

  useEffect(() => {
    // Subscribe to Socket.io events
    // Handle received event data

    socket.on("do habit", async (title: string, id: number) => {
      const deal = await getDealById(id);
      toastHandler(title, 11, id, navigate);
    });

    getHabits();

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("do habit");
    };
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-6 h-max">
        <SideNavigation />

        <div className="col-span-5 px-12 mt-4">
          <Toaster />
          <div className="">
            <HabitList
              habits={habits}
              setOpen={setOpen}
              setTitle={setTitle}
              setFrequency={setFrequency}
              setReminder={setReminder}
              setCategory={setCategory}
              setColor={setColor}
              habitOnClickHandler={habitOnClickHandler}
            />
            <div style={{ marginTop: "32px" }}>
              <button
                className="bg-red-400 rounded-lg hover:bg-red-500"
                onClick={() => {
                  setOpen(true);
                  resetForm();
                }}
              >
                Add Habit
              </button>

              <button
                className="bg-red-400 rounded-lg hover:bg-red-500"
                onClick={sendDeal}
              >
                Send Deal
              </button>
            </div>

            <SlidingPaneCom setOpen={setOpen} open={open}>
              <Form
                title={title}
                frequency={frequency}
                reminder={reminder}
                category={category}
                color={color}
                setTitle={setTitle}
                setFrequency={setFrequency}
                setReminder={setReminder}
                setCategory={setCategory}
                setColor={setColor}
                setHabits={setHabits}
                updateBtn={updateBtn}
                deleteBtn={deleteBtn}
                saveBtn={saveBtn}
                onDelete={deleteHabit}
                onUpdate={updateHabit}
                onAdd={onAdd}
              />
            </SlidingPaneCom>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HabitPage;
