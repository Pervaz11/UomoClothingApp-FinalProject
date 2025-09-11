import dotenv from "dotenv";
import app from "./app.js";
import connectToDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectToDB(app, PORT);
