import Habit from "../../components/habit";
import AddTask from "../../components/addTask";
import Form from "../../components/form";
import { useState, useEffect } from "react";
import Layout from "../../layout/loggedIn/layout";
import { useAuthUser } from "react-auth-kit";
import { fetchRestEndpoint } from "../../utils/client-server";

interface HabitItem {
  id: number;
  title: string;
  frequency: string;
  reminder: string;
  category: string;
  color: string;
  userId: number;
}

const Habits = () => {
  const auth = useAuthUser();
  const [habits, setHabits] = useState<any>([]);

  const getHabits = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/habits",
        "GET"
      );

      const data: any = await response.json();
      setHabits(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <Layout>
      <div className="">
        {habits.map((habit: any) => {
          return (
            <Habit
              key={habit.id}
              title={habit.title}
              category={habit.category}
              color={habit.color}
            />
          );
        })}
        <Form setHabits={setHabits} />
      </div>
    </Layout>
  );
};

export default Habits;
