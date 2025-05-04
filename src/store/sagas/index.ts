import { all, fork } from 'redux-saga/effects';
import { uiSaga } from './uiSaga';
import { jobSaga } from './jobSaga';

// Root saga kết hợp tất cả các saga con
export default function* rootSaga() {
  yield all([
    fork(uiSaga),
    fork(jobSaga),
  ]);
} 