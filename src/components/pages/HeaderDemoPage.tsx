import React, { useState } from 'react';
import { Layout, Card, Typography, Space, message, Divider } from 'antd';
import Header from '../organisms/Header';
import { SessionCard } from '../molecules/SessionCard';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HeaderDemoPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMenuClick = () => {
    messageApi.info('Menu button clicked');
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
        <Title level={2}>Header with SessionCard Demo</Title>
        <Paragraph>
          This page demonstrates the Header component with SessionCard integration.
        </Paragraph>

        <div className="mt-6">
          <Card title="Component Features" className="w-full mb-6">
            <Space direction="vertical" className="w-full">
              <Paragraph>
                <strong>Simple Design:</strong> The header spans 100% width with components aligned to the left and status elements on the right.
              </Paragraph>

              <Paragraph>
                <strong>SessionCard Integration:</strong> We use the modular SessionCard component that follows the Figma design specifications.
              </Paragraph>

              <Paragraph>
                <strong>Status Badges:</strong> AMZ and P1 badges provide quick status information with customizable colors.
              </Paragraph>

              <div className="mt-4 p-4 bg-gray-50 rounded">
                <Title level={5}>Features:</Title>
                <ul className="list-disc pl-5">
                  <li>Full-width header with justified component structure</li>
                  <li>Menu icon for mobile navigation</li>
                  <li>SessionCard with skewed design showing session ID "TOA-8GASMDUDFT"</li>
                  <li>Figma-styled text with Proto Mono font, 15px size, and proper letter spacing</li>
                  <li>AMZ and P1 status badges sized at 18px × 13px</li>
                  <li>Blue color strip at the top of the session card</li>
                  <li>Timestamp display in the card</li>
                  <li>Elapsed time indicator (32s) on the right</li>
                </ul>
              </div>
            </Space>
          </Card>
          
          <Card title="SessionCard Variations" className="w-full">
            <Paragraph>
              Below are some variations of the SessionCard component with different styling options:
            </Paragraph>
            
            <div className="flex flex-wrap gap-5 mt-4">
              {/* Flat style (như trong header) */}
              <div className="w-80">
                <Title level={5}>Flat Style (with skew)</Title>
                <SessionCard
                  sessionId="SESSION-001"
                  tags={[{ text: "TEST", type: "red" }]}
                  qcStatus="QC Passed:"
                  qcTimestamp=" 1 day ago"
                  variant="flat"
                  isSkewed={true}
                  colorStrip="red"
                />
              </div>
              
              {/* Elevated style */}
              <div className="w-80">
                <Title level={5}>Elevated Style</Title>
                <SessionCard
                  sessionId="SESSION-002"
                  tags={[
                    { text: "VIP", type: "purple" },
                    { text: "NEW", type: "green" }
                  ]}
                  qcStatus="QC Pending:"
                  qcTimestamp=" Just now"
                  variant="elevated"
                  colorStrip="green"
                />
              </div>
              
              {/* Notched style */}
              <div className="w-80">
                <Title level={5}>Notched Style</Title>
                <SessionCard
                  sessionId="SESSION-003"
                  tags={[{ text: "OLD", type: "gray" }]}
                  qcStatus="QC Failed:"
                  qcTimestamp=" 3 days ago"
                  variant="elevated"
                  clipStyle="notched"
                  colorStrip="yellow"
                />
              </div>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default HeaderDemoPage;
