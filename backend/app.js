import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import productRouter from "./src/routes/productRoute.js";
import accessoryRouter from "./src/routes/accessoryRoute.js";
import partnersRouter from "./src/routes/partnersRouter.js";
import userRouter from "./src/routes/userRoute.js";
import chatRouter from "./src/routes/chatRoute.js";
import locationRouter from "./src/routes/locationRoute.js";
import statsRouter from "./src/routes/statsRoute.js";
import contactRoutes from "./src/routes/contactRoute.js";
import eventRouter from "./src/routes/eventRoute.js";
import paymentRouter from "./src/routes/paymentRoute.js";
import orderRouter from "./src/routes/ordersRoute.js";
import "./src/config/passport.js";

const app = express();

import dotenv from "dotenv";
dotenv.config();


// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
});

// Middleware sırası vacibdir!
app.use(helmet());
app.use(limiter);

// JSON body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    })
);

// Cache-disable
app.use((_req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

// Session (passport)
app.use(
    session({
        secret: "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",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

// Passport initialize
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get("/", (_req, res) => res.send("API is running..."));

// API routes
app.use("/products", productRouter);
app.use("/accessory", accessoryRouter);
app.use("/partners", partnersRouter);
app.use("/location", locationRouter);
app.use("/chat", chatRouter);
app.use("/stats", statsRouter);
app.use("/contact", contactRoutes);
app.use("/events", eventRouter);
app.use("/auth", userRouter);
app.use("/payment", paymentRouter);
app.use("/payment/webhook", paymentRouter);
app.use("/orders", orderRouter);

export default app;
