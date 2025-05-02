import React, { useState } from 'react';
import IndicatorMarker from '../atoms/IndicatorMarker';

interface ImageViewerProps {
  src: string;
  alt?: string;
  indicators?: {
    x: number;
    y: number;
    color?: string;
  }[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt = '', indicators = [] }) => {
  const [selectedIndicator, setSelectedIndicator] = useState<number | null>(null);
  
  const handleIndicatorClick = (index: number) => {
    setSelectedIndicator(index === selectedIndicator ? null : index);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative max-w-full max-h-full">
        <img 
          src={src} 
          alt={alt} 
          className="object-contain max-h-[calc(100vh-140px)]" 
        />
        
        {indicators?.map((indicator, index) => (
          <IndicatorMarker
            key={index}
            x={indicator.x}
            y={indicator.y}
            color={indicator.color}
            onClick={() => handleIndicatorClick(index)}
            isSelected={selectedIndicator === index}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageViewer; 