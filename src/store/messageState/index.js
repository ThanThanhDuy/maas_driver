import { atom } from "recoil";

export const messageState = atom({
  key: "MessageState",
  default: {},
});

export const indexMessageState = atom({
  key: "IndexMessageState",
  default: 0,
});

export const connectionState = atom({
  key: "ConnectionState",
  default: {},
});

export const allMessageState = atom({
  key: "AllMessageState",
  default: null,
});
