import pkg from "jsonwebtoken";
const { verify } = pkg;
import { JWT_ACCESS_SECRET_KEY } from "../config/config.js";

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token provided!" });

  verify(token, JWT_ACCESS_SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "Invalid or expired token!",
      });

    req.user = decoded; // id, email, fullName, role
    next();
  });
};
