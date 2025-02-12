// controllers/notificationController.js
import { sendNotification } from "../websockets/socketServer.js";

export const handleNotification = async (req, res) => {
  try {
    const notification = req.body;
    // console.log(notification);
    // Optionally: Validate notification payload here
    sendNotification(notification);
    res.status(200).json({ status: "ok", message: "Notification sent" });
  } catch (error) {
    console.error("Notification error:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
};
