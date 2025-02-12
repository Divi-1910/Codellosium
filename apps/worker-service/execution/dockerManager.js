import Docker from "dockerode";
import { v4 as uuidv4 } from "uuid";
import { writeFileSync, mkdirSync, existsSync, rmSync } from "fs";
import path from "path";
import { dockerConfig } from "../config/dockerConfig.js";

const docker = new Docker();
const tempDir = path.join(process.cwd(), "temp_code_files");

if (!existsSync(tempDir)) {
  mkdirSync(tempDir);
}

async function getMemoryUsage(engine) {
  const stats = await new Promise((resolve, reject) => {
    engine.stats((err, stream) => {
      if (err) return reject(err);
      stream.on("data", (info) => {
        resolve(JSON.parse(info.toString()));
        stream.destroy();
      });
    });
    const mbUsage = stats.memory_stats.usage / 1024 / 1024;
    console.log(`${mbUsage} MB`);
  });
}
const pullImage = async (image) => {
  return new Promise((resolve, reject) => {
    docker.pull(image, (err, stream) => {
      if (err) return reject(err);
      docker.modem.followProgress(
        stream,
        (err, output) => (err ? reject(err) : resolve(output)),
        (event) => console.log("Pull progress:", event.status, event.progress)
      );
    });
  });
};

export const runDockerContainer = async (language, code, input) => {
  if (language !== "python") {
    throw new Error(
      `Language "${language}" is not supported. Only Python is supported.`
    );
  }
  const tempCodeDir = path.join(tempDir, uuidv4());
  mkdirSync(tempCodeDir);
  try {
    const tempId = uuidv4();
    const fileName = "main.py";
    const containerName = `code-runner-${tempId}`;
    const hostFilePath = path.join(tempCodeDir, fileName);
    const containerFilePath = `/app/${fileName}`;
    writeFileSync(hostFilePath, code);
    console.log(`Code written to ${hostFilePath} , code is ${code}`);
    console.log(`[DEBUG] Code written to main.py:\n${code}`);
    const image = "python:3.9-slim";
    const command = ["python3", containerFilePath];
    console.log(`Selected image: ${image}`);
    console.log(`Command to run: ${command.join(" ")}`);

    try {
      await docker.getImage(image).inspect();
      console.log(`Image ${image} exists locally.`);
    } catch (err) {
      console.log(`Image ${image} not found locally. Pulling image...`);
      await pullImage(image);
      console.log(`Image ${image} pulled successfully.`);
    }
    let fullCommand = command;
    if (input) {
      // Use printf to handle input with newlines and special characters
      fullCommand = [
        "sh",
        "-c",
        `printf "%s" "${input.replace(/"/g, '\\"')}" | ${command.join(" ")}`
      ];
    }

    const container = await docker.createContainer({
      Image: image,
      name: containerName,
      Tty: false,
      OpenStdin: true,
      AttachStdin: true,
      StdinOnce: true,
      NetworkDisabled: dockerConfig.networkDisabled,
      HostConfig: {
        Memory: dockerConfig.memoryLimit,
        CpuShares: dockerConfig.cpuShares,
        PidsLimit: dockerConfig.pidsLimit,
        ReadonlyRootfs: dockerConfig.readonlyRootfs,
        Binds: [`${hostFilePath}:${containerFilePath}`],
        AutoRemove: true
      },
      WorkingDir: "/app",
      Cmd: fullCommand,
      Tty: false,
      OpenStdin: !!input,
      AttachStdin: !!input,
      StdinOnce: !!input
    });
    console.log("Container created:", containerName);
    await container.start();
    console.log("Container started.");

    const stream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
      stdin: true
    });

    let output = "";
    const maxOutputSize = 1024 * 100;
    let outputExceeded = false;

    stream.on("data", (chunk) => {
      if (!outputExceeded) {
        output += chunk.toString("utf8");
        if (output.length > maxOutputSize) {
          output =
            output.substring(0, maxOutputSize) +
            "\n[Output Truncated due to size limit]";
          outputExceeded = true;
          stream.destroy();
        }
      }
    });
    console.log("Attached to container output stream.");

    if (input) {
      const stdinStream = await container.attach({
        stream: true,
        stdin: true,
        stdout: false,
        stderr: false
      });

      stdinStream.write(input);
      stdinStream.end();
      console.log("Input written to container stdin:", input);
    }

    // const memUsage = await getMemoryUsage(container);
    // console.log("Memory usage:", memUsage);

    const executionPromise = new Promise((resolve) =>
      stream.on("end", resolve)
    );
    let timeoutOccurred = false;
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(async () => {
        timeoutOccurred = true;
        console.error(`Timeout reached. Stopping container ${containerName}`);
        reject(new Error("Execution timed out"));
      }, dockerConfig.timeout);
    });

    await Promise.race([executionPromise, timeoutPromise]);

    try {
      await container.stop();
    } catch (stopErr) {
      if (!timeoutOccurred) {
        console.warn(
          "Error stopping container (might be already stopped):",
          stopErr
        );
      }
    }

    console.log("Container output:", output);
    return { output };
  } catch (error) {
    console.error("Docker Execution Error:", error);
    throw error;
  } finally {
    rmSync(tempCodeDir, { recursive: true, force: true });
    console.log(`Cleaned up temporary directory: ${tempCodeDir}`);
  }
};
