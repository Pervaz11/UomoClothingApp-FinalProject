import Event from "../models/eventModel.js";

// GET /events
export const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort({ start: 1 });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
};

// POST /events
export const createEvent = async (req, res, next) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
};

// DELETE /events/:id
export const deleteEvent = async (req, res, next) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Event not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// PATCH /events/:id
export const updateEvent = async (req, res, next) => {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Event not found" });
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};
