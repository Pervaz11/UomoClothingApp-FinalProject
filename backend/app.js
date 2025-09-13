import express from "express";
import productRouter from "./src/routes/productRoute.js";
import accessoryRouter from "./src/routes/accessoryRoute.js";
import partnersRouter from "./src/routes/partnersRouter.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRouter);
app.use("/accessory", accessoryRouter);
app.use("/partners", partnersRouter);

export default app;
