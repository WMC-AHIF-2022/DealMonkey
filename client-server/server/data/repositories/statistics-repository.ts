import { Statistic } from "../interfaces/model";
import { DB } from "../../database";
import { json } from "stream/consumers";

export async function addStatistics(statistic: Statistic) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "INSERT INTO statistic (userId, currentStreak, highestStreak, pointsMultiplier) VALUES (?1, ?2, ?3, ?4)"
  );
  await stmt.bind({
    1: statistic.userId,
    2: statistic.currentStreak,
    3: statistic.highestStreak,
    4: statistic.pointsMultiplier,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();
  await db.close();

  if (
    typeof operationResult.changes !== "number" ||
    operationResult.changes !== 1
  ) {
    throw new Error("The statistic could not be added");
  }

  console.log("done");
}

export async function getStatisticById(
  userId: number
): Promise<Statistic | undefined> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(`SELECT * FROM statistic WHERE userId = ?1`);
  await stmt.bind({ 1: userId });
  const statistic: Statistic | undefined = await stmt.get<Statistic>();
  await stmt.finalize();
  await db.close();
  return statistic;
}

export async function updateStatistic(statistic: Statistic) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "UPDATE statistic set currentStreak = ?1, highestStreak = ?2, pointsMultiplier = ?3 where userId = ?4"
  );
  await stmt.bind({
    1: statistic.currentStreak,
    2: statistic.highestStreak,
    3: statistic.pointsMultiplier,
    4: statistic.userId,
  });
  const operationResult = await stmt.run();
  stmt.finalize();
  db.close();

  const jsonString = JSON.stringify({
    userId: statistic.userId,
    currentStreak: statistic.currentStreak,
    highestStrek: statistic.highestStreak,
    pointsMultiplier: statistic.pointsMultiplier,
  });
  return <Statistic>JSON.parse(jsonString);
}
