import React, { useState } from 'react';

export interface OptionItem {
  id: string;
  label: string;
  value?: string;
}

interface SelectionModalProps {
  title: string;
  options: OptionItem[];
  onSelect: (ids: string[]) => void;
  onClose: () => void;
  showSearch?: boolean;
  selectedIds?: string[];
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  title,
  options,
  onSelect,
  onClose,
  showSearch = true,
  selectedIds = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredOptionId, setHoveredOptionId] = useState<string | null>(null);
  const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(selectedIds);
  
  // Filter options based on search query
  const filteredOptions = searchQuery 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  const handleToggleOption = (id: string) => {
    const newSelectedIds = localSelectedIds.includes(id)
      ? localSelectedIds.filter(selectedId => selectedId !== id)
      : [...localSelectedIds, id];
    
    setLocalSelectedIds(newSelectedIds);
    onSelect(newSelectedIds); // Automatically apply changes when selecting
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      style={{
        width: '220px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        boxShadow: '0px 3px 4px -2px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xs font-mono font-semibold text-gray-900 uppercase tracking-tight">{title}</h2>
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      
      {/* Search bar */}
      {showSearch && (
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
      
      {/* Options list */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredOptions.map((option, index) => {
          const isHovered = hoveredOptionId === option.id;
          const isSelected = localSelectedIds.includes(option.id);
          
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
              key={option.id}
              className={`
                inline-flex items-center w-full gap-2 px-3 py-2 
                rounded-full cursor-pointer mb-1 transition-colors
                ${stateClasses}
              `}
              onClick={() => handleToggleOption(option.id)}
              onMouseEnter={() => setHoveredOptionId(option.id)}
              onMouseLeave={() => setHoveredOptionId(null)}
            >
              <div className="flex-shrink-0">
                {isSelected ? (
                  <svg className="w-4 h-4 text-[#1A58D2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : isHovered ? (
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.27731 6.25L5.36891 9.5L11.563 3" stroke="#1A58D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <div className="w-4 h-4" />
                )}
              </div>
              
              <span className="flex-grow font-mono text-xs font-semibold text-[#1F2937] text-opacity-[0.88]">
                {option.label}
              </span>
              
              <span className="inline-flex items-center justify-center text-xs font-medium text-[#1F2937] text-opacity-[0.38] font-mono">
                [{index + 1}]
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionModal; 