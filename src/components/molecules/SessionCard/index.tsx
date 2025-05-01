import * as React from 'react';
import { cn } from '../../../lib/utils';
import { SessionId } from './SessionId';
import { SessionTag, Tag } from './SessionTag';
import { QCStatus } from './QCStatus';
import { SessionDetails } from './SessionDetails';
import { ColorStrip } from './ColorStrip';
import { ExpandButton } from './ExpandButton';
import { SessionCardSVG } from './SessionCardSVG';

interface SessionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  sessionId: string;
  tags?: Tag[];
  qcStatus?: string;
  qcTimestamp?: string;
  isExpandable?: boolean;
  sessionImage?: string;
  sessionDescription?: string;
  sessionDetails?: {
    type?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  colorStrip?: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  variant?: "elevated" | "flat";
  clipStyle?: "normal" | "notched" | "slanted";
  isSkewed?: boolean;
  skewAngle?: string;
  specialDesign?: boolean;
}

export function SessionCard({
  sessionId,
  tags = [],
  qcStatus = "QC Passed:",
  qcTimestamp,
  isExpandable = true,
  sessionImage,
  sessionDescription,
  sessionDetails,
  colorStrip,
  variant = "elevated",
  clipStyle = "normal",
  isSkewed = false,
  skewAngle = "-20deg",
  specialDesign = false,
  className,
  ...props
}: SessionCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getClipPathStyle = () => {
    switch (clipStyle) {
      case "notched":
        return variant === "flat"
          ? "clip-path: polygon(0% 0%, 95% 0%, 100% 30%, 100% 100%, 5% 100%, 0% 70%);"
          : "clip-path: polygon(0% 0%, 95% 0%, 100% 20%, 100% 100%, 5% 100%, 0% 80%);";
      case "slanted":
        return variant === "flat"
          ? "clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);"
          : "clip-path: polygon(0 0, 100% 0, 100% 90%, 95% 100%, 0 100%);";
      default:
        return "";
    }
  };

  const skewStyle = isSkewed ? {
    transform: `skew(${skewAngle})`,
    WebkitTransform: `skew(${skewAngle})`,
  } : {};

  const skewFixStyle = isSkewed ? {
    transform: `skew(${skewAngle?.startsWith('-') ? skewAngle?.substring(1) : `-${skewAngle}`})`,
    WebkitTransform: `skew(${skewAngle?.startsWith('-') ? skewAngle?.substring(1) : `-${skewAngle}`})`,
    display: 'block',
  } : {};

  // Thiết kế đặc biệt theo SVG từ Figma
  if (specialDesign) {
    return (
      <div className={cn("relative", className)}>
        {/* Card chính */}
        <div className="relative" style={{width: "278px"}}>
          {/* Nền SVG */}
          <svg width="278" height="59" viewBox="0 0 278 59" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_935_2123)">
              <path d="M16.8012 1.46881e-06L32 2.79753e-06L32 56L10.894 56C5.49319 56 1.6442 50.7586 3.26074 45.6055L5.39021 38.8172L16.8012 1.46881e-06Z" fill="white"/>
              <rect width="212" height="56" transform="translate(32)" fill="white"/>
              <path d="M261.795 47.5088C260.252 52.5541 255.595 56 250.32 56L244 56L244 -2.79753e-06L276 0L273.136 10.4195L261.795 47.5088Z" fill="white"/>
            </g>
            <defs>
              <filter id="filter0_d_935_2123" x="-2" y="-1" width="280" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_935_2123"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_935_2123"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_935_2123" result="shape"/>
              </filter>
            </defs>
          </svg>
          
          {/* Nội dung trong thẻ */}
          <div className="absolute top-0 left-0 right-0 z-10 px-8 py-3 flex flex-col h-full">
            <div className="flex flex-col">
              {/* Session ID */}
              <div style={{
                width: '100%',
                height: '19px',
                fontFamily: "'Proto Mono', monospace",
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '125%',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'rgba(31, 41, 55, 0.88)',
                marginBottom: '2px',
              }}>
                {sessionId}
              </div>
              
              {/* Created Date or QC Status */}
              <div style={{
                width: '100%',
                height: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '125%',
                color: 'rgba(31, 41, 55, 0.38)',
              }}>
                {qcStatus} {qcTimestamp}
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-1 absolute top-3 right-8">
              {tags.map((tag, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: tag.text ? tag.text.length * 7 + 9 : '25px',
                  minWidth: '19px',
                  height: '16px',
                  background: tag.type === 'blue' ? '#EAF4FB' : 
                              tag.type === 'green' ? '#DCFCE7' :
                              tag.type === 'yellow' ? '#FFF0B8' :
                              tag.type === 'red' ? '#FEE2E2' :
                              tag.type === 'purple' ? '#F3E8FF' : '#F3F4F6',
                  border: `1px solid ${
                      tag.type === 'blue' ? '#AAC9FF' : 
                      tag.type === 'green' ? '#86EFAC' :
                      tag.type === 'yellow' ? '#FFD028' :
                      tag.type === 'red' ? '#FCA5A5' :
                      tag.type === 'purple' ? '#D8B4FE' : '#D1D5DB'
                  }`,
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#1F2937',
                }}>
                  {tag.text}
                </div>
              ))}
            </div>

            {/* Expand button */}
            {isExpandable && (
              <div 
                className="absolute bottom-3 right-8 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.46704 6.02478H6.53296C6.67066 6.02478 6.78675 5.96246 6.88122 5.83783L10.982 0.686338C11.1503 0.478339 11.1206 0.222536 10.9131 0.0742617C10.824 0.00817376 10.7064 -0.013584 10.5989 0.00965681C10.4914 0.0328976 10.3986 0.0924931 10.3353 0.178297L6.4441 5.03651C6.40026 5.09298 6.33935 5.12121 6.26138 5.12121H5.73862C5.66065 5.12121 5.59974 5.09298 5.5559 5.03651L1.66472 0.178297C1.60141 0.0924931 1.50856 0.0328976 1.40111 0.00965681C1.29366 -0.013584 1.17598 0.00817376 1.0869 0.0742617C0.879438 0.222536 0.849677 0.478339 1.01803 0.686338L5.11878 5.83783C5.21325 5.96246 5.32934 6.02478 5.46704 6.02478Z" fill="#6B7280"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Dropdown nếu mở rộng */}
        {isExpandable && isExpanded && (
          <div className="absolute top-[59px] left-0 right-0 bg-white p-4 rounded-lg shadow-lg z-20">
            <div className="text-sm text-gray-700">
              <div className="mb-1"><strong>Type:</strong> Session</div>
              <div className="mb-1"><strong>Status:</strong> Active</div>
              <div><strong>Updated:</strong> {qcTimestamp}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "flat") {
    return (
      <div
        className={cn(
          "bg-white rounded-xl p-4 border border-gray-100 relative session-card",
          clipStyle !== "normal" && !isSkewed && "rounded-none overflow-hidden",
          isSkewed && "overflow-hidden",
          className
        )}
        style={{
          ...props.style,
          ...(clipStyle !== "normal" && !isSkewed ? { WebkitClipPath: getClipPathStyle(), clipPath: getClipPathStyle() } : {}),
          ...skewStyle
        }}
        {...props}
      >
        <ColorStrip 
          color={colorStrip} 
          clipStyle={clipStyle}
          isSkewed={isSkewed}
          variant={variant}
        />

        <div style={skewFixStyle}>
          <div className="flex flex-wrap items-center gap-2">
            <SessionId id={sessionId} />
            <div className="flex gap-1 ml-1">
              {tags?.map((tag, index) => (
                <SessionTag key={index} tag={tag} variant={variant} />
              ))}
            </div>
          </div>

          <div className="flex items-center text-gray-500 mt-1 text-sm">
            <QCStatus 
              status={qcStatus} 
              timestamp={qcTimestamp} 
              useCreatedDateStyle={qcStatus === "Created Date:"}
            />
            {isExpandable && (
              <ExpandButton 
                isExpanded={isExpanded} 
                onClick={() => setIsExpanded(!isExpanded)} 
                variant={variant}
              />
            )}
          </div>

          {isExpandable && (
            <SessionDetails 
              isExpanded={isExpanded}
              sessionDetails={sessionDetails}
              variant={variant}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-[24px] border-0 shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-6 max-w-3xl relative session-card",
        "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:bg-white after:rounded-b-[36px] after:z-[-1]",
        "transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        clipStyle !== "normal" && !isSkewed && "rounded-none overflow-hidden",
        isSkewed && "overflow-hidden",
        className
      )}
      style={{
        ...props.style,
        ...(clipStyle !== "normal" && !isSkewed ? { WebkitClipPath: getClipPathStyle(), clipPath: getClipPathStyle() } : {}),
        ...skewStyle
      }}
      {...props}
    >
      <ColorStrip 
        color={colorStrip} 
        clipStyle={clipStyle}
        isSkewed={isSkewed}
        variant={variant}
      />

      <div style={skewFixStyle}>
        <div className="flex flex-wrap items-center gap-4">
          {sessionImage && (
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm mr-2">
              <img src={sessionImage} alt={sessionId} className="h-full w-full object-cover" />
            </div>
          )}

          <SessionId id={sessionId} />
          
          {tags?.map((tag, index) => (
            <SessionTag key={index} tag={tag} variant={variant} />
          ))}
        </div>

        {sessionDescription && (
          <div className="mt-3 text-gray-600">
            {sessionDescription}
          </div>
        )}

        <div className="flex items-center mt-4 text-lg">
          <QCStatus 
            status={qcStatus} 
            timestamp={qcTimestamp} 
            useCreatedDateStyle={qcStatus === "Created Date:"}
          />

          {isExpandable && (
            <ExpandButton 
              isExpanded={isExpanded} 
              onClick={() => setIsExpanded(!isExpanded)} 
              variant={variant}
            />
          )}
        </div>

        {isExpandable && (
          <SessionDetails 
            isExpanded={isExpanded}
            sessionDetails={sessionDetails}
            variant={variant}
          />
        )}
      </div>
    </div>
  );
}

export { SessionId } from './SessionId';
export { SessionTag } from './SessionTag';
export { QCStatus } from './QCStatus';
export { SessionDetails } from './SessionDetails';
export { ColorStrip } from './ColorStrip';
export { ExpandButton } from './ExpandButton';
export { SessionCardSVG } from './SessionCardSVG';
export type { Tag } from './SessionTag'; 