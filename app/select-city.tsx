import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CITIES, type City } from "@/lib/cities";
import { useCalculatorStore } from "@/store/calculator";

const sortedCities = [...CITIES].sort((a, b) =>
  a.country.localeCompare(b.country, "ja"),
);

export default function SelectCityScreen() {
  const { target } = useLocalSearchParams<{ target: "1" | "2" }>();
  const [searchQuery, setSearchQuery] = useState("");
  const { city1, city2, setCity1, setCity2 } = useCalculatorStore();

  const selectedCity = target === "1" ? city1 : city2;

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

  const handleSelectCity = (city: City) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (target === "1") {
      setCity1(city);
    } else {
      setCity2(city);
    }
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.back();
    }
  };

  const renderCity = ({ item }: { item: City }) => {
    const isSelected = item.id === selectedCity?.id;
    return (
      <Pressable
        onPress={() => handleSelectCity(item)}
        className={`flex-row items-center px-4 py-4 border-b border-secondary-800 active:bg-secondary-700 ${
          isSelected ? "bg-primary-900/20" : ""
        }`}
      >
        <Text className="text-2xl mr-3">{item.flag}</Text>
        <View className="flex-1">
          <Text className="text-base font-medium text-white">{item.name}</Text>
          <Text className="text-sm text-secondary-300">{item.country}</Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#0ea5e9" />
        )}
      </Pressable>
    );
  };

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
        <Text className="text-secondary-300 text-xs mt-2 ml-1">
          {filteredCities.length}件の都市
        </Text>
      </View>

      <FlatList
        data={filteredCities}
        renderItem={renderCity}
        keyExtractor={(item) => item.id}
        initialNumToRender={30}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}
