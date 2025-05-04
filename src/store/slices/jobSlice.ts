import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Annotation, JobState, Photo, initialData } from '../../data/initialData';
import { v4 as uuidv4 } from 'uuid';

const jobSlice = createSlice({
  name: 'job',
  initialState: initialData.job as JobState,
  reducers: {
    // Thêm mới photo
    addPhoto: (state, action: PayloadAction<Omit<Photo, 'id' | 'annotations'>>) => {
      const newPhoto: Photo = {
        id: `photo-${uuidv4()}`,
        annotations: [],
        ...action.payload,
      };
      state.photos.push(newPhoto);
    },

    // Xóa photo
    removePhoto: (state, action: PayloadAction<string>) => {
      state.photos = state.photos.filter(photo => photo.id !== action.payload);
    },

    // Thêm annotation mới
    addAnnotation: (state, action: PayloadAction<{ 
      photoId: string; 
      annotation: Omit<Annotation, 'id' | 'photoId' | 'createdAt'>;
    }>) => {
      const photo = state.photos.find(p => p.id === action.payload.photoId);
      if (photo) {
        const newAnnotation: Annotation = {
          id: `ann-${uuidv4()}`,
          photoId: action.payload.photoId,
          createdAt: new Date().toISOString(),
          ...action.payload.annotation,
        };
        photo.annotations.push(newAnnotation);
      }
    },

    // Cập nhật annotation
    updateAnnotation: (state, action: PayloadAction<{ 
      photoId: string;
      annotationId: string;
      changes: Partial<Annotation>;
    }>) => {
      const photo = state.photos.find(p => p.id === action.payload.photoId);
      if (photo) {
        const annotationIndex = photo.annotations.findIndex(
          a => a.id === action.payload.annotationId
        );

        if (annotationIndex >= 0) {
          photo.annotations[annotationIndex] = {
            ...photo.annotations[annotationIndex],
            ...action.payload.changes,
          };
        }
      }
    },

    // Xóa annotation
    removeAnnotation: (state, action: PayloadAction<{ 
      photoId: string;
      annotationId: string;
    }>) => {
      const photo = state.photos.find(p => p.id === action.payload.photoId);
      if (photo) {
        photo.annotations = photo.annotations.filter(
          a => a.id !== action.payload.annotationId
        );
      }
    },

    // Cập nhật thông tin job
    updateJobInfo: (state, action: PayloadAction<Partial<Omit<JobState, 'photos'>>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { 
  addPhoto, 
  removePhoto, 
  addAnnotation, 
  updateAnnotation, 
  removeAnnotation,
  updateJobInfo
} = jobSlice.actions;

export default jobSlice.reducer; 