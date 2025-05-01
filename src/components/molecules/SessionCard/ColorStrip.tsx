import * as React from 'react';
import { cn } from '../../../lib/utils';

type ColorType = "blue" | "green" | "red" | "yellow" | "purple" | "gray";

interface ColorStripProps {
  color?: ColorType;
  clipStyle?: "normal" | "notched" | "slanted";
  isSkewed?: boolean;
  variant?: "elevated" | "flat";
}

export function ColorStrip({ color, clipStyle = "normal", isSkewed = false, variant = "elevated" }: ColorStripProps) {
  if (!color) return null;

  const getColorStripClass = () => {
    switch (color) {
      case "blue": return "bg-blue-500";
      case "green": return "bg-green-500";
      case "red": return "bg-red-500";
      case "yellow": return "bg-yellow-500";
      case "purple": return "bg-purple-500";
      case "gray": return "bg-gray-500";
      default: return "";
    }
  };

  const roundedClass = variant === "flat" 
    ? clipStyle === "normal" && !isSkewed && "rounded-t-xl" 
    : clipStyle === "normal" && !isSkewed && "rounded-t-[24px]";

  return (
    <div
      className={cn(
        "absolute top-0 left-0 right-0 h-1 z-10",
        roundedClass,
        getColorStripClass()
      )}
    ></div>
  );
} 