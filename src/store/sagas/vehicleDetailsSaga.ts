import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchVehicleDetailsStart,
  fetchVehicleDetailsSuccess,
  fetchVehicleDetailsFailure
} from '../slices/vehicleDetailsSlice';

// Giả lập API call - có thể thay thế bằng actual API service
const fetchVehicleFromAPI = async (vehicleId: string) => {
  // Đây là nơi bạn sẽ gọi API thực tế
  // Trong ví dụ này, chúng ta dùng mock data giống component gốc
  
  // Define the vehicle images
  const vehicleImagePaths = [
    '/images/vehicles/View=1.png',  // Image 1
    '/images/vehicles/View=2.png',  // Image 2
    '/images/vehicles/View=3.png',  // Image 3
    '/images/vehicles/View=4.png',  // Image 4
    '/images/vehicles/View=5.png',  // Image 5
    '/images/vehicles/View=6.png',  // Image 6
    '/images/vehicles/View=7.png',  // Image 7
    '/images/vehicles/View=8.png',  // Image 8
    '/images/vehicles/View=9.png',  // Image 9
    '/images/vehicles/View=10.png', // Image 10
    '/images/vehicles/View=11.png', // Image 11
    '/images/vehicles/View=12.png', // Image 12
    '/images/vehicles/View=13.png', // Image 13
  ];

  // Mẫu dữ liệu xe
  const mockVehicleData = {
    vehicleId: vehicleId || 'TQA-8GR5MDUDF1',
    vehicleInfo: {
      year: '2020',
      make: 'FORD',
      model: 'TRANSIT',
      trim: 'ASÜNA',
      bodyType: 'CARGO VAN-EXTENDED CARGO VAN'
    },
    images: [
      {
        id: '1',
        src: vehicleImagePaths[0],
        alt: 'Front view',
        indicators: []
      },
      {
        id: '2',
        src: vehicleImagePaths[1],
        alt: 'Driver side view',
        indicators: [
          { x: 43, y: 50, color: '#ef4444' }
        ]
      },
      {
        id: '3',
        src: vehicleImagePaths[2],
        alt: 'Passenger side view',
        indicators: []
      },
      {
        id: '4',
        src: vehicleImagePaths[3],
        alt: 'Rear view',
        indicators: []
      },
      {
        id: '5',
        src: vehicleImagePaths[4],
        alt: 'Hood view',
        indicators: []
      },
      {
        id: '6',
        src: vehicleImagePaths[5],
        alt: 'Roof view',
        indicators: []
      },
      {
        id: '7',
        src: vehicleImagePaths[6],
        alt: 'Interior front',
        indicators: []
      },
      {
        id: '8',
        src: vehicleImagePaths[7],
        alt: 'Interior rear',
        indicators: []
      },
      {
        id: '9',
        src: vehicleImagePaths[8],
        alt: 'Trunk/cargo area',
        indicators: []
      },
      {
        id: '10',
        src: vehicleImagePaths[9],
        alt: 'Undercarriage',
        indicators: []
      },
      {
        id: '11',
        src: vehicleImagePaths[10],
        alt: 'Close-up damage 1',
        indicators: [
          { x: 50, y: 50, color: '#ef4444' }
        ]
      },
      {
        id: '12',
        src: vehicleImagePaths[11],
        alt: 'Close-up damage 2',
        indicators: [
          { x: 30, y: 40, color: '#ef4444' }
        ]
      },
      {
        id: '13',
        src: vehicleImagePaths[12],
        alt: 'Close-up damage 3',
        indicators: [
          { x: 70, y: 60, color: '#3b82f6' }
        ]
      }
    ]
  };

  // Giả lập độ trễ của API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockVehicleData;
};

// Saga worker for fetching vehicle details
function* fetchVehicleDetailsSaga(action: PayloadAction<string>) {
  try {
    const vehicleId = action.payload;
    const response = yield call(fetchVehicleFromAPI, vehicleId);
    yield put(fetchVehicleDetailsSuccess(response));
  } catch (error) {
    yield put(fetchVehicleDetailsFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

// Saga watcher
export function* vehicleDetailsSaga() {
  yield takeLatest(fetchVehicleDetailsStart.type, fetchVehicleDetailsSaga);
} 