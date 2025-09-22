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

import "./src/config/passport.js";

const app = express();

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
});

// Middlewares
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
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
app.use("/auth", userRouter);
app.use("/chat", chatRouter);

export default app;
