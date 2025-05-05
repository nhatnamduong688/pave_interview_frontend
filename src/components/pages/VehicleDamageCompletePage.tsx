import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Result, Card, Divider, Table, Tag, Typography, Space, Collapse, Row, Col } from 'antd';
import { CheckCircleOutlined, HomeOutlined, FileOutlined, FilePdfOutlined } from '@ant-design/icons';
import Header from '../organisms/Header';
import { useAppSelector } from '../../store';
import { selectCurrentPhoto, selectCurrentPhotoAnnotations } from '../../store/selectors/jobSelectors';

// Import selectors từ clickIndicator
import { selectActiveImageIndicators, selectActiveImageId } from '../../store/selectors/clickIndicatorSelectors';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const VehicleDamageCompletePage: React.FC = () => {
  const { id: vehicleId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [showReport, setShowReport] = useState(false);

  // Lấy dữ liệu từ cả hai store
  const currentPhoto = useAppSelector(selectCurrentPhoto);
  const annotations = useAppSelector(selectCurrentPhotoAnnotations);
  
  // Lấy dữ liệu từ clickIndicator store
  const activeImageId = useAppSelector(selectActiveImageId);
  const clickIndicators = useAppSelector(selectActiveImageIndicators);

  // Thêm console.log để debug
  console.log('Current Photo:', currentPhoto);
  console.log('Annotations job store:', annotations);
  console.log('Active Image ID:', activeImageId);
  console.log('Click Indicators:', clickIndicators);

  // Tạo dữ liệu trình bày từ cả job và clickIndicator stores
  const combinedAnnotations = [...(annotations || [])];
  
  // Thêm indicators từ clickIndicator nếu có
  useEffect(() => {
    if (clickIndicators && clickIndicators.length > 0) {
      console.log('Đang kết hợp dữ liệu từ clickIndicator');
    }
  }, [clickIndicators]);
  
  // Mô phỏng ID xe nếu không có trong params
  const finalVehicleId = vehicleId || 'TQA-8GR5MDUDF1';

  const handleBack = () => {
    navigate('/vehicles');
  };

  const handleViewAnnotations = () => {
    navigate(`/vehicle-damage-annotation-v2/${finalVehicleId}`);
  };

  const handleToggleReport = () => {
    setShowReport(!showReport);
  };

  const handleExport = (format: 'json' | 'pdf') => {
    if (format === 'json') {
      // Tạo dữ liệu JSON
      const data = {
        vehicleId: finalVehicleId,
        timestamp: new Date().toISOString(),
        photo: currentPhoto,
        annotations: annotations.length > 0 ? annotations : clickIndicators
      };
      
      // Tạo blob và tải xuống
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vehicle-damage-report-${finalVehicleId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Trong thực tế, tính năng xuất PDF sẽ phức tạp hơn
      alert("PDF export would be implemented with a library like jsPDF");
    }
  };

  // Chuyển đổi dữ liệu từ clickIndicator sang dạng annotation để hiển thị trong bảng
  const getDisplayData = () => {
    if (annotations && annotations.length > 0) {
      return annotations;
    } else if (clickIndicators && clickIndicators.length > 0) {
      return clickIndicators.map(indicator => ({
        id: indicator.id,
        components: indicator.component ? [indicator.component] : [],
        material: indicator.material || 'Unknown',
        damageType: indicator.damageType ? [indicator.damageType] : [],
        score: indicator.severity ? parseInt(indicator.severity) : 1
      }));
    }
    return [];
  };

  // Chuẩn bị dữ liệu cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text copyable>{text.substring(0, 8)}</Text>,
    },
    {
      title: 'Components',
      dataIndex: 'components',
      key: 'components',
      render: (components: string[]) => (
        <>
          {components?.map(comp => (
            <Tag color="blue" key={comp}>
              {comp}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
      render: (material: string) => <Tag color="purple">{material || 'Unknown'}</Tag>,
    },
    {
      title: 'Damage Types',
      dataIndex: 'damageType',
      key: 'damageType',
      render: (damageTypes: string[]) => (
        <>
          {damageTypes?.map(type => (
            <Tag color="red" key={type}>
              {type}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => {
        let color = 'green';
        if (score >= 3) color = 'orange';
        if (score >= 5) color = 'red';
        return <Tag color={color}>{score}</Tag>;
      },
    },
  ];

  // Lấy dữ liệu hiển thị
  const displayData = getDisplayData();
  console.log('Display data:', displayData);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex-none h-16 bg-white z-10">
        <Header
          title="Annotation Complete"
          onBack={handleBack}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-6">
        {!showReport ? (
          <div className="flex items-center justify-center h-full">
            <Result
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              title="Annotation Completed Successfully!"
              subTitle={`Vehicle ID: ${finalVehicleId}`}
              extra={[
                <Button 
                  type="primary" 
                  key="report" 
                  size="large"
                  onClick={handleToggleReport}
                >
                  View Report
                </Button>,
                <Button 
                  key="view" 
                  size="large"
                  onClick={handleViewAnnotations}
                >
                  View Annotations
                </Button>,
                <Button 
                  key="home" 
                  size="large"
                  onClick={handleBack}
                  icon={<HomeOutlined />}
                >
                  Return to Dashboard
                </Button>,
              ]}
            />
          </div>
        ) : (
          <div>
            {displayData.length === 0 ? (
              <Card className="mb-6">
                <Result
                  status="warning"
                  title="Không có dữ liệu báo cáo"
                  subTitle="Không tìm thấy dữ liệu chú thích nào cho phương tiện này. Vui lòng quay lại trang chú thích để tạo các chú thích."
                  extra={[
                    <Button type="primary" key="annotate" onClick={handleViewAnnotations}>
                      Quay lại trang chú thích
                    </Button>,
                    <Button key="back" onClick={handleToggleReport}>
                      Quay lại trang tổng hợp
                    </Button>
                  ]}
                />
              </Card>
            ) : (
              <Card className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Title level={3}>Vehicle Damage Report</Title>
                  <Space size="middle">
                    <Button 
                      type="primary" 
                      icon={<FileOutlined />}
                      onClick={() => handleExport('json')}
                    >
                      Export JSON
                    </Button>
                    <Button 
                      icon={<FilePdfOutlined />}
                      onClick={() => handleExport('pdf')}
                    >
                      Export PDF
                    </Button>
                    <Button onClick={handleToggleReport}>
                      Back to Summary
                    </Button>
                  </Space>
                </div>
                
                <Divider />
                
                <Row gutter={24} className="mb-6">
                  <Col span={12}>
                    <Card title="Vehicle Information" size="small">
                      <p><strong>Vehicle ID:</strong> {finalVehicleId}</p>
                      <p><strong>Report Generated:</strong> {new Date().toLocaleString()}</p>
                      <p><strong>Total Annotations:</strong> {displayData.length}</p>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Photo Information" size="small">
                      <p><strong>View:</strong> {currentPhoto?.viewName || 'Front View'}</p>
                      <p><strong>Photo ID:</strong> {currentPhoto?.id || activeImageId || 'Not specified'}</p>
                    </Card>
                  </Col>
                </Row>
                
                <Title level={4}>Annotations</Title>
                <Table 
                  columns={columns} 
                  dataSource={displayData}
                  rowKey="id"
                  pagination={false}
                />
                
                <Divider />
                
                <Collapse className="mt-6">
                  <Panel header="Raw Data Preview" key="1">
                    <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80">
                      {JSON.stringify({
                        vehicleId: finalVehicleId,
                        photo: currentPhoto || { id: activeImageId },
                        annotations: displayData
                      }, null, 2)}
                    </pre>
                  </Panel>
                </Collapse>
              </Card>
            )}
            
            <div className="text-center">
              <Button 
                size="large"
                onClick={handleToggleReport}
              >
                Back to Summary
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDamageCompletePage; 