import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY_COLOR = "#0ea5e9";
const INACTIVE_COLOR = "#64748b";
const TAB_BAR_BACKGROUND = "#0f172a";
const HEADER_BACKGROUND = "#1e293b";

function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
}) {
  return (
    <View className="items-center">
      <Ionicons size={focused ? 26 : 24} name={name} color={color} />
      {focused && (
        <View
          className="mt-1 h-1 w-6 rounded-full"
          style={{ backgroundColor: PRIMARY_COLOR }}
        />
      )}
    </View>
  );
}

const TAB_BAR_PADDING_TOP = 12;
const TAB_BAR_CONTENT_HEIGHT = 56;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, 20);

  const handleTabPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        headerShown: true,
        headerStyle: {
          backgroundColor: HEADER_BACKGROUND,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
        tabBarStyle: {
          backgroundColor: TAB_BAR_BACKGROUND,
          borderTopColor: "#334155",
          borderTopWidth: 1,
          paddingTop: TAB_BAR_PADDING_TOP,
          paddingBottom,
          height: TAB_BAR_PADDING_TOP + TAB_BAR_CONTENT_HEIGHT + paddingBottom,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 4,
        },
      }}
      screenListeners={{
        tabPress: handleTabPress,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "時計",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "time" : "time-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "時差計算",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calculator" : "calculator-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
