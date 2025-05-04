import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

// Selectors cơ bản
export const selectJob = (state: RootState) => state.job;
export const selectPhotos = (state: RootState) => state.job.photos;
export const selectJobCode = (state: RootState) => state.job.code;
export const selectJobStatus = (state: RootState) => state.job.qcStatus;

// Selectors cho một photo cụ thể
export const selectPhotoById = (state: RootState, photoId: string) => 
  state.job.photos.find(photo => photo.id === photoId);

// Lấy photo hiện tại (dựa vào selectedPhotoId trong UI state)
export const selectCurrentPhoto = createSelector(
  [selectPhotos, (state: RootState) => state.ui.selectedPhotoId],
  (photos, selectedPhotoId) => photos.find(photo => photo.id === selectedPhotoId)
);

// Lấy toàn bộ annotations của photo hiện tại
export const selectCurrentPhotoAnnotations = createSelector(
  [selectCurrentPhoto],
  (currentPhoto) => currentPhoto?.annotations || []
);

// Lấy annotation được chọn hiện tại
export const selectCurrentAnnotation = createSelector(
  [selectCurrentPhotoAnnotations, (state: RootState) => state.ui.selectedAnnotationId],
  (annotations, selectedAnnotationId) => 
    annotations.find(annotation => annotation.id === selectedAnnotationId)
);

// Lấy tất cả annotations từ mọi photo
export const selectAllAnnotations = createSelector(
  [selectPhotos],
  (photos) => photos.flatMap(photo => photo.annotations)
);

// Đếm số lượng annotations theo từng loại
export const selectAnnotationCountByDamageType = createSelector(
  [selectAllAnnotations],
  (annotations) => {
    const countMap: Record<string, number> = {};
    annotations.forEach(annotation => {
      annotation.damageType.forEach(type => {
        countMap[type] = (countMap[type] || 0) + 1;
      });
    });
    return countMap;
  }
);

// Đếm số lượng annotations theo component
export const selectAnnotationCountByComponent = createSelector(
  [selectAllAnnotations],
  (annotations) => {
    const countMap: Record<string, number> = {};
    annotations.forEach(annotation => {
      annotation.components.forEach(component => {
        countMap[component] = (countMap[component] || 0) + 1;
      });
    });
    return countMap;
  }
); 