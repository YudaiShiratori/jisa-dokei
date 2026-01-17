import { TZDate } from "@date-fns/tz";
import { differenceInMinutes, format } from "date-fns";

export interface TimezoneInfo {
  timezone: string;
  offsetFromUtc: number;
  abbreviation: string;
}

export function getTimeInTimezone(timezone: string, date = new Date()): TZDate {
  return new TZDate(date, timezone);
}

export function formatTimeInTimezone(
  timezone: string,
  formatStr = "HH:mm:ss",
  date = new Date(),
): string {
  const tzDate = getTimeInTimezone(timezone, date);
  return format(tzDate, formatStr);
}

export function formatDateInTimezone(
  timezone: string,
  formatStr = "yyyy/MM/dd",
  date = new Date(),
): string {
  const tzDate = getTimeInTimezone(timezone, date);
  return format(tzDate, formatStr);
}

export function getTimeDifference(
  timezone1: string,
  timezone2: string,
  date = new Date(),
): { hours: number; minutes: number; formatted: string } {
  const time1 = getTimeInTimezone(timezone1, date);
  const time2 = getTimeInTimezone(timezone2, date);

  const totalMinutes = differenceInMinutes(time2, time1);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.abs(totalMinutes % 60);

  const sign = hours >= 0 ? "+" : "";
  const formatted =
    minutes === 0 ? `${sign}${hours}時間` : `${sign}${hours}時間${minutes}分`;

  return { hours, minutes, formatted };
}

export function getUtcOffset(timezone: string, date = new Date()): string {
  const tzDate = getTimeInTimezone(timezone, date);
  const offset = format(tzDate, "xxx");
  return `UTC${offset}`;
}

export function isNextDay(
  baseTimezone: string,
  targetTimezone: string,
  date = new Date(),
): boolean {
  const baseDate = getTimeInTimezone(baseTimezone, date);
  const targetDate = getTimeInTimezone(targetTimezone, date);

  return (
    format(targetDate, "yyyy-MM-dd") !== format(baseDate, "yyyy-MM-dd") &&
    targetDate > baseDate
  );
}

export function isPreviousDay(
  baseTimezone: string,
  targetTimezone: string,
  date = new Date(),
): boolean {
  const baseDate = getTimeInTimezone(baseTimezone, date);
  const targetDate = getTimeInTimezone(targetTimezone, date);

  return (
    format(targetDate, "yyyy-MM-dd") !== format(baseDate, "yyyy-MM-dd") &&
    targetDate < baseDate
  );
}
