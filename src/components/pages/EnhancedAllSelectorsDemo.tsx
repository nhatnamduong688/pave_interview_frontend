import React, { useState } from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

// Sample data
const componentTypes = [
  { id: 1, label: 'Front Bumper', value: 'FB' },
  { id: 2, label: 'Rear Bumper', value: 'RB' },
  { id: 3, label: 'Front Left Door', value: 'FLD' },
  { id: 4, label: 'Front Right Door', value: 'FRD' },
  { id: 5, label: 'Rear Left Door', value: 'RLD' },
  { id: 6, label: 'Rear Right Door', value: 'RRD' },
  { id: 7, label: 'Hood', value: 'HD' },
  { id: 8, label: 'Trunk', value: 'TR' },
];

const materialTypes = [
  { id: 1, label: 'Plastic', value: 'PL' },
  { id: 2, label: 'Metal', value: 'MT' },
  { id: 3, label: 'Aluminum', value: 'AL' },
  { id: 4, label: 'Carbon Fiber', value: 'CF' },
  { id: 5, label: 'Glass', value: 'GL' },
];

const damageTypes = [
  { id: 1, label: 'Bent', value: 'BT' },
  { id: 2, label: 'Broken', value: 'BR' },
  { id: 3, label: 'Chipped', value: 'CH' },
  { id: 4, label: 'Dent', value: 'DT' },
  { id: 5, label: 'Scratched', value: 'SC' },
  { id: 6, label: 'Torn', value: 'TN' },
  { id: 7, label: 'Other', value: 'OT' },
];

// Enhanced option component with modern styling
interface EnhancedOptionProps {
  id: string | number;
  label: string;
  value: string | number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const EnhancedOption: React.FC<EnhancedOptionProps> = ({
  id,
  label,
  value,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  let stateClasses = 'bg-white border-0';
  if (isSelected && isHovered) {
    stateClasses = 'bg-gray-100 border border-blue-500';
  } else if (isSelected) {
    stateClasses = 'bg-gray-100 border border-gray-300';
  } else if (isHovered) {
    stateClasses = 'bg-gray-100 border-0';
  }
  
  return (
    <div
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      className={`
        inline-flex items-center w-full gap-2 px-3 py-2 
        rounded-full cursor-pointer mb-1 transition-colors
        border ${stateClasses}
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="flex-shrink-0">
        {isSelected ? (
          <svg className="w-4 h-4 text-[#1A58D2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : isHovered ? (
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.27731 6.25L5.36891 9.5L11.563 3" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ) : (
          <div className="w-4 h-4" />
        )}
      </div>
      
      <span className="flex-grow font-mono text-xs font-semibold text-[#1F2937] text-opacity-[0.88]">{label}</span>
      
      <span className="inline-flex items-center justify-center text-xs font-medium text-[#1F2937] text-opacity-[0.38] font-mono">
        [{value}]
      </span>
    </div>
  );
};

// Enhanced selector panel component
interface EnhancedSelectorPanelProps {
  title: string;
  options: any[];
  selectedOptions: (string | number)[];
  onSearch: (value: string) => void;
  onToggleOption: (id: string | number) => void;
  onCancel: () => void;
  onConfirm: () => void;
  searchTerm: string;
}

const EnhancedSelectorPanel: React.FC<EnhancedSelectorPanelProps> = ({
  title,
  options,
  selectedOptions,
  onSearch,
  onToggleOption,
  onCancel,
  onConfirm,
  searchTerm
}) => {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[220px]">
        {/* Tiêu đề */}
        <div className="px-4 py-2 border-b border-gray-200">
          <h2 className="text-xs font-mono font-semibold text-gray-900 uppercase tracking-tight">{title}</h2>
        </div>

        {/* Ô tìm kiếm */}
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-[#F3F4F6] placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono"
              placeholder="Search.."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Danh sách options */}
        <div className="max-h-60 overflow-y-auto p-2">
          {options.map((option) => (
            <EnhancedOption
              key={option.id}
              id={option.id}
              label={option.label}
              value={option.value}
              isSelected={selectedOptions.includes(option.id)}
              isHovered={hoveredId === option.id}
              onClick={() => onToggleOption(option.id)}
              onMouseEnter={() => setHoveredId(option.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="px-4 py-2 flex justify-between items-center border-t border-gray-200">
          <button
            type="button"
            className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none font-mono"
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
      </div>
    </div>
  );
};

// Main component
const EnhancedAllSelectorsDemo: React.FC = () => {
  // State for tracking selections
  const [selectedComponents, setSelectedComponents] = useState<(string | number)[]>([1, 7]);
  const [selectedMaterials, setSelectedMaterials] = useState<(string | number)[]>([1]);
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<(string | number)[]>([4]);
  
  // State for active selector
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  
  // Search terms
  const [searchTerms, setSearchTerms] = useState({
    component: '',
    material: '',
    damage: ''
  });

  // Get filtered options
  const getFilteredOptions = (type: 'component' | 'material' | 'damage', searchTerm: string) => {
    const options = type === 'component' 
      ? componentTypes 
      : type === 'material' 
        ? materialTypes 
        : damageTypes;
    
    if (!searchTerm) return options;
    
    return options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get label for selected option
  const getLabel = (id: string | number, options: any[]) => {
    const option = options.find(opt => opt.id === id);
    return option ? option.label : 'Unknown';
  };

  // Handle search
  const handleSearch = (type: 'component' | 'material' | 'damage', value: string) => {
    setSearchTerms(prev => ({ ...prev, [type]: value }));
  };

  // Toggle option selection
  const toggleOption = (id: string | number, type: 'component' | 'material' | 'damage') => {
    if (type === 'component') {
      setSelectedComponents(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    } else if (type === 'material') {
      setSelectedMaterials(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    } else {
      setSelectedDamageTypes(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    }
  };

  // Handle confirm
  const handleConfirm = (type: 'component' | 'material' | 'damage') => {
    // Here you would typically save the selections or perform any other actions
    setActiveSelector(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setActiveSelector(null);
  };

  // Render the appropriate selector based on activeSelector state
  const renderSelector = () => {
    if (!activeSelector) return null;

    if (activeSelector === 'component') {
      return (
        <EnhancedSelectorPanel
          title="COMPONENT"
          options={getFilteredOptions('component', searchTerms.component)}
          selectedOptions={selectedComponents}
          onSearch={(value) => handleSearch('component', value)}
          onToggleOption={(id) => toggleOption(id, 'component')}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm('component')}
          searchTerm={searchTerms.component}
        />
      );
    } else if (activeSelector === 'material') {
      return (
        <EnhancedSelectorPanel
          title="MATERIAL"
          options={getFilteredOptions('material', searchTerms.material)}
          selectedOptions={selectedMaterials}
          onSearch={(value) => handleSearch('material', value)}
          onToggleOption={(id) => toggleOption(id, 'material')}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm('material')}
          searchTerm={searchTerms.material}
        />
      );
    } else if (activeSelector === 'damage') {
      return (
        <EnhancedSelectorPanel
          title="DAMAGE TYPE"
          options={getFilteredOptions('damage', searchTerms.damage)}
          selectedOptions={selectedDamageTypes}
          onSearch={(value) => handleSearch('damage', value)}
          onToggleOption={(id) => toggleOption(id, 'damage')}
          onCancel={handleCancel}
          onConfirm={() => handleConfirm('damage')}
          searchTerm={searchTerms.damage}
        />
      );
    }

    return null;
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Title level={2}>Enhanced All Selectors Demo</Title>
        <Text className="text-gray-500 block mb-6">
          Phiên bản cải tiến kết hợp giữa Interactive Demo và AllSelectorsDemo
        </Text>

        <div className="flex flex-col items-center">
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
            <Title level={4} className="mb-4">Vehicle Damage Selection</Title>
            
            {/* Selector buttons */}
            <div className="space-y-3">
              {/* Component button */}
              <button
                className="w-full bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
                onClick={() => setActiveSelector('component')}
              >
                <span className="text-xs font-mono font-semibold text-gray-800 uppercase">COMPONENT [P]</span>
                <div className="flex items-center">
                  <span className="text-xs font-mono font-semibold text-gray-800">
                    {selectedComponents.length > 0 
                      ? `${getLabel(selectedComponents[0], componentTypes)}${selectedComponents.length > 1 ? ` +${selectedComponents.length - 1}` : ''}` 
                      : 'Select'}
                  </span>
                  <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Material button */}
              <button
                className="w-full bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
                onClick={() => setActiveSelector('material')}
              >
                <span className="text-xs font-mono font-semibold text-gray-800 uppercase">MATERIAL [M]</span>
                <div className="flex items-center">
                  <span className="text-xs font-mono font-semibold text-gray-800">
                    {selectedMaterials.length > 0 
                      ? `${getLabel(selectedMaterials[0], materialTypes)}${selectedMaterials.length > 1 ? ` +${selectedMaterials.length - 1}` : ''}` 
                      : 'Select'}
                  </span>
                  <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Damage Type button */}
              <button
                className="w-full bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
                onClick={() => setActiveSelector('damage')}
              >
                <span className="text-xs font-mono font-semibold text-gray-800 uppercase">DAMAGE TYPE [D]</span>
                <div className="flex items-center">
                  <span className="text-xs font-mono font-semibold text-gray-800">
                    {selectedDamageTypes.length > 0 
                      ? `${getLabel(selectedDamageTypes[0], damageTypes)}${selectedDamageTypes.length > 1 ? ` +${selectedDamageTypes.length - 1}` : ''}` 
                      : 'Select'}
                  </span>
                  <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Selected items summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Selected Items:</h3>
              
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-semibold text-gray-600">Components:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedComponents.map(id => (
                      <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                        {getLabel(id, componentTypes)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-gray-600">Materials:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMaterials.map(id => (
                      <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                        {getLabel(id, materialTypes)}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-gray-600">Damage Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedDamageTypes.map(id => (
                      <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                        {getLabel(id, damageTypes)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render the active selector */}
        {renderSelector()}
      </Content>
    </Layout>
  );
};

export default EnhancedAllSelectorsDemo; 