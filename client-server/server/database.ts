import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";

export const dbFileName: string = "database.db";

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
    await connection.run(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT,                
                birthdate TEXT,
                points INTEGER,
                level INTEGER,
                registrationDate TEXT
            ) `);
    await connection.run(`
            create table if not exists habit (
                id INTEGER NOT NULL PRIMARY KEY,
                title TEXT UNIQUE NOT NULL,
                frequency TEXT NOT NULL,
                reminder TEXT,
                category TEXT,
                color TEXT NOT NULL,
                userId INTEGER NOT NULL,
                FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
            ) strict;`);
    await connection.run(`
            create table if not exists setting(
               id INTEGER NOT NULL PRIMARY KEY,
               theme TEXT UNIQUE NOT NULL,
               userId INTEGER NOT NULL,
               FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
            ) strict;`);
    await connection.run(`
            create table if not exists deal(
               id INTEGER NOT NULL PRIMARY KEY,
               name TEXT NOT NULL,
               habitId INTEGER NOT NULL,
               type TEXT NOT NULL,
               FOREIGN KEY (habitId) REFERENCES habit (id) ON DELETE CASCADE
            ) strict;`);
  }
}
