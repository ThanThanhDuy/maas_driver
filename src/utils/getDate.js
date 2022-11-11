import moment from "moment";
import { week } from "../constants";

export function getDate(date, formatDate) {
  return week[
    moment(moment(date, formatDate).format("YYYY-MM-DD")).isoWeekday() - 1
  ].nameShort;
}

export function getHour(hour, formatHour) {
  return moment(moment(hour, formatHour)).format("HH:mm");
}

export function getCurrentMonth() {
  return moment(new Date()).format("M");
}

export function getCurrentYear() {
  return moment(new Date()).format("YYYY");
}
