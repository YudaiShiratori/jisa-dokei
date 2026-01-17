import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DigitalClock } from "@/components/DigitalClock";
import { Card } from "@/components/ui/Card";
import { useClock, useTimeDifference } from "@/hooks/use-clock";
import { CITIES, type City } from "@/lib/cities";

function CitySelector({
  visible,
  onClose,
  onSelect,
  selectedId,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: City) => void;
  selectedId: string;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
          <Text className="text-lg font-semibold text-secondary-900 dark:text-white">
            都市を選択
          </Text>
          <Pressable onPress={onClose} className="p-2">
            <Ionicons name="close" size={24} color="#64748b" />
          </Pressable>
        </View>
        <ScrollView>
          {CITIES.map((city) => (
            <Pressable
              key={city.id}
              onPress={() => {
                onSelect(city);
                onClose();
              }}
              className={`flex-row items-center px-4 py-4 border-b border-secondary-100 dark:border-secondary-800 ${
                city.id === selectedId
                  ? "bg-primary-50 dark:bg-primary-900/20"
                  : "active:bg-secondary-50 dark:active:bg-secondary-800"
              }`}
            >
              <Text className="text-2xl mr-3">{city.flag}</Text>
              <View className="flex-1">
                <Text className="text-base font-medium text-secondary-900 dark:text-white">
                  {city.name}
                </Text>
                <Text className="text-sm text-secondary-500 dark:text-secondary-400">
                  {city.country}
                </Text>
              </View>
              {city.id === selectedId && (
                <Ionicons name="checkmark-circle" size={24} color="#0ea5e9" />
              )}
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default function CalculatorScreen() {
  const [city1, setCity1] = useState<City>(CITIES[0]);
  const [city2, setCity2] = useState<City>(CITIES[1]);
  const [showSelector1, setShowSelector1] = useState(false);
  const [showSelector2, setShowSelector2] = useState(false);

  const timeDiff = useTimeDifference(city1.timezone, city2.timezone);
  useClock(city1.timezone);
  useClock(city2.timezone);

  const swapCities = () => {
    const temp = city1;
    setCity1(city2);
    setCity2(temp);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-secondary-50 dark:bg-secondary-900"
      edges={["left", "right"]}
    >
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Card variant="elevated" className="mb-4">
            <Pressable
              onPress={() => setShowSelector1(true)}
              className="flex-row items-center justify-between mb-4"
            >
              <View className="flex-row items-center">
                <Text className="text-3xl mr-3">{city1.flag}</Text>
                <View>
                  <Text className="text-xl font-bold text-secondary-900 dark:text-white">
                    {city1.name}
                  </Text>
                  <Text className="text-sm text-secondary-500 dark:text-secondary-400">
                    {city1.country}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>
            <View className="items-center">
              <DigitalClock timezone={city1.timezone} size="lg" />
            </View>
          </Card>

          <View className="items-center my-2">
            <Pressable
              onPress={swapCities}
              className="bg-primary-500 rounded-full p-3 active:opacity-80"
            >
              <Ionicons name="swap-vertical" size={24} color="white" />
            </Pressable>
          </View>

          <Card variant="elevated" className="mt-4">
            <Pressable
              onPress={() => setShowSelector2(true)}
              className="flex-row items-center justify-between mb-4"
            >
              <View className="flex-row items-center">
                <Text className="text-3xl mr-3">{city2.flag}</Text>
                <View>
                  <Text className="text-xl font-bold text-secondary-900 dark:text-white">
                    {city2.name}
                  </Text>
                  <Text className="text-sm text-secondary-500 dark:text-secondary-400">
                    {city2.country}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </Pressable>
            <View className="items-center">
              <DigitalClock timezone={city2.timezone} size="lg" />
            </View>
          </Card>

          <Card variant="elevated" className="mt-6">
            <Text className="text-center text-secondary-500 dark:text-secondary-400 mb-2">
              時差
            </Text>
            <Text className="text-center text-4xl font-bold text-primary-500">
              {timeDiff.formatted}
            </Text>
            <View className="flex-row justify-center mt-3">
              {timeDiff.isNextDay && (
                <View className="bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                  <Text className="text-primary-600 dark:text-primary-400 font-medium">
                    {city2.name}は翌日
                  </Text>
                </View>
              )}
              {timeDiff.isPreviousDay && (
                <View className="bg-secondary-100 dark:bg-secondary-700 px-3 py-1 rounded-full">
                  <Text className="text-secondary-600 dark:text-secondary-400 font-medium">
                    {city2.name}は前日
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </View>
      </ScrollView>

      <CitySelector
        visible={showSelector1}
        onClose={() => setShowSelector1(false)}
        onSelect={setCity1}
        selectedId={city1.id}
      />
      <CitySelector
        visible={showSelector2}
        onClose={() => setShowSelector2(false)}
        onSelect={setCity2}
        selectedId={city2.id}
      />
    </SafeAreaView>
  );
}
