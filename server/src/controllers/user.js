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
const user_1 = require("../models/user");
const zod_1 = require("zod");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, user_1.selectAllUsers)();
        res.send(users);
    });
}
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body) {
            const user = {
                firstName: zod_1.z.string().parse(req.body.firstName),
                lastName: zod_1.z.string().parse(req.body.lastName),
                email: zod_1.z.string().email().parse(req.body.email),
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
            };
            const newUser = yield (0, user_1.insertUser)(user);
            res.send("User created: " + newUser);
        }
    });
}
exports.default = {
    getAllUsers,
    createUser,
};
