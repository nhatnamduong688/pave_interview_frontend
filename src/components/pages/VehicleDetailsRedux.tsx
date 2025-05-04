import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchVehicleDetailsStart, setActiveImage, toggleSidebar } from '../../store/slices/vehicleDetailsSlice';
import { 
  selectVehicleId, 
  selectVehicleInfo, 
  selectVehicleImages, 
  selectActiveImage, 
  selectIsSidebarCollapsed, 
  selectIsLoading,
  selectError
} from '../../store/selectors/vehicleDetailsSelectors';
import VehicleDetailsTemplate from '../templates/VehicleDetailsTemplate';
import { Spin, Alert } from 'antd';

const VehicleDetailsRedux: React.FC = () => {
  // Lấy ID từ URL params
  const { id: vehicleIdFromUrl } = useParams<{ id?: string }>();
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const vehicleId = useAppSelector(selectVehicleId);
  const vehicleInfo = useAppSelector(selectVehicleInfo);
  const images = useAppSelector(selectVehicleImages);
  const activeImage = useAppSelector(selectActiveImage);
  const isSidebarCollapsed = useAppSelector(selectIsSidebarCollapsed);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  
  // Fetch vehicle data khi component mount hoặc vehicleId thay đổi
  useEffect(() => {
    const idToFetch = vehicleIdFromUrl || 'TQA-8GR5MDUDF1'; // Default ID nếu không có trong URL
    if (!vehicleId || vehicleId !== idToFetch) {
      dispatch(fetchVehicleDetailsStart(idToFetch));
    }
  }, [dispatch, vehicleId, vehicleIdFromUrl]);
  
  // Các handlers
  const handleSetActiveImage = (imageId: string) => {
    dispatch(setActiveImage(imageId));
  };
  
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  
  const handleBack = () => {
    console.log('Navigate back');
    // In a real app: navigate(-1) or similar
  };
  
  const handleReport = () => {
    console.log('Report issue');
    // In a real app: open modal or navigate to report page
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" tip="Loading vehicle details..." />
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert
          message="Error loading vehicle details"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }
  
  // Render khi không có data
  if (!vehicleInfo || !images.length) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert
          message="No vehicle data available"
          description="Could not load vehicle information."
          type="warning"
          showIcon
        />
      </div>
    );
  }
  
  // Render main template with data
  return (
    <div className="vehicle-details-page">
      <VehicleDetailsTemplate
        vehicleId={vehicleId || ''}
        vehicleInfo={vehicleInfo}
        images={images}
        onBack={handleBack}
        onReport={handleReport}
        // Truyền thêm các props cho template
        activeImageId={activeImage?.id}
        isSidebarCollapsed={isSidebarCollapsed}
        onImageSelect={handleSetActiveImage}
        onToggleSidebar={handleToggleSidebar}
      />
    </div>
  );
};

export default VehicleDetailsRedux; 