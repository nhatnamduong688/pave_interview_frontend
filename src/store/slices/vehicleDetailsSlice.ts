import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces
interface VehicleImage {
  id: string;
  src: string;
  alt?: string;
  indicators?: {
    x: number;
    y: number;
    color?: string;
  }[];
}

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  trim?: string;
  bodyType?: string;
}

interface VehicleDetailsState {
  vehicleId: string | null;
  vehicleInfo: VehicleInfo | null;
  images: VehicleImage[];
  loading: boolean;
  error: string | null;
  activeImageId: string | null;
  isSidebarCollapsed: boolean;
}

// Define initial state
const initialState: VehicleDetailsState = {
  vehicleId: null,
  vehicleInfo: null,
  images: [],
  loading: false,
  error: null,
  activeImageId: null,
  isSidebarCollapsed: false,
};

// Create the slice
const vehicleDetailsSlice = createSlice({
  name: 'vehicleDetails',
  initialState,
  reducers: {
    fetchVehicleDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVehicleDetailsSuccess(
      state,
      action: PayloadAction<{
        vehicleId: string;
        vehicleInfo: VehicleInfo;
        images: VehicleImage[];
      }>
    ) {
      state.loading = false;
      state.vehicleId = action.payload.vehicleId;
      state.vehicleInfo = action.payload.vehicleInfo;
      state.images = action.payload.images;
      state.activeImageId = action.payload.images[0]?.id || null;
    },
    fetchVehicleDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setActiveImage(state, action: PayloadAction<string>) {
      state.activeImageId = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    // Thêm reducers để thêm/xóa/cập nhật indicators nếu cần
    addIndicator(
      state,
      action: PayloadAction<{
        imageId: string;
        indicator: { x: number; y: number; color?: string };
      }>
    ) {
      const image = state.images.find(img => img.id === action.payload.imageId);
      if (image) {
        if (!image.indicators) {
          image.indicators = [];
        }
        image.indicators.push(action.payload.indicator);
      }
    }
  },
});

// Export actions and reducer
export const {
  fetchVehicleDetailsStart,
  fetchVehicleDetailsSuccess,
  fetchVehicleDetailsFailure,
  setActiveImage,
  toggleSidebar,
  addIndicator
} = vehicleDetailsSlice.actions;

export default vehicleDetailsSlice.reducer; 