import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Interface for indicator
export interface Indicator {
  id: string;
  x: number;
  y: number;
  color: string;
  isHighlighted?: boolean;
  damageType?: string;
  component?: string;
  material?: string;
  confirmed?: boolean;
  severity?: string;
  throughPaint?: boolean;
}

// Interface for state with indicators stored by imageId
interface ClickIndicatorState {
  // Map imageId to array of indicators
  indicatorsByImage: Record<string, Indicator[]>;
  // Current selected indicator
  selectedIndicatorId: string | null;
  // Current active image ID
  activeImageId: string | null;
}

// Color palette for indicators
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

// Helper to get a random color from palette
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

// Create slice
const clickIndicatorSlice = createSlice({
  name: 'clickIndicator',
  initialState,
  reducers: {
    // Set active image
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
    
    // Add new indicator from click on image
    addIndicator: (state, action: PayloadAction<{
      imageId: string;
      x: number;
      y: number;
      damageType?: string;
      component?: string;
      material?: string;
      color?: string;
      confirmed?: boolean;
      severity?: string;
      throughPaint?: boolean;
    }>) => {
      const { imageId, x, y, damageType, component, material, color, confirmed, severity, throughPaint } = action.payload;
      
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
        material,
        confirmed,
        severity,
        throughPaint
      };
      
      state.indicatorsByImage[imageId].push(newIndicator);
    },
    
    // Select an indicator
    selectIndicator: (state, action: PayloadAction<{ imageId: string; indicatorId: string }>) => {
      const { imageId, indicatorId } = action.payload;
      
      if (!state.indicatorsByImage[imageId]) return;
      
      // Reset all indicators for that image
      state.indicatorsByImage[imageId].forEach(indicator => {
        indicator.isHighlighted = false;
      });
      
      // Highlight selected indicator
      const indicator = state.indicatorsByImage[imageId].find(ind => ind.id === indicatorId);
      if (indicator) {
        indicator.isHighlighted = true;
        state.selectedIndicatorId = indicatorId;
      }
    },
    
    // Deselect indicator
    clearSelection: (state) => {
      const activeImageId = state.activeImageId;
      if (!activeImageId || !state.indicatorsByImage[activeImageId]) return;
      
      state.indicatorsByImage[activeImageId].forEach(indicator => {
        indicator.isHighlighted = false;
      });
      state.selectedIndicatorId = null;
    },
    
    // Remove indicator
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
    
    // Reset indicators for current image
    resetImageIndicators: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      state.indicatorsByImage[imageId] = [];
      if (state.activeImageId === imageId) {
        state.selectedIndicatorId = null;
      }
    },
    
    // Reset all indicators
    resetAllIndicators: (state) => {
      state.indicatorsByImage = {};
      state.selectedIndicatorId = null;
    },
    
    // Update existing indicator
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

// Export actions and reducer
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