import React, { useState, useEffect, forwardRef } from 'react';
import type { PopupPlacement } from '../../hooks/usePositionedPopup';

interface DamageOption {
  id: string;
  label: string;
  value?: string;
  color?: string;
}

interface DamageSelectionWithPopupProps {
  onCancel: () => void;
  onConfirm: (values: {
    damageTypes: string[];
    components: string[];
    materials: string[];
    severity: 'min' | 'med' | 'maj';
    throughPaint: boolean;
  }) => void;
  damageTypeOptions: DamageOption[];
  componentOptions: DamageOption[];
  materialOptions: DamageOption[];
  initialValues?: {
    damageTypes?: string[];
    components?: string[];
    materials?: string[];
    severity?: 'min' | 'med' | 'maj';
    throughPaint?: boolean;
  };
  arrowPosition?: PopupPlacement; // 'left', 'right', 'top', 'bottom'
}

// Các styte cho mũi tên chỉ hướng
const arrowStyles: Record<PopupPlacement, React.CSSProperties> = {
  top: { bottom: '-8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', background: 'white' },
  right: { left: '-8px', top: '50%', transform: 'translateY(-50%) rotate(45deg)', borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd', background: 'white' },
  bottom: { top: '-8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd', background: 'white' },
  left: { right: '-8px', top: '50%', transform: 'translateY(-50%) rotate(45deg)', borderRight: '1px solid #ddd', borderTop: '1px solid #ddd', background: 'white' }
};

const DamageSelectionWithPopup = forwardRef<HTMLDivElement, DamageSelectionWithPopupProps>(({
  onCancel,
  onConfirm,
  damageTypeOptions,
  componentOptions,
  materialOptions,
  initialValues = {},
  arrowPosition = 'left'
}, ref) => {
  // States for selections
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<string[]>(initialValues.damageTypes || []);
  const [selectedComponents, setSelectedComponents] = useState<string[]>(initialValues.components || []);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(initialValues.materials || []);
  const [severity, setSeverity] = useState<'min' | 'med' | 'maj'>(initialValues.severity || 'maj');
  const [throughPaint, setThroughPaint] = useState<boolean>(initialValues.throughPaint || false);
  
  // States for active selector
  const [activeComponent, setActiveComponent] = useState<string | null>(selectedComponents[0] || null);
  const [activeMaterial, setActiveMaterial] = useState<string | null>(selectedMaterials[0] || null);
  const [activeDamageType, setActiveDamageType] = useState<string | null>(selectedDamageTypes[0] || null);
  
  // State for which popup is visible
  const [activePopup, setActivePopup] = useState<'component' | 'material' | 'damageType' | null>(null);
  
  // Search states
  const [componentSearchQuery, setComponentSearchQuery] = useState('');
  const [materialSearchQuery, setMaterialSearchQuery] = useState('');
  const [damageTypeSearchQuery, setDamageTypeSearchQuery] = useState('');
  
  // Helper to find option by id
  const findOptionById = (options: DamageOption[], id: string | null) => {
    return options.find(option => option.id === id) || null;
  };
  
  // Toggle selection
  const toggleDamageType = (id: string) => {
    setSelectedDamageTypes(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setActiveDamageType(id);
    setActivePopup(null);
  };
  
  const toggleComponent = (id: string) => {
    setSelectedComponents(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setActiveComponent(id);
    setActivePopup(null);
  };
  
  const toggleMaterial = (id: string) => {
    setSelectedMaterials(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
    setActiveMaterial(id);
    setActivePopup(null);
  };
  
  // Filtered options
  const filteredComponents = componentSearchQuery
    ? componentOptions.filter(option => 
        option.label.toLowerCase().includes(componentSearchQuery.toLowerCase())
      )
    : componentOptions;
  
  const filteredMaterials = materialSearchQuery
    ? materialOptions.filter(option => 
        option.label.toLowerCase().includes(materialSearchQuery.toLowerCase())
      )
    : materialOptions;
  
  const filteredDamageTypes = damageTypeSearchQuery
    ? damageTypeOptions.filter(option => 
        option.label.toLowerCase().includes(damageTypeSearchQuery.toLowerCase())
      )
    : damageTypeOptions;
  
  // Handle confirm and return all selected values
  const handleConfirm = () => {
    // Pass all updated values to the parent component
    onConfirm({
      damageTypes: selectedDamageTypes,
      components: selectedComponents,
      materials: selectedMaterials,
      severity: severity,
      throughPaint: throughPaint
    });
  };
  
  // Handle severity change
  const handleSeverityChange = (newSeverity: 'min' | 'med' | 'maj') => {
    setSeverity(newSeverity);
  };
  
  // Handle through paint toggle
  const toggleThroughPaint = () => {
    setThroughPaint(!throughPaint);
  };
  
  // Handle escape key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePopup) {
          setActivePopup(null);
        } else {
          onCancel();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePopup, onCancel]);
  
  // Determines popup submenu position
  const getPopupSubMenuPosition = () => {
    // Default to right
    return '-right-full';
  };
  
  // Render arrow based on position
  const renderArrow = () => {
    const arrowStyle = arrowStyles[arrowPosition];
    return (
      <div 
        className="absolute w-4 h-4 z-10"
        style={arrowStyle}
      />
    );
  };
  
  return (
    <div 
      ref={ref}
      className="bg-white rounded-md shadow-lg border border-gray-200 w-full max-w-[280px] relative overflow-hidden"
      data-placement={arrowPosition}
      style={{ maxHeight: '90vh' }}
    >
      {/* Arrow indicator based on position */}
      {renderArrow()}
      
      {/* Main Selection Interface */}
      <div className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 40px)' }}>
        <h2 className="text-sm font-bold mb-2">Vehicle Damage Selection</h2>
        
        {/* Component Selector */}
        <div 
          className="bg-gray-50 rounded-md p-2 mb-2 cursor-pointer border border-gray-200 flex justify-between items-center"
          onClick={() => setActivePopup('component')}
        >
          <div>
            <div className="font-mono text-xs font-bold text-gray-700">COMPONENT [P]</div>
            {activeComponent && (
              <div className="font-mono text-xs text-gray-700 mt-1">
                {findOptionById(componentOptions, activeComponent)?.label} 
                {findOptionById(componentOptions, activeComponent)?.value && 
                  ` +${selectedComponents.length > 1 ? selectedComponents.length - 1 : ''}`}
              </div>
            )}
          </div>
          <div className="text-gray-400">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Material Selector */}
        <div 
          className="bg-gray-50 rounded-md p-2 mb-2 cursor-pointer border border-gray-200 flex justify-between items-center"
          onClick={() => setActivePopup('material')}
        >
          <div>
            <div className="font-mono text-xs font-bold text-gray-700">MATERIAL [M]</div>
            {activeMaterial && (
              <div className="font-mono text-xs text-gray-700 mt-1">
                {findOptionById(materialOptions, activeMaterial)?.label}
                {findOptionById(materialOptions, activeMaterial)?.value && 
                  ` +${selectedMaterials.length > 1 ? selectedMaterials.length - 1 : ''}`}
              </div>
            )}
          </div>
          <div className="text-gray-400">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Damage Type Selector */}
        <div 
          className="bg-gray-50 rounded-md p-2 mb-2 cursor-pointer border border-blue-200 border-2 flex justify-between items-center"
          onClick={() => setActivePopup('damageType')}
        >
          <div>
            <div className="font-mono text-xs font-bold text-gray-700">DAMAGE TYPE [D]</div>
            {activeDamageType && (
              <div className="font-mono text-xs text-gray-700 mt-1">
                {findOptionById(damageTypeOptions, activeDamageType)?.label}
                {findOptionById(damageTypeOptions, activeDamageType)?.value && 
                  ` +${selectedDamageTypes.length > 1 ? selectedDamageTypes.length - 1 : ''}`}
              </div>
            )}
          </div>
          <div className="text-gray-400">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Severity Options */}
        <div className="mb-2">
          <div className="font-mono text-xs font-bold text-gray-700 mb-1">SEVERITY</div>
          <div className="flex gap-1">
            <button
              className={`flex-1 py-1 px-2 rounded text-xs font-medium ${
                severity === 'min' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => handleSeverityChange('min')}
            >
              Min
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded text-xs font-medium ${
                severity === 'med' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => handleSeverityChange('med')}
            >
              Med
            </button>
            <button
              className={`flex-1 py-1 px-2 rounded text-xs font-medium ${
                severity === 'maj' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => handleSeverityChange('maj')}
            >
              Maj
            </button>
          </div>
        </div>
        
        {/* Through Paint Toggle */}
        <div className="mb-2">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              className="form-checkbox h-3 w-3 text-blue-600 rounded"
              checked={throughPaint}
              onChange={toggleThroughPaint}
            />
            <span className="font-mono text-xs font-bold text-gray-700 ml-1">THROUGH PAINT</span>
          </label>
        </div>
      </div>
      
      <div className="flex border-t border-gray-200 sticky bottom-0 bg-white">
        <button 
          className="flex-1 py-2 text-xs text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="flex-1 py-2 text-xs text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors rounded-br-md"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
      
      {/* Component Popup */}
      {activePopup === 'component' && (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex items-center justify-center z-50`}>
          <div className="bg-white border border-gray-200 shadow-lg rounded-md w-full max-w-[300px] max-h-[80vh] overflow-hidden">
            <div className="px-2 py-1 border-b border-gray-200 bg-gray-50 sticky top-0">
              <h2 className="text-xs font-mono font-bold uppercase">COMPONENT [P]</h2>
            </div>
            
            <div className="px-2 py-1 border-b border-gray-200 sticky top-8 bg-white">
              <div className="relative">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-6 pr-2 py-1 border border-gray-300 rounded-md text-xs bg-gray-50 placeholder-gray-500 focus:outline-none"
                  placeholder="Search.."
                  value={componentSearchQuery}
                  onChange={(e) => setComponentSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className={`w-full px-2 py-1 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                    selectedComponents.includes(component.id) ? 'bg-gray-50' : 'bg-white'
                  }`}
                  onClick={() => toggleComponent(component.id)}
                >
                  <div className="flex items-center gap-1">
                    {selectedComponents.includes(component.id) && (
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    <span className="font-mono text-xs text-gray-900">{component.label}</span>
                  </div>
                  {component.value && <span className="text-gray-500 font-mono text-xs">[{component.value}]</span>}
                </div>
              ))}
            </div>
            
            <div className="p-1 flex justify-between items-center border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                className="px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setActivePopup(null)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 bg-blue-600 rounded text-xs font-medium text-white hover:bg-blue-700"
                onClick={() => setActivePopup(null)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Material Popup */}
      {activePopup === 'material' && (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex items-center justify-center z-50`}>
          <div className="bg-white border border-gray-200 shadow-lg rounded-md w-full max-w-[300px] max-h-[80vh] overflow-hidden">
            <div className="px-2 py-1 border-b border-gray-200 bg-gray-50 sticky top-0">
              <h2 className="text-xs font-mono font-bold uppercase">MATERIAL [M]</h2>
            </div>
            
            <div className="px-2 py-1 border-b border-gray-200 sticky top-8 bg-white">
              <div className="relative">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-6 pr-2 py-1 border border-gray-300 rounded-md text-xs bg-gray-50 placeholder-gray-500 focus:outline-none"
                  placeholder="Search.."
                  value={materialSearchQuery}
                  onChange={(e) => setMaterialSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className={`w-full px-2 py-1 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                    selectedMaterials.includes(material.id) ? 'bg-gray-50' : 'bg-white'
                  }`}
                  onClick={() => toggleMaterial(material.id)}
                >
                  <div className="flex items-center gap-1">
                    {selectedMaterials.includes(material.id) && (
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    <span className="font-mono text-xs text-gray-900">{material.label}</span>
                  </div>
                  {material.value && <span className="text-gray-500 font-mono text-xs">[{material.value}]</span>}
                </div>
              ))}
            </div>
            
            <div className="p-1 flex justify-between items-center border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                className="px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setActivePopup(null)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 bg-blue-600 rounded text-xs font-medium text-white hover:bg-blue-700"
                onClick={() => setActivePopup(null)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Damage Type Popup */}
      {activePopup === 'damageType' && (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex items-center justify-center z-50`}>
          <div className="bg-white border border-gray-200 shadow-lg rounded-md w-full max-w-[300px] max-h-[80vh] overflow-hidden">
            <div className="px-2 py-1 border-b border-gray-200 bg-gray-50 sticky top-0">
              <h2 className="text-xs font-mono font-bold uppercase">DAMAGE TYPE [D]</h2>
            </div>
            
            <div className="px-2 py-1 border-b border-gray-200 sticky top-8 bg-white">
              <div className="relative">
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-6 pr-2 py-1 border border-gray-300 rounded-md text-xs bg-gray-50 placeholder-gray-500 focus:outline-none"
                  placeholder="Search.."
                  value={damageTypeSearchQuery}
                  onChange={(e) => setDamageTypeSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredDamageTypes.map((damageType) => (
                <div
                  key={damageType.id}
                  className={`w-full px-2 py-1 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                    selectedDamageTypes.includes(damageType.id) ? 'bg-gray-50' : 'bg-white'
                  }`}
                  onClick={() => toggleDamageType(damageType.id)}
                >
                  <div className="flex items-center gap-1">
                    {selectedDamageTypes.includes(damageType.id) && (
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                    <span className="font-mono text-xs text-gray-900">{damageType.label}</span>
                  </div>
                  {damageType.value && <span className="text-gray-500 font-mono text-xs">[{damageType.value}]</span>}
                </div>
              ))}
            </div>
            
            <div className="p-1 flex justify-between items-center border-t border-gray-200 sticky bottom-0 bg-white">
              <button
                className="px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setActivePopup(null)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 bg-blue-600 rounded text-xs font-medium text-white hover:bg-blue-700"
                onClick={() => setActivePopup(null)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default DamageSelectionWithPopup; 