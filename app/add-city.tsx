import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CITIES, type City } from "@/lib/cities";
import { useCitiesStore } from "@/store/cities";

// Sort cities by country name for easier browsing
const sortedCities = [...CITIES].sort((a, b) =>
  a.country.localeCompare(b.country, "ja"),
);

export default function AddCityScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { cities, addCity } = useCitiesStore();

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedCities;
    }
    const query = searchQuery.toLowerCase().trim();
    return sortedCities.filter(
      (city) =>
        city.name.toLowerCase().includes(query) ||
        city.nameEn.toLowerCase().includes(query) ||
        city.country.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const existingCityIds = cities.map((c) => c.id);

  const handleAddCity = (cityId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addCity(cityId);
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.back();
    }
  };

  const renderCity = ({ item }: { item: City }) => {
    const isAdded = existingCityIds.includes(item.id);

    if (isAdded) {
      return (
        <View className="flex-row items-center py-4 px-4 border-b border-secondary-800 opacity-50">
          <Text className="text-2xl mr-3">{item.flag}</Text>
          <View className="flex-1">
            <Text className="text-base font-medium text-white">
              {item.name}
            </Text>
            <Text className="text-sm text-secondary-300">
              {item.country} • {item.nameEn}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={24} color="#0ea5e9" />
            <Text className="ml-2 text-primary-500 font-medium">追加済み</Text>
          </View>
        </View>
      );
    }

    return (
      <Pressable
        onPress={() => handleAddCity(item.id)}
        className="flex-row items-center py-4 px-4 border-b border-secondary-800 active:bg-secondary-800"
      >
        <Text className="text-2xl mr-3">{item.flag}</Text>
        <View className="flex-1">
          <Text className="text-base font-medium text-white">{item.name}</Text>
          <Text className="text-sm text-secondary-300">
            {item.country} • {item.nameEn}
          </Text>
        </View>
        <Ionicons name="add-circle-outline" size={24} color="#94a3b8" />
      </Pressable>
    );
  };

  const EmptyState = () => (
    <View className="items-center py-16 px-8">
      <View className="bg-secondary-800 rounded-full p-4 mb-4">
        <Ionicons name="search" size={48} color="#64748b" />
      </View>
      <Text className="text-white text-lg font-semibold mb-2">
        都市が見つかりません
      </Text>
      <Text className="text-secondary-400 text-center mb-6 leading-5">
        「{searchQuery}」に一致する都市が{"\n"}見つかりませんでした
      </Text>
      <View className="bg-secondary-800 rounded-xl p-4">
        <Text className="text-secondary-400 text-sm mb-2">検索のヒント:</Text>
        <Text className="text-secondary-300 text-sm">
          • 都市名: 東京、London{"\n"}• 国名: 日本、France{"\n"}• 英語名:
          Tokyo、Paris
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary-900" edges={["bottom"]}>
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-secondary-800 rounded-xl px-4 py-3">
          <Ionicons name="search" size={20} color="#94a3b8" />
          <TextInput
            className="flex-1 ml-3 text-base text-white"
            placeholder="都市名・国名で検索..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </Pressable>
          )}
        </View>
        <Text className="text-secondary-400 text-xs mt-2 ml-1">
          {filteredCities.length}件の都市
        </Text>
      </View>

      <FlatList
        data={filteredCities}
        renderItem={renderCity}
        keyExtractor={(item) => item.id}
        extraData={existingCityIds}
        ListEmptyComponent={EmptyState}
        initialNumToRender={30}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}
