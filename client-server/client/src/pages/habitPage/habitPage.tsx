import Habit from "../../components/habit";
import AddTask from "../../components/addTask";
import Form from "../../components/form";
import { useState } from "react";
import Layout from "../../layout/layout";

const HabitPage = () => {
  return (
    <Layout>
      <div className="">
        <Habit
          title="My Habit"
          date="2022-3-12"
          category="Private"
          color="#fec89a"
        />
        <Form />
      </div>
    </Layout>
  );
};

export default HabitPage;
