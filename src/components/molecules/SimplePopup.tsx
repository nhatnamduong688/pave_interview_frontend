import React, { forwardRef } from 'react';
import type { PopupPlacement } from '../../hooks/usePositionedPopup';

interface SimplePopupProps {
  title?: string;
  message: string;
  arrowPosition?: PopupPlacement;
  onClose?: () => void;
}

const SimplePopup = forwardRef<HTMLDivElement, SimplePopupProps>(({
  title = 'Thông tin',
  message,
  arrowPosition = 'left',
  onClose
}, ref) => {
  
  // Render mũi tên dựa vào vị trí
  const renderArrow = () => {
    switch (arrowPosition) {
      case 'left':
        return (
          <div 
            className="absolute w-0 h-0 border-t-[14px] border-t-transparent border-r-[20px] border-r-white border-b-[14px] border-b-transparent" 
            style={{
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              filter: 'drop-shadow(-2px 0px 1px rgba(0,0,0,0.1))',
              zIndex: 5
            }}
          />
        );
      case 'right':
        return (
          <div 
            className="absolute w-0 h-0 border-t-[14px] border-t-transparent border-l-[20px] border-l-white border-b-[14px] border-b-transparent" 
            style={{
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              filter: 'drop-shadow(2px 0px 1px rgba(0,0,0,0.1))',
              zIndex: 5
            }}
          />
        );
      case 'top':
        return (
          <div 
            className="absolute w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[20px] border-b-white" 
            style={{
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              filter: 'drop-shadow(0px -2px 1px rgba(0,0,0,0.1))',
              zIndex: 5
            }}
          />
        );
      case 'bottom':
        return (
          <div 
            className="absolute w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[20px] border-t-white" 
            style={{
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.1))',
              zIndex: 5
            }}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      ref={ref}
      className="bg-white rounded-md shadow-lg border border-gray-200 w-full max-w-[280px] relative"
      data-placement={arrowPosition}
    >
      {/* Arrow indicator */}
      {renderArrow()}
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-700">{message}</p>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={onClose}
            className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
});

export default SimplePopup; 