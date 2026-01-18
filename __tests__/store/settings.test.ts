import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(() => Promise.resolve(null)),
    setItem: vi.fn(() => Promise.resolve()),
    removeItem: vi.fn(() => Promise.resolve()),
  },
}));

describe("useSettingsStore", () => {
  beforeEach(async () => {
    vi.resetModules();
  });

  it("should have default settings", async () => {
    const { useSettingsStore } = await import("@/store/settings");
    const state = useSettingsStore.getState();

    expect(state.timeFormat.use24Hour).toBe(true);
    expect(state.timeFormat.showSeconds).toBe(false);
    expect(state.localTimezone).toBe("Asia/Tokyo");
  });

  it("should toggle 24-hour format", async () => {
    const { useSettingsStore } = await import("@/store/settings");

    expect(useSettingsStore.getState().timeFormat.use24Hour).toBe(true);

    useSettingsStore.getState().toggle24Hour();

    expect(useSettingsStore.getState().timeFormat.use24Hour).toBe(false);

    useSettingsStore.getState().toggle24Hour();

    expect(useSettingsStore.getState().timeFormat.use24Hour).toBe(true);
  });

  it("should toggle show seconds", async () => {
    const { useSettingsStore } = await import("@/store/settings");

    expect(useSettingsStore.getState().timeFormat.showSeconds).toBe(false);

    useSettingsStore.getState().toggleShowSeconds();

    expect(useSettingsStore.getState().timeFormat.showSeconds).toBe(true);

    useSettingsStore.getState().toggleShowSeconds();

    expect(useSettingsStore.getState().timeFormat.showSeconds).toBe(false);
  });

  it("should set local timezone", async () => {
    const { useSettingsStore } = await import("@/store/settings");

    useSettingsStore.getState().setLocalTimezone("America/New_York");

    expect(useSettingsStore.getState().localTimezone).toBe("America/New_York");
  });

  it("should set time format", async () => {
    const { useSettingsStore } = await import("@/store/settings");

    useSettingsStore.getState().setTimeFormat({
      use24Hour: false,
      showSeconds: true,
    });

    expect(useSettingsStore.getState().timeFormat.use24Hour).toBe(false);
    expect(useSettingsStore.getState().timeFormat.showSeconds).toBe(true);
  });
});
