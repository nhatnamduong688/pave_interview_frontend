import React, { useEffect } from 'react';
import { Layout, Typography, Card, Button, Space, Divider, List } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setActiveImage,
  addIndicator,
  selectIndicator,
  clearSelection,
  removeIndicator,
  resetImageIndicators,
  resetAllIndicators,
} from '../../store/slices/clickIndicatorSlice';
import {
  selectActiveImageId,
  selectActiveImageIndicators,
  selectSelectedIndicator,
} from '../../store/selectors/clickIndicatorSelectors';
import ClickableImage from '../molecules/ClickableImage';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const ClickableImageDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeImageId = useAppSelector(selectActiveImageId);
  const indicators = useAppSelector(selectActiveImageIndicators);
  const selectedIndicator = useAppSelector(selectSelectedIndicator);

  // Sample images for testing
  const sampleImages = [
    {
      id: 'image-1',
      src: '/images/vehicles/View=1.png',
      title: 'Front View'
    },
    {
      id: 'image-2',
      src: '/images/vehicles/View=2.png',
      title: 'Side View'
    },
    {
      id: 'image-3',
      src: '/images/vehicles/View=3.png',
      title: 'Rear View'
    },
  ];

  // Set active image on component mount if not already set
  useEffect(() => {
    if (!activeImageId) {
      dispatch(setActiveImage(sampleImages[0].id));
    }
  }, [dispatch, activeImageId]);

  // Get current active image
  const activeImage = sampleImages.find(img => img.id === activeImageId) || sampleImages[0];

  // Handlers
  const handleImageClick = (x: number, y: number) => {
    if (activeImageId) {
      dispatch(addIndicator({ imageId: activeImageId, x, y }));
    }
  };

  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
    }
  };

  const handleRemoveSelected = () => {
    if (activeImageId && selectedIndicator) {
      dispatch(removeIndicator({ 
        imageId: activeImageId, 
        indicatorId: selectedIndicator.id 
      }));
    }
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  const handleResetCurrentImage = () => {
    if (activeImageId) {
      dispatch(resetImageIndicators(activeImageId));
    }
  };

  const handleResetAll = () => {
    dispatch(resetAllIndicators());
  };

  const handleImageChange = (imageId: string) => {
    dispatch(setActiveImage(imageId));
  };

  // Format coordinates for display
  const formatCoordinate = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8">
        <Title level={2} className="mb-4">
          Clickable Image Demo
        </Title>
        <Paragraph className="mb-6">
          Click on the image to add indicators. Each image has its own set of indicators.
        </Paragraph>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Image and controls */}
          <div className="md:w-2/3">
            <Card className="mb-4">
              <Space direction="horizontal" className="mb-4 w-full justify-center">
                {sampleImages.map((img) => (
                  <Button
                    key={img.id}
                    type={activeImageId === img.id ? 'primary' : 'default'}
                    onClick={() => handleImageChange(img.id)}
                  >
                    {img.title}
                  </Button>
                ))}
              </Space>

              <div className="border border-gray-200 rounded-lg p-2 mb-4 bg-white">
                <ClickableImage
                  src={activeImage.src}
                  alt={activeImage.title}
                  width="100%"
                  height={400}
                  indicators={indicators}
                  onImageClick={handleImageClick}
                  onIndicatorClick={handleIndicatorClick}
                />
              </div>

              <Space className="w-full justify-center">
                <Button onClick={handleClearSelection}>Clear Selection</Button>
                <Button danger onClick={handleRemoveSelected} disabled={!selectedIndicator}>
                  Remove Selected
                </Button>
                <Button danger onClick={handleResetCurrentImage}>
                  Reset Current Image
                </Button>
                <Button danger onClick={handleResetAll}>
                  Reset All Images
                </Button>
              </Space>
            </Card>

            <Card>
              <Title level={4}>Instructions</Title>
              <Paragraph>
                <ul className="list-disc pl-5">
                  <li>Click anywhere on the image to add an indicator dot</li>
                  <li>Each indicator gets a random color from a predefined palette</li>
                  <li>Click on any indicator to select it (adds a white ring)</li>
                  <li>Use the buttons to manage indicators</li>
                  <li>Switch between images - each image has its own set of indicators</li>
                </ul>
              </Paragraph>
            </Card>
          </div>

          {/* Right side - Indicators info */}
          <div className="md:w-1/3">
            <Card className="mb-4">
              <Title level={4}>Selected Indicator</Title>
              {selectedIndicator ? (
                <div>
                  <Text>ID: {selectedIndicator.id.substring(0, 8)}...</Text>
                  <br />
                  <Text>
                    Position: ({formatCoordinate(selectedIndicator.x)}%, {formatCoordinate(selectedIndicator.y)}%)
                  </Text>
                  <br />
                  <div className="flex items-center">
                    <Text>Color: </Text>
                    <div
                      className="ml-2 w-5 h-5 rounded-full"
                      style={{ backgroundColor: selectedIndicator.color }}
                    />
                  </div>
                </div>
              ) : (
                <Text className="text-gray-500">No indicator selected</Text>
              )}
            </Card>

            <Card>
              <Title level={4}>Current Image Indicators ({indicators.length})</Title>
              <Divider className="my-2" />
              {indicators.length > 0 ? (
                <List
                  dataSource={indicators}
                  renderItem={(indicator) => (
                    <List.Item
                      className={`cursor-pointer hover:bg-gray-50 ${
                        indicator.isHighlighted ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleIndicatorClick(indicator.id)}
                    >
                      <List.Item.Meta
                        avatar={
                          <div
                            className="w-5 h-5 rounded-full"
                            style={{ backgroundColor: indicator.color }}
                          />
                        }
                        title={`ID: ${indicator.id.substring(0, 8)}...`}
                        description={`(${formatCoordinate(indicator.x)}%, ${formatCoordinate(
                          indicator.y
                        )}%)`}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Text className="text-gray-500">No indicators added to this image yet</Text>
              )}
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ClickableImageDemo; 