import React from 'react';

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
  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-contain" />
      
      {indicators.map((indicator, index) => (
        <div 
          key={index}
          className="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full"
          style={{ 
            left: `${indicator.x}%`, 
            top: `${indicator.y}%`,
            backgroundColor: indicator.color || '#ef4444'
          }}
        />
      ))}
    </div>
  );
};

export default ImageViewer; 