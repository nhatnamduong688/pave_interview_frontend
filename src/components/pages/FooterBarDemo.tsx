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

        {/* FooterBar with colored icons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Màu sắc)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              useColoredIcons={true}
            />
          </div>
        </div>

        {/* FooterBar with grayscale icons */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Trắng đen)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              captionText="Vehicle Front View" 
              extraThumbnails={mockThumbnails}
              onToolbarAction={handleToolbarAction}
              onThumbnailClick={handleThumbnailClick}
              useColoredIcons={false}
            />
          </div>
        </div>

        {/* FooterBar with just the toolbar */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Chỉ toolbar)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              onToolbarAction={handleToolbarAction}
              useColoredIcons={true}
            />
          </div>
        </div>

        {/* FooterBar with just the thumbnails */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">FooterBar (Chỉ thumbnails)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <FooterBar 
              extraThumbnails={mockThumbnails}
              onThumbnailClick={handleThumbnailClick}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default FooterBarDemo; 