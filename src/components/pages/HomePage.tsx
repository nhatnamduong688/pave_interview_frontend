import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import Button from '../atoms/Button';
import MainLayout from '../templates/MainLayout';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center mb-10">
        <Title>Welcome to Our Application</Title>
        <Paragraph className="text-lg">
          This is a React application built with Atomic Design, TypeScript, Ant Design, and TailwindCSS.
        </Paragraph>
        <Button type="primary" size="large" className="mt-4">
          Get Started
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {[1, 2, 3].map((item) => (
          <Col key={item} xs={24} md={8}>
            <Card 
              title={`Feature ${item}`} 
              className="h-full hover:shadow-lg transition-shadow"
            >
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc.
              </Paragraph>
              <Button type="link" className="p-0">Learn More</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
};

export default HomePage; 