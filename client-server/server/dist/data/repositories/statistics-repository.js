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
exports.updateStatistic = exports.getStatisticById = exports.addStatistics = void 0;
const database_1 = require("../../database");
function addStatistics(statistic) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO statistic (userId, currentStreak, highestStreak, pointsMultiplier) VALUES (?1, ?2, ?3, ?4)");
        yield stmt.bind({
            1: statistic.userId,
            2: statistic.currentStreak,
            3: statistic.highestStreak,
            4: statistic.pointsMultiplier
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("The statistic could not be added");
        }
    });
}
exports.addStatistics = addStatistics;
function getStatisticById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare(`SELECT * FROM statistic WHERE userId = ?1`);
        yield stmt.bind({ 1: userId });
        const statistic = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return statistic;
    });
}
exports.getStatisticById = getStatisticById;
function updateStatistic(statistic) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("UPDATE statistic set currentStreak = ?1, highestStreak = ?2, pointsMultiplier = ?3 where userId = ?4");
        yield stmt.bind({
            1: statistic.currentStreak,
            2: statistic.highestStreak,
            3: statistic.pointsMultiplier,
            4: statistic.userId
        });
        const operationResult = yield stmt.run();
        stmt.finalize();
        db.close();
        const jsonString = JSON.stringify({
            userId: statistic.userId,
            currentStreak: statistic.currentStreak,
            highestStrek: statistic.highestStreak,
            pointsMultiplier: statistic.pointsMultiplier,
        });
        return JSON.parse(jsonString);
    });
}
exports.updateStatistic = updateStatistic;
