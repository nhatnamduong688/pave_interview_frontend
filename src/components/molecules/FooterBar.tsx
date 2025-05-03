import React from 'react';
import LegendCaption from './LegendCaption/LegendCaption';
import {
  MoveIcon,
  ZoomIcon,
  RotateIcon,
  MeasureIcon,
  ResetIcon,
  SaveIcon
} from '../atoms/icons';

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

  // Color prop for icons
  iconColor?: string;

  // Background style for buttons
  buttonBackgroundStyle?: 'transparent' | 'white';

  // Background color for icons
  iconBackgroundColor?: string;
}

const FooterBar: React.FC<FooterBarProps> = ({
  captionText,
  extraThumbnails = [],
  onThumbnailClick,
  onToolbarAction,
  iconColor = '#6B7280', // Default to gray, but can be customized
  buttonBackgroundStyle = 'white', // Default to transparent background
  iconBackgroundColor = 'transparent' // Default to transparent icon background
}) => {
  // Toolbar action groups with separators
  const toolbarGroups = [
    [
      {
        id: 'move',
        icon: <MoveIcon color={iconColor} backgroundColor={iconBackgroundColor} />,
        label: 'Move'
      },
    ],
    [
      {
        id: 'zoom',
        icon: <ZoomIcon color={iconColor} backgroundColor={iconBackgroundColor} />,
        label: 'Zoom'
      },
      {
        id: 'rotate',
        icon: <RotateIcon color={iconColor} backgroundColor={iconBackgroundColor} />,
        label: 'Rotate'
      },
    ],
    [
      {
        id: 'measure',
        icon: <MeasureIcon color={iconColor} backgroundColor={iconBackgroundColor} />,
        label: 'Measure'
      },
      {
        id: 'reset',
        icon: <ResetIcon color={iconColor} backgroundColor={iconBackgroundColor} />,
        label: 'Reset View'
      },
      {
        id: 'save',
        icon: <SaveIcon color={iconColor} backgroundColor={iconBackgroundColor} />,
        label: 'Save View'
      },
    ]
  ];

  const handleToolbarAction = (actionId: string) => {
    if (onToolbarAction) {
      onToolbarAction(actionId);
    }
  };

  // Determine button style based on the buttonBackgroundStyle prop
  const getButtonClassName = () => {
    if (buttonBackgroundStyle === 'white') {
      // white style
      return "w-8 h-8 flex flex-col justify-center items-center p-0 gap-1 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors";
    }
    // transparent style
    return "w-8 h-8 flex flex-col justify-center items-center p-0 gap-1 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors";
  };

  return (
    <footer className="w-full py-4 bg-white flex items-center justify-between">

      {/* Legend & Caption (Left) */}
      <div className="ml-4">
        <LegendCaption
          caption={captionText}
        />
      </div>

      {/* Footer Toolbar (Center) */}
      <div className="flex flex-row items-center px-3 py-2 gap-5 h-12 bg-white border border-[#F0F0F0] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] rounded-3xl">
        {toolbarGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            {groupIndex > 0 && (
              <div className="h-5 w-[1px] bg-gray-100"></div>
            )}
            <div className="flex items-center gap-1">
              {group.map(action => (
                <button
                  key={action.id}
                  className={getButtonClassName()}
                  onClick={() => handleToolbarAction(action.id)}
                  title={action.label}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    {action.icon}
                  </div>
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
