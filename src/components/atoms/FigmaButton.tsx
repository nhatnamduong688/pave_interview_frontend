import * as React from 'react';

interface BackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  iconColor?: string;
  fillColor?: string;
  hoverColor?: string;
  shadowEnabled?: boolean;
  productCode?: string;
  badgeText?: string;
  badgeColor?: string;
}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ 
    className, 
    onClick, 
    variant = 'default',
    iconColor = '#9CA3AF',
    fillColor = 'white',
    hoverColor,
    shadowEnabled = true,
    productCode,
    badgeText,
    badgeColor = '#fbbf24',
    ...props 
  }, ref) => {
    // Xác định màu sắc dựa trên variant
    let finalFillColor = fillColor;
    let finalIconColor = iconColor;
    
    if (variant === 'primary') {
      finalFillColor = '#1677ff';
      finalIconColor = 'white';
    } else if (variant === 'secondary') {
      finalFillColor = '#f5f5f5'; 
      finalIconColor = '#6b7280';
    }

    return (
      <div className="relative inline-flex">
        <button
          ref={ref}
          onClick={onClick}
          className={`focus:outline-none ${className || ''}`}
          style={{
            padding: 0,
            border: 0,
            background: 'transparent',
            cursor: 'pointer',
          }}
          {...props}
        >
          <svg
            width="74"
            height="59"
            viewBox="0 0 74 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter={shadowEnabled ? "url(#filter0_d_949_2880)" : undefined}>
              <rect
                width="40"
                height="55"
                transform="translate(0 0.5)"
                fill={finalFillColor}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.417 22.5C28.661 22.744 28.661 23.1398 28.417 23.3838L23.8006 28.0002L28.417 32.6166C28.661 32.8607 28.661 33.2564 28.417 33.5005C28.1729 33.7446 27.7772 33.7446 27.5331 33.5005L22.4747 28.4422C22.3575 28.325 22.2917 28.166 22.2917 28.0002C22.2917 27.8345 22.3575 27.6755 22.4747 27.5583L27.5331 22.5C27.7772 22.2559 28.1729 22.2559 28.417 22.5Z"
                fill={finalIconColor}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.4334 28.0002C22.4334 27.6551 22.7132 27.3752 23.0584 27.3752H37.0834C37.4285 27.3752 37.7084 27.6551 37.7084 28.0002C37.7084 28.3454 37.4285 28.6252 37.0834 28.6252H23.0584C22.7132 28.6252 22.4334 28.3454 22.4334 28.0002Z"
                fill={finalIconColor}
              />
              <path
                d="M57.8242 47.067C56.2626 52.0829 51.62 55.5 46.3666 55.5L40 55.5L40 0.499997L72 0.5L69.1355 10.7334L57.8242 47.067Z"
                fill={finalFillColor}
              />
            </g>
            <defs>
              <filter
                id="filter0_d_949_2880"
                x="-2"
                y="-0.5"
                width="76"
                height="59"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="1"
                  operator="erode"
                  in="SourceAlpha"
                  result="effect1_dropShadow_949_2880"
                />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_949_2880"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_949_2880"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          
          {/* Hiển thị mã sản phẩm trên phần hình thang */}
          {productCode && (
            <div 
              className="absolute top-[28px] right-[15px] text-xs font-medium"
              style={{ color: variant === 'primary' ? 'white' : '#333' }}
            >
              {productCode}
            </div>
          )}
        </button>
        
        {/* Badge hiển thị bên cạnh button */}
        {badgeText && (
          <div
            className="absolute -right-3 top-[12px] px-2 py-0.5 text-xs font-medium text-white rounded"
            style={{ backgroundColor: badgeColor }}
          >
            {badgeText}
          </div>
        )}
      </div>
    );
  }
);

BackButton.displayName = 'BackButton'; 