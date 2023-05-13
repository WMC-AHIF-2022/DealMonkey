import react from "react";
import "../styles/habit.css";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const Habit = ({
  setOpen,
  setTitle,
  setReminder,
  setCategory,
  setColor,
  setFrequency,
  onClickHandler,
  ...props
}: any) => {
  return (
    <div>
      <div
        onClick={() => {
          setTitle(props.title);
          setFrequency(props.frequency);
          setColor(props.color);
          setReminder(dayjs(props.reminder));
          setCategory(props.category);
          setOpen(true);
          onClickHandler();
          localStorage.setItem("currHabitId", props.id);
        }}
        className="container"
        style={{ backgroundColor: props.color }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "1.3em" }}>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.frequency == "Day" ? "Daily" : ""}</p>
        <p>{props.frequency == "Month" ? "Once a Month" : ""}</p>
        <p>{props.frequency == "Week" ? "Once a Week" : ""}</p>
        <p>{props.category}</p>
      </div>
    </div>
  );
};

export default Habit;
