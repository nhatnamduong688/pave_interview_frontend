import React from 'react';
import VehicleDetailsTemplate from '../templates/VehicleDetailsTemplate';

// Placeholder image URLs
const placeholderImages = {
  side: 'https://via.placeholder.com/800x600/f0f0f0/888888?text=Side+View',
  front: 'https://via.placeholder.com/800x600/f0f0f0/888888?text=Front+View',
  rear: 'https://via.placeholder.com/800x600/f0f0f0/888888?text=Rear+View',
  interior: 'https://via.placeholder.com/800x600/f0f0f0/888888?text=Interior+View',
  topDown: 'https://via.placeholder.com/800x600/f0f0f0/888888?text=Top-Down+View',
  damage: 'https://via.placeholder.com/800x600/f0f0f0/888888?text=Damage+Detail',
};

// This would typically come from an API or context
const mockVehicleData = {
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
      id: '1',
      src: placeholderImages.side,
      alt: 'Side view of vehicle',
      indicators: [
        { x: 43, y: 50, color: '#ef4444' }
      ]
    },
    {
      id: '2',
      src: placeholderImages.front,
      alt: 'Front view of vehicle'
    },
    {
      id: '3',
      src: placeholderImages.rear,
      alt: 'Rear view of vehicle'
    },
    {
      id: '4',
      src: placeholderImages.interior,
      alt: 'Interior view of vehicle'
    },
    {
      id: '5',
      src: placeholderImages.topDown,
      alt: 'Top-down view of vehicle',
      indicators: [
        { x: 30, y: 40, color: '#ef4444' },
        { x: 70, y: 60, color: '#3b82f6' }
      ]
    },
    {
      id: '6',
      src: placeholderImages.damage,
      alt: 'Damage detail',
      indicators: [
        { x: 50, y: 50, color: '#ef4444' }
      ]
    }
  ]
};

interface VehicleDetailsPageProps {
  vehicleId?: string;
}

const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = ({ vehicleId }) => {
  // In a real app, you would fetch data based on vehicleId
  // const { data, loading, error } = useFetchVehicleDetails(vehicleId);
  
  const handleBack = () => {
    console.log('Navigate back');
    // In a real app: navigate(-1) or similar
  };
  
  const handleReport = () => {
    console.log('Report issue');
    // In a real app: open modal or navigate to report page
  };

  return (
    <div className="vehicle-details-page">
      <VehicleDetailsTemplate
        vehicleId={mockVehicleData.vehicleId}
        vehicleInfo={mockVehicleData.vehicleInfo}
        images={mockVehicleData.images}
        onBack={handleBack}
        onReport={handleReport}
      />
    </div>
  );
};

export default VehicleDetailsPage; 