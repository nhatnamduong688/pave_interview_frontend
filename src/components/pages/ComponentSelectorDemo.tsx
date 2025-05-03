import React, { useState } from 'react';
import { Layout, Button, Card, Space, Divider, Typography } from 'antd';
import ComponentSelector, { ComponentOption } from '../molecules/ComponentSelector';

const { Content } = Layout;
const { Title, Text } = Typography;

// Mẫu dữ liệu
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

const ComponentSelectorDemo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | number>(1);
  const [filteredOptions, setFilteredOptions] = useState<ComponentOption[]>(componentTypes);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = (selected: string | number) => {
    setSelectedComponent(selected);
    setIsModalVisible(false);
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredOptions(componentTypes);
      return;
    }

    const filtered = componentTypes.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Title level={2}>Component Selector Demo</Title>
        <Text className="text-gray-500 block mb-6">
          Kiểm tra component ComponentSelector với các tùy chọn khác nhau.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card title="Basic Usage" className="shadow-md">
            <Space direction="vertical" className="w-full">
              <Button type="primary" onClick={showModal} className="mb-4">
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
          </Card>
        </div>

        {/* Component Selector Modal */}
        <ComponentSelector
          options={filteredOptions}
          selectedOption={selectedComponent}
          onSelectOption={(id) => setSelectedComponent(id)}
          onSearch={handleSearch}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isVisible={isModalVisible}
        />
      </Content>
    </Layout>
  );
};

export default ComponentSelectorDemo; 