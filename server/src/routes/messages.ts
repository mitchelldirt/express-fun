import messages from "../controllers/messages";
import { Router } from "express";

const router = Router();

router.post('/messages', messages.sendMessage);

export default router;