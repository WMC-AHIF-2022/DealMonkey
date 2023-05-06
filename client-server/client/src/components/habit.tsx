import react from "react";
import "../styles/habit.css";

const Habit = (props: any) => {
  return (
    <div>
      <div
        className="container"
        style={{ backgroundColor: props.color, color: "#ffffff" }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "1.3em" }}>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.category}</p>
      </div>
    </div>
  );
};

export default Habit;
