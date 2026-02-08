import { describe, expect, it, vi } from "vitest";

// Mock zustand store
vi.mock("@/store/settings", () => ({
  useSettingsStore: () => ({
    timeFormat: {
      use24Hour: true,
    },
  }),
}));

describe("useClock", () => {
  it("should be importable without runtime errors", async () => {
    // This test verifies that the hook module can be imported without errors
    // The bug was: getClockState was used before it was defined (temporal dead zone)
    const module = await import("@/hooks/use-clock");
    expect(module.useClock).toBeDefined();
    expect(typeof module.useClock).toBe("function");
  });
});

describe("getClockState helper", () => {
  it("should calculate clock state for a given timezone", async () => {
    // After fixing, we should be able to test the clock state calculation
    const { getClockState } = await import("@/hooks/use-clock");
    const fixedDate = new Date("2024-01-15T12:00:00Z");

    const state = getClockState("Asia/Tokyo", true, fixedDate);

    // Tokyo is UTC+9, so 12:00 UTC = 21:00 Tokyo
    expect(state.time).toBe("21:00");
    expect(state.utcOffset).toBe("UTC+09:00");
  });

  it("should format time with 12-hour format when use24Hour is false", async () => {
    const { getClockState } = await import("@/hooks/use-clock");
    const fixedDate = new Date("2024-01-15T12:00:00Z");

    const state = getClockState("Asia/Tokyo", false, fixedDate);

    // 21:00 in 12-hour format = 9:00 PM
    expect(state.time).toBe("9:00 PM");
  });
});
