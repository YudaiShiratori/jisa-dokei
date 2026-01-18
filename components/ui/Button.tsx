import { forwardRef } from "react";
import { Pressable, type PressableProps, Text } from "react-native";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ variant = "primary", size = "md", children, style, ...props }, ref) => {
  const baseStyle =
    "rounded-lg items-center justify-center flex-row active:opacity-80";

  const variantStyles = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-600",
    outline: "border-2 border-primary-500 bg-transparent",
    ghost: "bg-transparent",
  };

  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textVariantStyles = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-primary-500",
    ghost: "text-primary-500",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <Pressable
      ref={ref}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`}
      style={style}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={`font-semibold ${textVariantStyles[variant]} ${textSizeStyles[size]}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
});

Button.displayName = "Button";
