import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import optionsReducer from './slices/optionsSlice';
import jobReducer from './slices/jobSlice';
import uiReducer from './slices/uiSlice';
import rootSaga from './sagas';

// Cấu hình Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['job'], // Chỉ lưu job state, không lưu UI state
};

// Tạo root reducer
const rootReducer = combineReducers({
  options: optionsReducer,
  job: jobReducer,
  ui: uiReducer,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo saga middleware
const sagaMiddleware = createSagaMiddleware();

// Tạo Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action của redux-persist để tránh lỗi serialization
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
});

// Chạy root saga
sagaMiddleware.run(rootSaga);

// Tạo persistor
export const persistor = persistStore(store);

// Exports cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks được định kiểu
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 