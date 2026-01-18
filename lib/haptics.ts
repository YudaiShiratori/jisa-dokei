import * as Haptics from "expo-haptics";

/**
 * 統一ハプティクフィードバックユーティリティ
 * アプリ全体で一貫したハプティク体験を提供
 */

/** ボタンタップ時の軽いフィードバック */
export function triggerLight(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

/** 中程度のアクション（ドラッグ開始など） */
export function triggerMedium(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

/** 重要なアクション（確定など） */
export function triggerHeavy(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}

/** 成功フィードバック */
export function triggerSuccess(): void {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

/** 警告フィードバック */
export function triggerWarning(): void {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
}

/** エラーフィードバック */
export function triggerError(): void {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

/** 選択変更時のフィードバック */
export function triggerSelection(): void {
  Haptics.selectionAsync();
}

/**
 * ドラッグ操作用ハプティク
 */
export const drag = {
  /** ドラッグ開始時 */
  start: triggerMedium,
  /** ドラッグ中の位置変更時 */
  move: triggerLight,
  /** ドラッグ完了時 */
  end: triggerSuccess,
  /** ドラッグキャンセル時 */
  cancel: triggerLight,
};
