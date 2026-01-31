import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DigitalClock } from "@/components/DigitalClock";
import { Card } from "@/components/ui/Card";
import { useTimeDifference } from "@/hooks/use-clock";
import { useCalculatorStore } from "@/store/calculator";

export default function CalculatorScreen() {
  const { city1, city2, swapCities } = useCalculatorStore();
  const timeDiff = useTimeDifference(city1.timezone, city2.timezone);

  const handleSwap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    swapCities();
  };

  const handleSelectCity = (target: "1" | "2") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/select-city?target=${target}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900" edges={["left", "right"]}>
      <View className="flex-1 px-4">
        <View className="py-6">
          <Pressable onPress={() => handleSelectCity("1")}>
            <Card variant="elevated" className="mb-4">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Text className="text-3xl mr-3">{city1.flag}</Text>
                  <View>
                    <Text className="text-xl font-bold text-white">
                      {city1.name}
                    </Text>
                    <Text className="text-sm text-secondary-300">
                      {city1.country}
                    </Text>
                  </View>
                </View>
                <View className="bg-secondary-700 rounded-full px-3 py-1">
                  <Text className="text-secondary-300 text-sm">変更</Text>
                </View>
              </View>
              <View className="items-center">
                <DigitalClock timezone={city1.timezone} size="lg" />
              </View>
            </Card>
          </Pressable>

          <View className="items-center my-4">
            <Pressable
              onPress={handleSwap}
              className="bg-primary-500 rounded-full p-4 shadow-lg active:bg-primary-600"
              style={{
                shadowColor: "#0ea5e9",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons name="swap-vertical" size={28} color="white" />
            </Pressable>
          </View>

          <Pressable onPress={() => handleSelectCity("2")}>
            <Card variant="elevated" className="mt-4">
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  <Text className="text-3xl mr-3">{city2.flag}</Text>
                  <View>
                    <Text className="text-xl font-bold text-white">
                      {city2.name}
                    </Text>
                    <Text className="text-sm text-secondary-300">
                      {city2.country}
                    </Text>
                  </View>
                </View>
                <View className="bg-secondary-700 rounded-full px-3 py-1">
                  <Text className="text-secondary-300 text-sm">変更</Text>
                </View>
              </View>
              <View className="items-center">
                <DigitalClock timezone={city2.timezone} size="lg" />
              </View>
            </Card>
          </Pressable>

          <Card variant="elevated" className="mt-6">
            <Text className="text-center text-secondary-300 mb-2">時差</Text>
            <Text
              className={`text-center text-4xl font-bold ${
                timeDiff.hours > 0
                  ? "text-emerald-400"
                  : timeDiff.hours < 0
                    ? "text-rose-400"
                    : "text-secondary-400"
              }`}
            >
              {timeDiff.formatted}
            </Text>
            <View className="flex-row justify-center mt-3">
              {timeDiff.isNextDay && (
                <View className="bg-primary-900/30 px-3 py-1 rounded-full">
                  <Text className="text-primary-400 font-medium">
                    {city2.name}は翌日
                  </Text>
                </View>
              )}
              {timeDiff.isPreviousDay && (
                <View className="bg-secondary-700 px-3 py-1 rounded-full">
                  <Text className="text-secondary-300 font-medium">
                    {city2.name}は前日
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}
