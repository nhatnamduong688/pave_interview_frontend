import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setActiveImage } from '../store/slices/clickIndicatorSlice';
import { useEffect } from 'react';
import { Tag as SessionTag } from '../components/molecules/SessionCard/SessionTag';

// Định nghĩa kiểu dữ liệu
interface VehicleImage {
  id: string;
  src: string;
  alt?: string;
}

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  trim?: string;
  bodyType?: string;
}

interface VehicleData {
  vehicleId: string;
  vehicleInfo: VehicleInfo;
  images: VehicleImage[];
}

// Mock vehicle data
const mockVehicleData: VehicleData = {
  vehicleId: 'TQA-8GR5MDUDF1',
  vehicleInfo: {
    year: '2020',
    make: 'FORD',
    model: 'TRANSIT',
    trim: 'ASÜNA',
    bodyType: 'CARGO VAN-EXTENDED CARGO VAN'
  },
  images: [
    {
      id: 'photo-1',
      src: '/images/vehicles/View=1.png',
      alt: 'Front view',
    },
    {
      id: 'photo-2',
      src: '/images/vehicles/View=2.png',
      alt: 'Driver side view',
    },
    {
      id: 'photo-3',
      src: '/images/vehicles/View=3.png',
      alt: 'Passenger side view',
    },
    {
      id: 'photo-4',
      src: '/images/vehicles/View=4.png',
      alt: 'Rear view',
    },
    {
      id: 'photo-5',
      src: '/images/vehicles/View=5.png',
      alt: 'Hood view',
    },
    {
      id: 'photo-6',
      src: '/images/vehicles/View=6.png',
      alt: 'Roof view',
    },
  ]
};

export default function useVehicleData(activeImageId: string | null) {
  const { id: vehicleIdFromUrl } = useParams<{ id?: string }>();
  const vehicleId = vehicleIdFromUrl || mockVehicleData.vehicleId;
  const dispatch = useAppDispatch();
  
  // Get current active image
  const activeImage = mockVehicleData.images.find(img => img.id === activeImageId) || mockVehicleData.images[0];

  // Set active image on component mount if not already set
  useEffect(() => {
    if (!activeImageId && mockVehicleData.images.length > 0) {
      dispatch(setActiveImage(mockVehicleData.images[0].id));
    }
  }, [dispatch, activeImageId]);

  // Handle thumbnail click to change active image
  const handleThumbnailClick = (id: string) => {
    dispatch(setActiveImage(id));
  };

  // Format session ID from vehicle info
  const sessionId = `${mockVehicleData.vehicleInfo.year}-${mockVehicleData.vehicleInfo.make}-${mockVehicleData.vehicleInfo.model}`;

  // Create tags based on vehicle info
  const tags: SessionTag[] = [];

  // Add trim tag if available
  if (mockVehicleData.vehicleInfo.trim) {
    tags.push({ text: mockVehicleData.vehicleInfo.trim, type: "yellow" });
  }

  // Add default P1 tag
  tags.push({ text: "P1", type: "blue" });

  // QC timestamp
  const timestamp = "2 days ago, 3:03:58 PM";

  // Define extra thumbnails for the footer
  const extraThumbnails = mockVehicleData.images.slice(0, 3).map(img => ({
    id: img.id,
    src: img.src,
    alt: img.alt
  }));
  
  // Caption text based on vehicle info
  const captionText = `${mockVehicleData.vehicleInfo.year} ${mockVehicleData.vehicleInfo.make}\n${mockVehicleData.vehicleInfo.model}`;
  
  // Rich view detail for sidebar
  const getActiveViewDetail = () => {
    switch (activeImage?.id) {
      case 'photo-1': return 'FRONT VIEW';
      case 'photo-2': return 'LEFT VIEW';
      case 'photo-3': return 'RIGHT VIEW';
      case 'photo-4': return 'REAR VIEW';
      case 'photo-5': return 'HOOD VIEW';
      case 'photo-6': return 'ROOF VIEW';
      default: return 'CURRENT VIEW';
    }
  };

  return {
    vehicleId,
    vehicleData: mockVehicleData,
    activeImage,
    sessionId,
    tags,
    timestamp,
    extraThumbnails,
    captionText,
    getActiveViewDetail,
    handleThumbnailClick
  };
} 