import React, { useState } from 'react';

export interface OptionItem {
  id: string;
  label: string;
  value?: string;
}

interface SelectionModalProps {
  title: string;
  options: OptionItem[];
  onSelect: (id: string) => void;
  onClose: () => void;
  showSearch?: boolean;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  title,
  options,
  onSelect,
  onClose,
  showSearch = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter options based on search query
  const filteredOptions = searchQuery 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  return (
    <div className="bg-white rounded-lg w-[300px] shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      
      {/* Search bar */}
      {showSearch && (
        <div className="px-4 py-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search.."
              className="pl-10 pr-4 py-3 w-full bg-gray-100 rounded-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
      
      {/* Options list */}
      <div className="max-h-[400px] overflow-y-auto">
        {filteredOptions.map((option, index) => (
          <div
            key={option.id}
            className="px-6 py-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              onSelect(option.id);
              onClose();
            }}
          >
            <div className="flex items-center">
              <span className="font-mono text-gray-800 text-lg">{option.label}</span>
            </div>
            <div className="text-gray-400 font-mono">[{index + 1}]</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionModal; 