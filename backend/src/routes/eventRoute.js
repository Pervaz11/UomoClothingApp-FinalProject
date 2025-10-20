import express from "express";
import {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent,
} from "../controller/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);

export default router;
