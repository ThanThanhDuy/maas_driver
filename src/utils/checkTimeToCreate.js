import moment from "moment";
import { FORMAT } from "../constants/format";
import { TIME_CREATE_ROUTE } from "../constants/timeCreateRoute";
import { getCurrentMonth, getCurrentYear } from "./getDate";

// check hom nay co phai nam trong so tuan cuoi da quy dinh hay khong
export const checkTimeLastPreviousWeek = () => {
  if (TIME_CREATE_ROUTE.WEEK_BEFORE_NEXT_MONTH !== 0) {
    let currentMonth =
      getCurrentMonth() === "12"
        ? "01"
        : (Number(getCurrentMonth()) + 1).toString();
    const currentYear =
      getCurrentMonth() === "12"
        ? (Number(getCurrentYear()) + 1).toString()
        : getCurrentYear();
    // const dayMinus =
    //   moment(
    //     moment(`01-${currentMonth}-${currentYear}`, FORMAT.DATE)
    //   ).isoWeekday() - 1;
    // console.log(currentMonth, currentYear, dayMinus);
    const timeStartAdd = moment(
      moment(`01-${currentMonth}-${currentYear}`, FORMAT.DATE)
    )
      .subtract(TIME_CREATE_ROUTE.WEEK_BEFORE_NEXT_MONTH * 7, "days")
      .format(FORMAT.DATE);
    const timeEndAdd = moment(
      moment(`01-${currentMonth}-${currentYear}`, FORMAT.DATE)
    )
      .subtract(1, "days")
      .format(FORMAT.DATE);
    // console.log(
    //   timeStartAdd,
    //   timeEndAdd,
    //   moment(moment(new Date()).format(FORMAT.DATE_TIME), FORMAT.DATE_TIME)
    // );
    // console.log(
    //   moment(
    //     moment(
    //       moment(new Date()).format(FORMAT.DATE_TIME),
    //       FORMAT.DATE_TIME
    //     )
    //   ).isBetween(
    //     moment(`${timeStartAdd} 00:00:00`, FORMAT.DATE_TIME),
    //     moment(`${timeEndAdd} 19:30:00`, FORMAT.DATE_TIME)
    //   )
    // );
    // check time in period
    if (
      moment(
        moment(moment(new Date()).format(FORMAT.DATE_TIME), FORMAT.DATE_TIME)
      ).isBetween(
        moment(`${timeStartAdd} 00:00:00`, FORMAT.DATE_TIME),
        moment(`${timeEndAdd} 24:00:00`, FORMAT.DATE_TIME)
      )
    ) {
      return {
        result: true,
        timeStartAdd,
        timeEndAdd,
      };
    } else {
      return {
        result: false,
        timeStartAdd,
        timeEndAdd,
      };
    }
  }
};
