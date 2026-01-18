import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback, useRef } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { drag as hapticDrag } from "@/lib/haptics";
import type { UserCity } from "@/types";
import { CityCard } from "./CityCard";

const ITEM_HEIGHT = 140;
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
};

interface DraggableCityListProps {
  cities: UserCity[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  onRemove: (cityId: string) => void;
}

interface DraggableItemProps {
  city: UserCity;
  index: number;
  activeIndex: SharedValue<number>;
  onDragStart: (index: number) => void;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  onRemove: () => void;
  citiesCount: number;
}

const DraggableItem = memo(function DraggableItem({
  city,
  index,
  activeIndex,
  onDragStart,
  onDragEnd,
  onRemove,
  citiesCount,
}: DraggableItemProps) {
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const startIndex = useRef(index);
  const currentIndex = useRef(index);

  const calculateNewIndex = useCallback(
    (translateYValue: number) => {
      const offsetFromStart = translateYValue;
      const indexOffset = Math.round(offsetFromStart / ITEM_HEIGHT);
      const newIndex = Math.max(
        0,
        Math.min(citiesCount - 1, startIndex.current + indexOffset),
      );
      return newIndex;
    },
    [citiesCount],
  );

  const panGesture = Gesture.Pan()
    .activateAfterLongPress(200)
    .onStart(() => {
      isDragging.value = true;
      startIndex.current = index;
      currentIndex.current = index;
      activeIndex.value = index;
      runOnJS(hapticDrag.start)();
      runOnJS(onDragStart)(index);
    })
    .onUpdate((event) => {
      translateY.value = event.translationY;
      const newIndex = calculateNewIndex(event.translationY);
      if (newIndex !== currentIndex.current) {
        currentIndex.current = newIndex;
        runOnJS(hapticDrag.move)();
      }
    })
    .onEnd(() => {
      const finalIndex = calculateNewIndex(translateY.value);
      translateY.value = withSpring(0, SPRING_CONFIG);
      isDragging.value = false;
      activeIndex.value = -1;
      runOnJS(hapticDrag.end)();
      if (startIndex.current !== finalIndex) {
        runOnJS(onDragEnd)(startIndex.current, finalIndex);
      }
    })
    .onFinalize(() => {
      translateY.value = withSpring(0, SPRING_CONFIG);
      isDragging.value = false;
      activeIndex.value = -1;
    });

  const animatedStyle = useAnimatedStyle(() => {
    const isActive = isDragging.value;
    const scale = withSpring(isActive ? 1.02 : 1, SPRING_CONFIG);
    const elevation = isActive ? 8 : 0;
    const zIndex = isActive ? 100 : 1;

    // Calculate displacement when another item is being dragged
    let displacement = 0;
    if (activeIndex.value !== -1 && !isDragging.value) {
      const activeIdx = activeIndex.value;
      const myIdx = index;
      const translationInItems = Math.round(translateY.value / ITEM_HEIGHT);
      const targetIdx = activeIdx + translationInItems;

      if (activeIdx < myIdx && targetIdx >= myIdx) {
        displacement = -ITEM_HEIGHT;
      } else if (activeIdx > myIdx && targetIdx <= myIdx) {
        displacement = ITEM_HEIGHT;
      }
    }

    return {
      transform: [
        {
          translateY: isDragging.value
            ? translateY.value
            : withTiming(displacement, { duration: 200 }),
        },
        { scale },
      ],
      elevation,
      zIndex,
      shadowOpacity: withTiming(isActive ? 0.3 : 0, { duration: 200 }),
      shadowRadius: withTiming(isActive ? 10 : 0, { duration: 200 }),
      shadowOffset: { width: 0, height: isActive ? 5 : 0 },
      shadowColor: "#000",
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[{ marginBottom: 16 }, animatedStyle]}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
        layout={Layout.springify()}
      >
        <View className="flex-row items-center">
          <View className="mr-3 py-4">
            <Ionicons name="menu" size={24} color="#64748b" />
          </View>
          <View className="flex-1">
            <CityCard city={city} showRemoveButton={false} />
          </View>
          <Pressable
            onPress={onRemove}
            accessibilityLabel={`${city.name}を削除`}
            accessibilityRole="button"
            className="ml-3 p-2 active:opacity-60"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={24} color="#64748b" />
          </Pressable>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

export function DraggableCityList({
  cities,
  onReorder,
  onRemove,
}: DraggableCityListProps) {
  const activeIndex = useSharedValue(-1);

  const handleDragStart = useCallback((_index: number) => {
    // ドラッグ開始時の処理（必要に応じて追加）
  }, []);

  const handleDragEnd = useCallback(
    (fromIndex: number, toIndex: number) => {
      onReorder(fromIndex, toIndex);
    },
    [onReorder],
  );

  if (cities.length === 0) {
    return null;
  }

  return (
    <View className="gap-0">
      {cities.map((city, index) => (
        <DraggableItem
          key={city.id}
          city={city}
          index={index}
          activeIndex={activeIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onRemove={() => onRemove(city.id)}
          citiesCount={cities.length}
        />
      ))}
    </View>
  );
}
