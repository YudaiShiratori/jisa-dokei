import { Ionicons } from "@expo/vector-icons";
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

  return (
    <SafeAreaView className="flex-1 bg-secondary-900" edges={["left", "right"]}>
      <ScrollView className="flex-1 px-4">
        <View className="py-6 items-center border-b border-secondary-700 mb-6">
          <Text className="text-secondary-400 text-sm mb-2">現在の時刻</Text>
          <DigitalClock timezone={localTimezone} size="xl" />
        </View>

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-white">世界の都市</Text>
          <Link href="/add-city" asChild>
            <Pressable className="flex-row items-center bg-primary-500 px-4 py-2 rounded-full active:opacity-80">
              <Ionicons name="add" size={20} color="white" />
              <Text className="text-white font-semibold ml-1">追加</Text>
            </Pressable>
          </Link>
        </View>

        {cities.length === 0 ? (
          <View className="items-center py-12">
            <Ionicons name="globe-outline" size={48} color="#94a3b8" />
            <Text className="text-secondary-400 mt-4 text-center">
              都市が追加されていません{"\n"}「追加」ボタンをタップして{"\n"}
              都市を追加してください
            </Text>
          </View>
        ) : (
          cities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onRemove={() => removeCity(city.id)}
            />
          ))
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
