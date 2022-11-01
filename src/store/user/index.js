import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {},
});

export const isUserWorking = atom({
  key: "isUserWorkingState",
  default: false,
});
