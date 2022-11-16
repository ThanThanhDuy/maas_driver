import { atom } from "recoil";
import { getWeek } from "../../utils/getDate";

let { startAt, endAt } = getWeek();
export const incomeState = atom({
  key: "IncomeState",
  default: {
    StartAt: startAt,
    EndAt: endAt,
    Incomes: [],
    SelectedIncome: {},
  },
});
