import React from 'react';

interface VehicleDiagramProps {
  width?: number;
  height?: number;
  color?: string;
  orientation?: 'front' | 'side' | 'top';
  className?: string;
}

const VehicleDiagram: React.FC<VehicleDiagramProps> = ({
  width = 56,
  height = 56,
  color = '#333',
  orientation = 'side',
  className = ''
}) => {
  // Simple SVG paths for different vehicle orientations
  const diagrams = {
    side: (
      <svg width={width} height={height} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="56" height="56" rx="4" fill="white"/>
        <g transform="translate(4, 8)">
          {/* Car body - side view */}
          <path d="M4,28 L4,24 C4,20 6,16 10,16 L22,16 C26,16 32,14 36,14 L44,14 C46,14 48,16 48,18 L48,28" 
            stroke={color} strokeWidth="1.5" fill="none"/>
          
          {/* Roof */}
          <path d="M14,16 L18,8 L38,8 L42,16" 
            stroke={color} strokeWidth="1.5" fill="none"/>
          
          {/* Windows */}
          <path d="M18,16 L20,10 L36,10 L38,16" 
            stroke={color} strokeWidth="1" fill="none"/>
          <line x1="28" y1="10" x2="28" y2="16" stroke={color} strokeWidth="1"/>
          
          {/* Wheels */}
          <circle cx="12" cy="28" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
          <circle cx="40" cy="28" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
        </g>
      </svg>
    ),
    front: (
      <svg width={width} height={height} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="56" height="56" rx="4" fill="white"/>
        <g transform="translate(8, 8)">
          {/* Car body - front view */}
          <rect x="4" y="16" width="32" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
          
          {/* Roof */}
          <path d="M8,16 L12,6 L28,6 L32,16" 
            stroke={color} strokeWidth="1.5" fill="none"/>
          
          {/* Windows */}
          <path d="M12,16 L14,8 L26,8 L28,16" 
            stroke={color} strokeWidth="1" fill="none"/>
          <line x1="20" y1="8" x2="20" y2="16" stroke={color} strokeWidth="1"/>
          
          {/* Lights */}
          <rect x="6" y="18" width="4" height="2" rx="1" stroke={color} strokeWidth="1" fill="none"/>
          <rect x="30" y="18" width="4" height="2" rx="1" stroke={color} strokeWidth="1" fill="none"/>
          
          {/* Wheels */}
          <circle cx="10" cy="32" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
          <circle cx="30" cy="32" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
        </g>
      </svg>
    ),
    top: (
      <svg width={width} height={height} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="56" height="56" rx="4" fill="white"/>
        <g transform="translate(8, 12)">
          {/* Car body - top view */}
          <rect x="4" y="8" width="32" height="24" rx="8" stroke={color} strokeWidth="1.5" fill="none"/>
          
          {/* Windows */}
          <rect x="8" y="12" width="24" height="16" rx="4" stroke={color} strokeWidth="1" fill="none"/>
          <line x1="20" y1="12" x2="20" y2="28" stroke={color} strokeWidth="1"/>
          
          {/* Details */}
          <line x1="4" y1="20" x2="8" y2="20" stroke={color} strokeWidth="1"/>
          <line x1="32" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1"/>
        </g>
      </svg>
    )
  };

  return diagrams[orientation];
};

export default VehicleDiagram; 