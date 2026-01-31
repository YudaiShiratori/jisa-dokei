/**
 * 時差の値に基づいて表示色のクラス名を返す
 * - プラス時差（進んでいる）: 緑色
 * - マイナス時差（遅れている）: 赤色
 * - 同一時間: グレー
 */
export function getTimeDiffColorClass(hours: number): string {
  if (hours > 0) return "text-emerald-400";
  if (hours < 0) return "text-rose-400";
  return "text-secondary-400";
}
