import { takeLatest, select, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  selectPhoto, completeAnnotation, cancelAnnotation, 
  startAnnotation, updateAnnotationInProgress, selectAnnotation
} from '../slices/uiSlice';
import { selectAnnotationInProgress, selectIsAnnotationValid } from '../selectors/uiSelectors';
import { addAnnotation } from '../slices/jobSlice';
import { Annotation } from '../../data/initialData';

// Saga xử lý khi hoàn thành tạo annotation
function* handleCompleteAnnotation() {
  // Lấy thông tin annotation đang tạo từ state
  const annotationInProgress = yield select(selectAnnotationInProgress);
  const isValid = yield select(selectIsAnnotationValid);
  
  // Nếu annotation hợp lệ, thêm vào job
  if (isValid) {
    const { photoId, ...annotationData } = annotationInProgress;
    
    // Tạo annotation mới từ dữ liệu đang tạo
    yield put(addAnnotation({
      photoId,
      annotation: {
        components: annotationData.components,
        material: annotationData.material,
        damageType: annotationData.damageType,
        score: annotationData.severity || 3,
        throughPaint: annotationData.throughPaint,
        color: '#FF6384', // Màu mặc định
        shape: annotationData.shape,
        status: 'included',
        createdBy: 'current-user'
      } as Omit<Annotation, 'id' | 'photoId' | 'createdAt'>
    }));
  }
}

// Saga xử lý khi chọn photo
function* handleSelectPhoto(action: PayloadAction<string>) {
  // Khi chọn photo mới, hủy quá trình tạo annotation nếu có
  yield put(cancelAnnotation());
}

// Saga xử lý khi bắt đầu tạo annotation
function* handleStartAnnotation(action: PayloadAction<{ photoId: string }>) {
  // Khi bắt đầu tạo annotation mới, bỏ chọn annotation hiện tại nếu có
  yield put(selectAnnotation(null));
  
  // Log hoạt động (có thể mở rộng thêm)
  console.log('Bắt đầu tạo annotation mới', action.payload);
}

// Saga xử lý khi chọn một annotation
function* handleSelectAnnotation(action: PayloadAction<string | null>) {
  // Khi chọn annotation, hủy quá trình tạo annotation mới nếu có
  if (action.payload !== null) {
    yield put(cancelAnnotation());
  }
}

// Root saga cho UI
export function* uiSaga() {
  // Lắng nghe các action
  yield takeLatest(completeAnnotation.type, handleCompleteAnnotation);
  yield takeLatest(selectPhoto.type, handleSelectPhoto);
  yield takeLatest(startAnnotation.type, handleStartAnnotation);
  yield takeLatest(selectAnnotation.type, handleSelectAnnotation);
} 