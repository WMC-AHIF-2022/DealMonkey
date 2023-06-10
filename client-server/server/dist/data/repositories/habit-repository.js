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
exports.updateHabit = exports.addHabit = exports.getAllHabits = void 0;
const database_1 = require("../../database");
const task_repository_1 = require("./task-repository");
const deal_repository_1 = require("./deal-repository");
function getAllHabits(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const tasks = yield (0, task_repository_1.getAllTasks)(userId);
        const habits = yield db.all("SELECT * FROM habit");
        const userHabits = [];
        for (let i = 0; i < habits.length; i++) {
            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j].userId === userId && habits[i].id === tasks[j].id) {
                    userHabits.push({
                        id: tasks[j].id,
                        title: tasks[j].title,
                        color: tasks[j].color,
                        category: tasks[j].category,
                        userId: tasks[j].userId,
                        frequency: habits[i].frequency,
                        reminder: habits[i].reminder,
                    });
                }
            }
        }
        yield db.close();
        return userHabits;
    });
}
exports.getAllHabits = getAllHabits;
function addHabit(task, frequency, reminder) {
    return __awaiter(this, void 0, void 0, function* () {
        //adding task (parent) to get id
        const id = yield (0, task_repository_1.addTask)(task);
        console.log("created parent task for habit");
        //adding deal for this habit:
        yield (0, deal_repository_1.addDeal)(id);
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
        const jsonString = JSON.stringify({
            id: id,
            frequency: frequency,
            reminder: reminder,
        });
        return JSON.parse(jsonString);
    });
}
exports.addHabit = addHabit;
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
        const jsonString = JSON.stringify({
            id: id,
            frequency: frequency,
            reminder: reminder,
        });
        return JSON.parse(jsonString);
    });
}
exports.updateHabit = updateHabit;
