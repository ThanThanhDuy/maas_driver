import moment from "moment";
import { FORMAT } from "../constants/format";

// time start - time now
export function compareTime(date, time) {
  var duration = moment.duration(
    moment(moment(`${date} ${time}`, FORMAT.DATE_TIME).toDate()).diff(
      moment(new Date())
    )
  );
  return duration.asMinutes();
}

export function compareDate(date) {
  return moment(moment(new Date()).format(FORMAT.DATE), FORMAT.DATE).diff(
    moment(date, FORMAT.DATE),
    "days"
  );
}

export function compareTimeTodayBeforeTimeCo(timeCo) {
  return moment(new Date()).isBefore(
    moment(
      `${moment(new Date()).format(FORMAT.DATE)} ${timeCo}`,
      FORMAT.DATE_TIME
    )
  );
}
