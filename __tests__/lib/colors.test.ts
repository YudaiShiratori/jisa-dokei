import { describe, expect, it } from "vitest";
import { getTimeDiffColorClass } from "@/lib/colors";

describe("getTimeDiffColorClass", () => {
  it("Given プラス時差 When 判定する Then 緑色を返す", () => {
    expect(getTimeDiffColorClass(1)).toBe("text-emerald-400");
    expect(getTimeDiffColorClass(9)).toBe("text-emerald-400");
  });

  it("Given マイナス時差 When 判定する Then 赤色を返す", () => {
    expect(getTimeDiffColorClass(-1)).toBe("text-rose-400");
    expect(getTimeDiffColorClass(-12)).toBe("text-rose-400");
  });

  it("Given 時差がゼロ When 判定する Then グレーを返す", () => {
    expect(getTimeDiffColorClass(0)).toBe("text-secondary-400");
  });

  it("Given プラス分オフセット When 時間がゼロ Then 緑色を返す", () => {
    // +0:30 のようなケース
    expect(getTimeDiffColorClass(0, 30)).toBe("text-emerald-400");
    expect(getTimeDiffColorClass(0, 45)).toBe("text-emerald-400");
  });

  it("Given マイナス分オフセット When 時間がゼロ Then 赤色を返す", () => {
    // -0:30 のようなケース
    expect(getTimeDiffColorClass(0, -30)).toBe("text-rose-400");
    expect(getTimeDiffColorClass(0, -45)).toBe("text-rose-400");
  });

  it("Given 時間と分の複合オフセット When 判定する Then 総分で判定する", () => {
    // +1:30 → 緑
    expect(getTimeDiffColorClass(1, 30)).toBe("text-emerald-400");
    // -1:30 → 赤
    expect(getTimeDiffColorClass(-1, -30)).toBe("text-rose-400");
  });
});
