import * as React from 'react';

interface CollapseToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  iconColor?: string;
  fillColor?: string;
  hoverColor?: string;
  shadowEnabled?: boolean;
  productCode?: string;
  badgeText?: string;
  badgeColor?: string;
}

export const CollapseToggleButton = React.forwardRef<HTMLButtonElement, CollapseToggleButtonProps>(
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
            width="76" 
            height="58" 
            viewBox="0 0 76 58" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter={shadowEnabled ? "url(#filter0_d_3112_674)" : undefined}>
              <path 
                d="M16.1758 46.567C17.7374 51.5829 22.38 55 27.6334 55L34 55L34 -2.79753e-06L2 0L4.86448 10.2334L16.1758 46.567Z" 
                fill={finalFillColor}
              />
              <rect 
                width="40" 
                height="55" 
                transform="translate(34)" 
                fill={finalFillColor}
              />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M49.5001 20.4165H38.5001C37.6256 20.4165 36.9167 21.1254 36.9167 21.9998V32.9998C36.9167 33.8743 37.6256 34.5832 38.5001 34.5832H49.5001C50.3745 34.5832 51.0834 33.8743 51.0834 32.9998V21.9998C51.0834 21.1254 50.3745 20.4165 49.5001 20.4165ZM38.5001 19.1665C36.9353 19.1665 35.6667 20.435 35.6667 21.9998V32.9998C35.6667 34.5646 36.9353 35.8332 38.5001 35.8332H49.5001C51.0649 35.8332 52.3334 34.5646 52.3334 32.9998V21.9998C52.3334 20.435 51.0649 19.1665 49.5001 19.1665H38.5001Z" 
                fill={finalIconColor}
              />
              <path 
                d="M42.4521 19.1665H43.7021V35.8332H42.4521V19.1665Z" 
                fill={finalIconColor}
              />
              <path 
                d="M46.4403 29.886L47.7146 28.7392L48.4966 28.039C48.826 27.7424 48.826 27.2601 48.4966 26.9636L46.4403 25.113C46.1704 24.8701 45.7099 25.0451 45.7099 25.3845L45.7099 29.6145C45.7099 29.9575 46.1704 30.1289 46.4403 29.886Z" 
                fill={finalIconColor}
              />
              <path 
                d="M38.0944 23.3332C38.0944 22.9497 38.4054 22.6387 38.7889 22.6387H40.1778C40.5613 22.6387 40.8722 22.9497 40.8722 23.3332C40.8722 23.7167 40.5613 24.0276 40.1778 24.0276H38.7889C38.4054 24.0276 38.0944 23.7167 38.0944 23.3332Z" 
                fill={finalIconColor}
              />
              <path 
                d="M38.0944 25.7638C38.0944 25.3803 38.4054 25.0694 38.7889 25.0694H40.1778C40.5613 25.0694 40.8722 25.3803 40.8722 25.7638C40.8722 26.1473 40.5613 26.4583 40.1778 26.4583H38.7889C38.4054 26.4583 38.0944 26.1473 38.0944 25.7638Z" 
                fill={finalIconColor}
              />
              <path 
                d="M38.0944 28.1943C38.0944 27.8108 38.4054 27.4999 38.7889 27.4999H40.1778C40.5613 27.4999 40.8722 27.8108 40.8722 28.1943C40.8722 28.5779 40.5613 28.8888 40.1778 28.8888H38.7889C38.4054 28.8888 38.0944 28.5779 38.0944 28.1943Z" 
                fill={finalIconColor}
              />
            </g>
            <defs>
              <filter 
                id="filter0_d_3112_674" 
                x="0" 
                y="-1" 
                width="76" 
                height="59" 
                filterUnits="userSpaceOnUse" 
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
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
                  result="effect1_dropShadow_3112_674"
                />
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix 
                  type="matrix" 
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend 
                  mode="normal" 
                  in2="BackgroundImageFix" 
                  result="effect1_dropShadow_3112_674"
                />
                <feBlend 
                  mode="normal" 
                  in="SourceGraphic" 
                  in2="effect1_dropShadow_3112_674" 
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          
          {/* Hiển thị mã sản phẩm trên phần hình thang */}
          {productCode && (
            <div 
              className="absolute top-[28px] left-[15px] text-xs font-medium"
              style={{ color: variant === 'primary' ? 'white' : '#333' }}
            >
              {productCode}
            </div>
          )}
        </button>
        
        {/* Badge hiển thị bên cạnh button */}
        {badgeText && (
          <div
            className="absolute -left-3 top-[12px] px-2 py-0.5 text-xs font-medium text-white rounded"
            style={{ backgroundColor: badgeColor }}
          >
            {badgeText}
          </div>
        )}
      </div>
    );
  }
);

CollapseToggleButton.displayName = 'CollapseToggleButton'; 