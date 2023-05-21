import "../styles/habit.css";

const Todo = ({
  setOpen,
  setTitle,
  setCategory,
  setColor,
  setPriority,
  onClickHandler,
  ...props
}: any) => {
  return (
    <div>
      <div
        onClick={() => {
          setTitle(props.title);
          setPriority(props.priority);
          setColor(props.color);
          setCategory(props.category);
          setOpen(true);
          onClickHandler();
          localStorage.setItem("currTodoId", props.id);
        }}
        className="container"
        style={{ backgroundColor: props.color }}
      >
        <h1 style={{ fontWeight: "bold", fontSize: "1.3em" }}>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.priority === "Easy" ? "Easy" : ""}</p>
        <p>{props.priority === "Medium" ? "Medium" : ""}</p>
        <p>{props.priority === "Hard" ? "Hard" : ""}</p>
        <p>{props.category}</p>
      </div>
    </div>
  );
};

export default Todo;
