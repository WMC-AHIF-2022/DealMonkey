import { Database } from "sqlite3";
import { Avatar } from "../interfaces/model";
import { DB } from "../../database";

export async function getAllAvatars() {
    const db = await DB.createDBConnection();
    const avatars: Avatar[] = await db.all<Avatar[]>("SELECT * FROM avatar");
    await db.close();
    return avatars;
}

export async function insertAvatar(avatar:Avatar) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare("INSERT INTO avatar (link, name, price, unlockLevel) VALUES (?1, ?2, ?3, ?4)");
    await stmt.bind({
        1: avatar.link,
        2: avatar.name,
        3: avatar.price,
        4: avatar.unlockLevel
    });
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    if ( typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
        throw new Error("Could not add avatar");
      } else {
        avatar.avatarId = operationResult.lastID!;
      }
}