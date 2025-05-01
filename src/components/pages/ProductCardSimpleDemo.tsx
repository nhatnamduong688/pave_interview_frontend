import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import MainLayout from '../templates/MainLayout';
import { ProductCard } from '../molecules/ProductCard';

const { Title, Paragraph } = Typography;

const ProductCardSimpleDemo: React.FC = () => {
  return (
    <MainLayout>
      <Title level={2}>ProductCard Demo</Title>
      <Paragraph>
        Mẫu thử ProductCard với thiết kế đã yêu cầu.
      </Paragraph>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={16}>
          <Card title="Product Card Demo" className="mb-6">
            <div className="p-8 bg-gray-50 rounded-lg flex justify-center">
              <ProductCard
                productId="TOA-8GASMDUDFT"
                tags={[
                  { text: "AMZ", type: "yellow" },
                  { text: "P1", type: "blue" }
                ]}
                qcStatus="QC Passed:"
                qcTimestamp="2 days ago, 3:03:58 PM"
                variant="flat"
                isSkewed={true}
                skewAngle="-20deg"
              />
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[24, 24]} className="mt-8">
        <Col xs={24} md={12}>
          <Card title="Thêm thông tin mô tả">
            <div className="p-6 bg-gray-50 rounded-lg">
              <ProductCard
                productId="TOA-8GASMDUDFT"
                tags={[
                  { text: "AMZ", type: "yellow" },
                  { text: "P1", type: "blue" }
                ]}
                qcStatus="QC Passed:"
                qcTimestamp="2 days ago, 3:03:58 PM"
                variant="flat"
                isSkewed={true}
                skewAngle="-20deg"
                productDescription="Sản phẩm chất lượng cao, đã được kiểm định chất lượng và phê duyệt bởi phòng QC."
                productDetails={{
                  type: 'Thiết bị điện tử',
                  status: 'Đang hoạt động',
                  createdAt: '01/05/2023',
                  updatedAt: '15/04/2024'
                }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Thêm ảnh và màu strip">
            <div className="p-6 bg-gray-50 rounded-lg">
              <ProductCard
                productId="TOA-8GASMDUDFT"
                tags={[
                  { text: "AMZ", type: "yellow" },
                  { text: "P1", type: "blue" }
                ]}
                qcStatus="QC Passed:"
                qcTimestamp="2 days ago, 3:03:58 PM"
                variant="flat"
                isSkewed={true}
                skewAngle="-20deg"
                colorStrip="green"
                productImage="https://via.placeholder.com/150"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default ProductCardSimpleDemo; 