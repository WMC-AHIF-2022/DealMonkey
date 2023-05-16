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
exports.getSettingById = exports.updateSettings = void 0;
const database_1 = require("../../database");
function updateSettings(profile, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("update setting set userProfile = ?1 where userId = ?2");
        yield stmt.bind({
            1: profile,
            2: userId,
        });
        const operationResult = yield stmt.run();
        stmt.finalize();
        db.close();
    });
}
exports.updateSettings = updateSettings;
function getSettingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare(`SELECT * FROM setting WHERE id = ?1`);
        yield stmt.bind({ 1: id });
        const setting = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return setting;
    });
}
exports.getSettingById = getSettingById;
