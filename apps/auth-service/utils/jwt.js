import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d"
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d"
  });

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    throw new Error("Access token invalid or expired");
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new Error("Refresh token invalid or expired");
  }
};

export { generateTokens, verifyAccessToken, verifyRefreshToken };
