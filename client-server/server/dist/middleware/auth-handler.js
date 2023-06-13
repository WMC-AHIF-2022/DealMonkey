"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    var _a;
    console.log("isAuthenticated");
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("No bearer token available");
        }
        // check if the token is valid => otherwise an error is thrown
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err) {
        res.status(401).send(`Please authenticate! ${err}`);
    }
};
exports.isAuthenticated = isAuthenticated;
