import React from 'react';
import { CustomZoomIcon } from '../atoms/icons';
import ZoomIcon from '../atoms/icons/ZoomIcon';

/**
 * Trang kiểm tra và so sánh SVG icons 
 */
const CustomIconTestPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">SVG Icon Comparison</h1>
      <p className="mb-6">Trang này so sánh các phiên bản icon khác nhau để chọn phiên bản tốt nhất.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Icon gốc</h2>
          <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
            <ZoomIcon width={48} height={48} />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <code>{'<ZoomIcon width={48} height={48} />'}</code>
          </div>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Icon mới</h2>
          <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
            <CustomZoomIcon width={48} height={48} />
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <code>{'<CustomZoomIcon width={48} height={48} />'}</code>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Biến thể màu sắc</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center border p-4 rounded-lg">
            <div className="mb-2 p-2 bg-blue-100 rounded">
              <CustomZoomIcon width={32} height={32} color="#3B82F6" />
            </div>
            <span className="text-sm mt-2">Blue (#3B82F6)</span>
          </div>
          
          <div className="flex flex-col items-center border p-4 rounded-lg">
            <div className="mb-2 p-2 bg-red-100 rounded">
              <CustomZoomIcon width={32} height={32} color="#EF4444" />
            </div>
            <span className="text-sm mt-2">Red (#EF4444)</span>
          </div>
          
          <div className="flex flex-col items-center border p-4 rounded-lg">
            <div className="mb-2 p-2 bg-green-100 rounded">
              <CustomZoomIcon width={32} height={32} color="#10B981" />
            </div>
            <span className="text-sm mt-2">Green (#10B981)</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Kích thước khác nhau</h2>
        <div className="flex items-end space-x-8 border p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <CustomZoomIcon width={16} height={16} />
            <span className="text-xs mt-2">16px</span>
          </div>
          
          <div className="flex flex-col items-center">
            <CustomZoomIcon width={24} height={24} />
            <span className="text-xs mt-2">24px</span>
          </div>
          
          <div className="flex flex-col items-center">
            <CustomZoomIcon width={32} height={32} />
            <span className="text-xs mt-2">32px</span>
          </div>
          
          <div className="flex flex-col items-center">
            <CustomZoomIcon width={48} height={48} />
            <span className="text-xs mt-2">48px</span>
          </div>
          
          <div className="flex flex-col items-center">
            <CustomZoomIcon width={64} height={64} />
            <span className="text-xs mt-2">64px</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomIconTestPage; 