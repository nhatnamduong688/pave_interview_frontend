import React, { useEffect, useState, useRef } from 'react';
import { Layout, Typography, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../organisms/Header';
import ThumbnailList from '../molecules/ThumbnailList';
import CustomAnnotationFooter from '../molecules/CustomAnnotationFooter';
import InteractiveImageViewer from '../molecules/InteractiveImageViewer';
import AnnotationList from '../molecules/AnnotationList';
import SimplePopup from '../molecules/SimplePopup';
import { Tag } from '../molecules/SessionCard/SessionTag';
import usePositionedPopup from '../../hooks/usePositionedPopup';

// Redux actions và selectors
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

const { Content } = Layout;
const { Title } = Typography;

// Mock vehicle data (tương tự VehicleDetailsPage)
const mockVehicleData = {
  vehicleId: 'TQA-8GR5MDUDF1',
  vehicleInfo: {
    year: '2020',
    make: 'FORD',
    model: 'TRANSIT',
    trim: 'ASÜNA',
    bodyType: 'CARGO VAN-EXTENDED CARGO VAN'
  },
  images: [
    {
      id: 'photo-1',
      src: '/images/vehicles/View=1.png',
      alt: 'Front view',
    },
    {
      id: 'photo-2',
      src: '/images/vehicles/View=2.png',
      alt: 'Driver side view',
    },
    {
      id: 'photo-3',
      src: '/images/vehicles/View=3.png',
      alt: 'Passenger side view',
    },
    {
      id: 'photo-4',
      src: '/images/vehicles/View=4.png',
      alt: 'Rear view',
    },
    {
      id: 'photo-5',
      src: '/images/vehicles/View=5.png',
      alt: 'Hood view',
    },
    {
      id: 'photo-6',
      src: '/images/vehicles/View=6.png',
      alt: 'Roof view',
    },
  ]
};

const VehicleDamageAnnotation: React.FC = () => {
  const { id: vehicleIdFromUrl } = useParams<{ id?: string }>();
  const vehicleId = vehicleIdFromUrl || mockVehicleData.vehicleId;
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const activeImageId = useAppSelector(selectActiveImageId);
  const indicators = useAppSelector(selectActiveImageIndicators);
  const selectedIndicator = useAppSelector(selectSelectedIndicator);
  
  // Local state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  
  // Ref cho image container để lấy kích thước và vị trí
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Sử dụng hook usePositionedPopup để quản lý vị trí popup
  const { popupPosition, calculatePopupPosition, clearPopupPosition, popupRef } = usePositionedPopup();
  
  // Set active image on component mount if not already set
  useEffect(() => {
    if (!activeImageId && mockVehicleData.images.length > 0) {
      dispatch(setActiveImage(mockVehicleData.images[0].id));
    }
  }, [dispatch, activeImageId]);
  
  // Get current active image
  const activeImage = mockVehicleData.images.find(img => img.id === activeImageId) || mockVehicleData.images[0];
  
  // Event handlers
  const handleImageClick = (x: number, y: number) => {
    if (!isAnnotationMode || !activeImageId) return;
    
    // Đảm bảo tọa độ nằm trong phạm vi hợp lệ (0-100%)
    if (x < 0 || x > 100 || y < 0 || y > 100) {
      console.log('Tọa độ nằm ngoài phạm vi hợp lệ của hình ảnh:', x, y);
      return;
    }
    
    // Thêm indicator vào Redux store
    dispatch(addIndicator({ imageId: activeImageId, x, y }));
    
    // Hiển thị popup tại vị trí indicator
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const pixelX = rect.left + (rect.width * x / 100);
      const pixelY = rect.top + (rect.height * y / 100);
      
      // Tính toán vị trí cho popup
      calculatePopupPosition(pixelX, pixelY, window.innerWidth, window.innerHeight, {
        indicatorSize: 24, // Kích thước indicator dot
        gap: 20, // Giảm khoảng cách xuống còn 20px (trước đây là 36px)
        padding: 20 // Padding từ mép màn hình
      });
      
      // Hiển thị popup
      setShowPopup(true);
    }
  };
  
  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
      
      // Tìm indicator được chọn để hiển thị popup
      const indicator = indicators.find(i => i.id === id);
      if (indicator && imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const pixelX = rect.left + (rect.width * indicator.x / 100);
        const pixelY = rect.top + (rect.height * indicator.y / 100);
        
        // Tính toán vị trí cho popup
        calculatePopupPosition(pixelX, pixelY, window.innerWidth, window.innerHeight, {
          indicatorSize: 24,
          gap: 20, // Giảm khoảng cách xuống còn 20px
          padding: 20
        });
        
        // Hiển thị popup
        setShowPopup(true);
      }
    }
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
    clearPopupPosition();
  };
  
  const handleRemoveIndicator = (id: string) => {
    if (activeImageId) {
      dispatch(removeIndicator({ imageId: activeImageId, indicatorId: id }));
      notification.success({
        message: 'Annotation Removed',
        description: 'The annotation has been removed successfully.'
      });
    }
  };
  
  const handleClearSelection = () => {
    dispatch(clearSelection());
  };
  
  const handleResetCurrentImage = () => {
    if (activeImageId) {
      dispatch(resetImageIndicators(activeImageId));
      notification.info({
        message: 'Annotations Cleared',
        description: 'All annotations for this image have been cleared.'
      });
    }
  };
  
  const handleResetAllImages = () => {
    dispatch(resetAllIndicators());
    notification.warning({
      message: 'All Annotations Cleared',
      description: 'All annotations for all images have been cleared.'
    });
  };
  
  const handleThumbnailClick = (id: string) => {
    dispatch(setActiveImage(id));
  };
  
  const handleToggleAnnotationMode = () => {
    setIsAnnotationMode(!isAnnotationMode);
    // Clear selection when toggling mode
    dispatch(clearSelection());
  };
  
  const handleCollapseToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const handleBack = () => {
    console.log('Navigate back');
    // In a real app: navigate(-1) or similar
  };
  
  const handleReport = () => {
    console.log('Report issue');
    // In a real app: open modal or navigate to report page
  };
  
  const handleToolbarAction = (action: string) => {
    if (action === 'move') {
      setIsAnnotationMode(false);
    } else if (action === 'annotate') {
      setIsAnnotationMode(true);
    }
  };
  
  // Format session ID from vehicle info
  const sessionId = `${mockVehicleData.vehicleInfo.year}-${mockVehicleData.vehicleInfo.make}-${mockVehicleData.vehicleInfo.model}`;

  // Create tags based on vehicle info
  const tags: Tag[] = [];

  // Add trim tag if available
  if (mockVehicleData.vehicleInfo.trim) {
    tags.push({ text: mockVehicleData.vehicleInfo.trim, type: "yellow" });
  }

  // Add default P1 tag
  tags.push({ text: "P1", type: "blue" });

  // QC timestamp
  const timestamp = "2 days ago, 3:03:58 PM";

  // Define extra thumbnails for the footer
  const extraThumbnails = mockVehicleData.images.slice(0, 3).map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt
  }));
  
  // Caption text based on vehicle info
  const captionText = `${mockVehicleData.vehicleInfo.year} ${mockVehicleData.vehicleInfo.make}\n${mockVehicleData.vehicleInfo.model}`;
  
  // Custom toolbar items including Annotate
  const toolbarButtons = [
    { 
      id: 'move', 
      icon: '↕️', 
      label: 'Move',
      active: !isAnnotationMode
    },
    { 
      id: 'annotate', 
      icon: '📌', 
      label: 'Annotate',
      active: isAnnotationMode
    },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'rotate', icon: '🔄', label: 'Rotate' },
    { id: 'reset', icon: '↩️', label: 'Reset View' },
  ];
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Main content area (left part) */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'mr-0' : 'mr-[300px]'}`}>
        {/* Header */}
        <div className="flex-none h-16 px-4 border-b border-gray-200 bg-white z-10">
          <Header
            // Use empty title to trigger SessionCardSVG
            title=""
            sessionId={sessionId}
            tags={tags}
            timestamp={timestamp}
            onBack={handleBack}
            onReport={handleReport}
            onCollapseToggle={handleCollapseToggle}
          />
        </div>

        {/* Center content with left sidebar and main viewer */}
        <div className="flex flex-1 overflow-hidden pl-[12px] items-center">
          {/* Sidebar Left - Thumbnail List */}
          <div className="w-[84px] bg-white flex flex-col justify-center">
            <ThumbnailList
              thumbnails={mockVehicleData.images}
              activeId={activeImageId || ''}
              onSelect={handleThumbnailClick}
            />
          </div>

          {/* Main Image Viewer */}
          <div 
            ref={imageContainerRef}
            className="flex-1 flex justify-center items-center relative h-full px-4 py-2"
          >
            <InteractiveImageViewer
              src={activeImage?.src || ''}
              alt={activeImage?.alt || ''}
              indicators={indicators}
              isInteractionEnabled={isAnnotationMode}
              onImageClick={handleImageClick}
              onIndicatorClick={handleIndicatorClick}
            />
            
            {/* Popup được định vị bởi usePositionedPopup */}
            {showPopup && popupPosition && (
              <div 
                className="absolute animate-popup-appear" 
                style={{
                  left: `${popupPosition.popupLeft}px`,
                  top: `${popupPosition.popupTop}px`,
                  zIndex: 40,
                  margin: 0,
                  padding: 0,
                  border: 'none',
                  filter: 'none',
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transformOrigin: popupPosition.arrowPosition === 'left' ? 'left center' : 
                                  popupPosition.arrowPosition === 'right' ? 'right center' : 
                                  popupPosition.arrowPosition === 'top' ? 'center top' : 'center bottom'
                }}
              >
                <SimplePopup
                  ref={popupRef}
                  title="Thông tin hư hỏng"
                  message={`Đây là thông tin hư hỏng của xe ${sessionId} tại vị trí này. Bạn có thể thêm chi tiết.`}
                  arrowPosition={popupPosition.arrowPosition}
                  onClose={handleClosePopup}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer with annotation controls - using CustomAnnotationFooter */}
        <div className="flex-none border-t border-gray-200">
          <CustomAnnotationFooter
            captionText={captionText}
            extraThumbnails={extraThumbnails}
            onThumbnailClick={handleThumbnailClick}
            onToolbarAction={handleToolbarAction}
            toolbarButtons={toolbarButtons}
            isAnnotationMode={isAnnotationMode}
          />
        </div>
      </div>

      {/* Sidebar Right - Annotation List */}
      <div className={`absolute top-0 right-0 w-[300px] h-full flex flex-col border-l border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'}`}>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <Title level={4} className="!mb-0">Annotations</Title>
            <Button 
              type="text" 
              size="small" 
              onClick={handleCollapseToggle}
            >
              →
            </Button>
          </div>
          
          {/* Annotation Mode Toggle */}
          <div className="mb-4">
            <Button
              type={isAnnotationMode ? "primary" : "default"}
              onClick={handleToggleAnnotationMode}
              className="mr-2"
            >
              📌 Annotate
            </Button>
            <Button
              type={!isAnnotationMode ? "primary" : "default"}
              onClick={handleToggleAnnotationMode}
            >
              ↕️ Move
            </Button>
          </div>
          
          {/* Annotation List */}
          <AnnotationList
            indicators={indicators}
            onIndicatorClick={handleIndicatorClick}
            onRemoveIndicator={handleRemoveIndicator}
            onResetAllIndicators={handleResetCurrentImage}
          />
        </div>
        
        {/* Clear buttons at the bottom */}
        <div className="flex-none p-4 border-t border-gray-200">
          <Button 
            danger 
            onClick={handleResetCurrentImage}
            className="w-full mb-2"
          >
            Clear Current Image
          </Button>
          <Button 
            danger 
            onClick={handleResetAllImages}
            className="w-full"
          >
            Clear All Images
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDamageAnnotation; 