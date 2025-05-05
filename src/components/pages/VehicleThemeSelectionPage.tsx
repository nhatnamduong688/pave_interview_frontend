import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, Button, Typography, Row, Col, Form, 
  Layout, Select, Tooltip, Radio, Statistic, 
  Steps, Divider, Badge, List, Avatar
} from 'antd';
import { 
  RightOutlined, CarOutlined, InfoCircleOutlined,
  BgColorsOutlined, DashboardOutlined, SettingOutlined,
  CheckCircleOutlined, CarryOutOutlined, SyncOutlined,
  FileSearchOutlined, FileTextOutlined, PictureOutlined, 
  UserOutlined
} from '@ant-design/icons';
import { useAppDispatch } from '../../store';
import { setTheme } from '../../store/slices/uiSlice';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;
const { Option } = Select;
const { Step } = Steps;

// Mock statistics
const statistics = {
  vehiclesInspected: 2463,
  annotationsCreated: 18452,
  activeUsers: 42,
  completionRate: 94.7,
  themeUsage: {
    light: 64,
    gray: 36
  }
};

// Recent vehicles list (mock data)
const recentVehicles = [
  { id: 'TQA-8GR5MDUDF1', name: 'FORD TRANSIT', date: '06/18/2023', status: 'completed' },
  { id: 'TQA-9AC3MDTY67', name: 'TOYOTA CAMRY', date: '06/17/2023', status: 'in_progress' },
  { id: 'TQA-7RS9HKUE12', name: 'HONDA CIVIC', date: '06/16/2023', status: 'completed' },
  { id: 'TQA-5PL1KZAS89', name: 'MAZDA CX-5', date: '06/15/2023', status: 'completed' }
];

const VehicleThemeSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedTheme, setSelectedTheme] = useState<string>('light');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('TQA-8GR5MDUDF1');
  const [current, setCurrent] = useState(0);

  // Theme configuration
  const themeConfigs = {
    light: {
      name: 'Light Mode',
      color: '#ffffff',
      textColor: '#000000',
      description: 'Bright interface with white background, easy to read with good contrast.'
    },
    gray: {
      name: 'Gray Mode',
      color: '#f0f2f5',
      textColor: '#000000',
      description: 'Gentle gray interface, reduces eye strain during extended sessions.'
    }
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
  };

  const handleStartAnnotation = () => {
    // Save theme to Redux store
    dispatch(setTheme(selectedTheme));
    
    // Navigate to the annotation page
    navigate(`/vehicle-damage-annotation-v2/${selectedVehicle}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in_progress':
        return <SyncOutlined style={{ color: '#1890ff' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#faad14' }} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CarOutlined style={{ fontSize: 24, color: '#1890ff', marginRight: 12 }} />
          <Title level={4} style={{ margin: 0 }}>Vehicle Damage Annotation</Title>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <Button type="text" icon={<DashboardOutlined />}>Dashboard</Button>
          <Button type="text" icon={<SettingOutlined />}>Settings</Button>
          <Button type="text" icon={<UserOutlined />}>Account</Button>
        </div>
      </Header>
      
      <Content style={{ padding: '24px' }}>
        <Row gutter={[24, 24]} justify="center">
          {/* Left column */}
          <Col xs={24} lg={16} xl={18}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DashboardOutlined style={{ marginRight: 8 }} />
                  <span>Dashboard</span>
                </div>
              }
              style={{ marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={6}>
                  <Statistic 
                    title="Vehicles Inspected"
                    value={statistics.vehiclesInspected}
                    prefix={<CarOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Statistic 
                    title="Annotations Created"
                    value={statistics.annotationsCreated}
                    prefix={<FileTextOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Statistic 
                    title="Active Users"
                    value={statistics.activeUsers}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Statistic 
                    title="Completion Rate"
                    value={statistics.completionRate}
                    suffix="%"
                    prefix={<CheckCircleOutlined />}
                    valueStyle={{ color: '#fa541c' }}
                  />
                </Col>
              </Row>
            </Card>

            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CarryOutOutlined style={{ marginRight: 8 }} />
                  <span>Vehicle Damage Assessment Workflow</span>
                </div>
              }
              style={{ marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <Steps current={current} onChange={setCurrent}>
                <Step title="Select Vehicle" description="Identify the vehicle to assess" />
                <Step title="Annotate" description="Mark damage points" />
                <Step title="Review" description="Verify all annotations" />
                <Step title="Export Report" description="Generate assessment report" />
              </Steps>

              <div style={{ marginTop: 24, padding: 24, backgroundColor: '#fafafa', borderRadius: 8 }}>
                {current === 0 && (
                  <div>
                    <Title level={5}>Vehicle Selection Guide</Title>
                    <Paragraph>
                      Choose a vehicle from the list or enter a vehicle ID. Make sure you select the correct make and model for the most accurate assessment.
                    </Paragraph>
                    <div style={{ marginTop: 16 }}>
                      <img 
                        src="/images/vehicles/View=1.png" 
                        alt="Car Selection" 
                        style={{ 
                          maxWidth: '100%', 
                          height: 'auto', 
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          maxHeight: 200,
                          display: 'block',
                          margin: '0 auto'
                        }} 
                      />
                    </div>
                  </div>
                )}
                {current === 1 && (
                  <div>
                    <Title level={5}>Annotation Guide</Title>
                    <Paragraph>
                      Use the annotation tools to mark damage locations on the vehicle. Select the damage type, severity level, and affected components.
                    </Paragraph>
                    <div style={{ marginTop: 16 }}>
                      <img 
                        src="/images/vehicles/View=2.png" 
                        alt="Annotation Process" 
                        style={{ 
                          maxWidth: '100%', 
                          height: 'auto', 
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          maxHeight: 200,
                          display: 'block',
                          margin: '0 auto'
                        }} 
                      />
                    </div>
                  </div>
                )}
                {current === 2 && (
                  <div>
                    <Title level={5}>Review Guide</Title>
                    <Paragraph>
                      Review all created annotations. Ensure all damages are accurately recorded before generating the report.
                    </Paragraph>
                    <div style={{ marginTop: 16 }}>
                      <img 
                        src="/images/vehicles/View=3.png" 
                        alt="Review Process" 
                        style={{ 
                          maxWidth: '100%', 
                          height: 'auto', 
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          maxHeight: 200,
                          display: 'block',
                          margin: '0 auto'
                        }} 
                      />
                    </div>
                  </div>
                )}
                {current === 3 && (
                  <div>
                    <Title level={5}>Report Export Guide</Title>
                    <Paragraph>
                      Choose the report format (PDF or JSON) and export a detailed assessment report of the vehicle damages.
                    </Paragraph>
                    <div style={{ marginTop: 16 }}>
                      <img 
                        src="/images/vehicles/View=4.png" 
                        alt="Report Export" 
                        style={{ 
                          maxWidth: '100%', 
                          height: 'auto', 
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          maxHeight: 200,
                          display: 'block',
                          margin: '0 auto'
                        }} 
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FileSearchOutlined style={{ marginRight: 8 }} />
                  <span>Recent Vehicles</span>
                </div>
              }
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <List
                itemLayout="horizontal"
                dataSource={recentVehicles}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button 
                        type="link"
                        onClick={() => {
                          setSelectedVehicle(item.id);
                          dispatch(setTheme(selectedTheme));
                          navigate(`/vehicle-damage-annotation-v2/${item.id}`);
                        }}
                      >
                        Continue
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<CarOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span>{item.name}</span>
                          <Badge 
                            status={item.status === 'completed' ? 'success' : 'processing'} 
                            text={getStatusText(item.status)} 
                            style={{ marginLeft: 8 }}
                          />
                        </div>
                      }
                      description={<>ID: {item.id} | Created: {item.date}</>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Right column */}
          <Col xs={24} lg={8} xl={6}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PictureOutlined style={{ marginRight: 8 }} />
                  <span>Start New Session</span>
                </div>
              }
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 24 }}
            >
              <Form layout="vertical">
                <Form.Item 
                  label="Select Vehicle" 
                  required
                  tooltip="Vehicle ID to assess for damage"
                >
                  <Select 
                    value={selectedVehicle}
                    onChange={value => setSelectedVehicle(value)}
                    style={{ width: '100%' }}
                    dropdownStyle={{ maxWidth: 400 }}
                  >
                    <Option value="TQA-8GR5MDUDF1">FORD TRANSIT (TQA-8GR5MDUDF1)</Option>
                    <Option value="TQA-9AC3MDTY67">TOYOTA CAMRY (TQA-9AC3MDTY67)</Option>
                    <Option value="TQA-7RS9HKUE12">HONDA CIVIC (TQA-7RS9HKUE12)</Option>
                    <Option value="TQA-5PL1KZAS89">MAZDA CX-5 (TQA-5PL1KZAS89)</Option>
                    <Option value="TQA-3JH7XZNQ43">KIA SPORTAGE (TQA-3JH7XZNQ43)</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item 
                  label={
                    <span>
                      Interface Theme
                      <Tooltip title="Choose a theme that suits your lighting conditions and preferences">
                        <InfoCircleOutlined style={{ marginLeft: 4 }} />
                      </Tooltip>
                    </span>
                  }
                >
                  <Radio.Group 
                    value={selectedTheme} 
                    onChange={e => handleThemeChange(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <Row gutter={[16, 16]}>
                      {Object.entries(themeConfigs).map(([key, theme]) => (
                        <Col span={12} key={key}>
                          <Card 
                            hoverable
                            className={`transition-all ${selectedTheme === key ? 'border-primary border' : ''}`}
                            onClick={() => handleThemeChange(key)}
                            bodyStyle={{
                              backgroundColor: theme.color,
                              color: theme.textColor,
                              padding: '12px'
                            }}
                            style={{ 
                              borderColor: selectedTheme === key ? '#1890ff' : '#d9d9d9',
                              borderWidth: selectedTheme === key ? '2px' : '1px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ marginRight: 8 }}>
                                <BgColorsOutlined style={{ fontSize: '18px', color: key === 'light' ? '#1890ff' : '#595959' }} />
                              </div>
                              <div>
                                <div style={{ fontWeight: 500 }}>{theme.name}</div>
                                <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{theme.description.substring(0, 30)}...</div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                </Form.Item>
                
                <Divider />
                
                <Form.Item>
                  <Button 
                    type="primary" 
                    size="large" 
                    block
                    onClick={handleStartAnnotation}
                    icon={<RightOutlined />}
                  >
                    Start Annotation
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <InfoCircleOutlined style={{ marginRight: 8 }} />
                  <span>Information</span>
                </div>
              }
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              <Paragraph>
                <strong>Vehicle Damage Annotation System v1.0</strong>
              </Paragraph>
              <Paragraph type="secondary">
                The system allows accurate and comprehensive evaluation and documentation of vehicle damages.
              </Paragraph>
              <Divider />
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Statistic 
                    title="Users Prefer Light"
                    value={statistics.themeUsage.light}
                    suffix="%"
                    valueStyle={{ color: '#1890ff', fontSize: '18px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="Users Prefer Gray"
                    value={statistics.themeUsage.gray}
                    suffix="%"
                    valueStyle={{ color: '#595959', fontSize: '18px' }}
                  />
                </Col>
              </Row>
              <Divider />
              <Paragraph style={{ marginBottom: 0, fontSize: 12, textAlign: 'center', color: 'rgba(0,0,0,0.45)' }}>
                © {new Date().getFullYear()} Vehicle Damage Annotation System
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default VehicleThemeSelectionPage; 