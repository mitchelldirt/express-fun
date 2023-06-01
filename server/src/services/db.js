"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const postgres_1 = __importDefault(require("postgres"));
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").default((0, drizzle_orm_1.sql) `get_random_uuid()`),
    firstName: (0, pg_core_1.text)("first_name"),
    lastName: (0, pg_core_1.text)("last_name"),
    dateOfBirth: (0, pg_core_1.text)("date_of_birth"),
    gender: (0, pg_core_1.text)("gender"),
    email: (0, pg_core_1.text)("email"),
});
// for query purposes
const queryClient = (0, postgres_1.default)("postgresql://mitchellm@localhost:5432/test");
const db = (0, postgres_js_1.drizzle)(queryClient);
exports.default = db;
