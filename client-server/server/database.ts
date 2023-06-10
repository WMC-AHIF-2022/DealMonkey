import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";

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
               name TEXT NOT NULL,
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
        create table if not exists avatar (
          avatarId INTERGER PRIMARY KEY,
          link TEXT NOT NULL,
          name TEXT,
          preis INTEGER NOT NULL,
          unlockLevel INTEGER NOT NULL
      )`);
    await connection.run(`
        create table if not exists userAvatars (
          avatarId INTERGER NOT NULL,
          userId INTEGER NOT NULL,
          FOREIGN KEY (avatarId) REFERENCES avatar(avatarId) ON DELETE CASCADE,
          FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      )`);
  }
}
