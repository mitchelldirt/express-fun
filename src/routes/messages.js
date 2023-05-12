"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __importDefault(require("../controllers/messages"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/messages', messages_1.default.sendMessage);
exports.default = router;
