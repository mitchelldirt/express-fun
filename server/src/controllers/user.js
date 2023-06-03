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
const db_1 = require("../services/db");
const user_1 = require("../models/user");
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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
            };
            const validatedUser = db_1.insertUserSchema.safeParse(user);
            if (validatedUser.success === true) {
                try {
                    const newUser = yield (0, user_1.insertUser)(user);
                    console.log(newUser);
                    res.send("User created: their ID is " + newUser[0].insertedId);
                }
                catch (e) {
                    res.status(400).send({ Error: "Duplicate email" });
                }
            }
            else {
                res.status(400).send(validatedUser.error);
            }
        }
    });
}
exports.default = {
    getAllUsers,
    createUser,
};
