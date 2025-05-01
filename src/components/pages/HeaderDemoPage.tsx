import React, { useState } from 'react';
import { Layout, Card, Typography, Space, message, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
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
        timestamp="2 days ago, 3:03:58 PM"
        elapsedTime="32s"
        onReport={handleReport}
      />

      <Content className="p-6">
        <Title level={2}>Header with SessionCard Demo</Title>
        <Paragraph>
          This page demonstrates the Header component with SessionCard integration using Figma design specifications.
        </Paragraph>

        <div className="mt-6">
          <Card title="Component Features" className="w-full mb-6">
            <Space direction="vertical" className="w-full">
              <Paragraph>
                <strong>Pixel-Perfect Design:</strong> The header now uses a SessionCard with an SVG-based layout matching the Figma design.
              </Paragraph>

              <Paragraph>
                <strong>"Created Date" Styling:</strong> The timestamp uses JetBrains Mono font at 10px size with proper opacity.
              </Paragraph>

              <div className="mt-4 p-4 bg-gray-50 rounded">
                <Title level={5}>Design Details:</Title>
                <ul className="list-disc pl-5">
                  <li>Skewed card edges to create the trapezoid shape</li>
                  <li>Shadow under the card using SVG filters</li>
                  <li>Proto Mono font (15px) for the session ID</li>
                  <li>JetBrains Mono font (10px) for the timestamp</li>
                  <li>Custom dropdown indicator</li>
                  <li>Exact tag dimensions (18px × 13px)</li>
                </ul>
              </div>
            </Space>
          </Card>
          
          <Card title="SessionCard Design Comparison" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div>
                <Title level={5}>Figma Design (SVG-based)</Title>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SessionCard
                    sessionId="TOA-8GASMDUDFT"
                    tags={[
                      { text: "AMZ", type: "yellow" },
                      { text: "P1", type: "blue" }
                    ]}
                    qcStatus="Created Date:"
                    qcTimestamp="2 days ago, 3:03:58 PM"
                    isExpandable={true}
                    specialDesign={true}
                  />
                </div>
                <Paragraph className="mt-2 text-sm text-gray-500">
                  Uses SVG shape with exact dimensions from Figma, including skewed edges, proper font specifications, and shadow effects.
                </Paragraph>
              </div>
              
              <div>
                <Title level={5}>Regular Card Implementation</Title>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <SessionCard
                    sessionId="TOA-8GASMDUDFT"
                    tags={[
                      { text: "AMZ", type: "yellow" },
                      { text: "P1", type: "blue" }
                    ]}
                    qcStatus="Created Date:"
                    qcTimestamp="2 days ago, 3:03:58 PM"
                    isSkewed={true}
                    skewAngle="-20deg"
                    variant="flat"
                    colorStrip="blue"
                    className="w-[276px]"
                  />
                </div>
                <Paragraph className="mt-2 text-sm text-gray-500">
                  Uses CSS transform for skewing and standard styling approach with Tailwind classes.
                </Paragraph>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link to="/session-card-demo">
                <Button type="primary" size="large">
                  View More SessionCard Variations
                </Button>
              </Link>
            </div>
          </Card>
          
          <div className="mt-6">
            <Title level={4}>Other SessionCard Variations</Title>
            <div className="flex flex-wrap gap-5 mt-4">
              <div className="w-80">
                <Title level={5}>Special Design (No Tags)</Title>
                <SessionCard
                  sessionId="SESSION-001"
                  qcStatus="Created Date:"
                  qcTimestamp="1 day ago"
                  isExpandable={true}
                  specialDesign={true}
                />
              </div>
              
              <div className="w-80">
                <Title level={5}>Elevated Style with Created Date</Title>
                <SessionCard
                  sessionId="SESSION-002"
                  tags={[
                    { text: "VIP", type: "purple" },
                    { text: "NEW", type: "green" }
                  ]}
                  qcStatus="Created Date:"
                  qcTimestamp="Just now"
                  variant="elevated"
                  colorStrip="green"
                />
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HeaderDemoPage;
