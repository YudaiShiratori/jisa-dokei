/**
 * 時差の値に基づいて表示色のクラス名を返す
 * - プラス時差（進んでいる）: 緑色
 * - マイナス時差（遅れている）: 赤色
 * - 同一時間: グレー
 *
 * @param hours - 時差の時間部分
 * @param minutes - 時差の分部分（デフォルト: 0）
 */
export function getTimeDiffColorClass(hours: number, minutes = 0): string {
  const totalMinutes = hours * 60 + minutes;
  if (totalMinutes > 0) return "text-emerald-400";
  if (totalMinutes < 0) return "text-rose-400";
  return "text-secondary-400";
}
