import React, { useState } from 'react';

// Interface cho option
export interface MaterialOption {
  id: string | number;
  label: string;
  value: string | number;
}

// Interface cho props của component
interface MaterialSelectorProps {
  title?: string;
  options: MaterialOption[];
  selectedOptions?: (string | number)[];
  onSelectOption?: (selectedIds: (string | number)[]) => void;
  onSearch?: (searchTerm: string) => void;
  onCancel?: () => void;
  onConfirm?: (selectedIds: (string | number)[]) => void;
  isVisible?: boolean;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  title = 'MATERIAL',
  options = [],
  selectedOptions = [],
  onSelectOption,
  onSearch,
  onCancel,
  onConfirm,
  isVisible = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<(string | number)[]>(selectedOptions);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  // Xử lý khi search thay đổi
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  // Xử lý khi click vào option
  const handleOptionClick = (optionId: string | number) => {
    const updatedSelection = selected.includes(optionId)
      ? selected.filter(id => id !== optionId)
      : [...selected, optionId];
    
    setSelected(updatedSelection);
    onSelectOption?.(updatedSelection);
  };

  // Xử lý khi cancel
  const handleCancel = () => {
    onCancel?.();
  };

  // Xử lý khi confirm
  const handleConfirm = () => {
    onConfirm?.(selected);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[220px]">
        {/* Tiêu đề */}
        <div className="px-4 py-2 border-b border-gray-200">
          <h2 className="text-xs font-mono font-semibold text-gray-900 uppercase tracking-tight">{title}</h2>
        </div>

        {/* Ô tìm kiếm - Hiển thị khi có nhiều options */}
        {options.length > 5 && (
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
                onChange={handleSearchChange}
              />
            </div>
          </div>
        )}

        {/* Danh sách options */}
        <div className="max-h-60 overflow-y-auto p-2">
          {options.map((option) => {
            const isOptionSelected = selected.includes(option.id);
            const isHovered = hoveredId === option.id;
            
            let stateClasses = 'bg-gray-100 border-gray-300';
            if (isOptionSelected && isHovered) {
              stateClasses = 'bg-gray-100 border-blue-500';
            } else if (isOptionSelected) {
              stateClasses = 'bg-gray-100 border-gray-300';
            } else if (isHovered) {
              stateClasses = 'bg-white border-gray-300';
            }
            
            return (
              <div
                key={option.id}
                role="button"
                aria-pressed={isOptionSelected}
                tabIndex={0}
                className={`
                  inline-flex items-center w-full gap-2 px-3 py-2 
                  rounded-full cursor-pointer mb-1 transition-colors
                  border ${stateClasses}
                `}
                onClick={() => handleOptionClick(option.id)}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                onKeyDown={(e) => e.key === 'Enter' && handleOptionClick(option.id)}
              >
                <div className="flex-shrink-0">
                  {isOptionSelected ? (
                    <svg className="w-4 h-4 text-[#1A58D2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
                
                <span className="flex-grow font-mono text-xs font-semibold text-[#1F2937] text-opacity-[0.88]">{option.label}</span>
                
                <span className="inline-flex items-center justify-center text-xs font-medium text-[#1F2937] text-opacity-[0.38] font-mono">
                  [{option.value}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="px-4 py-2 flex justify-between items-center border-t border-gray-200">
          <button
            type="button"
            className="px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none font-mono"
            onClick={handleCancel}
          >
            Cancel <span className="text-gray-500">[ESC]</span>
          </button>
          <button
            type="button"
            className="px-3 py-1.5 bg-[#1A58D2] border border-transparent rounded-md text-xs font-medium text-white hover:bg-blue-700 focus:outline-none font-mono"
            onClick={handleConfirm}
          >
            Confirm <span className="text-blue-300">[↵]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialSelector; 