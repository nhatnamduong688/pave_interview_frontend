import React, { useState } from 'react';

export interface SelectorOption {
  id: string;
  label: string;
  value?: string;
  color?: string;
}

export interface EnhancedSelectorPopupProps {
  title: string;
  options: SelectorOption[];
  selectedOption: string | null;
  onSelect: (id: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  showSearch?: boolean;
  showSeverity?: boolean;
  showThroughPaint?: boolean;
  severity?: string;
  throughPaint?: boolean;
  onSeverityChange?: (severity: string) => void;
  onThroughPaintToggle?: () => void;
  position?: { x: number; y: number };
  type?: 'damageType' | 'component';
  selectedItems?: string[];
}

const EnhancedSelectorPopup: React.FC<EnhancedSelectorPopupProps> = ({
  title,
  options,
  selectedOption,
  onSelect,
  onCancel,
  onConfirm,
  showSearch = true,
  showSeverity = false,
  showThroughPaint = false,
  severity = 'maj',
  throughPaint = false,
  onSeverityChange,
  onThroughPaintToggle,
  position,
  type = 'damageType',
  selectedItems = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter options based on search query
  const filteredOptions = searchQuery 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  // Determine position styling
  const getPositionStyle = () => {
    if (!position) return {};
    
    // Đặt form ngay cạnh indicator, thích ứng với vị trí
    const isRightSide = position.x > 50;
    const isTopSide = position.y < 25; // Gần top
    const isBottomSide = position.y > 75; // Gần bottom
    
    // Xác định vị trí hiển thị
    let positionStyle: any = {
      position: 'absolute' as const,
      zIndex: 1000,
    };
    
    // Xử lý vị trí theo trục X
    if (isRightSide) {
      positionStyle.right = `calc(100% - ${position.x}% + 30px)`;
    } else {
      positionStyle.left = `calc(${position.x}% + 30px)`;
    }
    
    // Xử lý vị trí theo trục Y
    if (isTopSide) {
      // Nếu ở gần top, hiển thị popup bên dưới
      positionStyle.top = `calc(${position.y}% + 15px)`;
      positionStyle.transform = 'none';
    } else if (isBottomSide) {
      // Nếu ở gần bottom, hiển thị popup bên trên
      positionStyle.bottom = `calc(100% - ${position.y}% + 15px)`;
      positionStyle.transform = 'none';
    } else {
      // Vị trí mặc định
      positionStyle.top = `${position.y}%`;
      positionStyle.transform = 'translateY(-50%)';
    }
    
    return positionStyle;
  };
  
  // Xác định vị trí mũi tên
  const getArrowStyle = () => {
    if (!position) return {};
    
    const isRightSide = position.x > 50;
    const isTopSide = position.y < 25;
    const isBottomSide = position.y > 75;
    
    // Style cơ bản
    let arrowStyle: any = {
      zIndex: 999,
    };
    
    // Xử lý vị trí theo trục X
    if (isRightSide) {
      arrowStyle.right = '-6px';
    } else {
      arrowStyle.left = '-6px';
    }
    
    // Xử lý vị trí và góc xoay theo trục Y
    if (isTopSide) {
      // Mũi tên ở trên, chỉ xuống
      arrowStyle.top = '-6px';
      arrowStyle.transform = 'rotate(135deg)';
      arrowStyle.borderBottom = 'none';
      arrowStyle.borderRight = isRightSide ? 'none' : '';
      arrowStyle.borderLeft = isRightSide ? '' : 'none';
      arrowStyle.borderTop = '';
    } else if (isBottomSide) {
      // Mũi tên ở dưới, chỉ lên
      arrowStyle.bottom = '-6px';
      arrowStyle.transform = 'rotate(-45deg)';
      arrowStyle.borderTop = 'none';
      arrowStyle.borderRight = isRightSide ? 'none' : '';
      arrowStyle.borderLeft = isRightSide ? '' : 'none';
      arrowStyle.borderBottom = '';
    } else {
      // Mũi tên bên trái/phải
      arrowStyle.top = '50%';
      arrowStyle.transform = 'translateY(-50%) rotate(45deg)';
      
      // Xử lý border để tạo mũi tên trái/phải
      if (isRightSide) {
        arrowStyle.borderLeft = 'none';
        arrowStyle.borderBottom = 'none';
      } else {
        arrowStyle.borderRight = 'none';
        arrowStyle.borderTop = 'none';
      }
    }
    
    return arrowStyle;
  };
  
  const showCheckmarks = type === 'damageType';
  
  return (
    <div 
      className="absolute" 
      style={{ 
        pointerEvents: 'none' as const,
        ...getPositionStyle()
      }}
    >
      {/* Arrow pointer */}
      <div 
        className="absolute w-3 h-3 bg-white transform border border-gray-200"
        style={{
          ...getArrowStyle()
        }}
      />
      
      {/* Popup */}
      <div 
        className="bg-white rounded-md shadow-lg border border-gray-200 w-[230px]"
        style={{ 
          pointerEvents: 'auto' as const 
        }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xs font-mono font-bold uppercase">{title}</h2>
        </div>
        
        {/* Search input - thu nhỏ */}
        {showSearch && (
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                <svg className="h-3 w-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-7 pr-2 py-1 border border-gray-300 rounded-md text-xs bg-gray-50 placeholder-gray-500 focus:outline-none"
                placeholder="Search.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Severity Options - thu nhỏ */}
        {showSeverity && (
          <div className="px-3 py-2 border-b border-gray-200">
            <span className="font-mono text-[10px] font-bold text-gray-800 block mb-1">SEVERITY</span>
            <div className="flex gap-1">
              <button 
                className={`rounded-full px-2 py-1 text-[10px] font-mono ${severity === 'min' 
                  ? 'bg-gray-200 border border-gray-400' 
                  : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => onSeverityChange && onSeverityChange('min')}
              >
                Min
              </button>
              <button 
                className={`rounded-full px-2 py-1 text-[10px] font-mono ${severity === 'med' 
                  ? 'bg-gray-200 border border-gray-400' 
                  : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => onSeverityChange && onSeverityChange('med')}
              >
                Med
              </button>
              <button 
                className={`rounded-full px-2 py-1 text-[10px] font-mono ${severity === 'maj' 
                  ? 'bg-red-100 border border-red-400' 
                  : 'bg-gray-100 border border-gray-300'}`}
                onClick={() => onSeverityChange && onSeverityChange('maj')}
              >
                Maj
              </button>
            </div>
          </div>
        )}
        
        {/* Through Paint Toggle - thu nhỏ */}
        {showThroughPaint && (
          <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-gray-800">THROUGH PAINT</span>
            <div 
              className={`w-8 h-4 rounded-full ${throughPaint ? 'bg-blue-600' : 'bg-gray-300'} relative cursor-pointer`}
              onClick={onThroughPaintToggle}
            >
              <div 
                className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transform transition-transform ${
                  throughPaint ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>
        )}
        
        {/* Options list - thu nhỏ thêm */}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={option.id}
              className={`w-full px-2 py-1.5 border-b border-gray-200 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                selectedOption === option.id || selectedItems.includes(option.id)
                  ? 'bg-gray-50'
                  : 'bg-white'
              }`}
              onClick={() => onSelect(option.id)}
            >
              <div className="flex items-center gap-1.5">
                {(selectedOption === option.id || selectedItems.includes(option.id)) && showCheckmarks && (
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
                <span className="font-mono text-[10px] font-semibold text-gray-900">{option.label}</span>
              </div>
              <span className="text-gray-500 font-mono text-[10px]">[{option.value || index + 1}]</span>
            </div>
          ))}
        </div>
        
        {/* Action buttons - thu nhỏ */}
        <div className="p-1.5 flex justify-between items-center border-t border-gray-200">
          <button
            className="px-2 py-1 border border-gray-300 rounded text-[10px] font-medium text-gray-700 bg-white hover:bg-gray-50 font-mono"
            onClick={onCancel}
          >
            Cancel <span className="text-gray-500">[ESC]</span>
          </button>
          <button
            className="px-2 py-1 bg-blue-600 rounded text-[10px] font-medium text-white hover:bg-blue-700 font-mono"
            onClick={onConfirm}
          >
            Confirm <span className="text-blue-300">[↵]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSelectorPopup; 