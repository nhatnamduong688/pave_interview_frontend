import React from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import Header from '../organisms/Header';
import ThumbnailList from '../molecules/ThumbnailList';
import CustomAnnotationFooter from '../molecules/CustomAnnotationFooter';
import InteractiveImageViewer from '../molecules/InteractiveImageViewer';

// Custom hooks
import { useVehicleAnnotation } from '../../hooks/useVehicleAnnotation';
import { useAnnotationPopup } from '../../hooks/useAnnotationPopup';
import { useUIState } from '../../hooks/useUIState';
import { useVehicleData } from '../../hooks/useVehicleData';
import { useOptionsData } from '../../hooks/useOptionsData';

// Custom UI components
import EnhancedSelectorPopup from '../annotations/EnhancedSelectorPopup';
import EnhancedSelectorPopupRedux from '../annotations/EnhancedSelectorPopupRedux';
import AnnotationPanel from '../annotations/AnnotationPanel';

// Import thêm MaterialOptions từ useOptionsData
import { DamageTypeOption, ComponentType, MaterialType } from '../../hooks/useOptionsData';

const { Content } = Layout;

// Mock vehicle data
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

const VehicleDamageAnnotationV2: React.FC = () => {
  const { id: vehicleIdFromUrl } = useParams<{ id?: string }>();
  const vehicleId = vehicleIdFromUrl || mockVehicleData.vehicleId;
  
  // Vehicle data hook
  const {
    sessionId,
    tags,
    timestamp,
    extraThumbnails,
    captionText,
    images
  } = useVehicleData({ vehicleData: mockVehicleData });
  
  // Vehicle annotation hook
  const {
    activeImageId,
    activeImage,
    indicators,
    selectedIndicator,
    isAnnotationMode,
    tempIndicator,
    handleImageClick,
    handleIndicatorClick,
    handleRemoveIndicator,
    handleClearSelection,
    handleResetCurrentImage,
    handleResetAllImages,
    handleThumbnailClick,
    handleToggleAnnotationMode,
    handleToolbarAction,
    saveAnnotation,
    setTempIndicator
  } = useVehicleAnnotation({ initialImages: images });
  
  // Options data hook
  const {
    damageTypeOptions,
    componentTypes,
    materialTypes,
    toolbarButtons
  } = useOptionsData(isAnnotationMode);
  
  // Annotation popup hook
  const {
    activePopup,
    tempDamageType,
    tempComponent,
    tempMaterial,
    severity,
    throughPaint,
    pendingAnnotation,
    selectedDamageTypes,
    activeDamageType,
    activeComponent,
    activeMaterial,
    handleSelectDamageType,
    handleSelectComponent,
    handleSelectMaterial,
    handlePopupDamageTypeSelect,
    handlePopupComponentSelect,
    handlePopupMaterialSelect,
    handlePopupCancel,
    handlePopupDamageTypeConfirm,
    handleSeverityChange,
    handleThroughPaintToggle,
    startNewAnnotation,
    startEditingAnnotation,
    prepareAnnotationData,
    resetPopupState
  } = useAnnotationPopup({ damageTypeOptions, componentTypes });
  
  // UI state hook
  const {
    isSidebarCollapsed,
    handleCollapseToggle,
    handleBack,
    handleReport,
    getActiveViewDetail
  } = useUIState();
  
  // Hàm xử lý click hình ảnh đã được re-implement
  const onImageClick = (x: number, y: number) => {
    if (!isAnnotationMode) return;
    
    // Sử dụng handleImageClick từ hook useVehicleAnnotation
    const position = handleImageClick(x, y, damageTypeOptions[0]);
    if (position) {
      startNewAnnotation(position, damageTypeOptions[0]);
    }
  };
  
  // Hàm xử lý click indicator đã được re-implement
  const onIndicatorClick = (id: string) => {
    // Gọi handleIndicatorClick để highlight indicator
    handleIndicatorClick(id);
    // Không mở popup chỉnh sửa nữa
  };

  // Hàm xử lý cancel popup
  const onPopupCancel = () => {
    handlePopupCancel(() => setTempIndicator(null));
  };
  
  // Hàm xử lý confirm popup component
  const onPopupComponentConfirm = () => {
    const annotationData = prepareAnnotationData(tempIndicator);
    if (annotationData && activeImageId) {
      saveAnnotation({
        ...annotationData,
        imageId: activeImageId
      });
    }
    
    // Đóng tất cả popup và reset trạng thái
    resetPopupState();
    setTempIndicator(null);
  };
  
  // Lấy chi tiết view active
  const activeViewDetail = getActiveViewDetail(activeImage?.id);
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Main content area (left part) */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'mr-0' : 'mr-[350px]'}`}>
        {/* Header */}
        <div className="flex-none h-16 bg-white z-10">
          <Header
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
        <div className="flex flex-1 overflow-hidden pl-[12px] items-center relative">
          {/* Sidebar Left - Thumbnail List */}
          <div className="w-[84px] bg-white flex flex-col justify-center">
            <ThumbnailList
              thumbnails={images}
              activeId={activeImageId || ''}
              onSelect={handleThumbnailClick}
            />
          </div>

          {/* Main Viewer with annotation capability */}
          <div className="flex-1 overflow-auto flex items-center justify-center py-2 relative">
            <InteractiveImageViewer
              src={activeImage?.src || ''}
              alt={activeImage?.alt}
              indicators={indicators}
              isInteractionEnabled={isAnnotationMode}
              onImageClick={onImageClick}
              onIndicatorClick={onIndicatorClick}
            />
            
            {/* Hiển thị indicator tạm thời */}
            {tempIndicator && (
              <div 
                className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
                style={{
                  left: `${tempIndicator.x}%`,
                  top: `${tempIndicator.y}%`,
                  backgroundColor: tempIndicator.color || '#ef4444',
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.2)'
                }}
              />
            )}
            
            {/* Annotation Popup - Phiên bản mới với cả 3 loại lựa chọn */}
            {pendingAnnotation && (
              <EnhancedSelectorPopupRedux
                onCancel={onPopupCancel}
                onConfirm={onPopupComponentConfirm}
                tempIndicator={{
                  ...(tempIndicator ? tempIndicator : {}),
                  x: pendingAnnotation.x,
                  y: pendingAnnotation.y,
                  color: tempIndicator?.color || '#ef4444',
                  damageType: tempDamageType || undefined,
                  component: tempComponent || undefined,
                  material: tempMaterial || undefined,
                  severity: severity,
                  throughPaint: throughPaint
                }}
                position={pendingAnnotation}
              />
            )}
          </div>
        </div>

        <div className="flex-none">
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

      {/* Enhanced Sidebar Right with tabs - Full height with fixed footer */}
      <div className={`absolute top-0 right-0 w-[350px] h-full flex flex-col border-l border-gray-200 bg-white transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'translate-x-full' : 'translate-x-0'}`}>
        <div className="flex-1 overflow-y-auto space-y-4 relative">
          {/* Title with view state */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">{activeViewDetail}</h2>
          </div>

          <div className="px-4">
            {/* Annotation Panel Component */}
            <AnnotationPanel
              indicators={indicators}
              onIndicatorClick={onIndicatorClick}
              onRemoveIndicator={handleRemoveIndicator}
              onResetCurrentImage={handleResetCurrentImage}
              damageTypeOptions={damageTypeOptions}
              componentTypes={componentTypes}
            />
          </div>
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex-none p-3.5 border-t border-gray-200">
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition mb-2"
            onClick={indicators.length > 0 ? handleResetCurrentImage : undefined}
            disabled={indicators.length === 0}
          >
            Finish [F]
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDamageAnnotationV2; 