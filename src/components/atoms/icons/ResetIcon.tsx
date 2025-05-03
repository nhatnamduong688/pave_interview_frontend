import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ResetIcon: React.FC<IconProps> = ({ 
  width = 24, 
  height = 24, 
  color = '#6B7280',
  className = '' 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M4 12C4 7.58172 7.58172 4 12 4C15.3661 4 18.2085 6.05075 19.4334 9M20 12C20 16.4183 16.4183 20 12 20C8.63386 20 5.79151 17.9492 4.56662 15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 4V9H15" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M4 20V15H9" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ResetIcon; 