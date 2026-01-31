import { describe, expect, it } from "vitest";
import { getTimeDiffColorClass } from "@/lib/colors";

describe("getTimeDiffColorClass", () => {
  it("プラス時差の場合は緑色を返す", () => {
    expect(getTimeDiffColorClass(1)).toBe("text-emerald-400");
    expect(getTimeDiffColorClass(9)).toBe("text-emerald-400");
  });

  it("マイナス時差の場合は赤色を返す", () => {
    expect(getTimeDiffColorClass(-1)).toBe("text-rose-400");
    expect(getTimeDiffColorClass(-12)).toBe("text-rose-400");
  });

  it("時差がゼロの場合はグレーを返す", () => {
    expect(getTimeDiffColorClass(0)).toBe("text-secondary-400");
  });
});
