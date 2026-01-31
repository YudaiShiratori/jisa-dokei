// 時差表示用の色定義
const TIME_DIFF_COLORS = {
  positive: "#34d399", // emerald-400
  negative: "#fb7185", // rose-400
  neutral: "#94a3b8", // secondary-400
} as const;

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

/**
 * 時差の値に基づいて表示色（カラーコード）を返す
 * - プラス時差（進んでいる）: 緑色
 * - マイナス時差（遅れている）: 赤色
 * - 同一時間: グレー
 *
 * @param hours - 時差の時間部分
 * @param minutes - 時差の分部分（デフォルト: 0）
 */
export function getTimeDiffColor(hours: number, minutes = 0): string {
  const totalMinutes = hours * 60 + minutes;
  if (totalMinutes > 0) return TIME_DIFF_COLORS.positive;
  if (totalMinutes < 0) return TIME_DIFF_COLORS.negative;
  return TIME_DIFF_COLORS.neutral;
}
