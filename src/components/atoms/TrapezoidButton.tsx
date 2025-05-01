import * as React from "react";
import {cn} from "../../lib/utils";

type SkewDegree = 'low' | 'medium' | 'high' | 'extreme';
type Direction = 'left' | 'right';
type HoverEffect = 'color' | 'pulse' | 'grow' | 'shadow' | 'none';

interface TrapezoidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  skewDegree?: SkewDegree;
  backgroundColor?: string;
  hoverColor?: string;
  direction?: Direction;
  hoverEffect?: HoverEffect;
  iconColor?: string;
  bottomCurve?: boolean;
  gridBackground?: boolean;
  isPanel?: boolean; // Xác định nếu đây là panel trigger
}

// Define the skew map outside the component
const skewMap: Record<SkewDegree, number> = {
  low: 15,
  medium: 25,
  high: 35,
  extreme: 45
};

const TrapezoidButton = React.forwardRef<HTMLButtonElement, TrapezoidButtonProps>(
  ({
    className,
    icon,
    skewDegree = 'medium',
    backgroundColor = "white",
    hoverColor,
    direction = 'left',
    hoverEffect = 'color',
    iconColor = '#9CA3AF',
    bottomCurve = true,
    gridBackground = false,
    isPanel = false,
    ...props
  }, ref) => {
    const skewDegreeValue = skewMap[skewDegree];
    const [isHovering, setIsHovering] = React.useState<boolean>(false);

    // Figma style panel button
    if (isPanel) {
      // Custom icon with the left-facing arrow as in Figma
      const defaultIcon = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 8L10 12L14 16" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

      return (
        <button
          className={cn(
            "relative flex flex-row items-center p-0",
            "w-[72px] h-[55px]",
            "shadow-[0px_1px_3px_-1px_rgba(0,0,0,0.12)]",
            "bg-transparent border-0",
            className
          )}
          ref={ref}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...props}
        >
          {/* Rectangle base */}
          <div className="w-[32px] h-[55px] bg-white" style={{ transform: 'matrix(1, 0, 0, -1, 0, 0)' }}></div>

          {/* Icon wrapper */}
          <div className="flex flex-col justify-center items-center p-0 pr-5 w-[40px] h-[55px] bg-white">
            <span className="flex items-center justify-center w-5 h-5">
              {icon || defaultIcon}
            </span>
          </div>
        </button>
      );
    }

    // Standard trapezoid button
    const getHoverStyles = (): React.CSSProperties => {
      let clipPath: string;

      // Tính toán các điểm nghiêng dựa trên mức độ skew
      const rightTopSkew = 100 - skewDegreeValue;

      if (direction === 'left') {
        // Left-side angled clip path with right-side slope
        clipPath = `polygon(0% 0%, 100% 0%, ${rightTopSkew}% 100%, 0% 100%)`;
      } else {
        // Right-side angled clip path
        clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, ${skewDegreeValue}% 100%)`;
      }

      const baseStyles: React.CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        backgroundColor: isHovering && hoverColor && hoverEffect !== 'none' ? hoverColor : backgroundColor,
        clipPath,
        boxShadow: bottomCurve ? '0 5px 10px -3px rgba(0, 0, 0, 0.1)' : 'none',
        backgroundImage: gridBackground
          ? 'linear-gradient(to right, rgba(243, 244, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(243, 244, 246, 0.1) 1px, transparent 1px)'
          : 'none',
        backgroundSize: '10px 10px'
      };

      // Add additional hover effects
      if (isHovering) {
        switch(hoverEffect) {
          case 'pulse':
            return {
              ...baseStyles,
              boxShadow: bottomCurve ? '0 0 0 rgba(66, 153, 225, 0.5)' : 'none',
              animation: 'pulse 1.5s infinite'
            };
          case 'grow':
            return {
              ...baseStyles,
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            };
          case 'shadow':
            return {
              ...baseStyles,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            };
          default:
            return baseStyles;
        }
      }

      return baseStyles;
    };

    // Custom icon with the left-facing arrow
    const defaultIcon = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke={iconColor} strokeWidth="2" />
        <path d="M14 8L10 12L14 16" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );

    return (
      <button
        className={cn(
          "relative flex items-center justify-center overflow-visible",
          "bg-transparent border-0 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300",
          "h-12 w-14",
          hoverEffect !== 'none' && "hover:scale-105",
          className
        )}
        ref={ref}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        {...props}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4);
              }
              70% {
                box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
              }
            }
          `
        }} />
        <div className="absolute inset-0 transition-all duration-200" style={getHoverStyles()} />
        <span className="relative z-10 flex items-center justify-center">
          {icon || defaultIcon}
        </span>
      </button>
    );
  }
);

TrapezoidButton.displayName = "TrapezoidButton";

export { TrapezoidButton };
