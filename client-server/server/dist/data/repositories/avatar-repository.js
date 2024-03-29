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
exports.insertAvatar = exports.getAllAvatars = void 0;
const database_1 = require("../../database");
function getAllAvatars() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const avatars = yield db.all("SELECT * FROM avatar");
        yield db.close();
        return avatars;
    });
}
exports.getAllAvatars = getAllAvatars;
function insertAvatar(avatar) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO avatar (link, name, price, unlockLevel) VALUES (?1, ?2, ?3, ?4)");
        yield stmt.bind({
            1: avatar.link,
            2: avatar.name,
            3: avatar.price,
            4: avatar.unlockLevel,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("Could not add avatar");
        }
        else {
            avatar.avatarId = operationResult.lastID;
        }
    });
}
exports.insertAvatar = insertAvatar;
