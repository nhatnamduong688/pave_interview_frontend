import React, { useState } from 'react';
import { Layout, Typography, Divider } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

interface OptionProps {
  label: string;
  value: string | number;
  state: 'normal' | 'hover' | 'selected' | 'selected-hover';
}

const Option: React.FC<OptionProps> = ({ label, value, state }) => {
  // Xác định các class dựa trên trạng thái
  const getClasses = () => {
    switch (state) {
      case 'normal':
        return 'bg-white border-0';
      case 'hover':
        return 'relative bg-gray-100 border-0';       // hover cũng trắng
      case 'selected':
        return 'bg-gray-100 border border-gray-300';    // selected: nền nhạt
      case 'selected-hover':
        return 'bg-gray-100 border border-blue-500';    // selected + hover
      default:
        return 'bg-white border border-gray-300';
    }
  };

  const isSelected = state === 'selected' || state === 'selected-hover';

  return (
    <div
      className={`
        inline-flex items-center w-full gap-2 px-3 py-2
        rounded-full cursor-pointer mb-1 transition-colors
        border ${getClasses()}
      `}
    >
      <div className="flex-shrink-0">
        {isSelected ? (
          <svg className="w-4 h-4 text-[#1A58D2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : state === "hover" ? (
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.27731 6.25L5.36891 9.5L11.563 3" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        ) : (
          <div className="w-4 h-4" />
        )}
      </div>

      <span className="flex-grow font-mono text-xs font-semibold text-gray-900">{label}</span>

      <span className="inline-flex items-center justify-center text-xs font-medium text-gray-500 font-mono">
        [{value}]
      </span>
    </div>
  );
};

const OptionStateDemo: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Title level={2}>Option States Demo</Title>
        <Text className="text-gray-500 block mb-6">
          Hiển thị tất cả các trạng thái có thể có của option UI
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <Title level={4}>Normal State</Title>
            <div className="max-w-xs mb-4">
              <Option label="Bent" value={1} state="normal" />
            </div>
            <Text className="text-gray-500">
              Trạng thái mặc định khi không có tương tác
            </Text>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <Title level={4}>Hover State</Title>
            <div className="max-w-xs mb-4">
              <Option label="Bent" value={1} state="hover" />
            </div>
            <Text className="text-gray-500">
              Trạng thái khi di chuột qua (hover)
            </Text>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <Title level={4}>Selected State</Title>
            <div className="max-w-xs mb-4">
              <Option label="Bent" value={1} state="selected" />
            </div>
            <Text className="text-gray-500">
              Trạng thái khi option được chọn
            </Text>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <Title level={4}>Selected + Hover State</Title>
            <div className="max-w-xs mb-4">
              <Option label="Bent" value={1} state="selected-hover" />
            </div>
            <Text className="text-gray-500">
              Trạng thái khi hover trên option đã được chọn
            </Text>
          </div>
        </div>

        <Divider />

        <Title level={3} className="mt-8">Interactive Demo</Title>
        <InteractiveDemo />
      </Content>
    </Layout>
  );
};

// Component demo tương tác thực tế
const InteractiveDemo: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [hoverId, setHoverId] = useState<number | null>(null);

  const options = [
    { id: 1, label: 'Bent', value: 1 },
    { id: 2, label: 'Broken', value: 2 },
    { id: 3, label: 'Chipped', value: 3 },
    { id: 4, label: 'Dent', value: 4 },
    { id: 5, label: 'Scratched', value: 5 },
  ];

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <Text className="text-gray-700 block mb-4">
        Di chuột qua các options và click để chọn/bỏ chọn
      </Text>

      <div className="max-w-xs space-y-1">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isHovered = hoverId === option.id;
          
          let stateClasses = 'bg-white border-0';
          if (isSelected && isHovered) {
            stateClasses = 'bg-gray-100 border-blue-500';
          } else if (isSelected) {
            stateClasses = 'bg-gray-100 border border-gray-300';
          } else if (isHovered) {
            stateClasses = 'bg-gray-100 border-0';
          }

          return (
            <div
              key={option.id}
              className={`
                inline-flex items-center w-full gap-2 px-3 py-2
                rounded-full cursor-pointer transition-colors
                border ${stateClasses}
              `}
              onClick={() => toggleSelection(option.id)}
              onMouseEnter={() => setHoverId(option.id)}
              onMouseLeave={() => setHoverId(null)}
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

              <span className="flex-grow font-mono text-xs font-semibold text-gray-900">{option.label}</span>

              <span className="inline-flex items-center justify-center text-xs font-medium text-gray-500 font-mono">
                [{option.value}]
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
        <Text className="text-gray-700 block mb-2">Selected Items:</Text>
        {selectedIds.length === 0 ? (
          <Text className="text-gray-500">No items selected</Text>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedIds.map((id) => {
              const option = options.find(opt => opt.id === id);
              return (
                <div key={id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">
                  {option?.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptionStateDemo;
