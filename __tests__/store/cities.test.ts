import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(() => Promise.resolve(null)),
    setItem: vi.fn(() => Promise.resolve()),
    removeItem: vi.fn(() => Promise.resolve()),
  },
}));

describe("useCitiesStore", () => {
  beforeEach(async () => {
    vi.resetModules();
  });

  it("should have default cities with Tokyo", async () => {
    const { useCitiesStore } = await import("@/store/cities");
    const state = useCitiesStore.getState();

    expect(state.cities).toHaveLength(1);
    expect(state.cities[0].id).toBe("tokyo");
    expect(state.cities[0].order).toBe(0);
  });

  it("should add a city", async () => {
    const { useCitiesStore } = await import("@/store/cities");

    useCitiesStore.getState().addCity("new-york");

    const state = useCitiesStore.getState();
    expect(state.cities).toHaveLength(2);
    expect(state.cities[1].id).toBe("new-york");
    expect(state.cities[1].order).toBe(1);
  });

  it("should not add duplicate cities", async () => {
    const { useCitiesStore } = await import("@/store/cities");

    useCitiesStore.getState().addCity("new-york");
    useCitiesStore.getState().addCity("new-york");

    const state = useCitiesStore.getState();
    expect(state.cities).toHaveLength(2);
  });

  it("should not add non-existent city", async () => {
    const { useCitiesStore } = await import("@/store/cities");

    useCitiesStore.getState().addCity("non-existent-city");

    const state = useCitiesStore.getState();
    expect(state.cities).toHaveLength(1);
  });

  it("should remove a city", async () => {
    const { useCitiesStore } = await import("@/store/cities");

    useCitiesStore.getState().addCity("new-york");
    useCitiesStore.getState().addCity("london");

    expect(useCitiesStore.getState().cities).toHaveLength(3);

    useCitiesStore.getState().removeCity("new-york");

    const state = useCitiesStore.getState();
    expect(state.cities).toHaveLength(2);
    expect(state.cities.find((c) => c.id === "new-york")).toBeUndefined();
    expect(state.cities[0].order).toBe(0);
    expect(state.cities[1].order).toBe(1);
  });

  it("should reorder cities", async () => {
    const { useCitiesStore } = await import("@/store/cities");

    useCitiesStore.getState().addCity("new-york");
    useCitiesStore.getState().addCity("london");

    useCitiesStore.getState().reorderCities(0, 2);

    const state = useCitiesStore.getState();
    expect(state.cities[0].id).toBe("new-york");
    expect(state.cities[1].id).toBe("london");
    expect(state.cities[2].id).toBe("tokyo");
    expect(state.cities[0].order).toBe(0);
    expect(state.cities[1].order).toBe(1);
    expect(state.cities[2].order).toBe(2);
  });

  it("should clear all cities and reset to default", async () => {
    const { useCitiesStore } = await import("@/store/cities");

    useCitiesStore.getState().addCity("new-york");
    useCitiesStore.getState().addCity("london");

    expect(useCitiesStore.getState().cities).toHaveLength(3);

    useCitiesStore.getState().clearAllCities();

    const state = useCitiesStore.getState();
    expect(state.cities).toHaveLength(1);
    expect(state.cities[0].id).toBe("tokyo");
  });
});
