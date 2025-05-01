import React from 'react';
import { Layout, Card, Typography, Space, Divider } from 'antd';
import { SessionCard } from '../molecules/SessionCard';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const SessionCardDemo: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Content className="p-6">
        <Title level={2}>SessionCard Component Demo</Title>
        <Paragraph>
          This page showcases the SessionCard component with different design variations, including a pixel-perfect SVG implementation from Figma.
        </Paragraph>

        <div className="mt-8">
          <Title level={3}>SVG Implementation (Figma Exact Design)</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <Card title="Default SVG Card" className="bg-gray-50">
              <div className="p-4">
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
              <Paragraph className="mt-2">
                This uses the SVG implementation that exactly matches the Figma design with the trapezoid shape and proper shadow effects.
              </Paragraph>
            </Card>
            
            <Card title="SVG Card with Different Tags" className="bg-gray-50">
              <div className="p-4">
                <SessionCard
                  sessionId="SESSION-XYZ123"
                  tags={[
                    { text: "VIP", type: "purple" },
                    { text: "URGENT", type: "red" }
                  ]}
                  qcStatus="Created Date:"
                  qcTimestamp="Just now"
                  isExpandable={true}
                  specialDesign={true}
                />
              </div>
              <Paragraph className="mt-2">
                The same SVG implementation with different tag colors and content.
              </Paragraph>
            </Card>
          </div>

          <Divider className="my-10" />

          <Title level={3}>CSS-based Implementations</Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Card title="Flat Style with Skew" className="bg-gray-50">
              <div className="p-4">
                <SessionCard
                  sessionId="SESSION-001"
                  tags={[
                    { text: "NEW", type: "green" }
                  ]}
                  qcStatus="QC Passed:"
                  qcTimestamp="1 day ago"
                  variant="flat"
                  isSkewed={true}
                  skewAngle="-15deg"
                  colorStrip="green"
                />
              </div>
            </Card>
            
            <Card title="Elevated with Notched Style" className="bg-gray-50">
              <div className="p-4">
                <SessionCard
                  sessionId="SESSION-002"
                  tags={[
                    { text: "REVIEW", type: "blue" }
                  ]}
                  qcStatus="QC Pending:"
                  qcTimestamp="3 hours ago"
                  clipStyle="notched"
                  colorStrip="yellow"
                />
              </div>
            </Card>
            
            <Card title="Flat with Slanted Clip" className="bg-gray-50">
              <div className="p-4">
                <SessionCard
                  sessionId="SESSION-003"
                  tags={[
                    { text: "FAILED", type: "red" }
                  ]}
                  qcStatus="QC Failed:"
                  qcTimestamp="5 minutes ago"
                  variant="flat"
                  clipStyle="slanted"
                  colorStrip="red"
                />
              </div>
            </Card>
          </div>

          <Divider className="my-10" />

          <Title level={3}>Comparison: SVG vs CSS Implementation</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <Card title="SVG Implementation" className="bg-gray-50">
              <div className="p-4">
                <SessionCard
                  sessionId="COMPARE-123"
                  tags={[
                    { text: "AMZ", type: "yellow" },
                    { text: "P1", type: "blue" }
                  ]}
                  qcStatus="Created Date:"
                  qcTimestamp="Yesterday, 4:30 PM"
                  isExpandable={true}
                  specialDesign={true}
                />
              </div>
              <Paragraph className="mt-2">
                Pixel-perfect implementation using SVG that matches the Figma design exactly.
              </Paragraph>
            </Card>
            
            <Card title="CSS Implementation (Similar Look)" className="bg-gray-50">
              <div className="p-4">
                <SessionCard
                  sessionId="COMPARE-123"
                  tags={[
                    { text: "AMZ", type: "yellow" },
                    { text: "P1", type: "blue" }
                  ]}
                  qcStatus="Created Date:"
                  qcTimestamp="Yesterday, 4:30 PM"
                  isExpandable={true}
                  isSkewed={true}
                  skewAngle="-20deg"
                  variant="flat"
                  colorStrip="blue"
                  className="w-[276px]"
                />
              </div>
              <Paragraph className="mt-2">
                CSS-based implementation that approximates the design using transforms and regular styling techniques.
              </Paragraph>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default SessionCardDemo; 