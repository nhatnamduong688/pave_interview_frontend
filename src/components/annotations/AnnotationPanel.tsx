import React from 'react';
import { Indicator } from '../../store/slices/clickIndicatorSlice';
import { DamageTypeOption, ComponentType } from '../../hooks/useOptionsData';
import IndicatorItem from './IndicatorItem';

interface AnnotationPanelProps {
  indicators: Indicator[];
  onIndicatorClick: (id: string) => void;
  onRemoveIndicator: (id: string) => void;
  onResetCurrentImage: () => void;
  damageTypeOptions: DamageTypeOption[];
  componentTypes: ComponentType[];
}

const AnnotationPanel: React.FC<AnnotationPanelProps> = ({
  indicators,
  onIndicatorClick,
  onRemoveIndicator,
  onResetCurrentImage,
  damageTypeOptions,
  componentTypes
}) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Damage List</h3>

      {/* Show message when no annotations */}
      {indicators.length === 0 ? (
        <div className="text-center p-4 text-gray-500 bg-gray-50 rounded-md">
          <p className="text-sm">No damage annotations yet</p>
          <p className="text-xs mt-1">Click on the image in annotation mode to add damage</p>
        </div>
      ) : (
        <div className="space-y-4">
          {indicators.map((indicator, index) => (
            <IndicatorItem
              key={indicator.id}
              indicator={indicator}
              index={index}
              onIndicatorClick={onIndicatorClick}
              onRemoveIndicator={onRemoveIndicator}
              damageTypeOptions={damageTypeOptions}
              componentTypes={componentTypes}
            />
          ))}
        </div>
      )}
      
      {/* Action buttons */}
      <div className="mt-6">
        {indicators.length > 0 && (
          <button 
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm transition"
            onClick={onResetCurrentImage}
          >
            Clear All for Current View
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnotationPanel; 