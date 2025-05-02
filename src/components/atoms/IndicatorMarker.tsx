import React from 'react';

interface IndicatorMarkerProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const IndicatorMarker: React.FC<IndicatorMarkerProps> = ({
  x,
  y,
  color = '#ef4444',
  size = 16,
  onClick,
  isSelected = false
}) => {
  return (
    <React.Fragment>
      {/* Main indicator dot */}
      <button
        className="absolute bg-red-500 border-2 border-white rounded-full z-10 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`
        }}
        onClick={onClick}
      />
      
      {/* Ripple effect when selected */}
      {isSelected && (
        <div 
          className="absolute rounded-full border-2 opacity-70 z-0 transform -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{ 
            left: `${x}%`, 
            top: `${y}%`,
            width: `${size * 1.5}px`,
            height: `${size * 1.5}px`,
            borderColor: color
          }}
        />
      )}
    </React.Fragment>
  );
};

export default IndicatorMarker; 