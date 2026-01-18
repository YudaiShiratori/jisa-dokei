import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CITIES, searchCities } from "@/lib/cities";
import { useCitiesStore } from "@/store/cities";

// Sort cities by country name for easier browsing
const sortedCities = [...CITIES].sort((a, b) =>
  a.country.localeCompare(b.country, "ja"),
);

export default function AddCityScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { cities, addCity } = useCitiesStore();

  const filteredCities = useMemo(() => {
    if (searchQuery) {
      return searchCities(searchQuery);
    }
    return sortedCities;
  }, [searchQuery]);

  const existingCityIds = cities.map((c) => c.id);

  const handleAddCity = (cityId: string) => {
    addCity(cityId);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-900" edges={["bottom"]}>
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-secondary-800 rounded-xl px-4 py-3">
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-3 text-base text-white"
            placeholder="都市名で検索..."
            placeholderTextColor="#94a3b8"
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
      </View>

      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        initialNumToRender={30}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
        renderItem={({ item }) => {
          const isAdded = existingCityIds.includes(item.id);
          return (
            <Pressable
              onPress={() => !isAdded && handleAddCity(item.id)}
              disabled={isAdded}
              className={`flex-row items-center py-4 border-b border-secondary-800 ${
                isAdded ? "opacity-50" : "active:bg-secondary-800"
              }`}
            >
              <Text className="text-2xl mr-3">{item.flag}</Text>
              <View className="flex-1">
                <Text className="text-base font-medium text-white">
                  {item.name}
                </Text>
                <Text className="text-sm text-secondary-400">
                  {item.country} • {item.nameEn}
                </Text>
              </View>
              {isAdded ? (
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={24} color="#0ea5e9" />
                  <Text className="ml-2 text-primary-500 font-medium">
                    追加済み
                  </Text>
                </View>
              ) : (
                <Ionicons name="add-circle-outline" size={24} color="#94a3b8" />
              )}
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="search-outline" size={48} color="#94a3b8" />
            <Text className="text-secondary-400 mt-4 text-center">
              「{searchQuery}」に一致する都市が{"\n"}見つかりませんでした
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
