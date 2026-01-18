import { describe, expect, it } from "vitest";
import { CITIES, getCityById, searchCities } from "@/lib/cities";

describe("cities utilities", () => {
  it("returns Tokyo city by id", () => {
    const city = getCityById("tokyo");
    expect(city).toBeDefined();
    expect(city?.name).toBe("東京");
    expect(city?.timezone).toBe("Asia/Tokyo");
  });

  it("returns undefined for unknown city id", () => {
    const city = getCityById("unknown-city");
    expect(city).toBeUndefined();
  });

  it("searches cities by Japanese name", () => {
    const results = searchCities("東京");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe("東京");
  });

  it("searches cities by English name", () => {
    const results = searchCities("New York");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].nameEn).toBe("New York");
  });

  it("has all required cities", () => {
    expect(CITIES.length).toBeGreaterThanOrEqual(20);
    const tokyoExists = CITIES.some((c) => c.id === "tokyo");
    const newYorkExists = CITIES.some((c) => c.id === "new-york");
    expect(tokyoExists).toBe(true);
    expect(newYorkExists).toBe(true);
  });
});
