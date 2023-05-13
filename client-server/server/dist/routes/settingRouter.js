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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const setting_repository_1 = require("../data/repositories/setting-repository");
require("dotenv").config();
exports.settingsRouter = express_1.default.Router();
exports.settingsRouter.put("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(request.params.id);
    const profile = request.body.profile;
    try {
        (0, setting_repository_1.updateSettings)(profile, id);
        response.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ message: "settings updated" });
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
exports.settingsRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(request.params.id);
    const setting = yield (0, setting_repository_1.getSettingById)(id);
    if (setting == undefined) {
        response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    else {
        response.status(http_status_codes_1.StatusCodes.OK).json(setting);
    }
}));
