import React, { useState, useEffect } from 'react';
import { Layout, Typography, notification } from 'antd';
import { useAppSelector, useAppDispatch } from '../../store';
import { 
  selectComponentOptions, 
  selectMaterialOptions, 
  selectDamageTypeOptions,
  selectSeverityOptions
} from '../../store/selectors/optionsSelectors';
import {
  selectSelectedPhotoId,
  selectAnnotationInProgress,
  selectIsAnnotationValid
} from '../../store/selectors/uiSelectors';
import {
  selectPhoto,
  startAnnotation,
  completeAnnotation,
  cancelAnnotation,
  updateAnnotationInProgress,
  toggleComponentForAnnotation,
  toggleDamageTypeForAnnotation
} from '../../store/slices/uiSlice';

const { Content } = Layout;
const { Title } = Typography;

// Component hiển thị một option trong popup
interface OptionItemProps {
  id: string | number;
  label: string;
  value: string | number;
  isSelected: boolean;
  onClick: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({
  id,
  label,
  value,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`w-full px-4 py-3 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-gray-50' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {isSelected && (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        )}
        <span className="font-mono text-sm font-semibold text-gray-900">{label}</span>
      </div>
      <span className="text-gray-500 font-mono text-sm">[{value}]</span>
    </div>
  );
};

// Component cho popup selector
interface SelectorPopupProps {
  title: string;
  options: any[];
  selectedOptions: (string | number)[];
  onSelect: (id: string | number) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const SelectorPopup: React.FC<SelectorPopupProps> = ({
  title,
  options,
  selectedOptions,
  onSelect,
  onCancel,
  onConfirm
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Lọc options theo tìm kiếm
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="absolute left-full top-0 ml-2 bg-white rounded-md shadow-lg w-[350px] z-10 border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-base font-mono font-bold uppercase">{title}</h2>
      </div>
      
      {/* Search input */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 placeholder-gray-500 focus:outline-none"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Options list */}
      <div className="max-h-[350px] overflow-y-auto">
        {filteredOptions.map((option) => (
          <OptionItem
            key={option.code}
            id={option.code}
            label={option.label}
            value={option.value || option.code}
            isSelected={selectedOptions.includes(option.code)}
            onClick={() => onSelect(option.code)}
          />
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="p-3 flex justify-between items-center border-t border-gray-200">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 font-mono"
          onClick={onCancel}
        >
          Cancel <span className="text-gray-500">[ESC]</span>
        </button>
        <button
          className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 font-mono"
          onClick={onConfirm}
        >
          Confirm <span className="text-blue-300">[↵]</span>
        </button>
      </div>
    </div>
  );
};

// Main component
const DamageSelectionRedux: React.FC = () => {
  // Redux hooks
  const dispatch = useAppDispatch();
  
  // Selectors from Redux
  const componentOptions = useAppSelector(selectComponentOptions);
  const materialOptions = useAppSelector(selectMaterialOptions);
  const damageTypeOptions = useAppSelector(selectDamageTypeOptions);
  const severityOptions = useAppSelector(selectSeverityOptions);
  
  const selectedPhotoId = useAppSelector(selectSelectedPhotoId);
  const annotationInProgress = useAppSelector(selectAnnotationInProgress);
  const isAnnotationValid = useAppSelector(selectIsAnnotationValid);
  
  // Active selector popup
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  
  // Destructuring annotation data
  const {
    components: selectedComponents = [],
    material: selectedMaterial = null,
    damageType: selectedDamageTypes = [],
    severity: selectedSeverity = null,
    throughPaint = false
  } = annotationInProgress || {};
  
  // Khởi tạo annotation nếu chưa có
  useEffect(() => {
    if (!annotationInProgress?.photoId && selectedPhotoId) {
      dispatch(startAnnotation({ photoId: selectedPhotoId }));
    } else if (!selectedPhotoId) {
      // Nếu chưa có selectedPhotoId, tạm thời chọn cái mặc định từ initialData
      dispatch(selectPhoto('photo-4'));
      setTimeout(() => dispatch(startAnnotation({ photoId: 'photo-4' })), 100);
    }
  }, [dispatch, annotationInProgress, selectedPhotoId]);
  
  // Toggle component selection
  const handleComponentToggle = (code: string) => {
    dispatch(toggleComponentForAnnotation(code));
  };
  
  // Set material
  const handleMaterialChange = (code: string) => {
    dispatch(updateAnnotationInProgress({ material: code }));
  };
  
  // Toggle damage type
  const handleDamageTypeToggle = (code: string) => {
    dispatch(toggleDamageTypeForAnnotation(code));
  };
  
  // Set severity
  const handleSeverityChange = (value: number) => {
    dispatch(updateAnnotationInProgress({ severity: value }));
  };
  
  // Toggle through paint
  const handleToggleThroughPaint = () => {
    dispatch(updateAnnotationInProgress({ throughPaint: !throughPaint }));
  };
  
  // Cancel annotation
  const handleCancel = () => {
    notification.info({
      message: 'Operation Cancelled',
      description: 'Your annotation has been discarded.',
    });
    dispatch(cancelAnnotation());
  };
  
  // Save annotation
  const handleSave = () => {
    if (isAnnotationValid) {
      dispatch(completeAnnotation());
      notification.success({
        message: 'Annotation Saved',
        description: 'Your damage annotation has been successfully saved.',
      });
    } else {
      notification.warning({
        message: 'Missing Information',
        description: 'Please complete all required fields: component, material, and damage type.',
      });
    }
  };
  
  // Handle selector popup cancel
  const handleSelectorCancel = () => {
    setActiveSelector(null);
  };
  
  // Handle selector popup confirm
  const handleSelectorConfirm = () => {
    setActiveSelector(null);
  };

  // Helper to get label
  const getLabel = (code: string | number, options: any[]) => {
    const option = options.find(opt => opt.code === code);
    return option ? option.label : '';
  };
  
  // Helper to convert severity value to display text
  const getSeverityLabel = (value: number | null) => {
    if (!value) return 'Select';
    const option = severityOptions.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <Layout className="min-h-screen bg-gray-100 p-8">
      <Content className="max-w-6xl mx-auto">
        <div className="flex flex-col">
          <Title level={2} className="mb-6">Vehicle Damage Selection (Redux)</Title>
          
          <div className="flex">
            {/* Main selection panel */}
            <div className="relative bg-white rounded-lg shadow-md p-6 w-full max-w-md">
              {/* Component Selector */}
              <div className="relative mb-4">
                <button
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                  onClick={() => setActiveSelector(activeSelector === 'component' ? null : 'component')}
                >
                  <span className="font-mono font-bold text-gray-800">COMPONENT [P]</span>
                  <div className="flex items-center">
                    <span className="font-mono text-gray-700 mr-2">
                      {selectedComponents.length > 0 
                        ? `${getLabel(selectedComponents[0], componentOptions)}${selectedComponents.length > 1 ? ` +${selectedComponents.length - 1}` : ''}` 
                        : 'Select'}
                    </span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Material Selector */}
              <div className="relative mb-4">
                <button
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                  onClick={() => setActiveSelector(activeSelector === 'material' ? null : 'material')}
                >
                  <span className="font-mono font-bold text-gray-800">MATERIAL [M]</span>
                  <div className="flex items-center">
                    <span className="font-mono text-gray-700 mr-2">
                      {selectedMaterial 
                        ? getLabel(selectedMaterial, materialOptions)
                        : 'Select'}
                    </span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Damage Type Selector */}
              <div className="relative mb-6">
                <button
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                  onClick={() => setActiveSelector(activeSelector === 'damage' ? null : 'damage')}
                >
                  <span className="font-mono font-bold text-gray-800">DAMAGE TYPE [D]</span>
                  <div className="flex items-center">
                    <span className="font-mono text-gray-700 mr-2">
                      {selectedDamageTypes.length > 0 
                        ? `${getLabel(selectedDamageTypes[0], damageTypeOptions)}${selectedDamageTypes.length > 1 ? ` +${selectedDamageTypes.length - 1}` : ''}` 
                        : 'Select'}
                    </span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Severity Options */}
              <div className="mb-4">
                <span className="font-mono font-bold text-gray-800 block mb-3">SEVERITY</span>
                <div className="flex gap-2">
                  {severityOptions.map((option) => (
                    <button 
                      key={option.value}
                      className={`rounded-full px-4 py-2 text-sm font-mono ${
                        selectedSeverity === option.value 
                        ? 'bg-gray-200 border border-gray-400' 
                        : 'bg-gray-100 border border-gray-300'
                      }`}
                      onClick={() => handleSeverityChange(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Through Paint Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono font-bold text-gray-800">THROUGH PAINT</span>
                <div 
                  className={`w-12 h-6 rounded-full ${throughPaint ? 'bg-blue-600' : 'bg-gray-300'} relative cursor-pointer`}
                  onClick={handleToggleThroughPaint}
                >
                  <div 
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transform transition-transform ${
                      throughPaint ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
              
              {/* Selected Items section */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <h3 className="text-base font-semibold text-gray-800 mb-3">Selected Items</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Components:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedComponents.length > 0 ? (
                        selectedComponents.map(code => (
                          <div key={code} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                            {getLabel(code, componentOptions)}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">None selected</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Material:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMaterial ? (
                        <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-mono">
                          {getLabel(selectedMaterial, materialOptions)}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">None selected</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Damage Types:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedDamageTypes.length > 0 ? (
                        selectedDamageTypes.map(code => (
                          <div key={code} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-mono">
                            {getLabel(code, damageTypeOptions)}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">None selected</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Severity:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeverity ? (
                        <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-mono">
                          {getSeverityLabel(selectedSeverity)}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">None selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Validation Message */}
              {!isAnnotationValid && (
                <div className="mt-4 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700 text-sm">
                  Please select at least one component, material, and damage type.
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 font-mono"
                  onClick={handleCancel}
                >
                  Cancel <span className="text-gray-500">[ESC]</span>
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white font-mono ${
                    isAnnotationValid 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-300 cursor-not-allowed'
                  }`}
                  onClick={handleSave}
                  disabled={!isAnnotationValid}
                >
                  Confirm <span className="text-blue-300">[↵]</span>
                </button>
              </div>
            </div>
            
            {/* Popup selector display */}
            <div className="relative">
              {activeSelector === 'component' && (
                <SelectorPopup
                  title="COMPONENT"
                  options={componentOptions}
                  selectedOptions={selectedComponents}
                  onSelect={handleComponentToggle}
                  onCancel={handleSelectorCancel}
                  onConfirm={handleSelectorConfirm}
                />
              )}
              
              {activeSelector === 'material' && (
                <SelectorPopup
                  title="MATERIAL"
                  options={materialOptions}
                  selectedOptions={selectedMaterial ? [selectedMaterial] : []}
                  onSelect={handleMaterialChange}
                  onCancel={handleSelectorCancel}
                  onConfirm={handleSelectorConfirm}
                />
              )}
              
              {activeSelector === 'damage' && (
                <SelectorPopup
                  title="DAMAGE TYPE"
                  options={damageTypeOptions}
                  selectedOptions={selectedDamageTypes}
                  onSelect={handleDamageTypeToggle}
                  onCancel={handleSelectorCancel}
                  onConfirm={handleSelectorConfirm}
                />
              )}
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default DamageSelectionRedux; 