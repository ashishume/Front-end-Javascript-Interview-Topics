/** convert time from 12h to 24h */

/** E.g.
 * 12:00 AM
 * 09:30 PM
 */
function convertTime(time12h) {
  const [time, modifier] = time12h.split(" ");
  let [hours, mins] = time.split(":");

  if (hours === "12") hours = "00";
  if (modifier === "PM") hours = parseInt(hours) + 12;
  return `${hours}:${mins}`;
}

const res = convertTime("12:25 PM");
console.log(res);
