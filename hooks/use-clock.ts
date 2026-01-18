import { useCallback, useEffect, useState } from "react";
import {
  formatDateInTimezone,
  formatTimeInTimezone,
  getTimeDifference,
  getUtcOffset,
  isNextDay,
  isPreviousDay,
} from "@/lib/timezone";
import { useSettingsStore } from "@/store/settings";

interface ClockState {
  time: string;
  date: string;
  utcOffset: string;
}

/**
 * Pure function to calculate clock state for a given timezone.
 * Extracted from the hook for testability and to avoid temporal dead zone issues.
 */
export function getClockState(
  timezone: string,
  use24Hour: boolean,
  showSeconds: boolean,
  date?: Date,
): ClockState {
  const formatStr = use24Hour
    ? showSeconds
      ? "HH:mm:ss"
      : "HH:mm"
    : showSeconds
      ? "h:mm:ss a"
      : "h:mm a";

  return {
    time: formatTimeInTimezone(timezone, formatStr, date),
    date: formatDateInTimezone(timezone, "M月d日 (E)", date),
    utcOffset: getUtcOffset(timezone, date),
  };
}

export function useClock(timezone: string) {
  const { timeFormat } = useSettingsStore();
  const [state, setState] = useState<ClockState>(() =>
    getClockState(timezone, timeFormat.use24Hour, timeFormat.showSeconds),
  );

  const updateClockState = useCallback(
    (tz: string): ClockState => {
      return getClockState(tz, timeFormat.use24Hour, timeFormat.showSeconds);
    },
    [timeFormat.use24Hour, timeFormat.showSeconds],
  );

  useEffect(() => {
    const updateClock = () => {
      setState(updateClockState(timezone));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [timezone, updateClockState]);

  return state;
}

interface TimeDifferenceResult {
  hours: number;
  minutes: number;
  formatted: string;
  isNextDay: boolean;
  isPreviousDay: boolean;
}

export function useTimeDifference(
  baseTimezone: string,
  targetTimezone: string,
): TimeDifferenceResult {
  const calculateDifference = useCallback((): TimeDifferenceResult => {
    const diff = getTimeDifference(baseTimezone, targetTimezone);
    return {
      ...diff,
      isNextDay: isNextDay(baseTimezone, targetTimezone),
      isPreviousDay: isPreviousDay(baseTimezone, targetTimezone),
    };
  }, [baseTimezone, targetTimezone]);

  const [result, setResult] = useState<TimeDifferenceResult>(() =>
    calculateDifference(),
  );

  useEffect(() => {
    const updateDifference = () => {
      setResult(calculateDifference());
    };

    updateDifference();
    const interval = setInterval(updateDifference, 60000);

    return () => clearInterval(interval);
  }, [calculateDifference]);

  return result;
}
