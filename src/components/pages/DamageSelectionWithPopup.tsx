import React, { useState } from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

// Sample data - Sử dụng tên và giá trị từ hình mẫu
const componentTypes = [
  { id: 1, label: 'DOOR_FRONT_LEFT', value: 1 },
  { id: 2, label: 'FENDER_FRONT_LEFT', value: 2 },
  { id: 3, label: 'PILLAR_B_LEFT', value: 3 },
  { id: 4, label: 'QUARTER_PANEL_LEFT', value: 4 },
  { id: 5, label: 'ROCKER_PANEL_LEFT', value: 5 },
  { id: 6, label: 'ROOF_LINE_LEFT', value: 6 },
  { id: 7, label: 'PILLAR_COVER_REAR_LEFT', value: 7 },
  { id: 8, label: 'Front Bumper', value: 'FB' },
  { id: 9, label: 'Rear Bumper', value: 'RB' },
  { id: 10, label: 'Front Left Door', value: 'FLD' },
  { id: 11, label: 'Front Right Door', value: 'FRD' },
  { id: 12, label: 'Rear Left Door', value: 'RLD' },
  { id: 13, label: 'Rear Right Door', value: 'RRD' },
];

const materialTypes = [
  { id: 1, label: 'PAINT', value: 'PT' },
  { id: 2, label: 'METAL', value: 'MT' },
  { id: 3, label: 'ALUMINUM', value: 'AL' },
  { id: 4, label: 'PLASTIC', value: 'PL' },
  { id: 5, label: 'GLASS', value: 'GL' },
];

const damageTypes = [
  { id: 1, label: 'BENT', value: 'BT' },
  { id: 2, label: 'BROKEN', value: 'BR' },
  { id: 3, label: 'DENT', value: 'DT' },
  { id: 4, label: 'SEVERE DAMAGE', value: 'SD' },
  { id: 5, label: 'SCRATCHED', value: 'SC' },
];

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
          />
        </div>
      </div>
      
      {/* Options list */}
      <div className="max-h-[350px] overflow-y-auto">
        {options.map((option) => (
          <OptionItem
            key={option.id}
            id={option.id}
            label={option.label}
            value={option.value}
            isSelected={selectedOptions.includes(option.id)}
            onClick={() => onSelect(option.id)}
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
const DamageSelectionWithPopup: React.FC = () => {
  // States for selections
  const [selectedComponents, setSelectedComponents] = useState<(string | number)[]>([3, 4, 6, 7, 8]);
  const [selectedMaterials, setSelectedMaterials] = useState<(string | number)[]>([4]);
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<(string | number)[]>([3]);
  const [severity, setSeverity] = useState<string>('maj');
  const [throughPaint, setThroughPaint] = useState<boolean>(false);
  
  // Active selector
  const [activeSelector, setActiveSelector] = useState<string | null>('component');
  
  // Toggle selection
  const toggleSelection = (id: string | number, type: 'component' | 'material' | 'damage') => {
    if (type === 'component') {
      setSelectedComponents(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else if (type === 'material') {
      setSelectedMaterials(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setSelectedDamageTypes(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };
  
  // Helper to get label
  const getLabel = (id: string | number, options: any[]) => {
    const option = options.find(opt => opt.id === id);
    return option ? option.label : '';
  };
  
  // Toggle through paint
  const toggleThroughPaint = () => {
    setThroughPaint(!throughPaint);
  };
  
  // Handle selector popup cancel
  const handleSelectorCancel = () => {
    setActiveSelector(null);
  };
  
  // Handle selector popup confirm
  const handleSelectorConfirm = () => {
    setActiveSelector(null);
  };

  return (
    <Layout className="min-h-screen bg-gray-100 p-8">
      <Content className="max-w-6xl mx-auto">
        <div className="flex flex-col">
          <Title level={2} className="mb-6">Vehicle Damage Selection</Title>
          
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
                        ? `${getLabel(selectedComponents[0], componentTypes)}${selectedComponents.length > 1 ? ` +${selectedComponents.length - 1}` : ''}` 
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
                      {selectedMaterials.length > 0 
                        ? `${getLabel(selectedMaterials[0], materialTypes)}${selectedMaterials.length > 1 ? ` +${selectedMaterials.length - 1}` : ''}` 
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
                        ? `${getLabel(selectedDamageTypes[0], damageTypes)}${selectedDamageTypes.length > 1 ? ` +${selectedDamageTypes.length - 1}` : ''}` 
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
                  <button 
                    className={`rounded-full px-4 py-2 text-sm font-mono ${severity === 'min' 
                      ? 'bg-gray-200 border border-gray-400' 
                      : 'bg-gray-100 border border-gray-300'}`}
                    onClick={() => setSeverity('min')}
                  >
                    Min
                  </button>
                  <button 
                    className={`rounded-full px-4 py-2 text-sm font-mono ${severity === 'med' 
                      ? 'bg-gray-200 border border-gray-400' 
                      : 'bg-gray-100 border border-gray-300'}`}
                    onClick={() => setSeverity('med')}
                  >
                    Med
                  </button>
                  <button 
                    className={`rounded-full px-4 py-2 text-sm font-mono ${severity === 'maj' 
                      ? 'bg-red-100 border border-red-400' 
                      : 'bg-gray-100 border border-gray-300'}`}
                    onClick={() => setSeverity('maj')}
                  >
                    Maj
                  </button>
                </div>
              </div>
              
              {/* Through Paint Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono font-bold text-gray-800">THROUGH PAINT</span>
                <div 
                  className={`w-12 h-6 rounded-full ${throughPaint ? 'bg-blue-600' : 'bg-gray-300'} relative cursor-pointer`}
                  onClick={toggleThroughPaint}
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
                      {selectedComponents.map(id => (
                        <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                          {getLabel(id, componentTypes)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Materials:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMaterials.map(id => (
                        <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                          {getLabel(id, materialTypes)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Damage Types:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedDamageTypes.map(id => (
                        <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                          {getLabel(id, damageTypes)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-between items-center">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 font-mono"
                >
                  Cancel <span className="text-gray-500">[ESC]</span>
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 font-mono"
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
                  options={componentTypes}
                  selectedOptions={selectedComponents}
                  onSelect={(id) => toggleSelection(id, 'component')}
                  onCancel={handleSelectorCancel}
                  onConfirm={handleSelectorConfirm}
                />
              )}
              
              {activeSelector === 'material' && (
                <SelectorPopup
                  title="MATERIAL"
                  options={materialTypes}
                  selectedOptions={selectedMaterials}
                  onSelect={(id) => toggleSelection(id, 'material')}
                  onCancel={handleSelectorCancel}
                  onConfirm={handleSelectorConfirm}
                />
              )}
              
              {activeSelector === 'damage' && (
                <SelectorPopup
                  title="DAMAGE TYPE"
                  options={damageTypes}
                  selectedOptions={selectedDamageTypes}
                  onSelect={(id) => toggleSelection(id, 'damage')}
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

export default DamageSelectionWithPopup; 