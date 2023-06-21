import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";
import { getAllAvatars, insertAvatar } from "./data/repositories/avatar-repository";
import { Avatar } from "./data/interfaces/model";

export const dbFileName: string = "./database.db";

export class DB {
  public static async createDBConnection(): Promise<Database> {
    const dbConnection = await open({
      filename: `./${dbFileName}`,
      driver: Driver,
    });
    await DB.ensureTablesCreated(dbConnection);
    return dbConnection;
  }

  public static async createAvatars() {
    const avatarsOfTable = await getAllAvatars();
    if(avatarsOfTable.length !== 0) {
      return; //avatare sind schon in der tabelle
    }

    const avatars = [
      ["/data/img/monkey-glasses.jpg", "Monkey with Glasses", 100, 1],
      ["/data/img/wild-monkey.jpg", "Wild Monkey", 150, 1],
      ["/data/img/donkey-kong-veryHard.jpg", "Donkey Kong", 275, 1],
      ["/data/img/evil.jpeg", "Evil Monkey", 325, 2],
      ["/data/img/donkey-kong.jpg", "Donkey Kong", 390, 2],
      ["/data/img/praying-monkey.png", "Shocked Monkey", 430, 3],
      ["/data/img/gangsta-monkey.png", "Gangsta Monkey", 450, 3],
      ["/data/img/grandpa-monkey.jpg", "Grandpa Monkey", 500, 4],
      ["/data/img/kim&kanye.jpeg", "Kim & Kanye", 550, 4],
      ["/data/img/looting-cat.jpeg", "Looting Cat", 600, 5],
      ["/data/img/material-gworl.jpeg", "Material Gworl", 625, 5],
      ["/data/img/running-baby.png", "Running Baby", 650, 5],
      ["/data/img/walking-minion.jpeg", "Walking Minion", 700, 6],
    ];

    for (const avatar of avatars) {
      const link = avatar.at(0)!.toString();
      const name = avatar.at(1)!.toString();
      const price = Number.parseInt(avatar.at(2)!.toString());
      const unlockLevel = Number.parseInt(avatar.at(3)!.toString());

      const newAvatar: Avatar = {
        avatarId: -1,
        link: link,
        name: name,
        price: price,
        unlockLevel: unlockLevel,
      };

      await insertAvatar(newAvatar);
    }
  }

  private static async ensureTablesCreated(
    connection: Database
  ): Promise<void> {
    await connection.run(`PRAGMA foreign_keys = ON`);
    await connection.run(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT,                
                birthdate TEXT,
                registrationDate TEXT
            ) `);
    await connection.run(`
            create table if not exists setting (
               id INTEGER PRIMARY KEY,
               theme TEXT NOT NULL,
               userId INTEGER NOT NULL,
               userProfile TEXT NOT NULL,
               FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
            )`);
    await connection.run(`
            create table if not exists task (
              id INTEGER PRIMARY KEY,
              title TEXT NOT NULL,
              category TEXT,
              color TEXT NOT NULL,
              userId INTEGER NOT NULL,
              FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
            )`);
    await connection.run(`
            create table if not exists deal (
               id INTEGER PRIMARY KEY,
               taskId INTEGER NOT NULL,
               points INTEGER NOT NULL,
               FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE
            )`);
    await connection.run(`
            create table if not exists todo (
                id INTEGER,
                priority TEXT NOT NULL,
                FOREIGN KEY (id) REFERENCES task(id) ON DELETE CASCADE
            )`);
    await connection.run(`
            create table if not exists habit (
              id INTEGER,
              frequency TEXT NOT NULL,
              reminder TEXT,
              FOREIGN KEY (id) REFERENCES task(id) ON DELETE CASCADE
          )`);
    await connection.run(`
            create table if not exists statistic (
              userId INTEGER,
              currentStreak INTEGER,
              highestStreak INTEGER,
              pointsMultiplier INTEGER,
              FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
          )`);
    await connection.run(`
          create table if not exists progress (
            userId INTEGER NOT NULL,
            points INTEGER NOT NULL,
            experience INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
        )`);
    await connection.run(`
        create table if not exists userAvatars (
          avatarId INTERGER NOT NULL,
          userId INTEGER NOT NULL,
          FOREIGN KEY (avatarId) REFERENCES avatar(avatarId) ON DELETE CASCADE,
          FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      )`);

    await connection.run(`
      create table if not exists avatar (
        avatarId INTERGER PRIMARY KEY,
        link TEXT NOT NULL,
        name TEXT,
        price INTEGER NOT NULL,
        unlockLevel INTEGER NOT NULL
    )`);

    await connection.run(`
      create table if not exists taskQueue(
        userId INTEGER NOT NULL,
        taskId INTEGER NOT NULL,
        completed INTEGER default 0,
        dateOfCompletion TEXT,
        FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )`);
  }
}
