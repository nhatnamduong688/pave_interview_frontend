import React from 'react';
import { Tooltip } from 'antd';

// Interface cho button trong toolbar
interface ToolbarButtonProps {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

// Component cho mỗi button
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <Tooltip title={label}>
      <button
        className={`h-10 w-10 flex justify-center items-center rounded-md transition-colors ${
          active ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
        onClick={onClick}
        aria-label={label}
      >
        <span className="text-lg">{icon}</span>
      </button>
    </Tooltip>
  );
};

// Interface cho thumbnail
interface Thumbnail {
  id: string;
  src: string;
  alt?: string;
}

// Component cho thumbnail
const ThumbnailItem: React.FC<{ thumbnail: Thumbnail; onClick: () => void }> = ({ 
  thumbnail, 
  onClick 
}) => {
  return (
    <div
      className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors"
      onClick={onClick}
    >
      <img
        src={thumbnail.src}
        alt={thumbnail.alt || `Thumbnail ${thumbnail.id}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Interface cho Legend Caption
interface LegendCaptionProps {
  text?: string;
}

// Simple Legend Caption component
const LegendCaption: React.FC<LegendCaptionProps> = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="flex flex-col items-start">
      {lines.map((line, index) => (
        <span key={index} className={`${index === 0 ? 'font-semibold' : ''} text-sm text-gray-700`}>
          {line}
        </span>
      ))}
    </div>
  );
};

// Props cho AnnotationFooterBar
interface AnnotationFooterBarProps {
  captionText?: string;
  extraThumbnails?: Thumbnail[];
  toolbarButtons: Array<{
    id: string;
    icon: string;
    label: string;
    active?: boolean;
  }>;
  onThumbnailClick?: (id: string) => void;
  onToolbarAction?: (actionId: string) => void;
  isAnnotationMode?: boolean;
}

// Main Component
const AnnotationFooterBar: React.FC<AnnotationFooterBarProps> = ({
  captionText,
  extraThumbnails = [],
  toolbarButtons,
  onThumbnailClick,
  onToolbarAction,
  isAnnotationMode,
}) => {
  return (
    <div className="w-full bg-white border-t border-gray-200 py-4 px-6 relative">
      <div className="flex items-center justify-between">
        {/* Left: Legend Caption */}
        <div className="hidden md:block">
          <LegendCaption text={captionText} />
        </div>

        {/* Center: Toolbar */}
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          {toolbarButtons.map((button) => (
            <ToolbarButton
              key={button.id}
              id={button.id}
              icon={button.icon}
              label={button.label}
              active={button.active}
              onClick={() => {
                if (onToolbarAction) {
                  onToolbarAction(button.id);
                }
              }}
            />
          ))}
        </div>

        {/* Right: Thumbnails */}
        <div className="hidden md:flex space-x-2">
          {extraThumbnails.map((thumb) => (
            <ThumbnailItem
              key={thumb.id}
              thumbnail={thumb}
              onClick={() => {
                if (onThumbnailClick) {
                  onThumbnailClick(thumb.id);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Annotation mode status bar */}
      {isAnnotationMode && (
        <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white py-1 text-center text-sm">
          Annotation Mode: Click on the image to add annotations
        </div>
      )}
    </div>
  );
};

export default AnnotationFooterBar; 