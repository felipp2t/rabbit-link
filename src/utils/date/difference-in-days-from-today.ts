export function differenceInDaysFromToday(isoDate: string): number {
  const inputDate = new Date(isoDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const differenceInTime = inputDate.getTime() - today.getTime();

  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}
