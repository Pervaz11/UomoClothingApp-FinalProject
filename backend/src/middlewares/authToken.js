import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET_KEY } from "../config/config.js";

export default function authToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided!" });
    }

    // Header format: "Bearer token"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    jwt.verify(token, JWT_ACCESS_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token!" });
      }

      // Burda decoded obyekti token-dən gəlir
      // Əgər login zamanı { id: user._id } ilə yaratmısansa, onda decoded.id olacaq
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Token verification failed", error: error.message });
  }
}
