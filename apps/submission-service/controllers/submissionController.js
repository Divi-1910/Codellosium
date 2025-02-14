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
    // Get pagination parameters from query, with defaults.
    const { offset = 0, limit = 10 } = req.query;
    const numericOffset = parseInt(offset, 10);
    const numericLimit = parseInt(limit, 10);

    // Optional: if you have authentication middleware, filter by user:
    // const userId = req.user._id;
    // const filter = { user: userId };
    // For now, we'll fetch all submissions.
    const filter = {};

    // Get the total count and the paginated submissions.
    const totalCount = await Submission.countDocuments(filter);
    const submissions = await Submission.find(filter)
      .sort({ createdAt: -1 })
      .skip(numericOffset)
      .limit(numericLimit)
      .lean();

    res.status(200).json({ submissions, totalCount });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
