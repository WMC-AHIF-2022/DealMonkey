import { Database as Driver } from "sqlite3";
import { open, Database } from "sqlite";

export const dbFileName = "todos.db";

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
    await connection.run(
      `create table if not exists Todos(
            id INTEGER NOT NULL PRIMARY KEY,
            action TEXT NOT NULL,
            done INTEGER default false
        )`
    );
  }
}
