import "../styles/habit.css";
import dayjs from "dayjs";

const Task = ({
  setOpen,
  setTitle,
  setCategory,
  setColor,
  onClickHandler,
  ...props
}: any) => {
  return (
    <div>
      <div
        onClick={() => {
          setTitle(props.title);
          setColor(props.color);
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
        <p>{props.frequency === "Day" ? "Daily" : ""}</p>
        <p>{props.frequency === "Month" ? "Once a Month" : ""}</p>
        <p>{props.frequency === "Week" ? "Once a Week" : ""}</p>
        <p>{props.category}</p>
      </div>
    </div>
  );
};

export default Task;
