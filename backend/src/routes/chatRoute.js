import express from "express";
import { handleChat, getChats } from "../controller/chatController.js";

const router = express.Router();

router.get("/", getChats);

router.post("/", handleChat);

export default router;
