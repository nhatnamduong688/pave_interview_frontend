import { RootState } from '../index';

// Base selector
export const selectVehicleDetailsState = (state: RootState) => state.vehicleDetails;

// Selectors for individual values
export const selectVehicleInfo = (state: RootState) => selectVehicleDetailsState(state).vehicleInfo;
export const selectVehicleId = (state: RootState) => selectVehicleDetailsState(state).vehicleId;
export const selectVehicleImages = (state: RootState) => selectVehicleDetailsState(state).images;
export const selectActiveImageId = (state: RootState) => selectVehicleDetailsState(state).activeImageId;
export const selectIsSidebarCollapsed = (state: RootState) => selectVehicleDetailsState(state).isSidebarCollapsed;
export const selectIsLoading = (state: RootState) => selectVehicleDetailsState(state).loading;
export const selectError = (state: RootState) => selectVehicleDetailsState(state).error;

// Memoized selector to get the active image
export const selectActiveImage = (state: RootState) => {
  const images = selectVehicleImages(state);
  const activeImageId = selectActiveImageId(state);
  return images.find(img => img.id === activeImageId) || images[0];
};

// Get current image indicators
export const selectActiveImageIndicators = (state: RootState) => {
  const activeImage = selectActiveImage(state);
  return activeImage?.indicators || [];
}; 