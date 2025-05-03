import React from 'react';

interface LegendProps {
  className?: string;
}

export const Legend: React.FC<LegendProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col p-4 rounded-lg bg-gray-100 max-w-xs ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Legend</h3>
      <div className="flex flex-col gap-3">
        {/* Your SVG icons will be imported and used here */}
        {/* Example:
        <div className="flex items-center gap-2">
          <img src="/src/assets/svg/your-icon.svg" alt="Legend item" className="w-6 h-6" />
          <span className="text-sm text-gray-600">Legend item description</span>
        </div>
        */}
      </div>
    </div>
  );
};

export default Legend; 