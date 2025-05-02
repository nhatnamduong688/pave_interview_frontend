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
    <div className="flex flex-col gap-2 h-full">
      {thumbnails.map((thumbnail, index) => (
        <div key={thumbnail.id} className="relative">
          <button
            className={`w-full aspect-square rounded overflow-hidden ${
              activeId === thumbnail.id 
                ? 'ring-2 ring-blue-500' 
                : 'border border-gray-200 hover:shadow-sm'
            }`}
            onClick={() => onSelect?.(thumbnail.id)}
          >
            <img 
              src={thumbnail.src} 
              alt={thumbnail.alt || `Thumbnail ${thumbnail.id}`} 
              className="w-full h-full object-cover"
            />
          </button>
          
          {/* Number badge */}
          <div className={`absolute bottom-0 right-0 w-4 h-4 flex items-center justify-center rounded-full text-xs font-medium ${
            activeId === thumbnail.id 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}>
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailList; 