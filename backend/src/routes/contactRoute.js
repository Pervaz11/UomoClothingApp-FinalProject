import express from "express";
import { createMessage, getMessages, markAsRead } from "../controller/ContactController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);
router.patch("/:id", markAsRead);

export default router;
