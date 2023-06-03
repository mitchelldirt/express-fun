"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserSchema = exports.selectUserSchema = exports.users = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const drizzle_orm_1 = require("drizzle-orm");
const postgres_1 = __importDefault(require("postgres"));
const zod_1 = require("zod");
const genderEnum = (0, pg_core_1.pgEnum)("gender", ["male", "female", "other"]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id")
        .default((0, drizzle_orm_1.sql) `get_random_uuid()`)
        .primaryKey(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 50 }).notNull(),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 50 }).notNull(),
    dateOfBirth: (0, pg_core_1.date)("date_of_birth"),
    gender: genderEnum("gender"),
    email: (0, pg_core_1.text)("email").notNull(),
});
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users, {
    email: zod_1.z.string().email(),
});
// for query purposes
const queryClient = (0, postgres_1.default)("postgresql://mitchellm@localhost:5432/test");
const db = (0, postgres_js_1.drizzle)(queryClient);
exports.default = db;
