import React from 'react';
import VehicleDetailsTemplate from '../templates/VehicleDetailsTemplate';

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
      src: '/mock-images/vehicle-side.jpg',
      alt: 'Side view of vehicle',
      indicators: [
        { x: 43, y: 50, color: '#ef4444' }
      ]
    },
    {
      id: '2',
      src: '/mock-images/vehicle-front.jpg',
      alt: 'Front view of vehicle'
    },
    {
      id: '3',
      src: '/mock-images/vehicle-back.jpg',
      alt: 'Back view of vehicle'
    },
    {
      id: '4',
      src: '/mock-images/vehicle-interior.jpg',
      alt: 'Interior view of vehicle'
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
    <VehicleDetailsTemplate
      vehicleId={mockVehicleData.vehicleId}
      vehicleInfo={mockVehicleData.vehicleInfo}
      images={mockVehicleData.images}
      onBack={handleBack}
      onReport={handleReport}
    />
  );
};

export default VehicleDetailsPage; 