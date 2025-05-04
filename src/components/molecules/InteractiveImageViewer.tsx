import React, { useRef, useState, useEffect } from 'react';
import { Indicator } from '../../store/slices/clickIndicatorSlice';

interface InteractiveImageViewerProps {
  src: string;
  alt?: string;
  indicators?: Indicator[];
  isInteractionEnabled?: boolean; // Để kích hoạt/vô hiệu khả năng tương tác
  onImageClick?: (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => void;
  onIndicatorClick?: (id: string) => void;
  onIndicatorDoubleClick?: (id: string) => void; // Thêm event handler cho double click
}

const InteractiveImageViewer: React.FC<InteractiveImageViewerProps> = ({
  src,
  alt = 'Vehicle image',
  indicators = [],
  isInteractionEnabled = false,
  onImageClick,
  onIndicatorClick,
  onIndicatorDoubleClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Logging mounted state and indicators for debugging
  useEffect(() => {
    console.log('InteractiveImageViewer: indicators length =', indicators.length);
    if (indicators.length > 0) {
      console.log('First indicator:', indicators[0]);
    }
  }, [indicators]);

  // Hàm xử lý khi click vào hình ảnh
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractionEnabled) return;
    
    // Lấy tọa độ click tương đối so với kích thước hình ảnh
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Kiểm tra xem click có nằm trong phạm vi của hình ảnh không
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // Kiểm tra nếu click nằm ngoài hình ảnh thì không xử lý
    if (clickX < rect.left || clickX > rect.right || clickY < rect.top || clickY > rect.bottom) {
      console.log('Click outside image area, ignoring');
      return;
    }
    
    // Tính toán tọa độ chuột theo phần trăm
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Truyền tọa độ và sự kiện chuột cho component cha
    if (onImageClick) {
      onImageClick(x, y, e);
    }
  };

  // Handler cho click vào indicator
  const handleIndicatorClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation(); // Ngăn không cho bubble lên image click
    if (onIndicatorClick) {
      onIndicatorClick(id);
    }
  };

  // Handler cho double click vào indicator
  const handleIndicatorDoubleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation(); // Ngăn không cho bubble lên image click
    if (onIndicatorDoubleClick) {
      onIndicatorDoubleClick(id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center interactive-image-container overflow-hidden"
      style={{ cursor: isInteractionEnabled ? 'crosshair' : 'default' }}
    >
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onLoad={() => setImageLoaded(true)}
        ref={imageRef}
        onClick={handleImageClick}
      />

      {/* Debug info */}
      <div className="absolute top-12 left-2 bg-gray-800 text-white px-2 py-1 rounded text-xs z-50">
        Indicators in viewer: {indicators.length}
      </div>

      {/* Indicators */}
      {imageLoaded && indicators && indicators.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {indicators.map((indicator) => (
            <div
              key={indicator.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
              style={{
                left: `${indicator.x}%`,
                top: `${indicator.y}%`,
                zIndex: 30,
              }}
              onClick={(e) => handleIndicatorClick(e, indicator.id)}
              onDoubleClick={(e) => handleIndicatorDoubleClick(e, indicator.id)}
            >
              {/* Main dot */}
              <div
                className={`w-5 h-5 rounded-full border-2 border-white transition-all duration-200`}
                style={{
                  backgroundColor: indicator.color || '#ef4444',
                  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.2)',
                }}
              />
              
              {/* Selection ring */}
              {indicator.isHighlighted && (
                <div
                  className="absolute inset-0 rounded-full border-2 border-white animate-pulse"
                  style={{ 
                    transform: 'scale(1.2)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractiveImageViewer; 