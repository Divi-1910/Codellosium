import { Submission } from "@repo/db";
import { submissionQueue } from "../queues/submissionQueue.js";
import { scanForMaliciousCode } from "../utils/scanner.js";

export const createSubmission = async (req, res) => {
  try {
    let { problem, code, language, type, input } = req.body;
    const user = req.user;

    if (type === "arena" && !problem) {
      return res
        .status(400)
        .json({ error: "Problem id is required for arena submissions." });
    }

    if (type === "playground") {
      problem = null;
    }

    const scanResult = scanForMaliciousCode(code, language);

    if (scanResult.malicious) {
      return res.status(400).json({ error: scanResult.message });
    }

    const submission = await Submission.create({
      user,
      problem,
      code,
      language,
      type: type || "arena",
      input,
      status: "pending"
    });

    const job = await submissionQueue.add("run-code", {
      submissionId: submission._id,
      user,
      problem,
      code,
      language,
      type: submission.type,
      input
    });

    res.status(201).json({
      submissionId: submission._id,
      message: "Submission received and queued for execution",
      status: submission.status
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ error: "Failed to create submission" });
  }
};

export const getSubmissionStatus = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.status(200).json({ submission });
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ error: "Failed to fetch submission" });
  }
};

export const getAllSubmission = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { type } = req.query;
    const filter = { user: req.user._id };
    if (type) {
      filter.type = type;
    }
    const submissions = await Submission.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
