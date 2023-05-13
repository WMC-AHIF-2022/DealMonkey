import { Habit } from "../interfaces/habit";
import { DB } from "../../database";

export async function getAllHabits(): Promise<Habit[]> {
  const db = await DB.createDBConnection();
  const habits: Habit[] = await db.all<Habit[]>("SELECT * FROM habit");
  await db.close();
  return habits;
}

export async function addHabit(habit: Habit) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "INSERT INTO habit (TITLE, FREQUENCY, REMINDER, CATEGORY, COLOR, USERID) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
  );
  await stmt.bind({
    1: habit.title,
    2: habit.frequency,
    3: habit.reminder,
    4: habit.category,
    5: habit.color,
    6: habit.userId,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();
  await db.close();

  if (
    typeof operationResult.changes !== "number" ||
    operationResult.changes !== 1
  ) {
    throw new Error("Could not add habit");
  } else {
    habit.id = operationResult.lastID!;
  }
}

export async function deleteTable() {
  const db = await DB.createDBConnection();
  //await db.all("DROP FROM habit");
  await db.close();
}
