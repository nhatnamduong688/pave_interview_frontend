import React, { useState } from 'react';
import { Layout, Typography, Card, Divider, Button, Input, Select, Switch, Tag, List } from 'antd';
import { useAppSelector, useAppDispatch } from '../../store';
import { 
  selectComponentOptions, 
  selectMaterialOptions, 
  selectDamageTypeOptions,
  selectSeverityOptions
} from '../../store/selectors/optionsSelectors';
import {
  selectCurrentPhoto,
  selectCurrentPhotoAnnotations
} from '../../store/selectors/jobSelectors';
import {
  selectSelectedPhotoId,
  selectAnnotationInProgress,
  selectIsAnnotationValid
} from '../../store/selectors/uiSelectors';
import {
  selectPhoto,
  startAnnotation,
  completeAnnotation,
  cancelAnnotation,
  updateAnnotationInProgress,
  toggleComponentForAnnotation,
  toggleDamageTypeForAnnotation
} from '../../store/slices/uiSlice';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ReduxDemoPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const componentOptions = useAppSelector(selectComponentOptions);
  const materialOptions = useAppSelector(selectMaterialOptions);
  const damageTypeOptions = useAppSelector(selectDamageTypeOptions);
  const severityOptions = useAppSelector(selectSeverityOptions);
  
  const selectedPhotoId = useAppSelector(selectSelectedPhotoId);
  const currentPhoto = useAppSelector(selectCurrentPhoto);
  const annotations = useAppSelector(selectCurrentPhotoAnnotations);
  const annotationInProgress = useAppSelector(selectAnnotationInProgress);
  const isAnnotationValid = useAppSelector(selectIsAnnotationValid);
  
  // Local state
  const [newShapeX, setNewShapeX] = useState('120');
  const [newShapeY, setNewShapeY] = useState('200');
  
  // Handlers
  const handleStartAnnotation = () => {
    if (selectedPhotoId) {
      dispatch(startAnnotation({ photoId: selectedPhotoId }));
    }
  };
  
  const handleUpdateShape = () => {
    dispatch(updateAnnotationInProgress({
      shape: {
        type: 'circle',
        x: parseInt(newShapeX),
        y: parseInt(newShapeY),
        radius: 10
      }
    }));
  };
  
  const handleComponentToggle = (code: string) => {
    dispatch(toggleComponentForAnnotation(code));
  };
  
  const handleDamageTypeToggle = (code: string) => {
    dispatch(toggleDamageTypeForAnnotation(code));
  };
  
  const handleMaterialChange = (code: string) => {
    dispatch(updateAnnotationInProgress({ material: code }));
  };
  
  const handleSeverityChange = (value: number) => {
    dispatch(updateAnnotationInProgress({ severity: value }));
  };
  
  const handleThoughPaintToggle = (checked: boolean) => {
    dispatch(updateAnnotationInProgress({ throughPaint: checked }));
  };
  
  const handleComplete = () => {
    dispatch(completeAnnotation());
  };
  
  const handleCancel = () => {
    dispatch(cancelAnnotation());
  };
  
  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-6 mx-auto max-w-7xl">
        <Title level={2} className="mb-6">Redux Demo Page</Title>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thông tin Photo */}
          <Card title="Thông tin Photo" className="mb-6">
            <Paragraph>
              <Text strong>Selected Photo ID: </Text> 
              <Text>{selectedPhotoId || 'Chưa chọn'}</Text>
            </Paragraph>
            
            {currentPhoto && (
              <>
                <Paragraph>
                  <Text strong>Photo Name: </Text> 
                  <Text>{currentPhoto.viewName}</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>Thumbnail: </Text>
                </Paragraph>
                <div className="bg-gray-200 h-32 flex items-center justify-center mb-4">
                  <Text className="text-gray-500">[Ảnh thumbnail sẽ hiển thị ở đây]</Text>
                </div>
              </>
            )}
            
            <Button 
              type="primary" 
              onClick={handleStartAnnotation}
              disabled={!selectedPhotoId || Boolean(annotationInProgress?.photoId)}
              className="mt-2"
            >
              Tạo Annotation Mới
            </Button>
          </Card>
          
          {/* Danh sách Annotations */}
          <Card title="Danh sách Annotations" className="mb-6">
            {annotations.length > 0 ? (
              <List
                dataSource={annotations}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <Text strong>ID: {item.id}</Text>
                        <Text type="secondary">{new Date(item.createdAt).toLocaleString()}</Text>
                      </div>
                      <div className="mt-2">
                        <Text>Damage Type: </Text>
                        {item.damageType.map(code => (
                          <Tag key={code} color="blue">{code}</Tag>
                        ))}
                      </div>
                      <div className="mt-1">
                        <Text>Components: </Text>
                        {item.components.map(code => (
                          <Tag key={code} color="green">{code}</Tag>
                        ))}
                      </div>
                      <div className="mt-1">
                        <Text>Material: </Text>
                        <Tag color="purple">{item.material}</Tag>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <Text className="text-gray-500">Chưa có annotation nào</Text>
            )}
          </Card>
          
          {/* Form tạo Annotation */}
          {annotationInProgress?.photoId && (
            <Card 
              title="Tạo Annotation" 
              className="col-span-1 md:col-span-2 mb-6"
              extra={
                <div>
                  <Button onClick={handleCancel} className="mr-2">
                    Hủy
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleComplete}
                    disabled={!isAnnotationValid}
                  >
                    Hoàn thành
                  </Button>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shape */}
                <div>
                  <Title level={5}>Shape</Title>
                  <div className="flex space-x-2 mb-4">
                    <Input 
                      placeholder="X coordinate" 
                      value={newShapeX}
                      onChange={e => setNewShapeX(e.target.value)}
                      style={{ width: 120 }}
                    />
                    <Input 
                      placeholder="Y coordinate" 
                      value={newShapeY}
                      onChange={e => setNewShapeY(e.target.value)}
                      style={{ width: 120 }}
                    />
                    <Button onClick={handleUpdateShape}>Set Shape</Button>
                  </div>
                  
                  {annotationInProgress.shape && (
                    <Tag color="green">
                      Shape: Circle at ({annotationInProgress.shape.x}, {annotationInProgress.shape.y})
                    </Tag>
                  )}
                </div>
                
                {/* Component Selection */}
                <div>
                  <Title level={5}>Components</Title>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {componentOptions.map(option => (
                      <Tag
                        key={option.code}
                        color={annotationInProgress.components.includes(option.code) ? 'blue' : 'default'}
                        onClick={() => handleComponentToggle(option.code)}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </Tag>
                    ))}
                  </div>
                </div>
                
                {/* Material Selection */}
                <div>
                  <Title level={5}>Material</Title>
                  <Select
                    placeholder="Select material"
                    style={{ width: '100%' }}
                    value={annotationInProgress.material}
                    onChange={handleMaterialChange}
                  >
                    {materialOptions.map(option => (
                      <Option key={option.code} value={option.code}>{option.label}</Option>
                    ))}
                  </Select>
                </div>
                
                {/* Damage Type Selection */}
                <div>
                  <Title level={5}>Damage Types</Title>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {damageTypeOptions.map(option => (
                      <Tag
                        key={option.code}
                        color={annotationInProgress.damageType.includes(option.code) ? 'red' : 'default'}
                        onClick={() => handleDamageTypeToggle(option.code)}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </Tag>
                    ))}
                  </div>
                </div>
                
                {/* Severity Selection */}
                <div>
                  <Title level={5}>Severity</Title>
                  <Select
                    placeholder="Select severity"
                    style={{ width: '100%' }}
                    value={annotationInProgress.severity}
                    onChange={handleSeverityChange}
                  >
                    {severityOptions.map(option => (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                  </Select>
                </div>
                
                {/* Through Paint Toggle */}
                <div>
                  <Title level={5}>Through Paint</Title>
                  <Switch 
                    checked={annotationInProgress.throughPaint}
                    onChange={handleThoughPaintToggle}
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ReduxDemoPage; 