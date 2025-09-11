import express from "express";
import productRouter from "./src/routes/productRoute.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/products", productRouter);

export default app;