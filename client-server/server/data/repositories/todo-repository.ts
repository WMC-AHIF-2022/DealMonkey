import { Todo } from "../interfaces/todo";
import { Task } from "../interfaces/task";
import { DB } from "../../database";
import { addTask, getAllTasks, updateTask } from "./task-repository";

export async function getAllTodos(userId: number): Promise<Todo[]> {
  const db = await DB.createDBConnection();

  const tasks = await getAllTasks(userId);
  const todos = await db.all<Todo[]>("SELECT * FROM todo");

  const userTodos: Todo[] = [];
  for (let i = 0; i < todos.length; i++) {
    for (let j = 0; j < tasks.length; j++) {
      if (tasks[j].userId === userId && todos[i].id === tasks[j].id) {
        userTodos.push({
          id: tasks[j].id,
          title: tasks[j].title,
          color: tasks[j].color,
          category: tasks[j].category,
          userId: tasks[j].userId,
          priority: todos[i].priority
        });
      }
    }
  }

  await db.close();
  return userTodos!;
}

export async function addTodo(task: Task, priority: string):Promise<Todo> {
  //adding task (parent) to get id
  const id = await addTask(task);

  //adding todo:
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("INSERT INTO todo VALUES (?1, ?2)");
  await stmt.bind({
    1: id,
    2: priority,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();

  await db.close();

  if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
    throw new Error("Could not add todo");
  } 

  //returning new todo
  const jsonString = JSON.stringify({id: id, priority: priority});
  return <Todo>JSON.parse(jsonString);
}

export async function updateTodo(task:Task, priority: string):Promise<Todo> {
  //updating task (parent)
  const id = await updateTask(task);

  //updating todo:
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("update todo set priority = ?2 where id = ?1");
  await stmt.bind({
    1: id,
    2: priority
  });

  await stmt.run();
  stmt.finalize();
  db.close();

  //returning new todo
  const jsonString = JSON.stringify({id: id, priority: priority});
  return <Todo>JSON.parse(jsonString);
}