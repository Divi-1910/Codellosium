import jwt from "jsonwebtoken";
import { User } from "@repo/db";

export const authenticate = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  console.log("inside authenticate");
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
