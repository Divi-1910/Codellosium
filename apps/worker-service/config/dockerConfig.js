import { ENV } from "./envConfig.js";

export const dockerConfig = {
  memoryLimit: ENV.MEMORY_LIMIT,
  timeout: ENV.TIMEOUT_LIMIT,
  cpuShares: 512,
  networkDisabled: true,
  readonlyRootfs: true,
  KernelMemory: 50 * 1024 * 1024, // 50MB kernel memory limit
  BlkioWeight: 500, // Block IO weight
  OomKillDisable: false // Allow OOM killer
};
