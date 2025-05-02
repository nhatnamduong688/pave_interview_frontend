import React from 'react';

interface VehicleInfoPanelProps {
  year: string;
  make: string;
  model: string;
  trim?: string;
  bodyType?: string;
}

const VehicleInfoPanel: React.FC<VehicleInfoPanelProps> = ({ 
  year, 
  make, 
  model, 
  trim, 
  bodyType 
}) => {
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <h2 className="font-sans font-bold text-base text-gray-800">
        {year}-{make}-{model} {trim}
      </h2>
      {bodyType && (
        <p className="font-sans font-normal text-sm text-gray-600 uppercase">
          {bodyType}
        </p>
      )}
    </div>
  );
};

export default VehicleInfoPanel; 