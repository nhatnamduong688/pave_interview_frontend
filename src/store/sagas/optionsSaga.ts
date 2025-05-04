import { all } from 'redux-saga/effects';

// Options saga - hiện không có effect nào vì options là dữ liệu tĩnh
export function* optionsSaga() {
  yield all([]);
} 