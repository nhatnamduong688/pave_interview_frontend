import * as React from 'react';
import { cn } from '../../../lib/utils';
import { SessionId } from './SessionId';
import { SessionTag, Tag } from './SessionTag';
import { QCStatus } from './QCStatus';
import { SessionDetails } from './SessionDetails';
import { ColorStrip } from './ColorStrip';
import { ExpandButton } from './ExpandButton';

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
            <QCStatus status={qcStatus} timestamp={qcTimestamp} />
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
          <QCStatus status={qcStatus} timestamp={qcTimestamp} />

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
export type { Tag } from './SessionTag'; 