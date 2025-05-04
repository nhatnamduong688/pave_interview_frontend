import { takeLatest, select, put, delay, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  addAnnotation, updateAnnotation, removeAnnotation, 
  updateJobInfo, addPhoto, removePhoto 
} from '../slices/jobSlice';
import { selectJob } from '../selectors/jobSelectors';

// Mock API - thay vì gọi API thực, chúng ta giả lập lưu dữ liệu local
const mockSaveJobToLocalStorage = (job: any) => {
  localStorage.setItem('savedJob', JSON.stringify(job));
  return Promise.resolve({ success: true });
};

const mockLoadJobFromLocalStorage = () => {
  const savedJob = localStorage.getItem('savedJob');
  return Promise.resolve(savedJob ? JSON.parse(savedJob) : null);
};

// Saga tự động lưu job vào localStorage sau mỗi thay đổi
function* autoSaveJob() {
  try {
    // Đợi 500ms để tránh lưu quá nhiều lần liên tiếp
    yield delay(500);
    
    // Lấy trạng thái job hiện tại
    const job = yield select(selectJob);
    
    // Lưu job vào localStorage
    yield call(mockSaveJobToLocalStorage, job);
    
    console.log('Job được tự động lưu:', new Date().toISOString());
  } catch (error) {
    console.error('Lỗi khi tự động lưu job:', error);
  }
}

// Saga load job từ localStorage khi khởi động
function* loadSavedJob() {
  try {
    // Lấy job từ localStorage
    const savedJob = yield call(mockLoadJobFromLocalStorage);
    
    if (savedJob) {
      // Cập nhật redux store với dữ liệu đã lưu
      yield put(updateJobInfo(savedJob));
      console.log('Đã tải job từ localStorage');
    }
  } catch (error) {
    console.error('Lỗi khi tải job từ localStorage:', error);
  }
}

// Root saga cho job
export function* jobSaga() {
  // Chạy loadSavedJob khi khởi động
  yield call(loadSavedJob);
  
  // Đăng ký các action lắng nghe để tự động lưu
  yield takeLatest(
    [
      addAnnotation.type, 
      updateAnnotation.type, 
      removeAnnotation.type,
      addPhoto.type,
      removePhoto.type,
      updateJobInfo.type
    ], 
    autoSaveJob
  );
} 