import axios from "axios";
import { ENV } from "../config/envConfig.js";

export const notifySubmission = async (notificationData) => {
  try {
    const url = `${ENV.NOTIFICATION_SERVICE_URL}/notify`;
    const response = await axios.post(url, notificationData, {
      timeout: 5000
    });
    console.log("Notification sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error.message);
    throw error;
  }
};
