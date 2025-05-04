import React, { useState, useEffect, useMemo } from 'react';
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

// Add a color utility function
const generateUniqueColor = (damageType: string, component: string, index: number): string => {
  // Base colors for damage types
  const damageTypeColors: Record<string, string> = {
    'SEVERE_DAMAGE': '#ef4444',
    'DAMAGE': '#f97316',
    'SCRATCH': '#84cc16',
    'DENT': '#3b82f6',
    'CRACK': '#a855f7',
    'CHIP': '#ec4899',
    'MISSING': '#0d9488',
    'MISALIGNED': '#f59e0b'
  };

  // Default to red if damage type not found
  const baseColor = damageTypeColors[damageType] || '#ef4444';
  
  // Use component name as seed for color variation
  const componentHash = component.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Convert hex to HSL for easier manipulation
  const r = parseInt(baseColor.slice(1, 3), 16) / 255;
  const g = parseInt(baseColor.slice(3, 5), 16) / 255;
  const b = parseInt(baseColor.slice(5, 7), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    
    h = h * 60;
  }
  
  // Vary hue based on component hash and index
  h = (h + componentHash + index * 37) % 360;
  // Vary saturation slightly but keep it high for visibility
  s = Math.max(0.65, Math.min(0.9, s + (componentHash % 100) / 1000));
  // Vary lightness but keep it in mid-range for visibility
  l = Math.max(0.4, Math.min(0.6, l + (componentHash % 100) / 1000));
  
  // Convert back to hex
  const hslToRgb = (h: number, s: number, l: number) => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return '#' + 
      (r | 1 << 8).toString(16).slice(1) +
      (g | 1 << 8).toString(16).slice(1) +
      (b | 1 << 8).toString(16).slice(1);
  };
  
  return hslToRgb(h, s, l);
};

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
  
  // Validation state
  const [validationErrors, setValidationErrors] = useState<{
    component?: string;
    material?: string;
    damageType?: string;
    dependency?: string;
  }>({});

  // Check if form is valid
  const isFormValid = Object.keys(validationErrors).length === 0;
  
  // Real-time validation
  useEffect(() => {
    validateForm();
  }, [selectedComponents, selectedMaterials, selectedDamageTypes, severity, throughPaint]);

  // Validation function
  const validateForm = () => {
    const newErrors: {
      component?: string;
      material?: string;
      damageType?: string;
      dependency?: string;
    } = {};
    
    // Required fields validation - all three fields are now required
    if (selectedComponents.length === 0) {
      newErrors.component = 'Component is required';
    }
    
    if (selectedMaterials.length === 0) {
      newErrors.material = 'Material is required';
    }
    
    if (selectedDamageTypes.length === 0) {
      newErrors.damageType = 'Damage type is required';
    }
    
    // Interdependent validation examples
    // Example 2: Specific component/damage type combination validation
    const hasForbiddenCombination = selectedComponents.includes('WINDSHIELD') && 
                                   selectedDamageTypes.includes('SEVERE_DAMAGE');
                                   
    if (hasForbiddenCombination) {
      newErrors.dependency = 'Windshield cannot have severe damage, please select a different component or damage type';
    }
    
    // Example 3: Through paint validation - only applicable for certain materials
    const metalMaterials = ['METAL', 'ALUMINUM', 'STEEL'];
    const hasMetal = selectedMaterials.some(m => metalMaterials.includes(m));
    
    if (throughPaint && (!hasMetal && selectedMaterials.length > 0)) {
      newErrors.dependency = 'Through paint is only applicable for metal materials';
    }
    
    setValidationErrors(newErrors);
  };
  
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
  
  // Generate a unique color for this indicator
  const indicatorColor = useMemo(() => {
    const damageType = selectedDamageTypes.length > 0 ? selectedDamageTypes[0] : 'DAMAGE';
    const component = selectedComponents.length > 0 ? selectedComponents[0] : '';
    // Use the existing indicator id as index, or a random number for new indicators
    const index = tempIndicator?.id ? parseInt(tempIndicator.id.replace(/\D/g, '')) % 100 : Math.floor(Math.random() * 100);
    
    return generateUniqueColor(damageType, component, index);
  }, [selectedDamageTypes, selectedComponents, tempIndicator?.id]);

  // Handle form confirmation
  const handleConfirm = () => {
    if (!activeImageId || !tempIndicator) return;
    
    // Perform validation before submitting
    validateForm();
    
    // Show a notification if there are validation errors but still allow submission
    if (Object.keys(validationErrors).length > 0) {
      // We could add a toast notification here if desired
      console.warn('Form submitted with validation errors:', validationErrors);
    }
    
    const damageType = selectedDamageTypes[0]; // Using first selected damage type
    const component = selectedComponents[0]; // Using first selected component
    const material = selectedMaterials.length > 0 ? selectedMaterials[0] : undefined;
    
    // Use our unique color generation
    const color = indicatorColor;
    
    // Find labels for notification
    const damageTypeOption = damageTypeOptions.find(dt => dt.id === damageType);
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
            backgroundColor: indicatorColor,
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
            width: '350px',
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
              className={`w-full bg-[#F3F4F6] rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 transition-colors ${
                validationErrors.component ? 'border border-red-400' : ''
              }`}
              onClick={() => setActiveModal(activeModal === 'component' ? null : 'component')}
            >
              <span className="text-xs font-mono font-semibold text-gray-800 uppercase">COMPONENT [P]</span>
              <div className="flex items-center">
                <span className={`text-xs font-mono font-semibold mr-1 ${
                  validationErrors.component ? 'text-red-500' : 'text-gray-800'
                }`}>
                  {componentValue}
                </span>
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            {validationErrors.component && (
              <p className="text-xs text-red-500 ml-1">{validationErrors.component}</p>
            )}
            
            {/* Material Selector */}
            <button
              className={`w-full bg-[#F3F4F6] rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 transition-colors ${
                validationErrors.material ? 'border border-red-400' : ''
              }`}
              onClick={() => setActiveModal(activeModal === 'material' ? null : 'material')}
            >
              <span className="text-xs font-mono font-semibold text-gray-800 uppercase">MATERIAL [M]</span>
              <div className="flex items-center">
                <span className={`text-xs font-mono font-semibold mr-1 ${
                  validationErrors.material ? 'text-red-500' : 'text-gray-800'
                }`}>
                  {materialValue}
                </span>
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            {validationErrors.material && (
              <p className="text-xs text-red-500 ml-1">{validationErrors.material}</p>
            )}
            
            {/* Damage Type Selector */}
            <button
              className={`w-full bg-[#F3F4F6] rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 transition-colors ${
                validationErrors.damageType ? 'border border-red-400' : ''
              }`}
              onClick={() => setActiveModal(activeModal === 'damageType' ? null : 'damageType')}
            >
              <span className="text-xs font-mono font-semibold text-gray-800 uppercase">DAMAGE TYPE [D]</span>
              <div className="flex items-center">
                <span className={`text-xs font-mono font-semibold mr-1 ${
                  validationErrors.damageType ? 'text-red-500' : 'text-gray-800'
                }`}>
                  {damageTypeValue}
                </span>
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            {validationErrors.damageType && (
              <p className="text-xs text-red-500 ml-1">{validationErrors.damageType}</p>
            )}
          
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
          
          {/* Dependency validation errors */}
          {validationErrors.dependency && (
            <div className="px-2 py-1 bg-red-50 border-t border-red-200 w-full">
              <p className="text-xs text-red-600 font-mono">{validationErrors.dependency}</p>
            </div>
          )}
          
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
              className="px-2 py-1 border border-transparent rounded-md text-xs font-medium text-white bg-[#1A58D2] hover:bg-blue-700 focus:outline-none font-mono"
              onClick={handleConfirm}
            >
              Confirm <span className="text-blue-300">[↵]</span>
            </button>
          </div>
          
          {/* Selection Modals - Positioned adjacent to main popup */}
          {activeModal && (
            <div className="absolute z-10" style={{
              left: position && position.x <= 50 ? '360px' : 'auto',
              right: position && position.x > 50 ? '360px' : 'auto',
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