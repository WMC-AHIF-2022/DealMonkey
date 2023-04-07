import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { Task } from "@/server/task-repository";

export default function ListTodo() {
  const [todos, setTodos] = useState<Task[]>([]);

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const jsonData = await res.json();
      setTodos(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }

    return todos;
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main>
      <div>
        {todos.map((todo) => (
          <tr>{todo.action}</tr>
        ))}
      </div>
    </main>
  );
}
