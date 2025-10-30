import pkg from "jsonwebtoken";
const { verify } = pkg;
import { JWT_ACCESS_SECRET_KEY } from "../config/config.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not provided!",
            statusCode: 401
        });
    }

    verify(token, JWT_ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token!",
                statusCode: 403
            });
        }

        req.user = decoded;
        next();
    });
};

export default authMiddleware;
