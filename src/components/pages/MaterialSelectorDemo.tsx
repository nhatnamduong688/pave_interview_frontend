import React, { useState } from 'react';
import { Layout, Button, Card, Space, Divider, Typography } from 'antd';
import MaterialSelector, { MaterialOption } from '../molecules/MaterialSelector';

const { Content } = Layout;
const { Title, Text } = Typography;

// Mẫu dữ liệu
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

const MaterialSelectorDemo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string | number>(1);
  const [filteredOptions, setFilteredOptions] = useState<MaterialOption[]>(materialTypes);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = (selected: string | number) => {
    setSelectedMaterial(selected);
    setIsModalVisible(false);
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredOptions(materialTypes);
      return;
    }

    const filtered = materialTypes.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Title level={2}>Material Selector Demo</Title>
        <Text className="text-gray-500 block mb-6">
          Kiểm tra component MaterialSelector với các tùy chọn khác nhau.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card title="Basic Usage" className="shadow-md">
            <Space direction="vertical" className="w-full">
              <Button type="primary" onClick={showModal} className="mb-4">
                Open Material Selector
              </Button>
              
              <Divider>Selected Material</Divider>
              
              <div className="bg-gray-50 p-4 rounded-md">
                {selectedMaterial ? (
                  <div>
                    {(() => {
                      const option = materialTypes.find(opt => opt.id === selectedMaterial);
                      return option ? (
                        <div>
                          <Text strong>{option.label}</Text> <Text type="secondary">[{option.value}]</Text>
                        </div>
                      ) : null;
                    })()}
                  </div>
                ) : (
                  <Text className="text-gray-500">No material selected</Text>
                )}
              </div>
            </Space>
          </Card>
        </div>

        {/* Material Selector Modal */}
        <MaterialSelector
          options={filteredOptions}
          selectedOption={selectedMaterial}
          onSelectOption={(id) => setSelectedMaterial(id)}
          onSearch={handleSearch}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isVisible={isModalVisible}
        />
      </Content>
    </Layout>
  );
};

export default MaterialSelectorDemo; 