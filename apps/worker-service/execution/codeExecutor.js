import { runDockerContainer } from "./dockerManager.js";

const cleanOutput = (output) => {
  if (!output) return "";
  output = output.trim();
  output = output.replace(/[\x00-\x1F\x7F]+/g, "");
  return output;
};

export const runCodeExecutor = async (language, code, input) => {
  const startTime = Date.now();
  console.log("running code...");
  try {
    let output = await runDockerContainer(language, code, input);
    console.log("Output Received from Docker Container :", output);
    output = cleanOutput(output.output);
    console.log("output -", output);
    const executionTime = (Date.now() - startTime) / 1000;
    return {
      output,
      error: null,
      executionTime
    };
  } catch (error) {
    console.error("Error in runCodeExecutor:", error);
    const executionTime = (Date.now() - startTime) / 1000;
    return {
      output: "",
      error: error.message,
      executionTime
    };
  }
};
