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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const user_repository_1 = require("../data/repositories/user-repository");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_repository_1.getAllUsers)();
    response.status(http_status_codes_1.StatusCodes.OK).json(users);
}));
exports.userRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(request.params.id);
    const user = yield (0, user_repository_1.getUserById)(id);
    if (user) {
        response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    else {
        response.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
}));
exports.userRouter.post("/registration", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    const birthdate = request.body.birthdate;
    //TODO improve validation
    if (password.trim().length === 0) {
        console.log("Trim error");
        response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        return;
    }
    const user = {
        id: -1,
        username: username,
        password: password,
        email: email,
        birthdate: birthdate,
        points: 100,
        level: 1,
        registrationDate: new Date().toISOString(),
    };
    try {
        yield (0, user_repository_1.addUser)(user);
        response.sendStatus(http_status_codes_1.StatusCodes.CREATED);
    }
    catch (exception) {
        response.sendStatus(http_status_codes_1.StatusCodes.GONE);
    }
}));
exports.userRouter.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const username = request.body.username;
    const password = request.body.password;
    const result = yield (0, user_repository_1.isAuthorized)(username, password);
    if (result !== undefined) {
        const jwtToken = jwt.sign({ id: result.id, username: username }, process.env.PRIVATE_KEY);
        response.json({ jwtToken: jwtToken, id: result.id });
    }
    else {
        response.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
}));
exports.userRouter.delete("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(request.params.id);
    if (yield (0, user_repository_1.deleteUser)(id)) {
        response.sendStatus(http_status_codes_1.StatusCodes.OK);
    }
    else {
        response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}));
exports.userRouter.delete("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_repository_1.deleteAllUsers)();
    response.sendStatus(http_status_codes_1.StatusCodes.OK);
}));
