import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET_KEY } from "../config/config.js";

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, JWT_ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("❌ Token verification failed:", err.message);
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = decoded;
        next();
    });
}
