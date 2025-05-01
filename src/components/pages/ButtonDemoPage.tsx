import React from 'react';
import { Typography, Divider, Row, Col, Card, Space } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import MainLayout from '../templates/MainLayout';
import { TrapezoidButton } from '../atoms/TrapezoidButton';
import { BackButton } from '../atoms/BackButton';
import { CollapseToggleButton } from '../atoms/CollapseToggleButton';

const { Title, Paragraph } = Typography;

const ButtonDemoPage: React.FC = () => {
  return (
    <MainLayout>
      <Title level={2}>Button Components Demo</Title>
      <Paragraph>
        This demonstrates the different button components and their variations.
      </Paragraph>

      <Divider orientation="left">TrapezoidButton</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Left Direction (Default)">
            <Space size="large">
              <TrapezoidButton 
                direction="left" 
                aria-label="Left Direction"
              />
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Right Direction">
            <Space size="large">
              <TrapezoidButton 
                direction="right" 
                aria-label="Right Direction"
              />
            </Space>
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Back Buttons</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Default BackButton">
            <BackButton
              onClick={() => console.log('Default button clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Primary BackButton">
            <BackButton
              variant="primary"
              onClick={() => console.log('Primary button clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Secondary BackButton">
            <BackButton
              variant="secondary"
              onClick={() => console.log('Secondary button clicked')}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
        <Col xs={24} md={8}>
          <Card title="BackButton with Product Code">
            <BackButton
              productCode="TOA-123"
              onClick={() => console.log('Product code button clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="BackButton with Badge">
            <BackButton
              badgeText="AMZ"
              onClick={() => console.log('Badge button clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="BackButton without Shadow">
            <BackButton
              shadowEnabled={false}
              onClick={() => console.log('No shadow button clicked')}
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Collapse Toggle Buttons</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Default CollapseToggleButton">
            <CollapseToggleButton
              onClick={() => console.log('Default collapse button clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Primary CollapseToggleButton">
            <CollapseToggleButton
              variant="primary"
              onClick={() => console.log('Primary collapse button clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Secondary CollapseToggleButton">
            <CollapseToggleButton
              variant="secondary"
              onClick={() => console.log('Secondary collapse button clicked')}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
        <Col xs={24} md={8}>
          <Card title="CollapseToggleButton with Product Code">
            <CollapseToggleButton
              productCode="DOC-123"
              onClick={() => console.log('Collapse with code clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="CollapseToggleButton with Badge">
            <CollapseToggleButton
              badgeText="NEW"
              onClick={() => console.log('Collapse with badge clicked')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="CollapseToggleButton Custom Colors">
            <CollapseToggleButton
              fillColor="#e0f2fe"
              iconColor="#0ea5e9"
              shadowEnabled={false}
              onClick={() => console.log('Custom collapse button clicked')}
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Skew Degree Variants</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card title="Low Skew">
            <TrapezoidButton 
              skewDegree="low" 
              aria-label="Low Skew"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Medium Skew (Default)">
            <TrapezoidButton 
              skewDegree="medium" 
              aria-label="Medium Skew"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="High Skew">
            <TrapezoidButton 
              skewDegree="high" 
              aria-label="High Skew"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Extreme Skew">
            <TrapezoidButton 
              skewDegree="extreme" 
              aria-label="Extreme Skew"
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Hover Effects</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card title="Color Change (Default)">
            <TrapezoidButton 
              hoverEffect="color" 
              hoverColor="#4299e1" 
              aria-label="Color Hover"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Pulse Effect">
            <TrapezoidButton 
              hoverEffect="pulse" 
              hoverColor="#4299e1" 
              aria-label="Pulse Effect"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Grow Effect">
            <TrapezoidButton 
              hoverEffect="grow" 
              hoverColor="#4299e1" 
              aria-label="Grow Effect"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Shadow Effect">
            <TrapezoidButton 
              hoverEffect="shadow" 
              hoverColor="#4299e1" 
              aria-label="Shadow Effect"
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Custom Icons</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card title="Home Icon">
            <TrapezoidButton 
              icon={<HomeOutlined style={{ fontSize: '20px', color: '#4299e1' }} />} 
              aria-label="Home"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Settings Icon">
            <TrapezoidButton 
              icon={<SettingOutlined style={{ fontSize: '20px', color: '#f97316' }} />}
              backgroundColor="#f8fafc"
              aria-label="Settings"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="User Icon">
            <TrapezoidButton 
              icon={<UserOutlined style={{ fontSize: '20px', color: '#8b5cf6' }} />}
              backgroundColor="#f8fafc"
              aria-label="User"
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card title="Search Icon">
            <TrapezoidButton 
              icon={<SearchOutlined style={{ fontSize: '20px', color: '#10b981' }} />}
              backgroundColor="#f8fafc"
              aria-label="Search"
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Panel Style</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="Panel Button Style">
            <Space size="large">
              <TrapezoidButton isPanel aria-label="Panel Button" />
              <TrapezoidButton 
                isPanel 
                icon={<SettingOutlined style={{ color: '#4299e1' }} />} 
                aria-label="Panel Settings"
              />
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Custom Styles</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Grid Background">
            <TrapezoidButton 
              gridBackground
              backgroundColor="#fef3c7"
              aria-label="Grid Background" 
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="No Bottom Curve">
            <TrapezoidButton 
              bottomCurve={false}
              backgroundColor="#e0f2fe"
              aria-label="No Bottom Curve"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Custom Colors">
            <TrapezoidButton 
              backgroundColor="#f0fdf4"
              hoverColor="#bbf7d0"
              iconColor="#16a34a"
              aria-label="Custom Colors"
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ButtonDemoPage; 