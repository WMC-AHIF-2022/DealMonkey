import React from "react";
import Habit from "../../components/habit";
import { useState, useEffect } from "react";
import Layout from "../../layout/loggedIn/layout";
import { fetchRestEndpoint } from "../../utils/client-server";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import SlidingPaneCom from "../../components/slidingPane";
import "react-toastify/dist/ReactToastify.css";
import addNotification from "react-push-notification";
import logo from "../../img/logo-white.png";
import HabitList from "../../components/habitList";
import dayjs, { Dayjs } from "dayjs";
import Form from "../../components/form";
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

const HabitPage = () => {
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

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <Layout>
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
            className="bg-red-400 rounded-lg"
            onClick={() => {
              setOpen(true);
              resetForm();
            }}
          >
            Add Habit
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
          />
        </SlidingPaneCom>
      </div>
    </Layout>
  );
};

export default HabitPage;
