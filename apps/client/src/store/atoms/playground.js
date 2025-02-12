import { atom } from "recoil";

export const playgroundState = atom({
  key: "playgroundState",
  default: {
    code: "",
    language: "python",
    input: "",
    output: "",
    status: "idle",
    executionTime: "",
    error: ""
  }
});
