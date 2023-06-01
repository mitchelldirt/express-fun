"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const user_1 = __importDefault(require("../controllers/user"));
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.get("/users", user_1.default.getAllUsers);
router.post("/users", user_1.default.createUser);
