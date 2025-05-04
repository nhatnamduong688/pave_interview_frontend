import React from 'react';
import { DamageTypeOption, ComponentType } from '../../hooks/useOptionsData';

interface SelectorPanelProps {
  damageTypeOptions: DamageTypeOption[];
  componentTypes: ComponentType[];
  activeDamageType: DamageTypeOption;
  activeComponent: ComponentType;
  isAnnotationMode: boolean;
  onSelectDamageType: (id: string) => void;
  onSelectComponent: (id: string) => void;
  onToggleAnnotationMode: () => void;
}

const SelectorPanel: React.FC<SelectorPanelProps> = ({
  damageTypeOptions,
  componentTypes,
  activeDamageType,
  activeComponent,
  isAnnotationMode,
  onSelectDamageType,
  onSelectComponent,
  onToggleAnnotationMode
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">Damage Selection</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Damage Type</label>
        <div className="grid grid-cols-2 gap-2">
          {damageTypeOptions.slice(0, 8).map((damageType) => (
            <button
              key={damageType.id}
              className={`py-2 px-3 text-sm rounded-md border transition-colors flex items-center ${
                activeDamageType.id === damageType.id
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onSelectDamageType(damageType.id)}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: damageType.color }}
              ></div>
              {damageType.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Component</label>
        <div className="space-y-2">
          {componentTypes.map((component) => (
            <button
              key={component.id}
              className={`w-full py-2 px-3 text-sm text-left rounded-md border transition-colors ${
                activeComponent.id === component.id
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onSelectComponent(component.id)}
            >
              {component.label}
            </button>
          ))}
        </div>
      </div>

      {/* Annotation mode toggle */}
      <button
        className={`w-full py-3 px-4 rounded-md text-white text-sm font-medium transition-colors mb-6 ${
          isAnnotationMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        onClick={onToggleAnnotationMode}
      >
        {isAnnotationMode ? 'Exit Annotation Mode' : 'Enter Annotation Mode'}
      </button>
    </div>
  );
};

export default SelectorPanel; 