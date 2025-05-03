import React from 'react';
import {
  MoveIcon,
  ZoomIcon,
  RotateIcon,
  MeasureIcon,
  ResetIcon,
  SaveIcon
} from '../atoms/icons';

/**
 * Trang kiểm tra đơn giản chỉ để xem các SVG icons
 */
const IconTestPage: React.FC = () => {
  // Hardcoded SVG để so sánh
  const testHardcodedSVG = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2"/>
      <path d="M12 6V18" stroke="#6B7280" strokeWidth="2"/>
      <path d="M6 12H18" stroke="#6B7280" strokeWidth="2"/>
    </svg>
  );

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Icon Test Page</h1>
      <p className="mb-6">Trang này hiển thị các icon đơn giản theo nhiều cách khác nhau để xác định vấn đề.</p>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">1. Hardcoded SVG (tham chiếu)</h2>
          <div className="flex items-center justify-center p-4 bg-white rounded border border-gray-100">
            {testHardcodedSVG}
          </div>
        </div>
        
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">2. Component SVG</h2>
          <div className="flex items-center justify-center p-4 bg-white rounded border border-gray-100">
            <MoveIcon />
          </div>
        </div>
      </div>
      
      <div className="border p-4 rounded-lg bg-white shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">3. Tất cả các Icon SVG Components</h2>
        <div className="flex items-center justify-around p-4 bg-white rounded border border-gray-100">
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border">
              <MoveIcon />
            </div>
            <span className="text-sm">MoveIcon</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border">
              <ZoomIcon />
            </div>
            <span className="text-sm">ZoomIcon</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border">
              <RotateIcon />
            </div>
            <span className="text-sm">RotateIcon</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border">
              <MeasureIcon />
            </div>
            <span className="text-sm">MeasureIcon</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border">
              <ResetIcon />
            </div>
            <span className="text-sm">ResetIcon</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border">
              <SaveIcon />
            </div>
            <span className="text-sm">SaveIcon</span>
          </div>
        </div>
      </div>
      
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">4. SVG với background color</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border border-blue-100">
              <MoveIcon color="#2563EB" />
            </div>
            <span className="text-sm">Blue</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border border-red-100">
              <MoveIcon color="#DC2626" />
            </div>
            <span className="text-sm">Red</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="mb-2 p-2 bg-white rounded border border-green-100">
              <MoveIcon color="#059669" />
            </div>
            <span className="text-sm">Green</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconTestPage; 