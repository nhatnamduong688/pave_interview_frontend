import { RootState } from '../index';

// Selectors cho clickIndicator state
export const selectActiveImageId = (state: RootState) => state.clickIndicator.activeImageId;
export const selectSelectedIndicatorId = (state: RootState) => state.clickIndicator.selectedIndicatorId;
export const selectIndicatorsByImage = (state: RootState) => state.clickIndicator.indicatorsByImage;

// Lấy tất cả indicators của ảnh đang active
export const selectActiveImageIndicators = (state: RootState) => {
  const activeImageId = selectActiveImageId(state);
  const indicatorsByImage = selectIndicatorsByImage(state);
  
  console.log('Active Image ID:', activeImageId);
  console.log('Indicators By Image:', indicatorsByImage);
  
  const indicators = activeImageId && indicatorsByImage[activeImageId] 
    ? indicatorsByImage[activeImageId] 
    : [];
  
  console.log('Selected Indicators:', indicators);
  return indicators;
};

// Selector để lấy indicators cho một ảnh cụ thể
export const selectIndicatorsForImage = (state: RootState, imageId: string) => {
  const indicatorsByImage = selectIndicatorsByImage(state);
  return indicatorsByImage[imageId] || [];
};

// Selector để lấy indicator được chọn
export const selectSelectedIndicator = (state: RootState) => {
  const activeImageId = selectActiveImageId(state);
  const selectedId = selectSelectedIndicatorId(state);
  
  if (!activeImageId || !selectedId) return null;
  
  const indicators = selectIndicatorsForImage(state, activeImageId);
  return indicators.find(indicator => indicator.id === selectedId) || null;
};

// Selector để lấy indicators được highlight của ảnh đang active
export const selectHighlightedIndicators = (state: RootState) => {
  const indicators = selectActiveImageIndicators(state);
  return indicators.filter(indicator => indicator.isHighlighted);
}; 