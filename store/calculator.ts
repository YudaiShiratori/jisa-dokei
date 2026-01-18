import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CITIES, type City } from "@/lib/cities";

interface CalculatorState {
  city1: City;
  city2: City;
  setCity1: (city: City) => void;
  setCity2: (city: City) => void;
  swapCities: () => void;
}

const tokyo = CITIES.find((c) => c.id === "tokyo") ?? CITIES[0];
const newYork = CITIES.find((c) => c.id === "new-york") ?? CITIES[1];

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      city1: tokyo,
      city2: newYork,
      setCity1: (city) => set({ city1: city }),
      setCity2: (city) => set({ city2: city }),
      swapCities: () =>
        set((state) => ({
          city1: state.city2,
          city2: state.city1,
        })),
    }),
    {
      name: "calculator-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
