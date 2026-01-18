import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import { ThemeProvider } from "@/components/ThemeProvider";
import "react-native-reanimated";

import "../global.css";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function BackButton() {
  const handleBack = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else {
      router.back();
    }
  };

  return (
    <Pressable
      onPress={handleBack}
      hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
      style={{
        padding: 12,
        marginLeft: -8,
      }}
    >
      <Text style={{ fontSize: 24, color: "#ffffff" }}>←</Text>
    </Pressable>
  );
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "600", color: "#ffffff" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-city"
          options={{
            presentation: "modal",
            title: "都市を追加",
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="select-city"
          options={{
            presentation: "modal",
            title: "都市を選択",
            headerLeft: () => <BackButton />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
