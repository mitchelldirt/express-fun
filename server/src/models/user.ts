import db, { users, NewUser } from "../services/db";

export async function selectAllUsers() {
  return await db.select().from(users);
}

export async function insertUser(user: NewUser) {
  return await db
    .insert(users)
    .values(user)
    .returning({ insertedId: users.id });
}
