import "../styles/habit.css";

const Task = ({ onClickHandler, ...props }: any) => {
  const onClickTask = () => {
    onClickHandler(props.id);
  };

  return (
    <div>
      <div
        className="container flex justify-between"
        style={{ backgroundColor: props.color }}
      >
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: "1.3em" }}>
            {props.title}
          </h1>
          <p>{props.date}</p>
          <p>{props.frequency === "Day" ? "Daily" : ""}</p>
          <p>{props.frequency === "Month" ? "Once a Month" : ""}</p>
          <p>{props.frequency === "Week" ? "Once a Week" : ""}</p>
          <p>{props.category}</p>
        </div>

        <div
          onClick={onClickTask}
          className="w-5 h-5 rounded-lg bg-white self-center"
        ></div>
      </div>
    </div>
  );
};

export default Task;
