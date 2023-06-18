import { Task, TaskQueue } from "../interfaces/model";
import { DB } from "../../database";
import { getAllTasks } from "./task-repository";

export async function getAllTasksFromQueue(userId: number): Promise<Task[]> {
  const tasksToday: Task[] = [];

  const db = await DB.createDBConnection();
  const taskQueue = await db.all<TaskQueue[]>("SELECT * FROM taskQueue");
  await db.close();

  const tasks: Task[] = await getAllTasks(userId);

  for (let taskQ of taskQueue) {
    for (let task of tasks) {
      if (taskQ.taskId === task.id && taskQ.completed === 0) {
        tasksToday.push(task);
      }
    }
  }

  return tasksToday;
}

export async function getAllTasksFromQueueCompleted(
  userId: number
): Promise<TaskQueue[]> {
  const db = await DB.createDBConnection();
  const taskQueue = await db.all<TaskQueue[]>(
    "SELECT * FROM taskQueue where completed=1"
  );

  taskQueue.filter((taskQueueItem) => taskQueueItem.userId === userId);
  await db.close();

  return taskQueue;
}

export async function addTaskToQueue(taskId: number, userId: number) {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare(
    "INSERT INTO taskQueue (taskId, userId) VALUES (?1, ?2)"
  );
  await stmt.bind({
    1: taskId,
    2: userId,
  });

  await stmt.run();
  await stmt.finalize();

  await db.close();
}

export async function updateTaskQueue(taskId: number, completed: number) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "update taskQueue set completed = ?1, dateOfCompletion = ?2 where taskId = ?3"
  );
  await stmt.bind({
    1: completed,
    2: new Date().toISOString(),
    3: taskId,
  });

  await stmt.run();
  await stmt.finalize();

  await db.close();
}
