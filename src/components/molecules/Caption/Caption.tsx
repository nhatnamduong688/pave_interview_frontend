import React from 'react';

interface CaptionProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Caption: React.FC<CaptionProps> = ({
  title,
  description,
  icon,
  className = '',
}) => {
  return (
    <div className={`flex items-start p-4 bg-gray-50 rounded-lg max-w-xs mb-4 ${className}`}>
      {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}
      <div className="flex-1">
        {title && <h4 className="text-base font-semibold m-0 mb-1 text-gray-800">{title}</h4>}
        {description && <p className="text-sm m-0 text-gray-600 leading-normal">{description}</p>}
      </div>
    </div>
  );
};

export default Caption; 