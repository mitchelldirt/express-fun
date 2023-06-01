import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { pgTable, serial, text, varchar, uuid } from "drizzle-orm/pg-core";
import { InferModel, sql } from "drizzle-orm";
import postgres from "postgres";

export const users = pgTable("users", {
  id: uuid("id").default(sql`get_random_uuid()`),
  firstName: text("first_name"),
  lastName: text("last_name"),
  dateOfBirth: text("date_of_birth"),
  gender: text("gender"),
  email: text("email"),
});

export type User = InferModel<typeof users, "select">;
export type NewUser = InferModel<typeof users, "insert">;

// for query purposes
const queryClient = postgres("postgresql://mitchellm@localhost:5432/test");
const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
