import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../organisms/Header';
import ThumbnailList from '../molecules/ThumbnailList';
import CustomAnnotationFooter from '../molecules/CustomAnnotationFooter';
import InteractiveImageViewer from '../molecules/InteractiveImageViewer';
import AnnotationList from '../molecules/AnnotationList';
import { Tag } from '../molecules/SessionCard/SessionTag';

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
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(false);
  
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
    
    dispatch(addIndicator({ imageId: activeImageId, x, y }));
    // Optionally deactivate annotation mode after adding
    // setIsAnnotationMode(false);
  };
  
  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
    }
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

          {/* Main Viewer with annotation capability */}
          <div className="flex-1 overflow-auto flex flex-col items-center justify-center py-2">
            {/* Tiêu đề view */}
            <h2 className="text-2xl font-normal tracking-wide uppercase mb-4">{activeImage?.alt?.toUpperCase() || 'CURRENT VIEW'}</h2>
            
            <InteractiveImageViewer
              src={activeImage?.src || ''}
              alt={activeImage?.alt}
              indicators={indicators}
              isInteractionEnabled={isAnnotationMode}
              onImageClick={handleImageClick}
              onIndicatorClick={handleIndicatorClick}
            />
          </div>
        </div>

        {/* Footer with annotation controls - using new CustomAnnotationFooter */}
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

      {/* Sidebar Right - Full height with fixed footer - Position absolute to allow main content to expand */}
      <div className={`absolute top-0 right-0 w-[300px] h-full flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'}`}>
        {/* Annotation list */}
        <AnnotationList
          indicators={indicators}
          onIndicatorClick={handleIndicatorClick}
          onRemoveIndicator={handleRemoveIndicator}
          onResetAllIndicators={handleResetCurrentImage}
        />
      </div>
    </div>
  );
};

export default VehicleDamageAnnotation; 