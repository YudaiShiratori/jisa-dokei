import { Text, View } from "react-native";
import { useClock } from "@/hooks/use-clock";

interface DigitalClockProps {
  timezone: string;
  size?: "sm" | "md" | "lg" | "xl";
  showDate?: boolean;
  showUtcOffset?: boolean;
}

export function DigitalClock({
  timezone,
  size = "md",
  showDate = true,
  showUtcOffset = true,
}: DigitalClockProps) {
  const { time, date, utcOffset } = useClock(timezone);

  const timeSizeStyles = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl",
  };

  const dateSizeStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <View className="items-center">
      <Text
        className={`font-mono font-bold text-secondary-900 dark:text-white ${timeSizeStyles[size]}`}
      >
        {time}
      </Text>
      {showDate && (
        <Text
          className={`text-secondary-500 dark:text-secondary-400 ${dateSizeStyles[size]}`}
        >
          {date}
        </Text>
      )}
      {showUtcOffset && (
        <Text
          className={`text-secondary-400 dark:text-secondary-500 ${dateSizeStyles[size]} mt-1`}
        >
          {utcOffset}
        </Text>
      )}
    </View>
  );
}
