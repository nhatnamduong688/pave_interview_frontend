import React from 'react';
import { Layout, Typography, Card, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Component Card được sử dụng trong phần Redux Components
interface ComponentCardProps {
  title: string;
  description: string;
  path: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ title, description, path }) => (
  <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
    <Title level={5} className="mb-2">{title}</Title>
    <Paragraph className="mb-4 text-sm text-gray-600">{description}</Paragraph>
    <Link to={path}>
      <Button type="primary" size="middle" block>
        View Component
      </Button>
    </Link>
  </Card>
);

const HomePage: React.FC = () => {
  const demoPages = [
    {
      title: 'Vehicle Damage Annotation V2',
      description: 'Enhanced vehicle damage annotation with tabs sidebar, damage type selector, and component selection',
      path: '/vehicle-damage-annotation-v2',
      highlight: true,
    },
    {
      title: 'Vehicle Damage Annotation',
      description: 'Complete vehicle damage annotation feature with click-to-add markers on multiple images. State management with Redux.',
      path: '/vehicle-damage-annotation',
      highlight: true,
    },
    {
      title: 'Vehicle Damage Selection (Redux)',
      description: 'Demo của Vehicle Damage Selection sử dụng Redux để quản lý state.',
      path: '/vehicle-damage-redux',
      highlight: true,
    },
    {
      title: 'Redux Data Management Demo',
      description: 'Demo của Redux, Redux Saga và Redux Persist cho việc quản lý annotations.',
      path: '/redux-demo',
      highlight: true,
    },
    {
      title: 'Header Demo',
      description: 'Demo của Header với Session Card, Back Button, và các component Report/Timer.',
      path: '/header',
      highlight: true,
    },
    {
      title: 'Report/Timer Component Demo',
      description: 'Demo của các buttons Report và Timer với các biến thể khác nhau.',
      path: '/report-timer-demo',
      highlight: true,
    },
    {
      title: 'Icon Demo',
      description: 'Demo của các SVG icon components với tùy chỉnh kích thước và màu sắc.',
      path: '/icon-demo',
      highlight: true,
    },
    {
      title: 'FooterBar Demo',
      description: 'Demo của thanh Footer với Icons, Legend/Caption và Thumbnails.',
      path: '/footer-bar-demo',
      highlight: true,
    },
    {
      title: 'All Selectors Demo',
      description: 'Demo tổng hợp của tất cả Selectors (Component, Material, Damage Type) với severity và toggle switches.',
      path: '/all-selectors',
      highlight: true,
    },
    {
      title: 'Damage Type Selector',
      description: 'Demo của component Damage Type Selector với khả năng multi-select.',
      path: '/damage-type-selector',
      highlight: true,
    },
    {
      title: 'Material Selector',
      description: 'Demo của component Material Selector với khả năng single-select.',
      path: '/material-selector',
      highlight: true,
    },
    {
      title: 'Component Selector',
      description: 'Demo của Component Selector cho việc chọn phần của xe.',
      path: '/component-selector',
      highlight: true,
    },
    {
      title: 'Legend & Caption Demo',
      description: 'Demo của Legend và Caption components cho vehicle diagrams.',
      path: '/legend-caption-demo',
    },
    {
      title: 'Session Card Demo',
      description: 'Demo của Session Card với thiết kế từ Figma.',
      path: '/session-card-demo',
    },
    {
      title: 'Button Demo',
      description: 'Demo của các loại buttons cơ bản.',
      path: '/buttons',
    },
    {
      title: 'Product Card Demo',
      description: 'Demo của Product Card component.',
      path: '/product-cards',
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8 mx-auto max-w-7xl">
        <Title level={1} className="mb-8 text-center">
          Pave Interview Frontend Components
        </Title>

        <Paragraph className="text-lg text-center mb-12">
          Trang demo cho các components đã được triển khai.
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoPages.map((page, index) => (
            <Card 
              key={index} 
              className={`h-full ${page.highlight ? 'border-2 border-blue-500 shadow-lg' : ''}`}
              hoverable
            >
              <Title level={4} className="mb-4">
                {page.title}
              </Title>
              <Paragraph className="mb-6 h-16">
                {page.description}
              </Paragraph>
              <Link to={page.path}>
                <Button type="primary" block>
                  Xem Demo
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Section 3: Redux Components */}
        <div className="mb-8">
          <Title level={3} className="mb-4">Redux Components</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComponentCard 
              title="Vehicle Damage Annotation V2"
              description="Enhanced damage annotation with tabs sidebar, damage type selector and component selection"
              path="/vehicle-damage-annotation-v2"
            />
            <ComponentCard 
              title="Vehicle Damage Annotation"
              description="Complete vehicle damage annotation feature with image markers and interactive UI"
              path="/vehicle-damage-annotation"
            />
            <ComponentCard 
              title="Redux Demo"
              description="Basic Redux demonstration page"
              path="/redux-demo"
            />
            <ComponentCard 
              title="Vehicle Damage Selection (Redux)"
              description="SVG-based vehicle damage selection with Redux"
              path="/vehicle-damage-redux"
            />
            <ComponentCard 
              title="Damage Selection (Redux)"
              description="Redux version of damage selection form"
              path="/damage-selection-redux"
            />
            <ComponentCard 
              title="Vehicle Details (Redux)" 
              description="Redux version of vehicle details page"
              path="/vehicle-details-redux"
            />
            <ComponentCard 
              title="Clickable Image" 
              description="Interactive image with click-to-add indicators stored in Redux"
              path="/clickable-image"
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage; 