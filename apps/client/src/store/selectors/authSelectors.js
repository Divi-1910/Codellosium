import { selector } from "recoil";
import { authState } from "../atoms/auth";

export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => {
    const state = get(authState);
    return state.isAuthenticated;
  }
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    const state = get(authState);
    return state.user;
  }
});
