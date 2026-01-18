import { describe, expect, it } from "vitest";
import {
  formatTimeInTimezone,
  getTimeDifference,
  getUtcOffset,
  isNextDay,
  isPreviousDay,
} from "@/lib/timezone";

describe("timezone utilities", () => {
  it("formats time in a given timezone", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    const result = formatTimeInTimezone("Asia/Tokyo", "HH:mm", fixedDate);
    expect(result).toBe("21:00");
  });

  it("calculates time difference between timezones", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Tokyo (UTC+9) vs New York (UTC-5 in January) = 14 hours difference
    // New York is 14 hours behind Tokyo
    const result = getTimeDifference(
      "Asia/Tokyo",
      "America/New_York",
      fixedDate,
    );
    expect(result.hours).toBe(-14);
    expect(result.minutes).toBe(0);
    expect(result.formatted).toBe("-14時間");
  });

  it("calculates time difference with positive offset", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // London (UTC+0) vs Tokyo (UTC+9) = Tokyo is 9 hours ahead
    const result = getTimeDifference("Europe/London", "Asia/Tokyo", fixedDate);
    expect(result.hours).toBe(9);
    expect(result.minutes).toBe(0);
    expect(result.formatted).toBe("+9時間");
  });

  it("calculates time difference with half-hour offset", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Tokyo (UTC+9) vs India (UTC+5:30) = India is 3.5 hours behind Tokyo
    const result = getTimeDifference("Asia/Tokyo", "Asia/Kolkata", fixedDate);
    expect(result.hours).toBe(-3);
    expect(result.minutes).toBe(30);
    expect(result.formatted).toBe("-3時間30分");
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

  it("calculates negative time difference under 1 hour correctly", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Darwin (UTC+9:30) vs Tokyo (UTC+9) = Tokyo is 30 minutes behind Darwin
    const result = getTimeDifference(
      "Australia/Darwin",
      "Asia/Tokyo",
      fixedDate,
    );
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(30);
    expect(result.formatted).toBe("-30分");
  });

  it("calculates positive time difference under 1 hour correctly", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Tokyo (UTC+9) vs Darwin (UTC+9:30) = Darwin is 30 minutes ahead of Tokyo
    const result = getTimeDifference(
      "Asia/Tokyo",
      "Australia/Darwin",
      fixedDate,
    );
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(30);
    expect(result.formatted).toBe("+30分");
  });
});

describe("isNextDay", () => {
  it("returns true when target timezone is in the next calendar day", () => {
    // 2024-01-15 23:00 UTC = 2024-01-16 08:00 Tokyo, 2024-01-15 18:00 New York
    const fixedDate = new Date("2024-01-15T23:00:00Z");
    // From New York's perspective (Jan 15), Tokyo (Jan 16) is the next day
    expect(isNextDay("America/New_York", "Asia/Tokyo", fixedDate)).toBe(true);
  });

  it("returns false when both timezones are on the same calendar day", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Both Tokyo and Seoul are on the same day at this time
    expect(isNextDay("Asia/Tokyo", "Asia/Seoul", fixedDate)).toBe(false);
  });

  it("returns false when target timezone is in the previous calendar day", () => {
    // 2024-01-15 02:00 UTC = 2024-01-15 11:00 Tokyo, 2024-01-14 21:00 New York
    const fixedDate = new Date("2024-01-15T02:00:00Z");
    // From Tokyo's perspective (Jan 15), New York (Jan 14) is the previous day
    expect(isNextDay("Asia/Tokyo", "America/New_York", fixedDate)).toBe(false);
  });
});

describe("isPreviousDay", () => {
  it("returns true when target timezone is in the previous calendar day", () => {
    // 2024-01-15 02:00 UTC = 2024-01-15 11:00 Tokyo, 2024-01-14 21:00 New York
    const fixedDate = new Date("2024-01-15T02:00:00Z");
    // From Tokyo's perspective (Jan 15), New York (Jan 14) is the previous day
    expect(isPreviousDay("Asia/Tokyo", "America/New_York", fixedDate)).toBe(
      true,
    );
  });

  it("returns false when both timezones are on the same calendar day", () => {
    const fixedDate = new Date("2024-01-15T12:00:00Z");
    // Both Tokyo and Seoul are on the same day at this time
    expect(isPreviousDay("Asia/Tokyo", "Asia/Seoul", fixedDate)).toBe(false);
  });

  it("returns false when target timezone is in the next calendar day", () => {
    // 2024-01-15 23:00 UTC = 2024-01-16 08:00 Tokyo, 2024-01-15 18:00 New York
    const fixedDate = new Date("2024-01-15T23:00:00Z");
    // From New York's perspective (Jan 15), Tokyo (Jan 16) is the next day
    expect(isPreviousDay("America/New_York", "Asia/Tokyo", fixedDate)).toBe(
      false,
    );
  });
});
