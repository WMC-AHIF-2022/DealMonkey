import { DB } from "../../database";
import { Progress } from "../interfaces/model";

export async function addProgress(userId: number) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare("INSERT INTO progress (userId, points, experience) VALUES (?1, ?2, ?3)");
    await stmt.bind({
      1: userId,
      2: 100,
      3: 0,
    });
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    if (
        typeof operationResult.changes !== "number" ||
        operationResult.changes !== 1
      ) {
        throw new Error("Username is already known");
      } else {
        userId = operationResult.lastID!;
      }
    
      console.log("progress done");
}