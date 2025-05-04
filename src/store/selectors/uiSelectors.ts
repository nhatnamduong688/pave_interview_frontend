import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

// Selectors cơ bản
export const selectUI = (state: RootState) => state.ui;
export const selectSelectedPhotoId = (state: RootState) => state.ui.selectedPhotoId;
export const selectSelectedAnnotationId = (state: RootState) => state.ui.selectedAnnotationId;
export const selectAnnotationInProgress = (state: RootState) => state.ui.annotationInProgress;
export const selectIsFinished = (state: RootState) => state.ui.finished;

// Kiểm tra xem có đang tạo annotation không
export const selectIsCreatingAnnotation = createSelector(
  [selectAnnotationInProgress],
  (annotationInProgress) => !!annotationInProgress?.photoId
);

// Kiểm tra xem annotation có đủ thông tin để hoàn thành không
export const selectIsAnnotationValid = createSelector(
  [selectAnnotationInProgress],
  (annotationInProgress) => {
    if (!annotationInProgress) return false;
    
    return (
      !!annotationInProgress.photoId &&
      !!annotationInProgress.shape &&
      annotationInProgress.components.length > 0 &&
      !!annotationInProgress.material &&
      annotationInProgress.damageType.length > 0
    );
  }
);

// Kiểm tra xem một component cụ thể có được chọn trong annotation đang tạo không
export const selectIsComponentSelected = createSelector(
  [selectAnnotationInProgress, (_: RootState, componentCode: string) => componentCode],
  (annotationInProgress, componentCode) => {
    if (!annotationInProgress) return false;
    return annotationInProgress.components.includes(componentCode);
  }
);

// Kiểm tra xem một damage type cụ thể có được chọn trong annotation đang tạo không
export const selectIsDamageTypeSelected = createSelector(
  [selectAnnotationInProgress, (_: RootState, damageType: string) => damageType],
  (annotationInProgress, damageType) => {
    if (!annotationInProgress) return false;
    return annotationInProgress.damageType.includes(damageType);
  }
); 