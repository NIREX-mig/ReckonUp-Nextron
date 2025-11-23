export const MonthsChartLable = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WeeksChartLable = [
  "Mon",
  "Tue",
  "wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const appTitle = "ReckonUp - Devloped by NIreX";

export function preventkeyEnvent(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
  }
}

export function preventWeelEvent(e: React.WheelEvent<HTMLInputElement>) {
  (e.target as HTMLInputElement).blur();
}
