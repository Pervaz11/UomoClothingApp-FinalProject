import express from "express";
import productRouter from "./src/routes/productRoute.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRouter);

export default app;
