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
exports.dealRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const deal_repository_1 = require("../data/repositories/deal-repository");
exports.dealRouter = express_1.default.Router();
exports.dealRouter.get("/:userId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number.parseInt(request.params.userId);
    const deals = yield (0, deal_repository_1.getAllDealsByUser)(userId);
    response.status(http_status_codes_1.StatusCodes.OK).json(deals);
}));
exports.dealRouter.get("/task/:taskId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = Number.parseInt(request.params.taskId);
    const deal = yield (0, deal_repository_1.getDealByTaskId)(taskId);
    response.status(http_status_codes_1.StatusCodes.OK).json(deal);
}));
exports.dealRouter.post("/:taskId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = Number.parseInt(request.params.taskId);
    try {
        (0, deal_repository_1.addDeal)(taskId);
    }
    catch (err) { }
}));
