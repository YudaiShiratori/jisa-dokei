import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CityCard } from "@/components/CityCard";
import { DigitalClock } from "@/components/DigitalClock";
import { useCitiesStore } from "@/store/cities";
import { useSettingsStore } from "@/store/settings";

export default function HomeScreen() {
  const { cities, removeCity } = useCitiesStore();
  const { localTimezone } = useSettingsStore();

  const handleAddPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleRemoveCity = (cityId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    removeCity(cityId);
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900" edges={["left", "right"]}>
      <ScrollView className="flex-1 px-4">
        <View className="py-6 items-center border-b border-secondary-700 mb-6">
          <DigitalClock
            timezone={localTimezone}
            size="xl"
            showUtcOffset={false}
          />
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Text className="text-lg font-semibold text-white">世界の都市</Text>
            {cities.length > 0 && (
              <View className="ml-2 bg-secondary-700 px-2 py-0.5 rounded-full">
                <Text className="text-secondary-300 text-xs font-medium">
                  {cities.length}
                </Text>
              </View>
            )}
          </View>
          <Link href="/add-city" asChild>
            <Pressable
              className="flex-row items-center bg-primary-500 px-4 py-2.5 rounded-full active:bg-primary-600"
              onPressIn={handleAddPress}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text className="text-white font-semibold ml-1">追加</Text>
            </Pressable>
          </Link>
        </View>

        {cities.length === 0 ? (
          <View className="items-center py-16 px-8">
            <View className="bg-secondary-800 rounded-full p-6 mb-6">
              <Ionicons name="globe" size={64} color="#0ea5e9" />
            </View>
            <Text className="text-white text-xl font-semibold mb-2">
              世界中の時刻をチェック
            </Text>
            <Text className="text-secondary-300 text-center mb-8 leading-6">
              気になる都市を追加して{"\n"}いつでも現地時刻を確認できます
            </Text>
            <Link href="/add-city" asChild>
              <Pressable
                className="flex-row items-center bg-primary-500 px-6 py-3 rounded-full active:bg-primary-600"
                onPressIn={handleAddPress}
              >
                <Ionicons name="add-circle" size={24} color="white" />
                <Text className="text-white font-semibold text-base ml-2">
                  最初の都市を追加
                </Text>
              </Pressable>
            </Link>
          </View>
        ) : (
          <View className="gap-4">
            {cities.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                onRemove={() => handleRemoveCity(city.id)}
              />
            ))}
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
