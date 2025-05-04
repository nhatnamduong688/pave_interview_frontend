import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
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
import { notification } from 'antd';
import usePositionedPopup from './usePositionedPopup';

// Indicator tạm thời (không lưu vào Redux)
export interface TempIndicator {
  x: number;
  y: number;
  damageType?: string;
  component?: string;
  color?: string;
}

export interface PopupValues {
  damageTypes?: string[];
  components?: string[];
  materials?: string[];
  severity?: 'min' | 'med' | 'maj';
  throughPaint?: boolean;
}

export default function useIndicatorState(
  damageTypeOptions: { id: string; label: string; value: string; color: string }[],
  componentTypes: { id: string; label: string; value: string }[]
) {
  const dispatch = useAppDispatch();
  const activeImageId = useAppSelector(selectActiveImageId);
  const indicators = useAppSelector(selectActiveImageIndicators);
  const selectedIndicator = useAppSelector(selectSelectedIndicator);

  // Local state
  const [isAnnotationMode, setIsAnnotationMode] = useState<boolean>(true);
  const [activeDamageType, setActiveDamageType] = useState(damageTypeOptions[0]);
  const [activeComponent, setActiveComponent] = useState(componentTypes[0]);
  
  // Popup state
  const [showDamageSelectionPopup, setShowDamageSelectionPopup] = useState<boolean>(false);
  const [pendingAnnotation, setPendingAnnotation] = useState<{x: number, y: number} | null>(null);
  const [editingIndicatorId, setEditingIndicatorId] = useState<string | null>(null);
  const [popupInitialValues, setPopupInitialValues] = useState<PopupValues>({});
  
  // Thêm state để theo dõi indicator tạm thời
  const [tempIndicator, setTempIndicator] = useState<TempIndicator | null>(null);

  // Sử dụng hook thông minh để định vị popup
  const { popupPosition, calculatePopupPosition, clearPopupPosition, popupRef } = usePositionedPopup();

  // Handle image click - add new indicator
  const handleImageClick = (x: number, y: number, event: React.MouseEvent) => {
    if (!isAnnotationMode || !activeImageId) return;
    
    console.log('Image clicked at position:', x, y, 'in annotation mode');
    
    // Nếu đã có indicator tạm thời, chỉ cần di chuyển nó đến vị trí mới
    // thay vì xóa và tạo lại từ đầu
    
    // Tạo indicator tạm thời
    const defaultDamageType = damageTypeOptions[0];
    const newTempIndicator = {
      x,
      y,
      damageType: defaultDamageType.id,
      color: defaultDamageType.color
    };
    
    // Lưu vị trí annotation để xử lý trong popup
    setPendingAnnotation({x, y});
    
    // Set initial values for popup
    setPopupInitialValues({
      damageTypes: [defaultDamageType.id],
      components: [],
      materials: [],
      severity: 'maj',
      throughPaint: false
    });
    
    // Tính toán vị trí popup dựa trên vị trí của indicator
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Tìm vị trí thực của indicator
    const imageElement = document.querySelector('.interactive-image-container img');
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      const pixelX = rect.left + (rect.width * x / 100);
      const pixelY = rect.top + (rect.height * y / 100);
      
      // Sử dụng smart positioning với nhiều tùy chọn hơn
      calculatePopupPosition(pixelX, pixelY, viewportWidth, viewportHeight, {
        indicatorSize: 24,
        gap: 0, // Không có khoảng cách giữa indicator và popup
        viewportThreshold: 0.55, // Ngưỡng để xác định khi nào popup nên chuyển sang bên trái
        preferredPlacement: 'left' // Mặc định ưu tiên hiển thị bên trái của indicator
      });
      
      // Hiển thị popup ngay lập tức
      setShowDamageSelectionPopup(true);
    }
    
    // Đặt indicator tạm thời 
    console.log('Setting tempIndicator:', newTempIndicator);
    setTempIndicator(newTempIndicator);
  };
  
  // Handle click on existing indicator
  const handleIndicatorClick = (id: string) => {
    if (activeImageId) {
      // Highlight indicator khi được click
      dispatch(selectIndicator({ imageId: activeImageId, indicatorId: id }));
      
      // Tìm vị trí của indicator để scroll view nếu cần
      const indicator = indicators.find(ind => ind.id === id);
      if (indicator) {
        // Đóng popup hiện tại nếu có
        if (showDamageSelectionPopup) {
          setShowDamageSelectionPopup(false);
          clearPopupPosition();
          setEditingIndicatorId(null);
          setPendingAnnotation(null);
        }
      }
    }
  };
  
  // Handle double-click on indicator
  const handleIndicatorDoubleClick = (id: string) => {
    if (activeImageId) {
      // Find the indicator
      const indicator = indicators.find(ind => ind.id === id);
      if (indicator) {
        // Set up for editing
        setEditingIndicatorId(id);
        
        // Set initial values for popup
        setPopupInitialValues({
          damageTypes: indicator.damageType ? [indicator.damageType] : [],
          components: indicator.component ? [indicator.component] : [],
          materials: [],
          severity: (indicator.severity as 'min' | 'med' | 'maj') || 'maj',
          throughPaint: indicator.throughPaint || false
        });
        
        // Tính toán vị trí popup
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Tính toán vị trí thực tế của indicator (pixel) từ phần trăm
        const imageElement = document.querySelector('.interactive-image-container img');
        if (imageElement) {
          const rect = imageElement.getBoundingClientRect();
          const pixelX = rect.left + (rect.width * indicator.x / 100);
          const pixelY = rect.top + (rect.height * indicator.y / 100);
          
          // Sử dụng smart positioning với nhiều tùy chọn hơn
          calculatePopupPosition(pixelX, pixelY, viewportWidth, viewportHeight, {
            indicatorSize: 24,
            gap: 0,
            viewportThreshold: 0.55, // Ngưỡng để xác định khi nào popup nên chuyển sang bên trái
            preferredPlacement: 'left' // Mặc định ưu tiên hiển thị bên trái của indicator
          });
        } else {
          // Fallback nếu không tìm thấy image element
          calculatePopupPosition(window.innerWidth / 2, window.innerHeight / 2, viewportWidth, viewportHeight);
        }
        
        // Show popup
        setShowDamageSelectionPopup(true);
      }
    }
  };
  
  // Remove indicator
  const handleRemoveIndicator = (id: string) => {
    if (activeImageId) {
      dispatch(removeIndicator({ imageId: activeImageId, indicatorId: id }));
      notification.success({
        message: 'Annotation Removed',
        description: 'The annotation has been removed successfully.'
      });
    }
  };
  
  // Clear selection
  const handleClearSelection = () => {
    dispatch(clearSelection());
  };
  
  // Reset all indicators for current image
  const handleResetCurrentImage = () => {
    if (activeImageId) {
      dispatch(resetImageIndicators(activeImageId));
      notification.info({
        message: 'Annotations Cleared',
        description: 'All annotations for this image have been cleared.'
      });
    }
  };
  
  // Reset all indicators for all images
  const handleResetAllImages = () => {
    dispatch(resetAllIndicators());
    notification.warning({
      message: 'All Annotations Cleared',
      description: 'All annotations for all images have been cleared.'
    });
  };
  
  // Toggle annotation mode
  const handleToggleAnnotationMode = () => {
    setIsAnnotationMode(!isAnnotationMode);
    // Clear selection when toggling mode
    dispatch(clearSelection());
  };
  
  // Select damage type
  const handleSelectDamageType = (damageTypeId: string) => {
    const damageType = damageTypeOptions.find(dt => dt.id === damageTypeId);
    if (damageType) {
      setActiveDamageType(damageType);
    }
  };
  
  // Select component
  const handleSelectComponent = (componentId: string) => {
    const component = componentTypes.find(c => c.id === componentId);
    if (component) {
      setActiveComponent(component);
    }
  };
  
  // Handle toolbar action (move/annotate)
  const handleToolbarAction = (action: string) => {
    if (action === 'move') {
      setIsAnnotationMode(false);
    } else if (action === 'annotate') {
      setIsAnnotationMode(true);
    }
  };
  
  // Cancel popup
  const handleDamageSelectionCancel = () => {
    // Xóa indicator tạm thời khi hủy popup
    setTempIndicator(null);
    
    // Reset temp values and close popup
    setShowDamageSelectionPopup(false);
    setEditingIndicatorId(null);
    setPendingAnnotation(null);
    clearPopupPosition();
  };
  
  // Confirm popup selections
  const handleDamageSelectionConfirm = (values: {
    damageTypes: string[];
    components: string[];
    materials: string[];
    severity: 'min' | 'med' | 'maj';
    throughPaint: boolean;
  }) => {
    if (editingIndicatorId) {
      // Đang chỉnh sửa một indicator đã tồn tại
      if (values.damageTypes[0] && values.components[0] && activeImageId) {
        // Find the damage type object
        const damageType = damageTypeOptions.find(dt => dt.id === values.damageTypes[0]);
        const componentId = values.components[0];
        
        if (damageType && componentId) {
          // Update the indicator
          dispatch(updateIndicator({
            imageId: activeImageId,
            indicatorId: editingIndicatorId,
            updates: {
              damageType: values.damageTypes[0],
              component: componentId,
              color: damageType.color,
              confirmed: true,
              severity: values.severity,
              throughPaint: values.throughPaint
            }
          }));
          
          const componentLabel = componentTypes.find(c => c.id === componentId)?.label || 'Unknown Component';
          
          notification.success({
            message: 'Annotation Updated',
            description: `Updated to ${damageType.label} on ${componentLabel}`
          });
        }
      }
    } else if (pendingAnnotation && tempIndicator) {
      // Đang tạo một indicator mới
      if (values.damageTypes[0] && values.components[0] && activeImageId) {
        const damageType = damageTypeOptions.find(dt => dt.id === values.damageTypes[0]);
        const componentId = values.components[0];
        
        if (damageType && componentId) {
          // Tạo mới indicator chính thức trong Redux
          const newIndicator = { 
            imageId: activeImageId, 
            x: tempIndicator.x, 
            y: tempIndicator.y, 
            damageType: values.damageTypes[0],
            component: componentId,
            color: damageType.color,
            confirmed: true,
            severity: values.severity,
            throughPaint: values.throughPaint
          };
          
          dispatch(addIndicator(newIndicator));
          
          const componentLabel = componentTypes.find(c => c.id === componentId)?.label || 'Unknown Component';
          
          notification.success({
            message: 'Annotation Added',
            description: `Added ${damageType.label} on ${componentLabel}`
          });
        }
      }
    }
    
    // Xóa indicator tạm thời
    setTempIndicator(null);
    
    // Reset and close popup
    setShowDamageSelectionPopup(false);
    setEditingIndicatorId(null);
    setPendingAnnotation(null);
    clearPopupPosition();
  };

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      clearPopupPosition();
    };
  }, [clearPopupPosition]);

  return {
    activeImageId,
    indicators,
    selectedIndicator,
    isAnnotationMode,
    activeDamageType,
    activeComponent,
    showDamageSelectionPopup,
    pendingAnnotation,
    editingIndicatorId,
    popupInitialValues,
    tempIndicator,
    popupPosition, // Export vị trí popup
    popupRef, // Export popup ref
    setActiveComponent,
    setActiveDamageType,
    setIsAnnotationMode,
    handleImageClick,
    handleIndicatorClick,
    handleIndicatorDoubleClick,
    handleRemoveIndicator,
    handleClearSelection,
    handleResetCurrentImage,
    handleResetAllImages,
    handleToggleAnnotationMode,
    handleSelectDamageType,
    handleSelectComponent,
    handleToolbarAction,
    handleDamageSelectionCancel,
    handleDamageSelectionConfirm
  };
} 