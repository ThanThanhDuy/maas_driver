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

export function compareDate(date) {
  return moment(moment(new Date()).format("DD-MM-YYYY"), "DD-MM-YYYY").diff(
    moment(date, "DD-MM-YYYY"),
    "days"
  );
}
