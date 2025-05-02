import React from 'react';

interface ThumbnailListProps {
  thumbnails: {
    id: string;
    src: string;
    alt?: string;
  }[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({ 
  thumbnails, 
  activeId, 
  onSelect 
}) => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-white border border-gray-200 rounded">
      {thumbnails.map((thumbnail) => (
        <button
          key={thumbnail.id}
          className={`w-full aspect-square rounded overflow-hidden ${
            activeId === thumbnail.id ? 'ring-2 ring-orange-500' : 'border border-gray-200 hover:shadow-sm'
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

export default ThumbnailList; 