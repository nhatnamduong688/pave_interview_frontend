import React from 'react';

interface ToolbarButton {
  id: string;
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

interface ViewControlsToolbarProps {
  buttons: ToolbarButton[];
}

// SVG icons for buttons
const icons = {
  move: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  zoom: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="11" y1="8" x2="11" y2="14"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  rotate: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"/>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/>
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </svg>
  ),
  measure: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20"/>
      <path d="M6 8v8"/>
      <path d="M12 4v16"/>
      <path d="M18 8v8"/>
    </svg>
  ),
  reset: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  )
};

const ViewControlsToolbar: React.FC<ViewControlsToolbarProps> = ({ buttons }) => {
  return (
    <div className="flex items-center gap-4">
      {buttons.map((button) => {
        const buttonIcon = typeof button.icon === 'string' && button.id in icons 
          ? icons[button.id as keyof typeof icons] 
          : button.icon;
          
        return (
          <button
            key={button.id}
            className="flex items-center justify-center text-gray-600 hover:bg-gray-100 active:text-gray-800 p-2 rounded-full w-8 h-8"
            onClick={button.onClick}
            title={button.label}
          >
            {buttonIcon}
          </button>
        );
      })}
    </div>
  );
};

export default ViewControlsToolbar; 