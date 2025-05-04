import React, { useRef, useState } from 'react';
import { Indicator } from '../../store/slices/clickIndicatorSlice';

interface ClickableImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  indicators?: Indicator[];
  onImageClick?: (x: number, y: number) => void;
  onIndicatorClick?: (id: string) => void;
}

const ClickableImage: React.FC<ClickableImageProps> = ({
  src,
  alt = 'Clickable image',
  width = '100%',
  height = 'auto',
  indicators = [],
  onImageClick,
  onIndicatorClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handler cho click vào ảnh
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onImageClick || !containerRef.current) return;

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
      className="relative inline-block"
      style={{ width, height, cursor: 'crosshair' }}
      onClick={handleImageClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onLoad={() => setImageLoaded(true)}
      />

      {/* Indicators */}
      {imageLoaded &&
        indicators.map((indicator) => (
          <div
            key={indicator.id}
            className={`absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              indicator.isHighlighted ? 'ring-4 ring-white' : ''
            }`}
            style={{
              left: `${indicator.x}%`,
              top: `${indicator.y}%`,
              backgroundColor: indicator.color,
              boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => handleIndicatorClick(e, indicator.id)}
          />
        ))}
    </div>
  );
};

export default ClickableImage; 