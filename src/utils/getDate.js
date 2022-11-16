import moment from "moment";
import { week } from "../constants";
import { FORMAT } from "../constants/format";

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

export function getWeek() {
  var curr = new Date();
  var firstDayOfWeek = curr.getDate() - curr.getDay() + 1;
  var lastDayOfWeek = firstDayOfWeek + 6;
  return {
    startAt: new Date(curr.setDate(firstDayOfWeek)),
    endAt: new Date(curr.setDate(lastDayOfWeek)),
  };
}

export function getWeekDay(date) {
  const dow = moment(date, FORMAT.DATE).day();
  return dayInWeeks[dow];
}

const dayInWeeks = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};
