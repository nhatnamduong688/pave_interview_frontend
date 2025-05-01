import React from 'react';
import { Typography, Divider, Row, Col, Card, Space, Select, Form, Switch, InputNumber, Input, Radio } from 'antd';
import MainLayout from '../templates/MainLayout';
import { ProductCard } from '../molecules/ProductCard';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const ProductCardDemoPage: React.FC = () => {
  const [variant, setVariant] = React.useState<'elevated' | 'flat'>('elevated');
  const [clipStyle, setClipStyle] = React.useState<'normal' | 'notched' | 'slanted'>('normal');
  const [isSkewed, setIsSkewed] = React.useState(false);
  const [skewAngle, setSkewAngle] = React.useState('-20deg');
  const [colorStrip, setColorStrip] = React.useState<'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | undefined>('blue');

  const mockTags = [
    { text: 'AMZ', type: 'yellow' as const },
    { text: 'P1', type: 'blue' as const },
    { text: 'NEW', type: 'green' as const }
  ];

  const mockDetails = {
    type: 'Thiết bị điện tử',
    status: 'Đang hoạt động',
    createdAt: '01/05/2023',
    updatedAt: '15/04/2024'
  };

  return (
    <MainLayout>
      <Title level={2}>ProductCard Demo</Title>
      <Paragraph>
        This demonstrates the different variations of the ProductCard component.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card title="Interactive ProductCard Demo" className="mb-6">
            <Row>
              <Col xs={24} md={8} className="mb-4">
                <Form layout="vertical">
                  <Form.Item label="Card Variant">
                    <Radio.Group value={variant} onChange={(e) => setVariant(e.target.value)}>
                      <Radio.Button value="elevated">Elevated</Radio.Button>
                      <Radio.Button value="flat">Flat</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label="Clip Style">
                    <Select value={clipStyle} onChange={(value) => setClipStyle(value)}>
                      <Option value="normal">Normal</Option>
                      <Option value="notched">Notched</Option>
                      <Option value="slanted">Slanted</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Color Strip">
                    <Select 
                      value={colorStrip} 
                      onChange={(value) => setColorStrip(value)}
                      allowClear
                      placeholder="Select a color"
                    >
                      <Option value="blue">Blue</Option>
                      <Option value="green">Green</Option>
                      <Option value="red">Red</Option>
                      <Option value="yellow">Yellow</Option>
                      <Option value="purple">Purple</Option>
                      <Option value="gray">Gray</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="Skewed">
                    <Switch checked={isSkewed} onChange={setIsSkewed} />
                  </Form.Item>

                  {isSkewed && (
                    <Form.Item label="Skew Angle">
                      <Input 
                        value={skewAngle} 
                        onChange={(e) => setSkewAngle(e.target.value)}
                        suffix="deg"
                      />
                    </Form.Item>
                  )}
                </Form>
              </Col>
              <Col xs={24} md={16}>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <ProductCard
                    productId="TOA-8675309"
                    tags={mockTags}
                    qcStatus="QC Passed:"
                    qcTimestamp="2 days ago"
                    productDescription="Sản phẩm chất lượng cao, đạt chuẩn kiểm định của bộ Y tế và được khách hàng đánh giá cao."
                    productDetails={mockDetails}
                    variant={variant}
                    clipStyle={clipStyle}
                    isSkewed={isSkewed}
                    skewAngle={skewAngle}
                    colorStrip={colorStrip}
                    productImage="https://via.placeholder.com/150"
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Card Variants">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div>
                <h4>Elevated (Default)</h4>
                <ProductCard
                  productId="BKS-12345"
                  tags={[{ text: 'BKS', type: 'purple' }]}
                  variant="elevated"
                  qcTimestamp="1 day ago"
                />
              </div>
              <div>
                <h4>Flat</h4>
                <ProductCard
                  productId="CVC-67890"
                  tags={[{ text: 'CVC', type: 'red' }]}
                  variant="flat"
                  qcTimestamp="4 hours ago"
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Clip Style Variants</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Normal">
            <ProductCard
              productId="NRM-54321"
              tags={[{ text: 'Standard', type: 'gray' }]}
              clipStyle="normal"
              qcTimestamp="3 days ago"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Notched">
            <ProductCard
              productId="NCH-98765"
              tags={[{ text: 'Corner-Cut', type: 'green' }]}
              clipStyle="notched"
              qcTimestamp="5 days ago"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Slanted">
            <ProductCard
              productId="SLT-24680"
              tags={[{ text: 'Angled', type: 'blue' }]}
              clipStyle="slanted"
              qcTimestamp="7 days ago"
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Color Strip Options</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Blue Strip">
            <ProductCard
              productId="BLU-11111"
              colorStrip="blue"
              qcTimestamp="Today"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Green Strip">
            <ProductCard
              productId="GRN-22222"
              colorStrip="green"
              qcTimestamp="Yesterday"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Red Strip">
            <ProductCard
              productId="RED-33333"
              colorStrip="red"
              qcStatus="QC Failed:"
              qcTimestamp="3 days ago"
            />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Skewed Cards</Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Left Skew">
            <ProductCard
              productId="SKW-LEFT"
              isSkewed={true}
              skewAngle="-15deg"
              qcTimestamp="4 hours ago"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Right Skew">
            <ProductCard
              productId="SKW-RIGHT"
              isSkewed={true}
              skewAngle="15deg"
              qcTimestamp="8 hours ago"
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ProductCardDemoPage; 