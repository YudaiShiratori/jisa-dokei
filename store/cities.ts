import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CITIES, getCityById } from "@/lib/cities";
import type { UserCity } from "@/types";

interface CitiesState {
  cities: UserCity[];
  addCity: (cityId: string) => void;
  removeCity: (cityId: string) => void;
  reorderCities: (fromIndex: number, toIndex: number) => void;
  clearAllCities: () => void;
}

const DEFAULT_CITIES: UserCity[] = [
  {
    ...CITIES.find((c) => c.id === "tokyo")!,
    order: 0,
    addedAt: new Date(),
  },
  {
    ...CITIES.find((c) => c.id === "new-york")!,
    order: 1,
    addedAt: new Date(),
  },
  {
    ...CITIES.find((c) => c.id === "barcelona")!,
    order: 2,
    addedAt: new Date(),
  },
];

export const useCitiesStore = create<CitiesState>()(
  persist(
    (set) => ({
      cities: DEFAULT_CITIES,

      addCity: (cityId: string) => {
        const city = getCityById(cityId);
        if (!city) return;

        set((state) => {
          const exists = state.cities.some((c) => c.id === cityId);
          if (exists) return state;

          const newCity: UserCity = {
            ...city,
            order: state.cities.length,
            addedAt: new Date(),
          };

          return { cities: [...state.cities, newCity] };
        });
      },

      removeCity: (cityId: string) => {
        set((state) => ({
          cities: state.cities
            .filter((c) => c.id !== cityId)
            .map((c, index) => ({ ...c, order: index })),
        }));
      },

      reorderCities: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newCities = [...state.cities];
          const [movedCity] = newCities.splice(fromIndex, 1);
          newCities.splice(toIndex, 0, movedCity);

          return {
            cities: newCities.map((c, index) => ({ ...c, order: index })),
          };
        });
      },

      clearAllCities: () => {
        set({ cities: DEFAULT_CITIES });
      },
    }),
    {
      name: "cities-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
