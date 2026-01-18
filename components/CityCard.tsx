import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useClock, useTimeDifference } from "@/hooks/use-clock";
import { useSettingsStore } from "@/store/settings";
import type { UserCity } from "@/types";
import { Card } from "./ui/Card";

interface CityCardProps {
  city: UserCity;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export function CityCard({
  city,
  onRemove,
  showRemoveButton = true,
}: CityCardProps) {
  const { localTimezone } = useSettingsStore();
  const { time, date } = useClock(city.timezone);
  const timeDiff = useTimeDifference(localTimezone, city.timezone);

  return (
    <Card variant="elevated" className="mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text className="text-2xl mr-2">{city.flag}</Text>
            <View>
              <Text className="text-lg font-semibold text-white">
                {city.name}
              </Text>
              <Text className="text-xs text-secondary-400">{city.country}</Text>
            </View>
          </View>
          <View className="flex-row items-center mt-2">
            <Text className="text-xs text-secondary-500">{date}</Text>
            {timeDiff.isNextDay && (
              <View className="ml-2 bg-primary-900/30 px-2 py-0.5 rounded-full">
                <Text className="text-xs text-primary-400">翌日</Text>
              </View>
            )}
            {timeDiff.isPreviousDay && (
              <View className="ml-2 bg-secondary-700 px-2 py-0.5 rounded-full">
                <Text className="text-xs text-secondary-400">前日</Text>
              </View>
            )}
          </View>
        </View>

        <View className="items-end">
          <Text className="text-3xl font-mono font-bold text-white">
            {time}
          </Text>
          <Text className="text-sm text-secondary-400">
            {timeDiff.formatted}
          </Text>
        </View>

        {showRemoveButton && onRemove && (
          <Pressable
            onPress={onRemove}
            className="ml-3 p-2 -mr-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle-outline" size={24} color="#94a3b8" />
          </Pressable>
        )}
      </View>
    </Card>
  );
}
