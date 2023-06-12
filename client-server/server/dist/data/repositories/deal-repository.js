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
exports.addDeal = exports.getDealByTaskId = exports.getAllDealsByUser = void 0;
const database_1 = require("../../database");
const task_repository_1 = require("./task-repository");
const progress_repository_1 = require("./progress-repository");
function getAllDeals() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const deals = yield db.all("SELECT * FROM deal");
        yield db.close();
        return deals;
    });
}
function getAllDealsByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deals = yield getAllDeals();
        let userDeals = [];
        for (const deal of deals) {
            const curTask = yield (0, task_repository_1.getTaskById)(deal.taskId);
            if (curTask.userId === userId) {
                userDeals.push(deal);
            }
        }
        return userDeals;
    });
}
exports.getAllDealsByUser = getAllDealsByUser;
function getDealByTaskId(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare('select * from Deal where taskId = ?1');
        yield stmt.bind({ 1: taskId });
        const deal = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return deal;
    });
}
exports.getDealByTaskId = getDealByTaskId;
function addDeal(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield (0, task_repository_1.getTaskById)(taskId);
        if (task === undefined) {
            throw new Error("task doesn't exist - couldn't create deal for it.");
        }
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare('insert into Deal (taskId, points) values (?1, ?2)');
        const points = yield (0, progress_repository_1.calculatePoints)(task.userId);
        //console.log(points);
        yield stmt.bind({ 1: taskId, 2: points });
        yield stmt.run();
        yield stmt.finalize();
        yield db.close();
    });
}
exports.addDeal = addDeal;
