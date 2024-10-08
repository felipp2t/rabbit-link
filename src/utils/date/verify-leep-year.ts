import dayjs from "dayjs";

export function verifyLeepYear(value: string) {
  if (value.includes("02-29")) {
    if (dayjs(value).isLeapYear()) return true;
    else return false;
  }

  return true;
}
