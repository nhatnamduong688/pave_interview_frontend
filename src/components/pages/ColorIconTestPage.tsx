import React from 'react';
import { 
  MoveIcon, 
  ZoomIcon, 
  RotateIcon,
  CustomMoveIcon,
  CustomZoomIcon,
  CustomRotateIcon
} from '../atoms/icons';

/**
 * Trang hiển thị các icon với màu sắc khác nhau
 */
const ColorIconTestPage: React.FC = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Colored SVG Icons</h1>
      <p className="mb-6">So sánh icon màu xám (mặc định) với các icon có màu sắc.</p>
      
      <div className="grid grid-cols-3 gap-6">
        {/* MoveIcon Comparison */}
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Move Icon</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-1/2 flex justify-center p-3 bg-white rounded border border-gray-100">
                <MoveIcon width={32} height={32} />
              </div>
              <div className="w-1/2 flex justify-center p-3 bg-white rounded border border-amber-100">
                <CustomMoveIcon width={32} height={32} />
              </div>
            </div>
            <div className="grid grid-cols-2 text-center text-sm text-gray-600">
              <div>Màu gốc (Xám)</div>
              <div>Màu mới (Cam)</div>
            </div>
          </div>
        </div>
        
        {/* ZoomIcon Comparison */}
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Zoom Icon</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-1/2 flex justify-center p-3 bg-white rounded border border-gray-100">
                <ZoomIcon width={32} height={32} />
              </div>
              <div className="w-1/2 flex justify-center p-3 bg-white rounded border border-blue-100">
                <CustomZoomIcon width={32} height={32} />
              </div>
            </div>
            <div className="grid grid-cols-2 text-center text-sm text-gray-600">
              <div>Màu gốc (Xám)</div>
              <div>Màu mới (Xanh)</div>
            </div>
          </div>
        </div>
        
        {/* RotateIcon Comparison */}
        <div className="border p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Rotate Icon</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-1/2 flex justify-center p-3 bg-white rounded border border-gray-100">
                <RotateIcon width={32} height={32} />
              </div>
              <div className="w-1/2 flex justify-center p-3 bg-white rounded border border-green-100">
                <CustomRotateIcon width={32} height={32} />
              </div>
            </div>
            <div className="grid grid-cols-2 text-center text-sm text-gray-600">
              <div>Màu gốc (Xám)</div>
              <div>Màu mới (Xanh lá)</div>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mt-10 mb-6">Ứng dụng trong thanh công cụ</h2>
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-center space-x-8 bg-white p-6 rounded border border-gray-100">
          <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <CustomMoveIcon width={24} height={24} />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <CustomZoomIcon width={24} height={24} />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <CustomRotateIcon width={24} height={24} />
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Bảng màu</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white border border-amber-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-amber-500 mr-2"></div>
              <span className="font-medium">Amber/Cam</span>
            </div>
            <div className="text-sm">#F59E0B</div>
          </div>
          
          <div className="p-4 rounded-lg bg-white border border-blue-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 mr-2"></div>
              <span className="font-medium">Blue/Xanh dương</span>
            </div>
            <div className="text-sm">#3B82F6</div>
          </div>
          
          <div className="p-4 rounded-lg bg-white border border-green-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-green-500 mr-2"></div>
              <span className="font-medium">Green/Xanh lá</span>
            </div>
            <div className="text-sm">#10B981</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorIconTestPage; 