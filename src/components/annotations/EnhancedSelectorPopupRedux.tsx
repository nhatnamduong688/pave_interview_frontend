import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { updateIndicator, addIndicator } from '../../store/slices/clickIndicatorSlice';
import {
  selectComponentOptions,
  selectMaterialOptions,
  selectDamageTypeOptions,
  selectSeverityOptions
} from '../../store/selectors/optionsSelectors';
import { selectActiveImageId } from '../../store/selectors/clickIndicatorSelectors';
import SelectionModal, { OptionItem } from './SelectionModal';

interface EnhancedSelectorPopupReduxProps {
  onCancel: () => void;
  onConfirm?: () => void;
  tempIndicator: {
    id?: string;
    x: number;
    y: number;
    color?: string;
    damageType?: string;
    component?: string;
    material?: string;
    severity?: string;
    throughPaint?: boolean;
  } | null;
  position?: { x: number; y: number };
}

type ModalType = 'component' | 'material' | 'damageType' | null;

const EnhancedSelectorPopupRedux: React.FC<EnhancedSelectorPopupReduxProps> = ({
  onCancel,
  onConfirm,
  tempIndicator,
  position
}) => {
  const dispatch = useAppDispatch();
  
  // Redux selectors
  const activeImageId = useAppSelector(selectActiveImageId);
  const componentOptionsFromStore = useAppSelector(selectComponentOptions);
  const materialOptionsFromStore = useAppSelector(selectMaterialOptions);
  const damageTypeOptionsFromStore = useAppSelector(selectDamageTypeOptions);
  const severityOptionsFromStore = useAppSelector(selectSeverityOptions);
  
  // Convert store options to component format
  const componentOptions = componentOptionsFromStore.map(option => ({
    id: option.code,
    label: option.label
  }));
  
  const materialOptions = materialOptionsFromStore.map(option => ({
    id: option.code,
    label: option.label
  }));
  
  const damageTypeOptions = damageTypeOptionsFromStore.map(option => ({
    id: option.code,
    label: option.label,
    color: option.code === 'SEVERE_DAMAGE' ? '#ef4444' : '#f97316' // Example colors
  }));
  
  // Local state
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedComponents, setSelectedComponents] = useState<string[]>(
    tempIndicator?.component ? [tempIndicator.component] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    tempIndicator?.material ? [tempIndicator.material] : []
  );
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<string[]>(
    tempIndicator?.damageType ? [tempIndicator.damageType] : []
  );
  const [severity, setSeverity] = useState<string>(tempIndicator?.severity || 'maj');
  const [throughPaint, setThroughPaint] = useState<boolean>(tempIndicator?.throughPaint || false);
  
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
  const formatSelectedValues = (selectedIds: string[], options: { id: string, label: string }[]) => {
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
  
  // Handle form confirmation
  const handleConfirm = () => {
    if (!activeImageId || !tempIndicator) return;
    
    // Make sure required fields are selected
    if (selectedDamageTypes.length === 0 || selectedComponents.length === 0) {
      return; // Should show validation error
    }
    
    const damageType = selectedDamageTypes[0]; // Using first selected damage type
    const component = selectedComponents[0]; // Using first selected component
    const material = selectedMaterials.length > 0 ? selectedMaterials[0] : undefined;
    
    // Find damageType option to get color
    const damageTypeOption = damageTypeOptions.find(dt => dt.id === damageType);
    const color = damageTypeOption?.color || '#ef4444';
    
    // Find labels for notification
    const damageTypeLabel = damageTypeOption?.label || '';
    const componentLabel = componentOptions.find(c => c.id === component)?.label || '';
    
    if (tempIndicator.id) {
      // Update existing indicator
      dispatch(updateIndicator({
        imageId: activeImageId,
        indicatorId: tempIndicator.id,
        updates: {
          damageType,
          component,
          material,
          color,
          confirmed: true,
          severity,
          throughPaint
        } as any // Cast to any to bypass TypeScript error for material
      }));
    } else {
      // Add new indicator
      dispatch(addIndicator({
        imageId: activeImageId,
        x: tempIndicator.x,
        y: tempIndicator.y,
        damageType,
        component,
        material,
        color,
        confirmed: true,
        severity,
        throughPaint
      } as any)); // Cast to any to bypass TypeScript error for material
    }
    
    // Use onConfirm callback if provided, otherwise just cancel
    if (onConfirm) {
      onConfirm();
    } else {
      onCancel();
    }
  };
    
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
            width: '300px',
            boxShadow: '0px 8px 14px -4px rgba(17, 12, 34, 0.08)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <div className="p-2 space-y-1 w-full">
            {/* Component Selector */}
            <button
              className="w-full bg-[#F3F4F6] rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 transition-colors"
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
              className="w-full bg-[#F3F4F6] rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 transition-colors"
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
              className="w-full bg-[#F3F4F6] rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 transition-colors"
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
            <div className="mt-1">
              <p className="text-xs font-mono font-semibold text-gray-800 uppercase mb-1">SEVERITY</p>
              <div className="flex space-x-2">
                {severityOptionsFromStore.map((option) => (
                  <button 
                    key={option.value}
                    className={`rounded-full px-3 py-1 text-xs font-mono ${severity === option.label.toLowerCase() 
                      ? option.label === 'Maj' 
                          ? 'bg-red-100 border border-red-400 text-red-700' 
                          : 'bg-gray-200 border border-gray-400 text-gray-700' 
                      : 'bg-gray-100 border border-gray-300 text-gray-500'}`}
                    onClick={() => setSeverity(option.label.toLowerCase())}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Through Paint Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono font-semibold text-gray-800 uppercase">THROUGH PAINT</p>
              <div 
                className={`w-10 h-5 rounded-full ${throughPaint ? 'bg-[#1A58D2]' : 'bg-gray-300'} relative cursor-pointer`}
                onClick={() => setThroughPaint(!throughPaint)}
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
          <div className="px-3 py-1 flex justify-between items-center border-t border-gray-200 w-full">
            <button
              type="button"
              className="px-2 py-1 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none font-mono"
              onClick={onCancel}
            >
              Cancel <span className="text-gray-500">[ESC]</span>
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-[#1A58D2] border border-transparent rounded-md text-xs font-medium text-white hover:bg-blue-700 focus:outline-none font-mono"
              onClick={handleConfirm}
            >
              Confirm <span className="text-blue-300">[↵]</span>
            </button>
          </div>
          
          {/* Selection Modals - Positioned adjacent to main popup */}
          {activeModal && (
            <div className="absolute z-10" style={{
              left: position && position.x <= 50 ? '310px' : 'auto',
              right: position && position.x > 50 ? '310px' : 'auto',
              top: '-15px',
              marginLeft: position && position.x <= 50 ? '0px' : 'auto',
              marginRight: position && position.x > 50 ? '0px' : 'auto',
            }}>
              {activeModal === 'component' && (
                <SelectionModal
                  title="COMPONENT"
                  options={componentOptions}
                  onSelect={setSelectedComponents}
                  onClose={() => setActiveModal(null)}
                  selectedIds={selectedComponents}
                />
              )}
              
              {activeModal === 'material' && (
                <SelectionModal
                  title="MATERIAL"
                  options={materialOptions}
                  onSelect={setSelectedMaterials}
                  onClose={() => setActiveModal(null)}
                  selectedIds={selectedMaterials}
                />
              )}
              
              {activeModal === 'damageType' && (
                <SelectionModal
                  title="DAMAGE TYPE"
                  options={damageTypeOptions}
                  onSelect={setSelectedDamageTypes}
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

export default EnhancedSelectorPopupRedux; 