import * as Haptics from "expo-haptics";
import { describe, expect, it, vi } from "vitest";
import {
  drag,
  triggerError,
  triggerHeavy,
  triggerLight,
  triggerMedium,
  triggerSelection,
  triggerSuccess,
  triggerWarning,
} from "@/lib/haptics";

vi.mock("expo-haptics", () => ({
  impactAsync: vi.fn(),
  notificationAsync: vi.fn(),
  selectionAsync: vi.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
}));

describe("haptics", () => {
  describe("インパクトフィードバック", () => {
    it("triggerLight は Light スタイルでハプティクを実行する", () => {
      triggerLight();
      expect(Haptics.impactAsync).toHaveBeenCalledWith("light");
    });

    it("triggerMedium は Medium スタイルでハプティクを実行する", () => {
      triggerMedium();
      expect(Haptics.impactAsync).toHaveBeenCalledWith("medium");
    });

    it("triggerHeavy は Heavy スタイルでハプティクを実行する", () => {
      triggerHeavy();
      expect(Haptics.impactAsync).toHaveBeenCalledWith("heavy");
    });
  });

  describe("通知フィードバック", () => {
    it("triggerSuccess は Success タイプでハプティクを実行する", () => {
      triggerSuccess();
      expect(Haptics.notificationAsync).toHaveBeenCalledWith("success");
    });

    it("triggerWarning は Warning タイプでハプティクを実行する", () => {
      triggerWarning();
      expect(Haptics.notificationAsync).toHaveBeenCalledWith("warning");
    });

    it("triggerError は Error タイプでハプティクを実行する", () => {
      triggerError();
      expect(Haptics.notificationAsync).toHaveBeenCalledWith("error");
    });
  });

  describe("選択フィードバック", () => {
    it("triggerSelection はセレクションハプティクを実行する", () => {
      triggerSelection();
      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });
  });

  describe("ドラッグ操作用ハプティク", () => {
    it("drag.start は Medium スタイルでハプティクを実行する", () => {
      drag.start();
      expect(Haptics.impactAsync).toHaveBeenCalledWith("medium");
    });

    it("drag.move は Light スタイルでハプティクを実行する", () => {
      drag.move();
      expect(Haptics.impactAsync).toHaveBeenCalledWith("light");
    });

    it("drag.end は Success タイプでハプティクを実行する", () => {
      drag.end();
      expect(Haptics.notificationAsync).toHaveBeenCalledWith("success");
    });

    it("drag.cancel は Light スタイルでハプティクを実行する", () => {
      drag.cancel();
      expect(Haptics.impactAsync).toHaveBeenCalledWith("light");
    });
  });
});
