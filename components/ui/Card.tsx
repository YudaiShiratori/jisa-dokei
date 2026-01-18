import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  variant?: "default" | "elevated";
}

export function Card({
  variant = "default",
  className = "",
  style,
  children,
  ...props
}: CardProps) {
  const baseStyle = "rounded-2xl p-5";

  const variantStyles = {
    default: "bg-secondary-800 border border-secondary-700",
    elevated: "bg-secondary-800",
  };

  const elevatedShadowStyle =
    variant === "elevated"
      ? {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }
      : {};

  return (
    <View
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      style={[elevatedShadowStyle, style]}
      {...props}
    >
      {children}
    </View>
  );
}
