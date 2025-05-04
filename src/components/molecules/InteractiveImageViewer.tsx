import React, { useRef, useState } from 'react';
import { Indicator } from '../../store/slices/clickIndicatorSlice';

interface InteractiveImageViewerProps {
  src: string;
  alt?: string;
  indicators?: Indicator[];
  isInteractionEnabled?: boolean; // Để kích hoạt/vô hiệu khả năng tương tác
  onImageClick?: (x: number, y: number) => void;
  onIndicatorClick?: (id: string) => void;
}

const InteractiveImageViewer: React.FC<InteractiveImageViewerProps> = ({
  src,
  alt = 'Vehicle image',
  indicators = [],
  isInteractionEnabled = false,
  onImageClick,
  onIndicatorClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handler cho click vào ảnh
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractionEnabled || !onImageClick || !containerRef.current) return;

    // Lấy vị trí click tương đối so với kích thước ảnh
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onImageClick(x, y);
  };

  // Handler cho click vào indicator
  const handleIndicatorClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation(); // Ngăn không cho bubble lên image click
    if (onIndicatorClick) {
      onIndicatorClick(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ cursor: isInteractionEnabled ? 'crosshair' : 'default' }}
      onClick={handleImageClick}
    >
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onLoad={() => setImageLoaded(true)}
      />

      {/* Indicators */}
      {imageLoaded &&
        indicators.map((indicator) => (
          <div
            key={indicator.id}
            className={`absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10 ${
              indicator.isHighlighted 
                ? 'ring-4 ring-white scale-125 z-20' 
                : ''
            }`}
            style={{
              left: `${indicator.x}%`,
              top: `${indicator.y}%`,
              backgroundColor: indicator.color,
              boxShadow: indicator.isHighlighted 
                ? '0 0 0 2px rgba(0, 0, 0, 0.2), 0 0 10px 2px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.3)' 
                : '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => handleIndicatorClick(e, indicator.id)}
          />
        ))}
    </div>
  );
};

export default InteractiveImageViewer; 