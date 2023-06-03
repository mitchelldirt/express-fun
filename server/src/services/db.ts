import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import {
  pgTable,
  text,
  varchar,
  uuid,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferModel, sql, Table } from "drizzle-orm";
import postgres from "postgres";
import { z } from "zod";

const genderEnum = pgEnum("gender", ["male", "female", "other"]);

export const users = pgTable("users", {
  id: uuid("id")
    .default(sql`get_random_uuid()`)
    .primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  dateOfBirth: date("date_of_birth"),
  gender: genderEnum("gender"),
  email: text("email").notNull(),
});

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
});

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;

// for query purposes
const queryClient = postgres("postgresql://mitchellm@localhost:5432/test");
const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
