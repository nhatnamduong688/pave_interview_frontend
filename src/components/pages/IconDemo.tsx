import React, { useState } from 'react';
import {
  MoveIcon,
  ZoomIcon,
  RotateIcon,
  MeasureIcon,
  ResetIcon,
  SaveIcon
} from '../atoms/icons';

const IconDemo: React.FC = () => {
  const [color, setColor] = useState('#6B7280');
  const [size, setSize] = useState(24);

  // Mảng các icon để dễ dàng render
  const icons = [
    { name: 'MoveIcon', component: MoveIcon },
    { name: 'ZoomIcon', component: ZoomIcon },
    { name: 'RotateIcon', component: RotateIcon },
    { name: 'MeasureIcon', component: MeasureIcon },
    { name: 'ResetIcon', component: ResetIcon },
    { name: 'SaveIcon', component: SaveIcon }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">SVG Icon Demo</h1>
      
      {/* Controls */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-4">Customize Icons</h2>
        
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm mb-1">Color:</label>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className="border border-gray-300 rounded p-1 w-20"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Size:</label>
            <input 
              type="range" 
              min="16" 
              max="64" 
              value={size} 
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-40"
            />
            <span className="ml-2">{size}px</span>
          </div>
        </div>
      </div>
      
      {/* Icon Display */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {icons.map((icon) => (
          <div 
            key={icon.name} 
            className="p-4 border border-gray-200 rounded-lg flex flex-col items-center"
          >
            <div className="mb-4 p-4 bg-gray-50 rounded-md flex items-center justify-center">
              <icon.component width={size} height={size} color={color} />
            </div>
            <span className="text-sm font-medium">{icon.name}</span>
            <div className="mt-2 text-xs text-gray-500 text-center">
              {size}x{size}px • {color}
            </div>
          </div>
        ))}
      </div>
      
      {/* Various Sizes Demo */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Size Comparison</h2>
        <div className="flex items-end gap-6">
          {[16, 24, 32, 48].map(iconSize => (
            <div key={iconSize} className="flex flex-col items-center">
              <MoveIcon width={iconSize} height={iconSize} color={color} />
              <span className="mt-2 text-xs">{iconSize}px</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Different Colors Demo */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Color Variations</h2>
        <div className="flex gap-6">
          {['#6B7280', '#EF4444', '#3B82F6', '#10B981', '#F59E0B'].map(iconColor => (
            <div key={iconColor} className="flex flex-col items-center">
              <ZoomIcon width={32} height={32} color={iconColor} />
              <span className="mt-2 text-xs" style={{ color: iconColor }}>{iconColor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconDemo; 