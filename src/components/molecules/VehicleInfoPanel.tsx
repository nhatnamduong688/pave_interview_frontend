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
    <div className="flex-1 min-w-0 overflow-hidden">
      <div className="flex items-baseline">
        <h2 className="font-sans font-bold text-base text-gray-800 tracking-wide uppercase truncate">
          {year}-{make}-{model} {trim}
        </h2>
        
        {/* QR code placeholder on the right */}
        <div className="ml-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
            <rect x="13" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
            <rect x="4" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M17 13H19V15H17V13Z" fill="currentColor" />
            <path d="M15 15H17V17H15V15Z" fill="currentColor" />
            <path d="M19 15H21V17H19V15Z" fill="currentColor" />
            <path d="M17 17H19V19H17V17Z" fill="currentColor" />
            <path d="M15 19H17V21H15V19Z" fill="currentColor" />
            <path d="M19 19H21V21H19V19Z" fill="currentColor" />
            <path d="M13 17H15V19H13V17Z" fill="currentColor" />
            <path d="M13 13H15V15H13V13Z" fill="currentColor" />
            <path d="M13 19H15V21H13V19Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {bodyType && (
        <p className="font-sans font-normal text-xs text-gray-600 uppercase tracking-wider truncate">
          {bodyType}
        </p>
      )}
    </div>
  );
};

export default VehicleInfoPanel; 