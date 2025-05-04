import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all } from 'redux-saga/effects';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Reducers
import optionsReducer from './slices/optionsSlice';
import jobReducer from './slices/jobSlice';
import uiReducer from './slices/uiSlice';
import vehicleDetailsReducer from './slices/vehicleDetailsSlice';
import clickIndicatorReducer from './slices/clickIndicatorSlice';

// Sagas
import { optionsSaga } from './sagas/optionsSaga';
import { jobSaga } from './sagas/jobSaga';
import { vehicleDetailsSaga } from './sagas/vehicleDetailsSaga';

// Root reducer
const rootReducer = combineReducers({
  options: optionsReducer,
  job: jobReducer,
  ui: uiReducer,
  vehicleDetails: vehicleDetailsReducer,
  clickIndicator: clickIndicatorReducer
});

// Root saga
function* rootSaga() {
  yield all([
    optionsSaga(),
    jobSaga(),
    vehicleDetailsSaga()
  ]);
}

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['options', 'job', 'clickIndicator'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Log initial state after store creation
console.log('Initial Redux Store State:', store.getState());

// Run saga
sagaMiddleware.run(rootSaga);

// Create persistor
export const persistor = persistStore(store, null, () => {
  console.log('Redux store rehydrated:', store.getState());
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 