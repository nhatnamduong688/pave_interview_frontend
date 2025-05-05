import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Divider, Button, Table, Tag, Typography, Space, Collapse, Row, Col } from 'antd';
import { DownloadOutlined, FilePdfOutlined, FileOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Header from '../organisms/Header';
import { useAppSelector } from '../../store';
import { selectCurrentPhoto, selectCurrentPhotoAnnotations } from '../../store/selectors/jobSelectors';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const VehicleDamageReportPage: React.FC = () => {
  const { id: vehicleId } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [exportFormat, setExportFormat] = useState<'json' | 'pdf'>('json');

  // Lấy dữ liệu từ Redux store
  const currentPhoto = useAppSelector(selectCurrentPhoto);
  const annotations = useAppSelector(selectCurrentPhotoAnnotations);

  // Mô phỏng ID xe nếu không có trong params
  const finalVehicleId = vehicleId || 'TQA-8GR5MDUDF1';

  const handleBack = () => {
    navigate(`/vehicle-damage-complete/${finalVehicleId}`);
  };

  const handleExport = (format: 'json' | 'pdf') => {
    setExportFormat(format);
    
    if (format === 'json') {
      // Tạo dữ liệu JSON
      const data = {
        vehicleId: finalVehicleId,
        timestamp: new Date().toISOString(),
        photo: currentPhoto,
        annotations: annotations
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
      // Trong thực tế, tính năng xuất PDF sẽ phức tạp hơn và cần sử dụng thư viện như jsPDF
      alert("PDF export would be implemented with a library like jsPDF");
    }
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
          {components.map(comp => (
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
      render: (material: string) => <Tag color="purple">{material}</Tag>,
    },
    {
      title: 'Damage Types',
      dataIndex: 'damageType',
      key: 'damageType',
      render: (damageTypes: string[]) => (
        <>
          {damageTypes.map(type => (
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex-none h-16 bg-white z-10">
        <Header
          title="Damage Report"
          onBack={handleBack}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
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
            </Space>
          </div>
          
          <Divider />
          
          <Row gutter={24} className="mb-6">
            <Col span={12}>
              <Card title="Vehicle Information" size="small">
                <p><strong>Vehicle ID:</strong> {finalVehicleId}</p>
                <p><strong>Report Generated:</strong> {new Date().toLocaleString()}</p>
                <p><strong>Total Annotations:</strong> {annotations.length}</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Photo Information" size="small">
                <p><strong>View:</strong> {currentPhoto?.viewName || 'Not specified'}</p>
                <p><strong>Photo ID:</strong> {currentPhoto?.id || 'Not specified'}</p>
              </Card>
            </Col>
          </Row>
          
          <Title level={4}>Annotations</Title>
          <Table 
            columns={columns} 
            dataSource={annotations}
            rowKey="id"
            pagination={false}
          />
          
          <Divider />
          
          <Collapse className="mt-6">
            <Panel header="Raw Data Preview" key="1">
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-80">
                {JSON.stringify({
                  vehicleId: finalVehicleId,
                  photo: currentPhoto,
                  annotations: annotations
                }, null, 2)}
              </pre>
            </Panel>
          </Collapse>
        </Card>
        
        <div className="text-center">
          <Button 
            icon={<ArrowLeftOutlined />} 
            size="large"
            onClick={handleBack}
          >
            Back to Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDamageReportPage; 