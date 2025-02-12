import { atom } from "recoil";

export const activeTabState = atom({
  key: "activeTabState",
  default: "home"
});

export const currentProblemState = atom({
  key: "currentProblemState",
  default: null
});
