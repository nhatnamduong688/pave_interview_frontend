import React from 'react';

interface ThumbnailPreviewBarProps {
  thumbnails: {
    id: string;
    src: string;
    alt?: string;
  }[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

const ThumbnailPreviewBar: React.FC<ThumbnailPreviewBarProps> = ({ 
  thumbnails, 
  activeId, 
  onSelect 
}) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-200 overflow-x-auto">
      {thumbnails.map((thumbnail) => (
        <button
          key={thumbnail.id}
          className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden border border-gray-200 hover:shadow-sm ${
            activeId === thumbnail.id ? 'ring-2 ring-blue-500 shadow-sm' : ''
          }`}
          onClick={() => onSelect?.(thumbnail.id)}
        >
          <img 
            src={thumbnail.src} 
            alt={thumbnail.alt || `Thumbnail ${thumbnail.id}`} 
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default ThumbnailPreviewBar; 