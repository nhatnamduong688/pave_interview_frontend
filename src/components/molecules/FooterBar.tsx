import React from 'react';
import LegendCaption from './LegendCaption';

interface FooterBarProps {
  // Legend & Caption
  orientation?: 'front' | 'side' | 'top';
  captionText?: string;

  // Extra Thumbnails
  extraThumbnails?: {
    id: string;
    src: string;
    alt?: string;
  }[];

  // Optional callback functions
  onThumbnailClick?: (id: string) => void;
  onToolbarAction?: (actionId: string) => void;
}

const FooterBar: React.FC<FooterBarProps> = ({
  captionText,
  extraThumbnails = [],
  onThumbnailClick,
  onToolbarAction
}) => {
  // Toolbar action groups with separators
  const toolbarGroups = [
    [
      { id: 'move', icon: '↕️', label: 'Move' },
      { id: 'zoom', icon: '🔍', label: 'Zoom' },
    ],
    [
      { id: 'rotate', icon: '🔄', label: 'Rotate' },
      { id: 'measure', icon: '📏', label: 'Measure' },
    ],
    [
      { id: 'reset', icon: '↩️', label: 'Reset View' },
    ]
  ];

  const handleToolbarAction = (actionId: string) => {
    if (onToolbarAction) {
      onToolbarAction(actionId);
    }
  };

  return (
    <footer className="w-full py-4 bg-white shadow-inner flex items-center justify-between">

      {/* Legend & Caption (Left) */}
      <div className="ml-4">
        <LegendCaption 
          caption={captionText}
          svgWidth={56}
          svgHeight={56}
        />
      </div>

      {/* Footer Toolbar (Center) */}
      <div className="flex items-center px-4 py-2 rounded-md shadow-md bg-white">
        {toolbarGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            {groupIndex > 0 && (
              <div className="h-6 w-px bg-gray-200 mx-4"></div>
            )}
            <div className="flex items-center space-x-4">
              {group.map(action => (
                <button
                  key={action.id}
                  className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleToolbarAction(action.id)}
                  title={action.label}
                >
                  <span>{action.icon}</span>
                </button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Extra Thumbnails (Right) */}
      <div className="flex items-center space-x-2 mr-4">
        {extraThumbnails.map(thumb => (
          <div
            key={thumb.id}
            className="w-14 h-14 rounded border border-transparent hover:border-gray-200 cursor-pointer overflow-hidden"
            onClick={() => onThumbnailClick && onThumbnailClick(thumb.id)}
          >
            <img
              src={thumb.src}
              alt={thumb.alt || `Thumbnail ${thumb.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </footer>
  );
};

export default FooterBar;
