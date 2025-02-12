import { Server } from "socket.io";
import { ENV } from "../config/envConfig.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

let io;

export const initSocketServer = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: ENV.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const accessToken = cookies.token;
      if (!accessToken) {
        return next(
          new Error("Authentication error: No access token found in cookies")
        );
      }
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      socket.data.userId = decoded.userId;
      socket.join(decoded.userId);
      next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id, "in room:", socket.data.userId);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export const sendNotification = (notification) => {
  if (io && notification.user._id) {
    io.to(notification.user._id).emit("submissionUpdate", notification);
    console.log(
      `Notification sent to user ${notification.user.name}:`,
      notification
    );
  } else {
    console.error("Socket.io not initialized or notification missing userId.");
  }
};
