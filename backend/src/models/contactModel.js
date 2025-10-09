import mongoose from "mongoose";
import contactSchema from "../schemas/contactSchema.js";

const Chat = mongoose.model("Contact", contactSchema);

export default Chat;
