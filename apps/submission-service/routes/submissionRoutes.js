// /submission-service/routes/submissionRoutes.js
import express from "express";
import {
  createSubmission,
  getSubmissionStatus,
  getAllSubmission
} from "../controllers/submissionController.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    console.log("inside the submission route");
    next();
  },
  authenticate,
  createSubmission
);

router.get("/:submissionId", getSubmissionStatus);

router.get("/", getAllSubmission);

export default router;
