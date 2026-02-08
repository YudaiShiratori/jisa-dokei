import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/ui/Card";
import { CITIES, type City } from "@/lib/cities";
import { triggerLight, triggerMedium, triggerWarning } from "@/lib/haptics";
import { useCitiesStore } from "@/store/cities";
import { useSettingsStore } from "@/store/settings";

// Sort cities by country name for easier browsing
const sortedCities = [...CITIES].sort((a, b) =>
  a.country.localeCompare(b.country, "ja"),
);

function SettingRow({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center py-4 border-b border-secondary-800"
      accessibilityRole={onPress ? "button" : "none"}
      accessibilityLabel={subtitle ? `${title}、${subtitle}` : title}
    >
      <View className="w-10 h-10 bg-primary-900/30 rounded-xl items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#0ea5e9" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-medium text-white">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-secondary-400">{subtitle}</Text>
        )}
      </View>
      {rightElement ||
        (onPress && (
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        ))}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { timeFormat, localTimezone, toggle24Hour, setLocalTimezone } =
    useSettingsStore();
  const { clearAllCities } = useCitiesStore();

  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  const localCity =
    CITIES.find((c) => c.timezone === localTimezone) || CITIES[0];

  const handleToggle24Hour = () => {
    triggerLight();
    toggle24Hour();
  };

  const handleClearCities = () => {
    triggerWarning();
    Alert.alert(
      "都市リストをリセット",
      "追加した都市をすべて削除し、初期状態に戻しますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "リセット",
          style: "destructive",
          onPress: () => {
            triggerWarning();
            clearAllCities();
          },
        },
      ],
    );
  };

  const handleTimezoneSelect = (timezone: string) => {
    triggerMedium();
    setLocalTimezone(timezone);
    setShowTimezoneModal(false);
  };

  const renderTimezoneItem = ({ item: city }: { item: City }) => (
    <Pressable
      onPress={() => handleTimezoneSelect(city.timezone)}
      className={`flex-row items-center px-4 py-4 border-b border-secondary-800 ${
        city.timezone === localTimezone
          ? "bg-primary-900/20"
          : "active:bg-secondary-800"
      }`}
    >
      <Text className="text-2xl mr-3">{city.flag}</Text>
      <View className="flex-1">
        <Text className="text-base font-medium text-white">{city.name}</Text>
        <Text className="text-sm text-secondary-400">{city.timezone}</Text>
      </View>
      {city.timezone === localTimezone && (
        <Ionicons name="checkmark-circle" size={24} color="#0ea5e9" />
      )}
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-secondary-900" edges={["left", "right"]}>
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-sm font-medium text-secondary-400 mb-2 ml-1">
            時刻表示
          </Text>
          <Card variant="default" className="mb-6">
            <SettingRow
              icon="time-outline"
              title="24時間表示"
              subtitle={timeFormat.use24Hour ? "14:30" : "2:30 PM"}
              rightElement={
                <Switch
                  value={timeFormat.use24Hour}
                  onValueChange={handleToggle24Hour}
                  trackColor={{ false: "#cbd5e1", true: "#0ea5e9" }}
                  accessibilityLabel="24時間表示"
                  accessibilityState={{ checked: timeFormat.use24Hour }}
                />
              }
            />
          </Card>

          <Text className="text-sm font-medium text-secondary-400 mb-2 ml-1">
            一般
          </Text>
          <Card variant="default" className="mb-6">
            <SettingRow
              icon="location-outline"
              title="現在地のタイムゾーン"
              subtitle={`${localCity.flag} ${localCity.name}`}
              onPress={() => setShowTimezoneModal(true)}
            />
          </Card>

          <Text className="text-sm font-medium text-secondary-400 mb-2 ml-1">
            データ
          </Text>
          <Card variant="default">
            <SettingRow
              icon="refresh-outline"
              title="都市リストをリセット"
              subtitle="追加した都市をすべて削除"
              onPress={handleClearCities}
            />
          </Card>

          <View className="items-center mt-8">
            <Text className="text-secondary-500 text-sm">時差時計 v1.0.0</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showTimezoneModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView className="flex-1 bg-secondary-900">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-secondary-700">
            <Text className="text-lg font-semibold text-white">
              タイムゾーン
            </Text>
            <Pressable
              onPress={() => setShowTimezoneModal(false)}
              className="p-2"
            >
              <Ionicons name="close" size={24} color="#64748b" />
            </Pressable>
          </View>
          <FlatList
            data={sortedCities}
            renderItem={renderTimezoneItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={30}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews={true}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
