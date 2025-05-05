import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnnotationInProgress, UIState, initialData } from '../../data/initialData';

// Mở rộng UIState để thêm theme
interface ExtendedUIState extends UIState {
  theme: string;
}

// Khởi tạo state với theme mặc định là 'light'
const initialState: ExtendedUIState = {
  ...initialData.ui as UIState,
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Chọn photo
    selectPhoto: (state, action: PayloadAction<string>) => {
      state.selectedPhotoId = action.payload;
      state.selectedAnnotationId = null;
    },

    // Chọn annotation
    selectAnnotation: (state, action: PayloadAction<string | null>) => {
      state.selectedAnnotationId = action.payload;
    },

    // Bắt đầu tạo annotation mới
    startAnnotation: (state, action: PayloadAction<{ photoId: string }>) => {
      state.annotationInProgress = {
        photoId: action.payload.photoId,
        shape: null,
        components: [],
        material: null,
        damageType: [],
        severity: null,
        throughPaint: false
      };
    },

    // Cập nhật annotation đang tạo
    updateAnnotationInProgress: (state, action: PayloadAction<Partial<AnnotationInProgress>>) => {
      if (state.annotationInProgress) {
        state.annotationInProgress = {
          ...state.annotationInProgress,
          ...action.payload
        };
      }
    },

    // Thêm hoặc xóa component cho annotation đang tạo
    toggleComponentForAnnotation: (state, action: PayloadAction<string>) => {
      if (state.annotationInProgress) {
        const componentCode = action.payload;
        const components = [...state.annotationInProgress.components];
        
        const index = components.indexOf(componentCode);
        if (index >= 0) {
          components.splice(index, 1);
        } else {
          components.push(componentCode);
        }
        
        state.annotationInProgress.components = components;
      }
    },

    // Thêm hoặc xóa damage type cho annotation đang tạo
    toggleDamageTypeForAnnotation: (state, action: PayloadAction<string>) => {
      if (state.annotationInProgress) {
        const damageTypeCode = action.payload;
        const damageTypes = [...state.annotationInProgress.damageType];
        
        const index = damageTypes.indexOf(damageTypeCode);
        if (index >= 0) {
          damageTypes.splice(index, 1);
        } else {
          damageTypes.push(damageTypeCode);
        }
        
        state.annotationInProgress.damageType = damageTypes;
      }
    },

    // Hoàn thành quá trình tạo annotation
    completeAnnotation: (state) => {
      state.annotationInProgress = {
        photoId: null,
        shape: null,
        components: [],
        material: null,
        damageType: [],
        severity: null,
        throughPaint: false
      };
    },

    // Hủy quá trình tạo annotation
    cancelAnnotation: (state) => {
      state.annotationInProgress = {
        photoId: null,
        shape: null,
        components: [],
        material: null,
        damageType: [],
        severity: null,
        throughPaint: false
      };
    },

    // Đánh dấu hoàn thành
    setFinished: (state, action: PayloadAction<boolean>) => {
      state.finished = action.payload;
    },

    // Thêm action mới để set theme
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    }
  },
});

export const {
  selectPhoto,
  selectAnnotation,
  startAnnotation,
  updateAnnotationInProgress,
  toggleComponentForAnnotation,
  toggleDamageTypeForAnnotation,
  completeAnnotation,
  cancelAnnotation,
  setFinished,
  setTheme
} = uiSlice.actions;

export default uiSlice.reducer; 