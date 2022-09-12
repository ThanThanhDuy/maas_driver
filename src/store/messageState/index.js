import { atom } from "recoil";

export const messageState = atom({
  key: "MessageState",
  default: {},
});

export const indexMessageState = atom({
  key: "IndexMessageState",
  default: 0,
});
