import { User } from "@repo/db";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  // console.log("inside authenticate");
  // console.log(req.cookies);
  // console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    // console.log("inside authenticate try");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // console.log(decoded);
    const user = await User.findById(decoded.userId).select("-password");
    console.log("user is :", user);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error while authenticating", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};
