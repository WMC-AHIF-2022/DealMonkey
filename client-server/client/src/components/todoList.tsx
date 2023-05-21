import React from "react";
import Todo from "./todo";

const TodoList = ({
  todos,
  setOpen,
  setTitle,
  setPriority,
  setCategory,
  setColor,
  habitOnClickHandler,
}: any) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {todos.map((todo: any) => {
        return (
          <div key={todo.id}>
            <Todo
              id={todo.id}
              userId={todo.userId}
              title={todo.title}
              category={todo.category}
              color={todo.color}
              priority={todo.priority}
              setOpen={setOpen}
              setTitle={setTitle}
              setCategory={setCategory}
              setPriority={setPriority}
              setColor={setColor}
              onClickHandler={habitOnClickHandler}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
