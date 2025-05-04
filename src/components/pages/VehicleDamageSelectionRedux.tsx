import React, { useState } from 'react';
import { Layout, Typography, Card, Button, Space, Tag, Row, Col, Divider, Tooltip, Popconfirm } from 'antd';
import { DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
  selectIsAnnotationValid,
  selectSelectedAnnotationId
} from '../../store/selectors/uiSelectors';
import {
  selectPhoto,
  startAnnotation,
  completeAnnotation,
  cancelAnnotation,
  updateAnnotationInProgress,
  toggleComponentForAnnotation,
  toggleDamageTypeForAnnotation,
  selectAnnotation
} from '../../store/slices/uiSlice';
import {
  removeAnnotation,
  updateAnnotation
} from '../../store/slices/jobSlice';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Component giả lập hiển thị xe
const VehicleDisplay = ({ selectedComponents = [] }) => {
  // Xác định màu cho từng thành phần dựa trên trạng thái được chọn
  const getComponentColor = (code) => {
    return selectedComponents.includes(code) ? 'fill-blue-500' : 'fill-gray-200';
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 bg-white">
        <div className="relative w-full h-full">
          {/* SVG representation of a car (side view) */}
          <svg 
            viewBox="0 0 800 300" 
            className="w-full h-full"
            style={{ maxHeight: "100%" }}
          >
            {/* Car base */}
            <path
              d="M150,200 L200,200 C230,140 550,140 600,200 L650,200 L650,220 L630,220 C630,245 615,260 590,260 C565,260 550,245 550,220 L250,220 C250,245 235,260 210,260 C185,260 170,245 170,220 L150,220 Z"
              className="fill-gray-300 stroke-gray-500"
              strokeWidth="2"
            />
            
            {/* Roof */}
            <path
              d="M270,140 L300,100 L500,100 L550,140"
              className={getComponentColor("ROOF_LINE_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* Front door */}
            <path
              d="M300,140 L300,100 L400,100 L400,200 L300,200 Z"
              className={getComponentColor("DOOR_FRONT_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* Front fender */}
            <path
              d="M200,200 L200,140 L300,140 L300,200 Z"
              className={getComponentColor("FENDER_FRONT_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* Quarter panel */}
            <path
              d="M400,100 L500,100 L550,140 L550,200 L400,200 Z"
              className={getComponentColor("QUARTER_PANEL_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* B Pillar */}
            <rect
              x="395" y="100" width="10" height="100"
              className={getComponentColor("PILLAR_B_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* Rocker panel */}
            <rect
              x="200" y="195" width="350" height="10"
              className={getComponentColor("ROCKER_PANEL_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* Pillar cover rear */}
            <path
              d="M500,100 L510,110 L510,190 L500,200"
              className={getComponentColor("PILLAR_COVER_REAR_LEFT") + " stroke-gray-500"}
              strokeWidth="2"
            />
            
            {/* Wheels */}
            <circle cx="210" cy="220" r="40" className="fill-gray-700" />
            <circle cx="210" cy="220" r="25" className="fill-gray-300" />
            <circle cx="590" cy="220" r="40" className="fill-gray-700" />
            <circle cx="590" cy="220" r="25" className="fill-gray-300" />
            
            {/* Window */}
            <path
              d="M310,110 L390,110 L390,150 L310,150 Z"
              className="fill-blue-200 stroke-gray-500"
              strokeWidth="2"
            />
            
            {/* Headlight */}
            <rect
              x="190" y="150" width="20" height="30"
              className="fill-yellow-100 stroke-gray-500"
              strokeWidth="2"
            />
            
            {/* Taillight */}
            <rect
              x="590" y="150" width="20" height="30"
              className="fill-red-500 stroke-gray-500"
              strokeWidth="2"
            />
          </svg>
          
          {/* Labels for selected components */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 p-2">
            <div className="flex flex-wrap gap-1">
              {selectedComponents.length > 0 ? (
                selectedComponents.map(code => (
                  <Tag key={code} color="blue">{code}</Tag>
                ))
              ) : (
                <Text className="text-gray-400">No components selected</Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component để chọn các thành phần xe
const ComponentSelector = ({ components, selectedComponents = [], onToggle }) => {
  return (
    <div className="mb-4">
      <Title level={5}>Components</Title>
      <div className="flex flex-wrap gap-2">
        {components.map((component) => (
          <Tag 
            key={component.code} 
            color={selectedComponents.includes(component.code) ? 'blue' : 'default'}
            onClick={() => onToggle(component.code)}
            className="cursor-pointer text-sm py-1 px-3"
          >
            {component.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

// Component để chọn loại vật liệu
const MaterialSelector = ({ materials, selectedMaterial, onChange }) => {
  return (
    <div className="mb-4">
      <Title level={5}>Material</Title>
      <div className="flex flex-wrap gap-2">
        {materials.map((material) => (
          <Tag 
            key={material.code} 
            color={selectedMaterial === material.code ? 'purple' : 'default'}
            onClick={() => onChange(material.code)}
            className="cursor-pointer text-sm py-1 px-3"
          >
            {material.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

// Component để chọn loại hư hỏng
const DamageTypeSelector = ({ damageTypes, selectedDamageTypes = [], onToggle }) => {
  return (
    <div className="mb-4">
      <Title level={5}>Damage Types</Title>
      <div className="flex flex-wrap gap-2">
        {damageTypes.map((damage) => (
          <Tag 
            key={damage.code} 
            color={selectedDamageTypes.includes(damage.code) ? 'red' : 'default'}
            onClick={() => onToggle(damage.code)}
            className="cursor-pointer text-sm py-1 px-3"
          >
            {damage.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

// Component để chọn mức độ nghiêm trọng
const SeveritySelector = ({ severities, selectedSeverity, onChange }) => {
  return (
    <div className="mb-4">
      <Title level={5}>Severity</Title>
      <div className="flex gap-2">
        {severities.map((severity) => (
          <Button 
            key={severity.value} 
            type={selectedSeverity === severity.value ? 'primary' : 'default'}
            onClick={() => onChange(severity.value)}
            className="min-w-16"
          >
            {severity.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

const VehicleDamageSelectionRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Selectors from Redux
  const componentOptions = useAppSelector(selectComponentOptions);
  const materialOptions = useAppSelector(selectMaterialOptions);
  const damageTypeOptions = useAppSelector(selectDamageTypeOptions);
  const severityOptions = useAppSelector(selectSeverityOptions);
  
  const selectedPhotoId = useAppSelector(selectSelectedPhotoId);
  const selectedAnnotationId = useAppSelector(selectSelectedAnnotationId); 
  const currentPhoto = useAppSelector(selectCurrentPhoto);
  const annotations = useAppSelector(selectCurrentPhotoAnnotations);
  const annotationInProgress = useAppSelector(selectAnnotationInProgress);
  const isAnnotationValid = useAppSelector(selectIsAnnotationValid);
  
  // Tìm annotation được chọn từ danh sách
  const selectedAnnotation = annotations.find(a => a.id === selectedAnnotationId);
  
  // Handlers
  const handleComponentToggle = (code: string) => {
    dispatch(toggleComponentForAnnotation(code));
  };
  
  const handleMaterialChange = (code: string) => {
    dispatch(updateAnnotationInProgress({ material: code }));
  };
  
  const handleDamageTypeToggle = (code: string) => {
    dispatch(toggleDamageTypeForAnnotation(code));
  };
  
  const handleSeverityChange = (value: number) => {
    dispatch(updateAnnotationInProgress({ severity: value }));
  };
  
  const handleSave = () => {
    dispatch(completeAnnotation());
  };
  
  const handleCancel = () => {
    dispatch(cancelAnnotation());
  };
  
  const handleSelectAnnotation = (annotationId: string) => {
    dispatch(selectAnnotation(annotationId));
  };
  
  const handleStartNewAnnotation = () => {
    if (selectedPhotoId) {
      dispatch(startAnnotation({ photoId: selectedPhotoId }));
    } else {
      // Nếu chưa có selectedPhotoId, tạm thời chọn cái mặc định
      dispatch(selectPhoto('photo-4'));
      setTimeout(() => dispatch(startAnnotation({ photoId: 'photo-4' })), 100);
    }
  };
  
  // Trạng thái hiện tại của annotation đang tạo
  const isCreatingAnnotation = !!annotationInProgress?.photoId;
  
  // Xác định components sẽ hiển thị trên xe (từ annotation đang chọn hoặc đang tạo)
  const displayedComponents = isCreatingAnnotation 
    ? annotationInProgress.components 
    : (selectedAnnotation ? selectedAnnotation.components : []);
  
  // Thêm handler xóa annotation
  const handleRemoveAnnotation = (photoId: string, annotationId: string) => {
    dispatch(removeAnnotation({ photoId, annotationId }));
    if (selectedAnnotationId === annotationId) {
      dispatch(selectAnnotation(null));
    }
  };
  
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-6 mx-auto max-w-7xl">
        <Title level={2} className="mb-6">Vehicle Damage Selection</Title>
        
        <Row gutter={24}>
          <Col span={24} md={12}>
            <Card title="Vehicle Diagram" className="mb-6">
              <VehicleDisplay selectedComponents={displayedComponents} />
              
              {!isCreatingAnnotation ? (
                <div>
                  <Button 
                    type="primary" 
                    onClick={handleStartNewAnnotation}
                    block
                    className="mb-2"
                  >
                    Start New Annotation
                  </Button>
                  
                  {selectedAnnotation && (
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 mt-3">
                      <Text strong>Viewing: </Text>
                      <Text>{selectedAnnotation.id.substring(0, 8)}</Text>
                      <div className="mt-2">
                        <Text className="block">Material: </Text>
                        <Tag color="purple">{selectedAnnotation.material}</Tag>
                      </div>
                      <div className="mt-2">
                        <Text className="block">Damage Types: </Text>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedAnnotation.damageType.map(code => (
                            <Tag key={code} color="red">{code}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <Button onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleSave}
                    disabled={!isAnnotationValid}
                  >
                    Save Annotation
                  </Button>
                </div>
              )}
            </Card>
          </Col>
          
          <Col span={24} md={12}>
            {isCreatingAnnotation && (
              <Card title="Damage Details" className="mb-6">
                <ComponentSelector 
                  components={componentOptions}
                  selectedComponents={annotationInProgress.components || []}
                  onToggle={handleComponentToggle}
                />
                
                <Divider />
                
                <MaterialSelector 
                  materials={materialOptions}
                  selectedMaterial={annotationInProgress.material}
                  onChange={handleMaterialChange}
                />
                
                <Divider />
                
                <DamageTypeSelector 
                  damageTypes={damageTypeOptions}
                  selectedDamageTypes={annotationInProgress.damageType || []}
                  onToggle={handleDamageTypeToggle}
                />
                
                <Divider />
                
                <SeveritySelector 
                  severities={severityOptions}
                  selectedSeverity={annotationInProgress.severity}
                  onChange={handleSeverityChange}
                />
              </Card>
            )}
            
            <Card title="Saved Annotations" className="mb-6">
              {annotations.length > 0 ? (
                <div className="space-y-4">
                  {annotations.map((annotation) => (
                    <div 
                      key={annotation.id} 
                      className={`p-4 border rounded transition-colors ${
                        selectedAnnotationId === annotation.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div 
                          className="flex-grow cursor-pointer" 
                          onClick={() => handleSelectAnnotation(annotation.id)}
                        >
                          <div className="flex justify-between">
                            <Text strong>ID: {annotation.id.substring(0, 8)}</Text>
                            <Text type="secondary">{new Date(annotation.createdAt).toLocaleString()}</Text>
                          </div>
                          
                          <div className="mt-2">
                            <Text className="block">Components:</Text>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {annotation.components.map(code => (
                                <Tag key={code} color="blue">{code}</Tag>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <Text className="block">Material: </Text>
                            <Tag color="purple">{annotation.material}</Tag>
                          </div>
                          
                          <div className="mt-2">
                            <Text className="block">Damage Types:</Text>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {annotation.damageType.map(code => (
                                <Tag key={code} color="red">{code}</Tag>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <Text className="block">Severity: </Text>
                            <Tag color="orange">{annotation.score}</Tag>
                          </div>
                        </div>
                        
                        <Popconfirm
                          title="Delete annotation"
                          description="Are you sure you want to delete this annotation?"
                          icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                          onConfirm={() => handleRemoveAnnotation(annotation.photoId, annotation.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button 
                            danger 
                            icon={<DeleteOutlined />} 
                            type="text"
                            className="ml-2"
                          />
                        </Popconfirm>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Text className="text-gray-500 block mb-4">No annotations saved yet</Text>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleStartNewAnnotation}
                  >
                    Create Your First Annotation
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default VehicleDamageSelectionRedux; 