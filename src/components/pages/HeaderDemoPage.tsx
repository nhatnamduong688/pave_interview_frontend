import React, { useState } from 'react';
import { Layout, Card, Typography, Space, message } from 'antd';
import Header from '../organisms/Header';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HeaderDemoPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  const handleReport = () => {
    messageApi.info('Report button clicked');
    console.log('Report clicked');
  };

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      <Header
        onMenuClick={handleMenuClick}
        timestamp="QC Passed: 2 days ago, 3:03:58 PM"
        elapsedTime="32s"
        onReport={handleReport}
      />

      <Content className="p-6">
        <Title level={2}>Simple Header Demo</Title>
        <Paragraph>
          This page demonstrates the simplified Header component with TrapezoidButton and badges integration.
        </Paragraph>

        <div className="mt-6">
          <Card title="Component Features" className="w-full">
            <Space direction="vertical" className="w-full">
              <Paragraph>
                <strong>Simple Design:</strong> The header spans 100% width with components aligned to the left and status elements on the right.
              </Paragraph>

              <Paragraph>
                <strong>TrapezoidButton Integration:</strong> Demonstrates how to use custom TrapezoidButton component for the code identifier.
              </Paragraph>

              <Paragraph>
                <strong>Status Badges:</strong> AMZ and P1 badges provide quick status information for the code identifier.
              </Paragraph>

              <Paragraph>
                <strong>Right-Side Elements:</strong> Timestamp, Report button, and elapsed time indicator provide additional functionality.
              </Paragraph>

              <div className="mt-4 p-4 bg-gray-50 rounded">
                <Title level={5}>Features:</Title>
                <ul className="list-disc pl-5">
                  <li>Full-width header with justified component structure</li>
                  <li>Menu icon for mobile navigation</li>
                  <li>PAVE branding</li>
                  <li>Trapezoid-shaped button for displaying code identifier (TOA-86ASMDUDF)</li>
                  <li>AMZ and P1 status badges</li>
                  <li>Timestamp display on the right side</li>
                  <li>Report button for issue reporting</li>
                  <li>Elapsed time indicator (32s)</li>
                </ul>
              </div>
            </Space>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default HeaderDemoPage;
