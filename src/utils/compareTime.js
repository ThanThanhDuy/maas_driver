import moment from "moment";

// time start - time now
export function compareTime(date, time) {
  var duration = moment.duration(
    moment(moment(`${date} ${time}`, "DD-MM-YYYY HH:mm:ss").toDate()).diff(
      moment(new Date())
    )
  );
  return duration.asMinutes();
}
