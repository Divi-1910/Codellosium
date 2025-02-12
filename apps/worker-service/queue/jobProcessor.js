import { runCodeExecutor } from "../execution/codeExecutor.js";
import { notifySubmission } from "../notification/notifier.js";
import { Submission, Problem } from "@repo/db";
import { validateResults } from "../validation/resultValidator.js";
import { fetchTestCases } from "../validation/tcFetcher.js";

export const processJob = async (jobData) => {
  const { submissionId, user, problem, code, language, type, input } = jobData;
  console.log(`Processing job with submissionId: ${submissionId}`);
  try {
    const execResult = await runCodeExecutor(language, code, input);
    console.log("execResult:", execResult);
    let updateData = {
      output: execResult.output,
      error: execResult.error || null,
      executionTime: execResult.executionTime
    };
    if (type === "arena") {
      try {
        const testCases = await fetchTestCases(problem);
        const testResults = [];
        for (const test of testCases) {
          const testExec = await runCodeExecutor(language, code, test.input);
          testResults.push({
            testCaseId: test._id,
            input: test.input,
            expectedOutput: test.expectedOutput.trim(),
            actualOutput: testExec.output.trim(),
            passed: validateResults(
              testExec.output.trim(),
              test.expectedOutput.trim()
            )
          });
        }
        updateData.testResults = testResults;
        updateData.status = testResults.every((r) => r.passed)
          ? "accepted"
          : "rejected";
      } catch (testCaseError) {
        console.error("Error processing test cases:", testCaseError); // Log test case errors
        updateData.status = "failed"; // Mark submission as failed due to test case error
        updateData.error = `Error during test case processing: ${testCaseError.message}`;
      }
    } else {
      updateData.status = "finished";
    }
    console.log("Update Data :", updateData);
    try {
      await Submission.findByIdAndUpdate(submissionId, updateData);
      console.log("Submission Updated");
    } catch (dbUpdateError) {
      console.error("Error updating submission in database:", dbUpdateError);
      throw new Error(`Database update failed: ${dbUpdateError.message}`);
    }

    try {
      await notifySubmission({
        submissionId,
        user,
        status: updateData.status,
        executionTime: execResult.executionTime,
        output: updateData.output,
        error: updateData.error,
        type: type
      });
    } catch (notificationError) {
      console.error("Error sending notification:", notificationError); // Log notification error
    }
  } catch (error) {
    console.error("Error processing job (outer catch):", error); // Catch-all error log
    await Submission.findByIdAndUpdate(submissionId, {
      status: "failed",
      error: error.message
    });
  }
};
