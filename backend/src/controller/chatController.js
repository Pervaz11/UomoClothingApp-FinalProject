import Chat from "../models/faqModel.js";

export const getChats = async (_req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        let chat = await Chat.findOne({ question: message });

        if (!chat) {
            const answer = `AI cavabı: ${message}`;
            chat = new Chat({ question: message, answer });
            await chat.save();
        }

        res.status(200).json({ answer: chat.answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
