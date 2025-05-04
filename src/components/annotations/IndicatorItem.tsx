import React from 'react';
import { Indicator } from '../../store/slices/clickIndicatorSlice';
import { DamageTypeOption, ComponentType } from '../../hooks/useOptionsData';

interface IndicatorItemProps {
  indicator: Indicator;
  index: number;
  onIndicatorClick: (id: string) => void;
  onRemoveIndicator: (id: string) => void;
  damageTypeOptions: DamageTypeOption[];
  componentTypes: ComponentType[];
}

const IndicatorItem: React.FC<IndicatorItemProps> = ({
  indicator,
  index,
  onIndicatorClick,
  onRemoveIndicator,
  damageTypeOptions,
  componentTypes
}) => {
  return (
    <div 
      className={`rounded-md border overflow-hidden cursor-pointer transition-all duration-200 ${
        indicator.isHighlighted 
          ? 'ring-2 ring-blue-500 border-blue-500 shadow-md transform scale-[1.02]' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onIndicatorClick(indicator.id)}
    >
      <div className="flex items-center px-3 py-2 bg-gray-50">
        <div 
          className="flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium mr-2" 
          style={{ 
            backgroundColor: `${indicator.color}20`, 
            color: indicator.color 
          }}
        >
          {(index + 1).toString().padStart(2, '0')}
        </div>
        <div className="flex-1 text-sm font-medium">
          {indicator.damageType ? 
            damageTypeOptions.find(dt => dt.id === indicator.damageType)?.label || 'DAMAGE' :
            'DAMAGE'
          }
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemoveIndicator(indicator.id);
          }}
          className="ml-2 text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className="px-3 py-2 border-t border-gray-200">
        {indicator.component && (
          <div className="flex items-center mb-1">
            <span className="inline-block h-4 w-4 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M7 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 17h.01" />
                <path d="M17 17h.01" />
              </svg>
            </span>
            <span className="text-sm text-gray-600">
              {componentTypes.find(c => c.id === indicator.component)?.label || 'COMPONENT'}
            </span>
          </div>
        )}
        <div className="text-xs text-gray-500 mt-1">
          Position: ({indicator.x.toFixed(1)}%, {indicator.y.toFixed(1)}%)
          {indicator.severity && <span className="ml-2">• Severity: {indicator.severity.toUpperCase()}</span>}
          {indicator.throughPaint && <span className="ml-2">• Through Paint</span>}
        </div>
      </div>
    </div>
  );
};

export default IndicatorItem; 