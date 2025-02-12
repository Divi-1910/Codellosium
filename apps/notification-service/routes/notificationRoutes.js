import express from "express";
import { handleNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", handleNotification);

export default router;
