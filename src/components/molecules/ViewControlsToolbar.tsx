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

const ViewControlsToolbar: React.FC<ViewControlsToolbarProps> = ({ buttons }) => {
  return (
    <div className="flex items-center justify-center gap-4 p-3 bg-white border-t border-gray-200">
      {buttons.map((button) => (
        <button
          key={button.id}
          className="flex items-center justify-center text-gray-600 hover:bg-gray-100 active:text-gray-800 p-2 rounded-full"
          onClick={button.onClick}
          title={button.label}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
};

export default ViewControlsToolbar; 