import React, { useState } from 'react';
import { Layout, Button, Card, Space, Divider, Typography, Tabs } from 'antd';
import DamageTypeSelector, { DamageTypeOption } from '../molecules/DamageTypeSelector';
import MaterialSelector, { MaterialOption } from '../molecules/MaterialSelector';
import ComponentSelector, { ComponentOption } from '../molecules/ComponentSelector';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mẫu dữ liệu cho damage types
const damageTypes: DamageTypeOption[] = [
  { id: 1, label: 'BENT', value: 1 },
  { id: 2, label: 'BROKEN', value: 2 },
  { id: 3, label: 'CHIPPED', value: 3 },
  { id: 4, label: 'SEVERE DAMAGE', value: 4 },
  { id: 5, label: 'DENT', value: 5 },
  { id: 6, label: 'GOUGED', value: 6 },
  { id: 7, label: 'HAIL DAMAGE', value: 7 },
  { id: 8, label: 'MISSING', value: 8 },
  { id: 9, label: 'RUSTED', value: 9 },
  { id: 10, label: 'SCRATCHED', value: 10 },
  { id: 11, label: 'WATER DAMAGE', value: 11 },
];

// Mẫu dữ liệu cho materials
const materialTypes: MaterialOption[] = [
  { id: 1, label: 'PAINT', value: 1 },
  { id: 2, label: 'TEXTURE_SURFACE', value: 2 },
  { id: 3, label: 'CHROME', value: 3 },
  { id: 4, label: 'STEEL', value: 4 },
  { id: 5, label: 'PLASTIC', value: 5 },
  { id: 6, label: 'ALUMINUM', value: 6 },
  { id: 7, label: 'GLASS', value: 7 },
  { id: 8, label: 'RUBBER', value: 8 },
];

// Mẫu dữ liệu cho components
const componentTypes: ComponentOption[] = [
  { id: 1, label: 'DOOR_FRONT_LEFT', value: 1 },
  { id: 2, label: 'FENDER_FRONT_LEFT', value: 2 },
  { id: 3, label: 'PILLAR_B_LEFT', value: 3 },
  { id: 4, label: 'QUARTER_PANEL_LEFT', value: 4 },
  { id: 5, label: 'ROCKER_PANEL_LEFT', value: 5 },
  { id: 6, label: 'ROOF_LINE_LEFT', value: 6 },
  { id: 7, label: 'PILLAR_COVER_REAR_LEFT', value: 7 },
  { id: 8, label: 'DOOR_FRONT_RIGHT', value: 8 },
  { id: 9, label: 'FENDER_FRONT_RIGHT', value: 9 },
  { id: 10, label: 'HOOD', value: 10 },
];

// Component cho AllSelectorsPanel
const AllSelectorsPanel: React.FC = () => {
  // State for tracking selections
  const [selectedComponent, setSelectedComponent] = useState<string | number>(1);
  const [selectedComponents, setSelectedComponents] = useState<(string | number)[]>([1, 2, 4, 5, 6, 7]);
  const [selectedMaterials, setSelectedMaterials] = useState<(string | number)[]>([1]);
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<(string | number)[]>([4]);
  const [selectedSeverity, setSelectedSeverity] = useState('maj');
  const [throughPaint, setThroughPaint] = useState(true);

  // State for active selector
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  
  // Search term for each selector
  const [searchTerms, setSearchTerms] = useState({
    component: '',
    material: '',
    damage: ''
  });

  // Filtered options
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

  // Get label helper function
  const getLabel = (id: string | number, options: any[]) => {
    const option = options.find(opt => opt.id === id);
    return option ? option.label : 'Unknown';
  };

  // Handle search
  const handleSearch = (type: 'component' | 'material' | 'damage', value: string) => {
    setSearchTerms(prev => ({ ...prev, [type]: value }));
  };
  
  // Check if option is selected (for multi-select)
  const isOptionSelected = (id: string | number, type: 'component' | 'material' | 'damage') => {
    if (type === 'damage') {
      return selectedDamageTypes.includes(id);
    } else if (type === 'component') {
      return selectedComponents.includes(id);
    } else {
      return selectedMaterials.includes(id);
    }
  };

  // Toggle option selection
  const toggleOption = (id: string | number, type: 'component' | 'material' | 'damage') => {
    if (type === 'damage') {
      // Multi-select for damage
      if (selectedDamageTypes.includes(id)) {
        setSelectedDamageTypes(selectedDamageTypes.filter(itemId => itemId !== id));
      } else {
        setSelectedDamageTypes([...selectedDamageTypes, id]);
      }
    } else if (type === 'component') {
      // Multi-select for component
      if (selectedComponents.includes(id)) {
        setSelectedComponents(selectedComponents.filter(itemId => itemId !== id));
      } else {
        setSelectedComponents([...selectedComponents, id]);
      }
      // Update primary selected component
      setSelectedComponent(id);
    } else {
      // Multi-select for material
      if (selectedMaterials.includes(id)) {
        setSelectedMaterials(selectedMaterials.filter(itemId => itemId !== id));
      } else {
        setSelectedMaterials([...selectedMaterials, id]);
      }
    }
  };

  // Severity options
  const severityOptions = [
    { id: 'min', label: 'Min' },
    { id: 'med', label: 'Med' },
    { id: 'maj', label: 'Maj' },
  ];

  // Render selector panel
  const renderSelector = (type: 'component' | 'material' | 'damage') => {
    if (activeSelector !== type) return null;
    
    const options = getFilteredOptions(type, searchTerms[type]);
    const title = type === 'component' 
      ? 'COMPONENT' 
      : type === 'material' 
        ? 'MATERIAL' 
        : 'DAMAGE TYPE';

    return (
      <div className="absolute left-full ml-2 top-0 bg-white rounded-2xl shadow-lg overflow-hidden w-[220px]">
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
              value={searchTerms[type]}
              onChange={(e) => handleSearch(type, e.target.value)}
            />
          </div>
        </div>

        {/* Danh sách options */}
        <div className="max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="px-4 py-2 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => toggleOption(option.id, type)}
            >
              <div className="flex items-center">
                {type === 'component' ? (
                  // Checkbox style for component (multi-select)
                  <div className="flex items-center">
                    <div className={`w-5 h-5 mr-2 flex-shrink-0 rounded border flex items-center justify-center ${
                      isOptionSelected(option.id, type) ? 'bg-[#1A58D2] border-[#1A58D2]' : 'border-gray-300'
                    }`}>
                      {isOptionSelected(option.id, type) && (
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-mono text-xs font-semibold text-gray-900">{option.label}</span>
                  </div>
                ) : (
                  // Checkmark style for material and damage (single-select)
                  <div className="flex items-center">
                    {isOptionSelected(option.id, type) && (
                      <svg className="w-4 h-4 text-[#1A58D2] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span className="font-mono text-xs font-semibold text-gray-900">{option.label}</span>
                  </div>
                )}
              </div>
              <span className="text-gray-500 font-mono text-xs">[{option.value}]</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative my-8">
      <div className="bg-white rounded-2xl shadow-xl w-[330px] overflow-hidden">
        <div className="p-4 space-y-3">
          {/* Component Selection Row */}
          <div 
            className="bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center cursor-pointer"
            onClick={() => setActiveSelector(activeSelector === 'component' ? null : 'component')}
          >
            <span className="text-xs font-mono font-semibold text-gray-800 uppercase">COMPONENT [P]</span>
            <div className="flex items-center">
              <span className="text-xs font-mono font-semibold text-gray-800">{getLabel(selectedComponent, componentTypes)}</span>
              <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Material Selection Row */}
          <div 
            className="bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center cursor-pointer"
            onClick={() => setActiveSelector(activeSelector === 'material' ? null : 'material')}
          >
            <span className="text-xs font-mono font-semibold text-gray-800 uppercase">MATERIAL [M]</span>
            <div className="flex items-center">
              <span className="text-xs font-mono font-semibold text-gray-800">
                {selectedMaterials.length > 0 
                  ? getLabel(selectedMaterials[0], materialTypes) + (selectedMaterials.length > 1 ? ` +${selectedMaterials.length - 1}` : '')
                  : 'Select'}
              </span>
              <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Damage Type Selection Row */}
          <div 
            className="bg-[#F3F4F6] rounded-lg p-3 flex justify-between items-center cursor-pointer"
            onClick={() => setActiveSelector(activeSelector === 'damage' ? null : 'damage')}
          >
            <span className="text-xs font-mono font-semibold text-gray-800 uppercase">DAMAGE TYPE [D]</span>
            <div className="flex items-center">
              <span className="text-xs font-mono font-semibold text-gray-800">
                {selectedDamageTypes.length > 0 
                  ? getLabel(selectedDamageTypes[0], damageTypes) + (selectedDamageTypes.length > 1 ? ` +${selectedDamageTypes.length - 1}` : '')
                  : 'Select'}
              </span>
              <svg className="w-3 h-3 text-gray-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Severity Options */}
          <div className="p-3">
            <span className="text-xs font-mono font-semibold text-gray-800 uppercase block mb-2">SEVERITY</span>
            <div className="flex space-x-2">
              {severityOptions.map(option => (
                <button 
                  key={option.id} 
                  type="button"
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold text-gray-800 ${
                    selectedSeverity === option.id 
                      ? option.id === 'maj' 
                        ? 'bg-[#F9D0D0] border border-[#E35A5A]' 
                        : 'bg-[#F9FAFB] border border-gray-400' 
                      : 'bg-[#F9FAFB] border border-[#D1D5DB]'
                  }`}
                  onClick={() => setSelectedSeverity(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Through Paint Toggle */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-gray-800 uppercase">THROUGH PAINT</span>
            <div className="relative inline-block w-12 align-middle select-none">
              <div 
                className={`h-5 w-10 rounded-full flex items-center p-0.5 ${throughPaint ? 'bg-[#1A58D2] justify-end' : 'bg-gray-300 justify-start'}`}
                onClick={() => setThroughPaint(!throughPaint)}
                style={{ cursor: 'pointer' }}
              >
                <div className="h-4 w-4 rounded-full bg-white border border-gray-200 shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex justify-between items-center border-t border-gray-200 mt-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none font-mono"
            >
              Cancel <span className="text-gray-500">[ESC]</span>
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-[#1A58D2] border border-transparent rounded-md text-xs font-medium text-white hover:bg-blue-700 focus:outline-none font-mono"
            >
              Confirm <span className="text-blue-300">[↵]</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render the active selector */}
      {renderSelector('component')}
      {renderSelector('material')}
      {renderSelector('damage')}
    </div>
  );
};

const DamageTypeSelectorDemo: React.FC = () => {
  const [damageVisible, setDamageVisible] = useState(false);
  const [materialVisible, setMaterialVisible] = useState(false);
  const [componentVisible, setComponentVisible] = useState(false);
  
  const [selectedDamageTypes, setSelectedDamageTypes] = useState<(string | number)[]>([1, 2, 3]);
  const [selectedMaterials, setSelectedMaterials] = useState<(string | number)[]>([1]);
  const [selectedComponent, setSelectedComponent] = useState<string | number>(1);
  
  const [filteredDamageTypes, setFilteredDamageTypes] = useState(damageTypes);
  const [filteredMaterialTypes, setFilteredMaterialTypes] = useState(materialTypes);
  const [filteredComponentTypes, setFilteredComponentTypes] = useState(componentTypes);

  const handleDamageSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredDamageTypes(damageTypes);
      return;
    }
    const filtered = damageTypes.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDamageTypes(filtered);
  };

  const handleMaterialSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredMaterialTypes(materialTypes);
      return;
    }
    const filtered = materialTypes.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterialTypes(filtered);
  };

  const handleComponentSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredComponentTypes(componentTypes);
      return;
    }
    const filtered = componentTypes.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComponentTypes(filtered);
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Title level={2}>Selection Components Demo</Title>
        <Text className="text-gray-500 block mb-6">
          Tất cả các component lựa chọn trong một trang demo.
        </Text>

        <Tabs defaultActiveKey="1" className="mb-8">
          <TabPane tab="All Selectors (Combined UI)" key="1">
            <div className="flex justify-center">
              <AllSelectorsPanel />
            </div>
          </TabPane>
          
          <TabPane tab="Individual Components" key="2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* DamageTypeSelector */}
              <Card title="DamageTypeSelector" className="shadow-md">
                <Space direction="vertical" className="w-full">
                  <Button type="primary" onClick={() => setDamageVisible(true)} className="mb-4">
                    Open Damage Type Selector
                  </Button>
                  
                  <Divider>Selected Damage Types</Divider>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedDamageTypes.length === 0 ? (
                      <Text className="text-gray-500">No damage types selected</Text>
                    ) : (
                      <ul className="list-disc pl-5">
                        {selectedDamageTypes.map(id => {
                          const option = damageTypes.find(opt => opt.id === id);
                          return option ? (
                            <li key={id} className="mb-1">
                              <Text strong>{option.label}</Text> <Text type="secondary">[{option.value}]</Text>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    )}
                  </div>
                </Space>

                <DamageTypeSelector
                  options={filteredDamageTypes}
                  selectedOptions={selectedDamageTypes}
                  onSelectOption={(ids) => setSelectedDamageTypes(ids)}
                  onSearch={handleDamageSearch}
                  onCancel={() => setDamageVisible(false)}
                  onConfirm={(selected) => {
                    setSelectedDamageTypes(selected);
                    setDamageVisible(false);
                  }}
                  isVisible={damageVisible}
                />
              </Card>

              {/* MaterialSelector */}
              <Card title="MaterialSelector" className="shadow-md">
                <Space direction="vertical" className="w-full">
                  <Button type="primary" onClick={() => setMaterialVisible(true)} className="mb-4">
                    Open Material Selector
                  </Button>
                  
                  <Divider>Selected Materials</Divider>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedMaterials.length === 0 ? (
                      <Text className="text-gray-500">No material selected</Text>
                    ) : (
                      <ul className="list-disc pl-5">
                        {selectedMaterials.map(id => {
                          const option = materialTypes.find(opt => opt.id === id);
                          return option ? (
                            <li key={id} className="mb-1">
                              <Text strong>{option.label}</Text> <Text type="secondary">[{option.value}]</Text>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    )}
                  </div>
                </Space>

                <MaterialSelector
                  options={filteredMaterialTypes}
                  selectedOptions={selectedMaterials}
                  onSelectOption={(ids) => setSelectedMaterials(ids)}
                  onSearch={handleMaterialSearch}
                  onCancel={() => setMaterialVisible(false)}
                  onConfirm={(selected) => {
                    setSelectedMaterials(selected);
                    setMaterialVisible(false);
                  }}
                  isVisible={materialVisible}
                />
              </Card>

              {/* ComponentSelector */}
              <Card title="ComponentSelector" className="shadow-md">
                <Space direction="vertical" className="w-full">
                  <Button type="primary" onClick={() => setComponentVisible(true)} className="mb-4">
                    Open Component Selector
                  </Button>
                  
                  <Divider>Selected Component</Divider>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedComponent ? (
                      <div>
                        {(() => {
                          const option = componentTypes.find(opt => opt.id === selectedComponent);
                          return option ? (
                            <div>
                              <Text strong>{option.label}</Text> <Text type="secondary">[{option.value}]</Text>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    ) : (
                      <Text className="text-gray-500">No component selected</Text>
                    )}
                  </div>
                </Space>

                <ComponentSelector
                  options={filteredComponentTypes}
                  selectedOption={selectedComponent}
                  onSelectOption={(id) => setSelectedComponent(id)}
                  onSearch={handleComponentSearch}
                  onCancel={() => setComponentVisible(false)}
                  onConfirm={(selected) => {
                    setSelectedComponent(selected);
                    setComponentVisible(false);
                  }}
                  isVisible={componentVisible}
                />
              </Card>
            </div>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default DamageTypeSelectorDemo; 