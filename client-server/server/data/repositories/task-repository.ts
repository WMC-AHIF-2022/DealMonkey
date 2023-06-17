import { Task } from "../interfaces/model";
import { DB } from "../../database";
import { addTaskToQueue } from "./taskQueue-repository";

export async function getAllTasks(userId: number): Promise<Task[]> {
  const db = await DB.createDBConnection();

  const userTasks: Task[] = [];
  const tasks = await db.all<Task[]>("SELECT * FROM task");

  for (const task of tasks) {
    if (task.userId === userId) {
      userTasks.push(task);
    }
  }

  await db.close();
  return userTasks!;
}

export async function getAllTasksToday(userId: number): Promise<Task[]> {
  const db = await DB.createDBConnection();

  const userTasks: Task[] = [];

  const tasks = await db.all<Task[]>("SELECT * FROM task");

  for (const task of tasks) {
    if (task.userId === userId) {
      userTasks.push(task);
    }
  }

  await db.close();
  return userTasks!;
}

export async function getTaskById(taskId: number): Promise<Task | undefined> {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("select * from task where id = ?1");
  await stmt.bind({ 1: taskId });
  const task = await stmt.get<Task>();

  await stmt.finalize();
  await db.close();

  return task;
}

export async function addTask(task: Task): Promise<number> {
  //add parent task (to create id for corresponding habit OR todo)
  const db = await DB.createDBConnection();

  const stmt = await db.prepare(
    "INSERT INTO task (TITLE, CATEGORY, COLOR, USERID) VALUES (?1, ?2, ?3, ?4)"
  );
  await stmt.bind({
    1: task.title,
    2: task.category,
    3: task.color,
    4: task.userId,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();

  await db.close();

  if (
    typeof operationResult.changes !== "number" ||
    operationResult.changes !== 1
  ) {
    throw new Error("Could not add task");
  } else {
    task.id = operationResult.lastID!;
  }

  await addTaskToQueue(task.id, task.userId);

  return task.id;
}

export async function deleteTask(id: number) {
  //löscht den task aus der parent tabelle und den dazugehörigen todo / habit -> wegen on delete cascade
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("delete from task where id = ?1");
  await stmt.bind({ 1: id });
  await stmt.run();

  await stmt.finalize();
  await db.close();
}

export async function updateTask(task: Task): Promise<number> {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare(
    "update task set title = ?1, category = ?2, color = ?3 where id = ?4"
  );
  await stmt.bind({
    1: task.title,
    2: task.category,
    3: task.color,
    4: task.id,
  });
  await stmt.run();

  stmt.finalize();
  db.close();

  return task.id;
}
