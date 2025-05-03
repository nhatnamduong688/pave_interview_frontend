import React from 'react';

interface LegendItem {
  icon: React.ReactNode; // SVG element
  label: string;
}

interface LegendProps {
  className?: string;
  items: LegendItem[];
  title?: string;
}

export const LegendWithSVG: React.FC<LegendProps> = ({ 
  className = '', 
  items = [],
  title = 'Legend'
}) => {
  return (
    <div className={`flex flex-col p-4 rounded-lg bg-gray-100 max-w-xs ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendWithSVG; 