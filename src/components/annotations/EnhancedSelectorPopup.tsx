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
  selectedDamageTypes: string[];
  selectedComponents: string[];
  selectedMaterials: string[];
  onSelectDamageTypes: (ids: string[]) => void;
  onSelectComponents: (ids: string[]) => void;
  onSelectMaterials: (ids: string[]) => void;
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
  selectedDamageTypes = [],
  selectedComponents = [],
  selectedMaterials = [],
  onSelectDamageTypes,
  onSelectComponents,
  onSelectMaterials,
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
  
  // Format selected value display
  const formatSelectedValues = (selectedIds: string[], options: SelectorOption[]) => {
    if (selectedIds.length === 0) return 'Select';
    if (selectedIds.length === 1) {
      const option = options.find(o => o.id === selectedIds[0]);
      return option ? option.label : 'Select';
    }
    const firstOption = options.find(o => o.id === selectedIds[0]);
    return `${firstOption?.label || 'Select'} +${selectedIds.length - 1}`;
  };
  
  // Component display value
  const componentValue = formatSelectedValues(selectedComponents, componentOptions);

  // Material display value
  const materialValue = formatSelectedValues(selectedMaterials, materialOptions);

  // Damage Type display value
  const damageTypeValue = formatSelectedValues(selectedDamageTypes, damageTypeOptions);
    
  return (
    <>
      {/* Indicator dot */}
      {position && (
        <div 
          className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            backgroundColor: selectedDamageTypes.length > 0 ? 
              damageTypeOptions.find(dt => dt.id === selectedDamageTypes[0])?.color || '#ef4444' : 
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
          className="bg-white rounded-lg shadow-md overflow-hidden"
          style={{
            width: '280px',
            borderRadius: '8px',
            boxShadow: '0px 3px 4px -2px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header - đã bỏ */}
          
          <div className="p-4 space-y-3">
            {/* Component Selector */}
            <button
              className="w-full bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
              onClick={() => setActiveModal(activeModal === 'component' ? null : 'component')}
            >
              <span className="text-xs font-mono font-semibold text-gray-800 uppercase">COMPONENT [P]</span>
              <div className="flex items-center">
                <span className="text-xs font-mono font-semibold text-gray-800 mr-1">
                  {componentValue}
                </span>
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            
            {/* Material Selector */}
            <button
              className="w-full bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
              onClick={() => setActiveModal(activeModal === 'material' ? null : 'material')}
            >
              <span className="text-xs font-mono font-semibold text-gray-800 uppercase">MATERIAL [M]</span>
              <div className="flex items-center">
                <span className="text-xs font-mono font-semibold text-gray-800 mr-1">
                  {materialValue}
                </span>
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            
            {/* Damage Type Selector */}
            <button
              className="w-full bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
              onClick={() => setActiveModal(activeModal === 'damageType' ? null : 'damageType')}
            >
              <span className="text-xs font-mono font-semibold text-gray-800 uppercase">DAMAGE TYPE [D]</span>
              <div className="flex items-center">
                <span className="text-xs font-mono font-semibold text-gray-800 mr-1">
                  {damageTypeValue}
                </span>
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          
            {/* Severity Options */}
            <div className="mt-2">
              <p className="text-xs font-mono font-semibold text-gray-800 uppercase mb-2">SEVERITY</p>
              <div className="flex space-x-2">
                <button 
                  className={`rounded-full px-4 py-1 text-xs font-mono ${severity === 'min' 
                    ? 'bg-gray-200 border border-gray-400 text-gray-700' 
                    : 'bg-gray-100 border border-gray-300 text-gray-500'}`}
                  onClick={() => onSeverityChange && onSeverityChange('min')}
                >
                  Min
                </button>
                <button 
                  className={`rounded-full px-4 py-1 text-xs font-mono ${severity === 'med' 
                    ? 'bg-gray-200 border border-gray-400 text-gray-700' 
                    : 'bg-gray-100 border border-gray-300 text-gray-500'}`}
                  onClick={() => onSeverityChange && onSeverityChange('med')}
                >
                  Med
                </button>
                <button 
                  className={`rounded-full px-4 py-1 text-xs font-mono ${severity === 'maj' 
                    ? 'bg-red-100 border border-red-400 text-red-700' 
                    : 'bg-gray-100 border border-gray-300 text-gray-500'}`}
                  onClick={() => onSeverityChange && onSeverityChange('maj')}
                >
                  Maj
                </button>
              </div>
            </div>
            
            {/* Through Paint Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono font-semibold text-gray-800 uppercase">THROUGH PAINT</p>
              <div 
                className={`w-10 h-5 rounded-full ${throughPaint ? 'bg-[#1A58D2]' : 'bg-gray-300'} relative cursor-pointer`}
                onClick={onThroughPaintToggle}
              >
                <div 
                  className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transform transition-transform ${
                    throughPaint ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </div>
          </div>
          
          {/* Footer with buttons */}
          <div className="px-4 py-2 flex justify-between items-center border-t border-gray-200">
            <button
              type="button"
              className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none font-mono"
              onClick={onCancel}
            >
              Cancel <span className="text-gray-500">[ESC]</span>
            </button>
            <button
              type="button"
              className="px-3 py-1.5 bg-[#1A58D2] border border-transparent rounded-md text-xs font-medium text-white hover:bg-blue-700 focus:outline-none font-mono"
              onClick={onConfirm}
            >
              Confirm <span className="text-blue-300">[↵]</span>
            </button>
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
                  onSelect={onSelectComponents}
                  onClose={() => setActiveModal(null)}
                  selectedIds={selectedComponents}
                />
              )}
              
              {activeModal === 'material' && (
                <SelectionModal
                  title="MATERIAL"
                  options={materialOptions}
                  onSelect={onSelectMaterials}
                  onClose={() => setActiveModal(null)}
                  selectedIds={selectedMaterials}
                />
              )}
              
              {activeModal === 'damageType' && (
                <SelectionModal
                  title="DAMAGE TYPE"
                  options={damageTypeOptions}
                  onSelect={onSelectDamageTypes}
                  onClose={() => setActiveModal(null)}
                  selectedIds={selectedDamageTypes}
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