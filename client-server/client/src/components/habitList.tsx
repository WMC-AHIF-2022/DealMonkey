import React from "react";
import Habit from "./habit";

const HabitList = ({
  habits,
  setOpen,
  setTitle,
  setFrequency,
  setReminder,
  setCategory,
  setColor,
  habitOnClickHandler,
}: any) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {habits.map((habit: any) => {
        return (
          <div key={habit.id}>
            <Habit
              id={habit.id}
              userId={habit.userId}
              frequency={habit.frequency}
              title={habit.title}
              category={habit.category}
              color={habit.color}
              reminder={habit.reminder}
              setOpen={setOpen}
              setTitle={setTitle}
              setFrequency={setFrequency}
              setCategory={setCategory}
              setReminder={setReminder}
              setColor={setColor}
              onClickHandler={habitOnClickHandler}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HabitList;
