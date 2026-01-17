import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppSettings, ThemeMode, TimeFormat } from "@/types";

interface SettingsState extends AppSettings {
  setTimeFormat: (format: TimeFormat) => void;
  setTheme: (theme: ThemeMode) => void;
  setLocalTimezone: (timezone: string) => void;
  toggle24Hour: () => void;
  toggleShowSeconds: () => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  timeFormat: {
    use24Hour: true,
    showSeconds: false,
  },
  theme: "system",
  localTimezone: "Asia/Tokyo",
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,

      setTimeFormat: (format: TimeFormat) => {
        set({ timeFormat: format });
      },

      setTheme: (theme: ThemeMode) => {
        set({ theme });
      },

      setLocalTimezone: (timezone: string) => {
        set({ localTimezone: timezone });
      },

      toggle24Hour: () => {
        set((state) => ({
          timeFormat: {
            ...state.timeFormat,
            use24Hour: !state.timeFormat.use24Hour,
          },
        }));
      },

      toggleShowSeconds: () => {
        set((state) => ({
          timeFormat: {
            ...state.timeFormat,
            showSeconds: !state.timeFormat.showSeconds,
          },
        }));
      },
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
