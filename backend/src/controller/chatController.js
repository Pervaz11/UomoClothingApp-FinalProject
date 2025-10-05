import Chat from "../models/chatModel.js";

// GET /chat
export const getChats = async (req, res, next) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 });
        res.status(200).json(chats);
    } catch (err) {
        next(err);
    }
};

// GET /chat/:id
export const getChatById = async (req, res, next) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        res.status(200).json(chat);
    } catch (err) {
        next(err);
    }
};

// POST /chat
export const postChat = async (req, res, next) => {
    try {
        const { question, answer } = req.body;
        const newChat = new Chat({ question, answer });
        const saved = await newChat.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

// PUT /chat/:id
export const updateChat = async (req, res, next) => {
    try {
        const updated = await Chat.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Chat not found" });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE /chat/:id 
export const deleteChat = async (req, res, next) => {
    try {
        const deleted = await Chat.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Chat not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        next(err);
    }
};

// POST /chat/ask
export const askChat = async (req, res, next) => {
    try {
        const { question } = req.body;
        if (!question) return res.status(400).json({ message: "Question required" });

        const chat = await Chat.findOne({ question: { $regex: question, $options: "i" } });
        if (!chat)
            return res.status(404).json({ message: "Sorry, I don't have an answer for that." });

        res.status(200).json({ reply: chat.answer });
    } catch (err) {
        next(err);
    }
};

// POST /chat/bulk
export const postManyChats = async (req, res, next) => {
    try {
        const chats = req.body;

        if (!Array.isArray(chats) || chats.length === 0) {
            return res.status(400).json({ message: "Array of chats required" });
        }

        const saved = await Chat.insertMany(chats);
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
};

