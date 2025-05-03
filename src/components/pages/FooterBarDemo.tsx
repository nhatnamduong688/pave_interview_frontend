import React from 'react';
import FooterBar from '../molecules/FooterBar';
import { Layout } from 'antd';

const { Content } = Layout;

const FooterBarDemo: React.FC = () => {
  // Mock data for testing
  const mockThumbnails = [
    {
      id: 'thumb1',
      src: 'https://via.placeholder.com/100',
      alt: 'Sample vehicle view 1'
    },
    {
      id: 'thumb2',
      src: 'https://via.placeholder.com/100',
      alt: 'Sample vehicle view 2'
    },
    {
      id: 'thumb3',
      src: 'https://via.placeholder.com/100',
      alt: 'Sample vehicle view 3'
    }
  ];

  const handleToolbarAction = (actionId: string) => {
    console.log(`Toolbar action clicked: ${actionId}`);
    alert(`Toolbar action: ${actionId}`);
  };

  const handleThumbnailClick = (id: string) => {
    console.log(`Thumbnail clicked: ${id}`);
    alert(`Thumbnail clicked: ${id}`);
  };

  return (
    <Layout className="min-h-screen bg-white">
      <Content className="p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">FooterBar Component Demo</h1>
          <p>Kiểm tra hiển thị và chức năng của FooterBar component.</p>
        </div>

        <div className="flex-grow bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 flex items-center justify-center">
          <div className="text-4xl text-gray-300">
            Vehicle Viewing Area
          </div>
        </div>

        {/* FooterBar with transparent background buttons (default) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Nền trong suốt)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              iconColor="#6B7280"
              buttonBackgroundStyle="transparent"
            />
          </div>
        </div>

        {/* FooterBar with white background buttons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Nền trắng)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              iconColor="#6B7280"
              buttonBackgroundStyle="white"
            />
          </div>
        </div>

        {/* FooterBar with colored icons and transparent background */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Icon màu đỏ, nền trong suốt)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              iconColor="#EF4444"
              buttonBackgroundStyle="transparent"
            />
          </div>
        </div>

        {/* FooterBar with colored icons and white background */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Icon màu xanh, nền trắng)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              iconColor="#3B82F6"
              buttonBackgroundStyle="white"
            />
          </div>
        </div>

        {/* FooterBar with colored icons background */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Nền icon màu xám nhạt)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              iconColor="#6B7280"
              iconBackgroundColor="#F3F4F6"
              buttonBackgroundStyle="transparent"
            />
          </div>
        </div>

        {/* FooterBar with colored icons and colored background */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Icon xanh, nền vàng nhạt)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              iconColor="#3B82F6"
              iconBackgroundColor="#FEF3C7"
              buttonBackgroundStyle="white"
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default FooterBarDemo; 