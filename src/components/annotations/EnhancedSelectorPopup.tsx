import React, { useState } from 'react';
import SelectionModal, { OptionItem } from './SelectionModal';

export interface SelectorOption {
  id: string;
  label: string;
  value?: string;
  color?: string;
}

export interface EnhancedSelectorPopupProps {
  title?: string;
  damageTypeOptions: SelectorOption[];
  componentOptions: SelectorOption[];
  materialOptions: SelectorOption[];
  selectedDamageType: string | null;
  selectedComponent: string | null;
  selectedMaterial: string | null;
  onSelectDamageType: (id: string) => void;
  onSelectComponent: (id: string) => void;
  onSelectMaterial: (id: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  severity?: string;
  throughPaint?: boolean;
  onSeverityChange?: (severity: string) => void;
  onThroughPaintToggle?: () => void;
  position?: { x: number; y: number };
}

type ModalType = 'component' | 'material' | 'damageType' | null;

const EnhancedSelectorPopup: React.FC<EnhancedSelectorPopupProps> = ({
  damageTypeOptions,
  componentOptions,
  materialOptions,
  selectedDamageType,
  selectedComponent,
  selectedMaterial,
  onSelectDamageType,
  onSelectComponent,
  onSelectMaterial,
  onCancel,
  onConfirm,
  severity = 'maj',
  throughPaint = false,
  onSeverityChange,
  onThroughPaintToggle,
  position
}) => {
  // State for controlling which modal is visible
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Determine position styling for main popup
  const getPositionStyle = () => {
    if (!position) return {};
    
    // Đặt form ngay cạnh indicator
    let positionStyle: any = {
      position: 'absolute' as const,
      zIndex: 1000,
    };
    
    // Xử lý vị trí theo trục X
    if (position.x > 50) {
      positionStyle.right = `calc(100% - ${position.x}% + 30px)`;
    } else {
      positionStyle.left = `calc(${position.x}% + 30px)`;
    }
    
    // Xử lý vị trí theo trục Y
    if (position.y < 25) {
      positionStyle.top = `calc(${position.y}% + 15px)`;
    } else if (position.y > 75) {
      positionStyle.bottom = `calc(100% - ${position.y}% + 15px)`;
    } else {
      positionStyle.top = `${position.y}%`;
      positionStyle.transform = 'translateY(-50%)';
    }
    
    return positionStyle;
  };
  
  // Component Row Value
  const componentValue = selectedComponent ? 
    componentOptions.find(c => c.id === selectedComponent)?.label || 'Select' : 
    'Select';

  // Material Row Value
  const materialValue = selectedMaterial ? 
    materialOptions.find(m => m.id === selectedMaterial)?.label || 'Select' : 
    'Select';

  // Damage Type Row Value
  const damageTypeValue = selectedDamageType ? 
    damageTypeOptions.find(d => d.id === selectedDamageType)?.label || 'Select' : 
    'Select';
    
  return (
    <>
      {/* Indicator dot */}
      {position && (
        <div 
          className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            backgroundColor: selectedDamageType ? 
              damageTypeOptions.find(dt => dt.id === selectedDamageType)?.color || '#ef4444' : 
              '#ef4444',
            boxShadow: '0 0 0 2px rgba(0,0,0,0.2)'
          }}
        />
      )}
    
      {/* Main popup */}
      <div 
        className="absolute" 
        style={{ 
          ...getPositionStyle(),
          zIndex: 1000
        }}
      >
        <div 
          className="bg-gray-50 rounded-lg shadow-lg border border-gray-100 w-[380px] overflow-hidden"
        >
          <div className="p-4 space-y-4">
            {/* Component Selector */}
            <div 
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => setActiveModal(activeModal === 'component' ? null : 'component')}
            >
              <div className="font-mono text-gray-700 font-medium">
                COMPONENT [P]
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-mono">{componentValue}</span>
                <span>❯</span>
              </div>
            </div>
            
            {/* Material Selector */}
            <div 
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => setActiveModal(activeModal === 'material' ? null : 'material')}
            >
              <div className="font-mono text-gray-700 font-medium">
                MATERIAL [M]
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-mono">{materialValue}</span>
                <span>❯</span>
              </div>
            </div>
            
            {/* Damage Type Selector */}
            <div 
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => setActiveModal(activeModal === 'damageType' ? null : 'damageType')}
            >
              <div className="font-mono text-gray-700 font-medium">
                DAMAGE TYPE [D]
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-mono">{damageTypeValue}</span>
                <span>❯</span>
              </div>
            </div>
          
            {/* Severity Options */}
            <div className="mt-4 mb-2">
              <p className="font-mono text-gray-700 font-medium mb-3">SEVERITY</p>
              <div className="flex space-x-4">
                <button 
                  className={`rounded-full px-6 py-2 font-mono border ${severity === 'min' 
                    ? 'bg-gray-200 border-gray-400 text-gray-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'}`}
                  onClick={() => onSeverityChange && onSeverityChange('min')}
                >
                  Min
                </button>
                <button 
                  className={`rounded-full px-6 py-2 font-mono border ${severity === 'med' 
                    ? 'bg-gray-200 border-gray-400 text-gray-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'}`}
                  onClick={() => onSeverityChange && onSeverityChange('med')}
                >
                  Med
                </button>
                <button 
                  className={`rounded-full px-6 py-2 font-mono border ${severity === 'maj' 
                    ? 'bg-red-100 border-red-400 text-red-700' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'}`}
                  onClick={() => onSeverityChange && onSeverityChange('maj')}
                >
                  Maj
                </button>
              </div>
            </div>
            
            {/* Through Paint Toggle */}
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-gray-700 font-medium">THROUGH PAINT</p>
              <div 
                className={`w-12 h-6 rounded-full ${throughPaint ? 'bg-blue-600' : 'bg-gray-300'} relative cursor-pointer`}
                onClick={onThroughPaintToggle}
              >
                <div 
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transform transition-transform ${
                    throughPaint ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                className="px-4 py-2 font-mono border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={onCancel}
              >
                Cancel <span className="text-gray-500">[ESC]</span>
              </button>
              <button
                className="px-4 py-2 font-mono bg-blue-600 rounded-md text-white hover:bg-blue-700"
                onClick={onConfirm}
              >
                Confirm <span className="text-blue-300">[↵]</span>
              </button>
            </div>
          </div>
          
          {/* Selection Modals - Positioned adjacent to main popup */}
          {activeModal && (
            <div className="absolute z-10" style={{
              left: position && position.x <= 50 ? '100%' : 'auto',
              right: position && position.x > 50 ? '100%' : 'auto',
              top: 0,
              marginLeft: position && position.x <= 50 ? '15px' : 'auto',
              marginRight: position && position.x > 50 ? '15px' : 'auto',
            }}>
              {activeModal === 'component' && (
                <SelectionModal
                  title="COMPONENT"
                  options={componentOptions}
                  onSelect={(id) => {
                    onSelectComponent(id);
                    setActiveModal(null);
                  }}
                  onClose={() => setActiveModal(null)}
                />
              )}
              
              {activeModal === 'material' && (
                <SelectionModal
                  title="MATERIAL"
                  options={materialOptions}
                  onSelect={(id) => {
                    onSelectMaterial(id);
                    setActiveModal(null);
                  }}
                  onClose={() => setActiveModal(null)}
                />
              )}
              
              {activeModal === 'damageType' && (
                <SelectionModal
                  title="DAMAGE TYPE"
                  options={damageTypeOptions}
                  onSelect={(id) => {
                    onSelectDamageType(id);
                    setActiveModal(null);
                  }}
                  onClose={() => setActiveModal(null)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnhancedSelectorPopup; 