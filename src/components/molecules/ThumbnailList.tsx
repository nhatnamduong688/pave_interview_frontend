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
    <div className="flex flex-col w-full py-2">
      {thumbnails.map((thumbnail) => (
        <div key={thumbnail.id} className="mb-3">
          <button
            className={`
              w-[72px]
              h-[40.5px]
              p-0
              overflow-hidden
              bg-white
              rounded-[4px]
              border
    ${activeId === thumbnail.id
              ? 'border-blue-500 border-2'
              : 'border-gray-100'}
  `}
            onClick={() => onSelect?.(thumbnail.id)}
          >
            <img
              src={thumbnail.src}
              alt={thumbnail.alt || `Thumbnail ${thumbnail.id}`}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailList;
