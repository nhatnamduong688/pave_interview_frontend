import React from 'react';

interface IndicatorMarkerProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  onClick?: () => void;
}

const IndicatorMarker: React.FC<IndicatorMarkerProps> = ({
  x,
  y,
  color = '#ef4444',
  size = 16,
  onClick
}) => {
  return (
    <button
      className="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`
      }}
      onClick={onClick}
    />
  );
};

export default IndicatorMarker; 