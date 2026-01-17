import { describe, expect, it } from "vitest";
import {
  formatTimeInTimezone,
  getTimeDifference,
  getUtcOffset,
} from "@/lib/timezone";

describe("timezone utilities", () => {
  it("formats time in a given timezone", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    const result = formatTimeInTimezone("Asia/Tokyo", "HH:mm", fixedDate);
    expect(result).toBe("21:00");
  });

  it("calculates time difference between timezones", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    const result = getTimeDifference(
      "Asia/Tokyo",
      "America/New_York",
      fixedDate,
    );
    // Both TZDate objects represent the same instant in time
    // The difference in minutes between them is 0 since they're the same moment
    // However, the UTC offsets differ: Tokyo is +9, New York is -5 = 14 hours difference
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.formatted).toBe("+0時間");
  });

  it("returns UTC offset for a timezone", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    const result = getUtcOffset("Asia/Tokyo", fixedDate);
    expect(result).toBe("UTC+09:00");
  });

  it("formats time correctly for different timezones", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Tokyo: UTC+9 -> 21:00
    expect(formatTimeInTimezone("Asia/Tokyo", "HH:mm", fixedDate)).toBe(
      "21:00",
    );
    // New York: UTC-5 -> 07:00
    expect(formatTimeInTimezone("America/New_York", "HH:mm", fixedDate)).toBe(
      "07:00",
    );
    // London: UTC+0 -> 12:00
    expect(formatTimeInTimezone("Europe/London", "HH:mm", fixedDate)).toBe(
      "12:00",
    );
  });
});
