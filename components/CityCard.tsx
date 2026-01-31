import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useClock, useTimeDifference } from "@/hooks/use-clock";
import { getTimeDiffColor } from "@/lib/colors";
import { useSettingsStore } from "@/store/settings";
import type { UserCity } from "@/types";
import { Card } from "./ui/Card";

interface TimeDiffTextProps {
  hours: number;
  minutes: number;
  formatted: string;
}

const TimeDiffText = memo(function TimeDiffText({
  hours,
  minutes,
  formatted,
}: TimeDiffTextProps) {
  const color = getTimeDiffColor(hours, minutes);
  return (
    <Text className="text-base font-medium mt-1" style={{ color }}>
      {formatted}
    </Text>
  );
});

interface CityCardProps {
  city: UserCity;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export const CityCard = memo(function CityCard({
  city,
  onRemove,
  showRemoveButton = true,
}: CityCardProps) {
  const { localTimezone } = useSettingsStore();
  const { time, date } = useClock(city.timezone);
  const timeDiff = useTimeDifference(localTimezone, city.timezone);

  const accessibilityLabel = `${city.name}、${city.country}。現在時刻${time}、${timeDiff.formatted}`;

  return (
    <Card variant="elevated">
      <View
        className="flex-row items-center justify-between"
        accessible={true}
        accessibilityRole="summary"
        accessibilityLabel={accessibilityLabel}
      >
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-3xl mr-3">{city.flag}</Text>
            <View>
              <Text className="text-xl font-semibold text-white">
                {city.name}
              </Text>
              <Text className="text-sm text-secondary-300">{city.country}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-sm text-secondary-300">{date}</Text>
            {timeDiff.isNextDay && (
              <View className="ml-2 bg-primary-500/20 px-2.5 py-1 rounded-full">
                <Text className="text-xs font-medium text-primary-400">
                  翌日
                </Text>
              </View>
            )}
            {timeDiff.isPreviousDay && (
              <View className="ml-2 bg-secondary-700 px-2.5 py-1 rounded-full">
                <Text className="text-xs font-medium text-secondary-300">
                  前日
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="items-end">
          <Text className="text-4xl font-mono font-bold text-white">
            {time}
          </Text>
          <TimeDiffText
            hours={timeDiff.hours}
            minutes={timeDiff.minutes}
            formatted={timeDiff.formatted}
          />
        </View>

        {showRemoveButton && onRemove && (
          <Pressable
            onPress={onRemove}
            className="ml-4 p-2 -mr-2 active:opacity-60"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={`${city.name}を削除`}
          >
            <Ionicons name="close-circle" size={24} color="#64748b" />
          </Pressable>
        )}
      </View>
    </Card>
  );
});
