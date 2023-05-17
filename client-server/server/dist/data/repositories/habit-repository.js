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
exports.updateHabit = exports.deleteHabit = exports.addHabit = exports.getAllHabits = void 0;
const database_1 = require("../../database");
const task_repository_1 = require("./task-repository");
function getAllHabits(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const habits = yield db.all("SELECT * FROM habit");
        habits.filter(habit => habit.userId === userId);
        yield db.close();
        return habits;
    });
}
exports.getAllHabits = getAllHabits;
function addHabit(task, frequency, reminder) {
    return __awaiter(this, void 0, void 0, function* () {
        //adding task (parent) to get id
        const id = yield (0, task_repository_1.addTask)(task);
        //adding habit:
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO habit VALUES (?1, ?2, ?3)");
        yield stmt.bind({
            1: id,
            2: frequency,
            3: reminder,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("Could not add habit");
        }
        //returning new habit
        const jsonString = JSON.stringify({ id: id, frequency: frequency, reminder: reminder });
        return JSON.parse(jsonString);
    });
}
exports.addHabit = addHabit;
function deleteHabit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("delete from habit where id = ?1");
        yield stmt.bind({ 1: id });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
    });
}
exports.deleteHabit = deleteHabit;
function updateHabit(task, frequency, reminder) {
    return __awaiter(this, void 0, void 0, function* () {
        //updating task (parent)
        const id = yield (0, task_repository_1.updateTask)(task);
        //updating habit:
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("update habit set frequency = ?2, reminder = ?3 where id = ?1");
        yield stmt.bind({
            1: id,
            2: frequency,
            3: reminder,
        });
        const operationResult = yield stmt.run();
        stmt.finalize();
        db.close();
        //returning new habit
        const jsonString = JSON.stringify({ id: id, frequency: frequency, reminder: reminder });
        return JSON.parse(jsonString);
    });
}
exports.updateHabit = updateHabit;
