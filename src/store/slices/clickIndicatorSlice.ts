import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Interface cho indicator
export interface Indicator {
  id: string;
  x: number;
  y: number;
  color: string;
  isHighlighted?: boolean;
  damageType?: string;
  component?: string;
  confirmed?: boolean;
  severity?: string;
  throughPaint?: boolean;
}

// Interface cho state với indicators được lưu theo imageId
interface ClickIndicatorState {
  // Map imageId to array of indicators
  indicatorsByImage: Record<string, Indicator[]>;
  // Current selected indicator
  selectedIndicatorId: string | null;
  // Current active image ID
  activeImageId: string | null;
}

// Color palette cho indicators
const colorPalette = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#84cc16', // lime
  '#10b981', // emerald
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#d946ef', // fuchsia
  '#ec4899', // pink
];

// Helper để lấy một màu ngẫu nhiên từ palette
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
};

// Initial state
const initialState: ClickIndicatorState = {
  indicatorsByImage: {},
  selectedIndicatorId: null,
  activeImageId: null,
};

// Tạo slice
const clickIndicatorSlice = createSlice({
  name: 'clickIndicator',
  initialState,
  reducers: {
    // Thiết lập ảnh đang active
    setActiveImage: (state, action: PayloadAction<string>) => {
      state.activeImageId = action.payload;
      // Ensure that the image has an entry in the indicators map
      if (!state.indicatorsByImage[action.payload]) {
        state.indicatorsByImage[action.payload] = [];
      }
      // Clear selection when changing images
      state.selectedIndicatorId = null;
      // Clear highlights
      Object.values(state.indicatorsByImage).forEach(indicators => {
        indicators.forEach(indicator => {
          indicator.isHighlighted = false;
        });
      });
    },
    
    // Thêm indicator mới từ click vào ảnh
    addIndicator: (state, action: PayloadAction<{
      imageId: string;
      x: number;
      y: number;
      damageType?: string;
      component?: string;
      color?: string;
      confirmed?: boolean;
      severity?: string;
      throughPaint?: boolean;
    }>) => {
      const { imageId, x, y, damageType, component, color, confirmed, severity, throughPaint } = action.payload;
      
      // Ensure the image has an entry
      if (!state.indicatorsByImage[imageId]) {
        state.indicatorsByImage[imageId] = [];
      }
      
      const newIndicator: Indicator = {
        id: uuidv4(),
        x,
        y,
        color: color || getRandomColor(),
        isHighlighted: false,
        damageType,
        component,
        confirmed,
        severity,
        throughPaint
      };
      
      state.indicatorsByImage[imageId].push(newIndicator);
    },
    
    // Chọn một indicator
    selectIndicator: (state, action: PayloadAction<{ imageId: string; indicatorId: string }>) => {
      const { imageId, indicatorId } = action.payload;
      
      if (!state.indicatorsByImage[imageId]) return;
      
      // Reset tất cả indicators của ảnh đó
      state.indicatorsByImage[imageId].forEach(indicator => {
        indicator.isHighlighted = false;
      });
      
      // Highlight indicator được chọn
      const indicator = state.indicatorsByImage[imageId].find(ind => ind.id === indicatorId);
      if (indicator) {
        indicator.isHighlighted = true;
        state.selectedIndicatorId = indicatorId;
      }
    },
    
    // Bỏ chọn indicator
    clearSelection: (state) => {
      const activeImageId = state.activeImageId;
      if (!activeImageId || !state.indicatorsByImage[activeImageId]) return;
      
      state.indicatorsByImage[activeImageId].forEach(indicator => {
        indicator.isHighlighted = false;
      });
      state.selectedIndicatorId = null;
    },
    
    // Xóa indicator
    removeIndicator: (state, action: PayloadAction<{ imageId: string; indicatorId: string }>) => {
      const { imageId, indicatorId } = action.payload;
      
      if (!state.indicatorsByImage[imageId]) return;
      
      state.indicatorsByImage[imageId] = state.indicatorsByImage[imageId].filter(
        ind => ind.id !== indicatorId
      );
      
      if (state.selectedIndicatorId === indicatorId) {
        state.selectedIndicatorId = null;
      }
    },
    
    // Reset indicators cho ảnh hiện tại
    resetImageIndicators: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      state.indicatorsByImage[imageId] = [];
      if (state.activeImageId === imageId) {
        state.selectedIndicatorId = null;
      }
    },
    
    // Reset tất cả indicators
    resetAllIndicators: (state) => {
      state.indicatorsByImage = {};
      state.selectedIndicatorId = null;
    },
    
    // Cập nhật indicator đã tồn tại
    updateIndicator: (state, action: PayloadAction<{ 
      imageId: string; 
      indicatorId: string; 
      updates: Partial<Indicator> 
    }>) => {
      const { imageId, indicatorId, updates } = action.payload;
      
      if (!state.indicatorsByImage[imageId]) return;
      
      const indicator = state.indicatorsByImage[imageId].find(ind => ind.id === indicatorId);
      
      if (indicator) {
        Object.assign(indicator, updates);
      }
    },
  },
});

// Export actions và reducer
export const {
  setActiveImage,
  addIndicator,
  selectIndicator,
  clearSelection,
  removeIndicator,
  resetImageIndicators,
  resetAllIndicators,
  updateIndicator,
} = clickIndicatorSlice.actions;

export default clickIndicatorSlice.reducer; 