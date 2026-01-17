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

export function useClock(timezone: string) {
  const { timeFormat } = useSettingsStore();
  const [state, setState] = useState<ClockState>(() => getClockState(timezone));

  const getClockState = useCallback(
    (tz: string): ClockState => {
      const formatStr = timeFormat.use24Hour
        ? timeFormat.showSeconds
          ? "HH:mm:ss"
          : "HH:mm"
        : timeFormat.showSeconds
          ? "h:mm:ss a"
          : "h:mm a";

      return {
        time: formatTimeInTimezone(tz, formatStr),
        date: formatDateInTimezone(tz, "M月d日 (E)"),
        utcOffset: getUtcOffset(tz),
      };
    },
    [timeFormat.use24Hour, timeFormat.showSeconds],
  );

  useEffect(() => {
    const updateClock = () => {
      setState(getClockState(timezone));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [timezone, getClockState]);

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
