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
    <div className="h-24 bg-white border-l border-gray-200 overflow-hidden">
      <div className="flex items-center h-full px-3 overflow-x-auto no-scrollbar">
        {thumbnails.map((thumbnail, index) => (
          <div key={thumbnail.id} className="relative flex-shrink-0 mx-1">
            <button
              className={`w-20 h-16 rounded overflow-hidden border border-gray-200 hover:shadow-sm ${
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
            
            {/* Small indicator of selected thumbnail */}
            {activeId === thumbnail.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-t"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom style for hiding scrollbar but keeping functionality
const style = document.createElement('style');
style.textContent = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default ThumbnailPreviewBar; 