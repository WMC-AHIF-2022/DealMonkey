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
exports.deleteTable = exports.addHabit = exports.getAllHabits = void 0;
const database_1 = require("../../database");
function getAllHabits() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const habits = yield db.all("SELECT * FROM habit");
        yield db.close();
        return habits;
    });
}
exports.getAllHabits = getAllHabits;
function addHabit(habit) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO habit (TITLE, FREQUENCY, REMINDER, CATEGORY, COLOR, USERID) VALUES (?1, ?2, ?3, ?4, ?5, ?6)");
        yield stmt.bind({
            1: habit.title,
            2: habit.frequency,
            3: habit.reminder,
            4: habit.category,
            5: habit.color,
            6: habit.userId,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("Could not add habit");
        }
        else {
            habit.id = operationResult.lastID;
        }
    });
}
exports.addHabit = addHabit;
function deleteTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        //await db.all("DROP FROM habit");
        yield db.close();
    });
}
exports.deleteTable = deleteTable;
