import { useEffect } from "react";
import { io } from "socket.io-client";
import useSubmissionUpdateHandler from "../../hooks/useSubmissionUpdateHandler";

const NotificationListener = () => {
  const onSubmissionUpdate = useSubmissionUpdateHandler();

  useEffect(() => {
    const socket = io(
      import.meta.env.VITE_NOTIFICATION_SERVICE_URL || "http://localhost:5000",
      {
        withCredentials: true
      }
    );

    socket.on("connect", () => {
      console.log(
        "Connected to Notification Service via WebSocket, socket id:",
        socket.id
      );
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    socket.on("submissionUpdate", (data) => {
      console.log("Received submission update:", data);
      if (data.type === "playground") {
        onSubmissionUpdate(data);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Notification Service");
    });

    return () => {
      socket.disconnect();
    };
  }, [onSubmissionUpdate]);

  return null;
};

export default NotificationListener;
