import express from "express";
import {
    getChats,
    getChatById,
    postChat,
    updateChat,
    deleteChat,
    askChat,
    postManyChats,
} from "../controller/chatController.js";

const router = express.Router();

// Admin üçün
router.get("/", getChats);
router.get("/:id", getChatById);
router.post("/", postChat);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);
router.delete("/:id", postManyChats);

router.post("/ask", askChat);

export default router;
