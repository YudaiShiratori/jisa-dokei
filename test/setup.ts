import type { ReactNode } from "react";
import { vi } from "vitest";

// Mock react-native-reanimated
vi.mock("react-native-reanimated", () => {
  const mockAnimatedComponent = (component: unknown) => component;
  const Reanimated = {
    default: {
      createAnimatedComponent: mockAnimatedComponent,
      View: "View",
      Text: "Text",
    },
    useSharedValue: (init: unknown) => ({ value: init }),
    useAnimatedStyle: () => ({}),
    useDerivedValue: (fn: () => unknown) => ({ value: fn() }),
    useAnimatedGestureHandler: () => ({}),
    withSpring: (val: unknown) => val,
    withTiming: (val: unknown) => val,
    withDelay: (_delay: number, val: unknown) => val,
    interpolate: (val: unknown) => val,
    Extrapolate: { CLAMP: "clamp", EXTEND: "extend" },
    runOnJS: (fn: unknown) => fn,
    runOnUI: (fn: unknown) => fn,
    SlideInRight: { duration: () => ({}) },
    SlideOutLeft: { duration: () => ({}) },
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
    Layout: { springify: () => ({}) },
    createAnimatedComponent: mockAnimatedComponent,
  };
  return Reanimated;
});

// Mock react-native-gesture-handler
vi.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: ({ children }: { children: ReactNode }) => children,
  GestureHandlerRootView: ({ children }: { children: ReactNode }) => children,
  GestureDetector: ({ children }: { children: ReactNode }) => children,
  Gesture: {
    Pan: () => ({
      onStart: () => ({}),
      onUpdate: () => ({}),
      onEnd: () => ({}),
      onChange: () => ({}),
      activateAfterLongPress: () => ({}),
    }),
  },
  State: {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  },
  Directions: {},
}));

// Mock expo-haptics
vi.mock("expo-haptics", () => ({
  impactAsync: vi.fn(),
  notificationAsync: vi.fn(),
  selectionAsync: vi.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
  NotificationFeedbackType: {
    Success: "success",
    Warning: "warning",
    Error: "error",
  },
}));

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(() => Promise.resolve(null)),
    setItem: vi.fn(() => Promise.resolve()),
    removeItem: vi.fn(() => Promise.resolve()),
    clear: vi.fn(() => Promise.resolve()),
    getAllKeys: vi.fn(() => Promise.resolve([])),
    multiGet: vi.fn(() => Promise.resolve([])),
    multiSet: vi.fn(() => Promise.resolve()),
    multiRemove: vi.fn(() => Promise.resolve()),
  },
}));

// Mock Ionicons
vi.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

// Mock expo-router
vi.mock("expo-router", () => ({
  Link: ({ children }: { children: ReactNode }) => children,
  router: {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  },
  useLocalSearchParams: () => ({}),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));
