import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

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
  formatStr = "HH:mm",
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
  baseTimezone: string,
  targetTimezone: string,
  date = new Date(),
): { hours: number; minutes: number; formatted: string } {
  // Get the UTC offset in minutes for each timezone
  const baseDate = getTimeInTimezone(baseTimezone, date);
  const targetDate = getTimeInTimezone(targetTimezone, date);

  // Parse UTC offsets (format: "+09:00" or "-05:00")
  const baseOffset = format(baseDate, "xxx"); // e.g., "+09:00"
  const targetOffset = format(targetDate, "xxx"); // e.g., "-05:00"

  const parseOffsetToMinutes = (offset: string): number => {
    const match = offset.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) return 0;
    const sign = match[1] === "+" ? 1 : -1;
    const hours = Number.parseInt(match[2], 10);
    const minutes = Number.parseInt(match[3], 10);
    return sign * (hours * 60 + minutes);
  };

  const baseMinutes = parseOffsetToMinutes(baseOffset);
  const targetMinutes = parseOffsetToMinutes(targetOffset);

  // Calculate difference: how much ahead/behind is target compared to base
  const totalMinutes = targetMinutes - baseMinutes;
  const absTotalMinutes = Math.abs(totalMinutes);
  const absHoursValue = Math.floor(absTotalMinutes / 60);
  const hours =
    absHoursValue === 0 ? 0 : absHoursValue * (totalMinutes < 0 ? -1 : 1);
  const minutes = absTotalMinutes % 60;

  // Determine sign for formatting
  const sign = totalMinutes === 0 ? "" : totalMinutes > 0 ? "+" : "-";
  const absHours = Math.abs(hours);

  let formatted: string;
  if (absHours === 0 && minutes === 0) {
    formatted = "±0時間";
  } else if (absHours === 0) {
    formatted = `${sign}${minutes}分`;
  } else if (minutes === 0) {
    formatted = `${sign}${absHours}時間`;
  } else {
    formatted = `${sign}${absHours}時間${minutes}分`;
  }

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

  const baseDateStr = format(baseDate, "yyyy-MM-dd");
  const targetDateStr = format(targetDate, "yyyy-MM-dd");

  // Compare calendar date strings lexicographically
  return targetDateStr > baseDateStr;
}

export function isPreviousDay(
  baseTimezone: string,
  targetTimezone: string,
  date = new Date(),
): boolean {
  const baseDate = getTimeInTimezone(baseTimezone, date);
  const targetDate = getTimeInTimezone(targetTimezone, date);

  const baseDateStr = format(baseDate, "yyyy-MM-dd");
  const targetDateStr = format(targetDate, "yyyy-MM-dd");

  // Compare calendar date strings lexicographically
  return targetDateStr < baseDateStr;
}
