import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  variant?: "default" | "elevated";
}

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  const baseStyle = "rounded-2xl p-4";

  const variantStyles = {
    default: "bg-secondary-800 border border-secondary-700",
    elevated: "bg-secondary-800 shadow-lg shadow-secondary-900/10",
  };

  return (
    <View
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
