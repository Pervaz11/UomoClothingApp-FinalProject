import Contact from "../models/contactModel.js";

// POST
export const createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newMessage = await Contact.create({ name, email, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
};

// GET
export const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

// PATCH
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Contact.findByIdAndUpdate(id, { status: "read" }, { new: true });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: "Failed to update message" });
    }
};
