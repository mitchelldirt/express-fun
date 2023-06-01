import user from "../controllers/user";
import { Router } from "express";

const router = Router();

router.get("/users", user.getAllUsers);
router.post("/users", user.createUser);

export { router as userRouter };
