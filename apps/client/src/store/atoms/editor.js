import { atom } from "recoil";

export const editorThemeState = atom({
  key: "editorThemeState",
  default: {
    editorTheme: "custom-dark"
  }
});
