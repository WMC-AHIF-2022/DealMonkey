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
exports.updateTaskQueue = exports.addTaskToQueue = exports.getAllTasksFromQueueCompleted = exports.getAllTasksFromQueue = void 0;
const database_1 = require("../../database");
const task_repository_1 = require("./task-repository");
function getAllTasksFromQueue(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasksToday = [];
        const db = yield database_1.DB.createDBConnection();
        const taskQueue = yield db.all("SELECT * FROM taskQueue");
        yield db.close();
        const tasks = yield (0, task_repository_1.getAllTasks)(userId);
        for (let taskQ of taskQueue) {
            for (let task of tasks) {
                if (taskQ.taskId === task.id && taskQ.completed === 0) {
                    tasksToday.push(task);
                }
            }
        }
        return tasksToday;
    });
}
exports.getAllTasksFromQueue = getAllTasksFromQueue;
function getAllTasksFromQueueCompleted(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const taskQueue = yield db.all("SELECT * FROM taskQueue where completed=1");
        taskQueue.filter((taskQueueItem) => taskQueueItem.userId === userId);
        yield db.close();
        return taskQueue;
    });
}
exports.getAllTasksFromQueueCompleted = getAllTasksFromQueueCompleted;
function addTaskToQueue(taskId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO taskQueue (taskId, userId) VALUES (?1, ?2)");
        yield stmt.bind({
            1: taskId,
            2: userId,
        });
        yield stmt.run();
        yield stmt.finalize();
        yield db.close();
    });
}
exports.addTaskToQueue = addTaskToQueue;
function updateTaskQueue(taskId, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("update taskQueue set completed = ?1, dateOfCompletion = ?2 where taskId = ?3");
        yield stmt.bind({
            1: completed,
            2: new Date().toISOString(),
            3: taskId,
        });
        yield stmt.run();
        yield stmt.finalize();
        yield db.close();
    });
}
exports.updateTaskQueue = updateTaskQueue;
