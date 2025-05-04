import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { notification } from 'antd';
import {
  setActiveImage,
  addIndicator,
  selectIndicator,
  clearSelection,
  removeIndicator,
  resetImageIndicators,
  resetAllIndicators,
  updateIndicator,
} from '../store/slices/clickIndicatorSlice';

import {
  selectActiveImageId,
  selectActiveImageIndicators,
  selectSelectedIndicator,
} from '../store/selectors/clickIndicatorSelectors';

interface UseVehicleAnnotationProps {
  initialImages: {
    id: string;
    src: string;
    alt?: string;
  }[];
}

export interface TempIndicator {
  x: number;
  y: number;
  damageType?: string;
  component?: string;
  color?: string;
}

export const useVehicleAnnotation = ({ initialImages }: UseVehicleAnnotationProps) => {
  const dispatch = useAppDispatch();
  const activeImageId = useAppSelector(selectActiveImageId);
  const indicators = useAppSelector(selectActiveImageIndicators);
  const selectedIndicator = useAppSelector(selectSelectedIndicator);
  
  // Local state
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(false);
  const [tempIndicator, setTempIndicator] = useState<TempIndicator | null>(null);

  // Set active image on component mount if not already set
  useEffect(() => {
    if (!activeImageId && initialImages.length > 0) {
      dispatch(setActiveImage(initialImages[0].id));
    }
  }, [dispatch, activeImageId, initialImages]);
  
  // Get current active image
  const activeImage = initialImages.find(img => img.id === activeImageId) || initialImages[0];
  
  // Event handlers
  const handleImageClick = (x: number, y: number, damageTypeInfo: { id: string, color: string }) => {
    if (!isAnnotationMode || !activeImageId) return null;
    
    // Hủy bất kỳ indicator tạm thời nào đang tồn tại
    if (tempIndicator) {
      setTempIndicator(null);
    }
    
    // Tạo indicator tạm thời
    const newTempIndicator = {
      x,
      y,
      damageType: damageTypeInfo.id,
      color: damageTypeInfo.color
    };
    
    setTempIndicator(newTempIndicator);
    
    // Trả về vị trí để sử dụng cho popup
    return { x, y };
  };
  
  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
      
      // Find the indicator
      const indicator = indicators.find(ind => ind.id === id);
      return indicator;
    }
    return null;
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
  
  const handleToolbarAction = (action: string) => {
    if (action === 'move') {
      setIsAnnotationMode(false);
    } else if (action === 'annotate') {
      setIsAnnotationMode(true);
    }
  };

  const saveAnnotation = (annotationData: {
    imageId: string;
    x: number;
    y: number;
    damageType: string;
    component: string;
    material?: string;
    color: string;
    severity: string;
    throughPaint: boolean;
    indicatorId?: string;
    damageTypeLabel?: string;
    componentLabel?: string;
  }) => {
    const { 
      imageId, x, y, damageType, component, material, color, 
      severity, throughPaint, indicatorId,
      damageTypeLabel, componentLabel
    } = annotationData;

    if (indicatorId) {
      // Update existing annotation
      dispatch(updateIndicator({
        imageId,
        indicatorId,
        updates: {
          damageType,
          component,
          material,
          color,
          confirmed: true,
          severity,
          throughPaint
        }
      }));
      
      notification.success({
        message: 'Annotation Updated',
        description: `Updated to ${damageTypeLabel} on ${componentLabel}`
      });
    } else {
      // Create new annotation
      const newIndicator = { 
        imageId, 
        x, 
        y, 
        damageType,
        component,
        material,
        color,
        confirmed: true,
        severity,
        throughPaint
      };
      
      dispatch(addIndicator(newIndicator));
      
      notification.success({
        message: 'Annotation Added',
        description: `Added ${damageTypeLabel} on ${componentLabel}`
      });
    }

    // Reset temp indicator
    setTempIndicator(null);
  };

  return {
    // State
    activeImageId,
    activeImage,
    indicators,
    selectedIndicator,
    isAnnotationMode,
    tempIndicator,
    
    // Actions
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
  };
}; 