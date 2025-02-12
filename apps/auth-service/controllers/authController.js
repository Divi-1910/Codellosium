import { User } from "@repo/db";
import { hashPassword, comparePasswords } from "../utils/password.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    console.log("inside auth login");
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(
      "+password +refreshToken"
    );
    if (!user) {
      return res.status(401).json({ error: "Invalid User , Please Register" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const refreshTokenHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token missing" });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
      console.log("decoded :", decoded);
    } catch (err) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.userId).select("+refreshToken");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (refreshToken != user.refreshToken) {
      return res.status(401).json({ error: "Refresh token does not match" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ error: "Could not refresh token" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  const user = await User.findById(req.user._id);
  if (user) {
    user.refreshToken = "";
    await user.save();
  }
  res.status(204).end();
};
