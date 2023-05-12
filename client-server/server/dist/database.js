"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.dbFileName = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
exports.dbFileName = "database.db";
class DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, sqlite_1.open)({
                filename: `./${exports.dbFileName}`,
                driver: sqlite3_1.Database,
            });
            yield DB.ensureTablesCreated(dbConnection);
            return dbConnection;
        });
    }
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`
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
            yield connection.run(`
            create table if not exists habit (
                id INTEGER NOT NULL PRIMARY KEY,
                title TEXT UNIQUE NOT NULL,
                frequency TEXT NOT NULL,
                reminder TEXT,
                category TEXT,
                color TEXT NOT NULL,
            ) strict;`);
        });
    }
}
exports.DB = DB;
