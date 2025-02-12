import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }
});
