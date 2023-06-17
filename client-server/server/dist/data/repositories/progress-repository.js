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
exports.calculatePoints = exports.addProgress = exports.getProgressByUserId = void 0;
const database_1 = require("../../database");
function getProgressByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("select * from Progress where userId = ?1");
        yield stmt.bind({ 1: userId });
        const progress = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return progress;
    });
}
exports.getProgressByUserId = getProgressByUserId;
function addProgress(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO progress VALUES (?1, ?2, ?3)");
        yield stmt.bind({
            1: userId,
            2: 100,
            3: 1,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("Username is already known");
        }
        else {
            userId = operationResult.lastID;
        }
        console.log("progress done");
    });
}
exports.addProgress = addProgress;
//f(x) = 50x^2 + 150x + 100
//x ... level
//f(x) ... experience
//umkehrfunktion g(y)
//y ... experience
//g(y) ... level
function calculateLevel(experience) {
    return Math.floor((Math.sqrt(50 * experience + 625) - 75) / 50) + 2;
}
function calculateExperience(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const progress = yield getProgressByUserId(userId);
        const level = calculateLevel(progress.experience);
        //random experience between 50 and 80 * the current level the user is in
        return (Math.floor(Math.random() * 80) + 50) * level;
    });
}
function calculatePoints(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const progress = yield getProgressByUserId(userId);
        console.log(progress);
        const level = calculateLevel(progress.experience);
        console.log(level);
        return (Math.ceil((Math.log10(level * 10) + 20) * (progress.experience / 100)) + 10);
    });
}
exports.calculatePoints = calculatePoints;
