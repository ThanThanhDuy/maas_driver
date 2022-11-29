import { atom } from "recoil";

export const subjectState = atom({
  key: "subject",
  default: undefined,
});

export const currentLocation = atom({
  key: "currentLocation",
  default: undefined,
});
