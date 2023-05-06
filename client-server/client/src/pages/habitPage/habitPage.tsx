import Habit from "../../components/habit";
import AddTask from "../../components/addTask";
import Form from "../../components/form";
import { useState } from "react";
import LayoutOne from "../../layout/layoutOne";

const HabitPage = () => {
  return (
    <LayoutOne>
      <div className="">
        <Habit
          title="My Habit"
          date="2022-3-12"
          category="Private"
          color="#fec89a"
        />
        <Form />
      </div>
    </LayoutOne>
  );
};

export default HabitPage;
