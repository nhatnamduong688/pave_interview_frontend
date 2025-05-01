import * as React from 'react';
import { Tag } from './SessionTag';
import { QCStatus } from './QCStatus';

interface SessionCardSVGProps extends React.HTMLAttributes<HTMLDivElement> {
  sessionId: string;
  tags?: Tag[];
  qcStatus?: string;
  qcTimestamp?: string;
  isExpandable?: boolean;
}

export function SessionCardSVG({
  sessionId,
  tags = [],
  qcStatus = "QC Passed:",
  qcTimestamp,
  isExpandable = true,
  className,
  ...props
}: SessionCardSVGProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className={className} style={{width: "278px", height: "50px", position: "relative"}} {...props}>
      <svg width="278" height="50" viewBox="0 0 278 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
        <g filter="url(#filter0_d_935_2123)">
          <path d="M16.8012 1.46881e-06L32 2.79753e-06L32 48L10.894 48C5.49319 48 1.6442 44.7586 3.26074 41.6055L5.39021 37.8172L16.8012 1.46881e-06Z" fill="white"/>
          <rect width="212" height="48" transform="translate(32)" fill="white"/>
          <path d="M261.795 41.5088C260.252 45.5541 255.595 48 250.32 48L244 48L244 -2.79753e-06L276 0L273.136 8.4195L261.795 41.5088Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_d_935_2123" x="-2" y="-1" width="280" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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

      <div className="relative z-10 flex flex-col h-full px-[25px] py-2">
        <div className="flex items-center">
          <div style={{
            fontFamily: "'Proto Mono', monospace",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '125%',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: 'rgba(31, 41, 55, 0.88)',
            marginRight: '8px'
          }}>
            {sessionId}
          </div>

          <div className="flex gap-1">
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
        </div>

        <div className="flex items-center mt-1">
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '10px',
            lineHeight: '125%',
            color: 'rgba(31, 41, 55, 0.38)',
          }}>
            {qcStatus}{qcTimestamp && ` ${qcTimestamp}`}
          </span>

          {isExpandable && (
            <div
              className="cursor-pointer ml-3"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <svg 
                width="10" 
                height="11" 
                viewBox="0 0 10 11" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                <path d="M7.46668 3.9082H4.87085H2.53335C2.13335 3.9082 1.93335 4.39154 2.21668 4.67487L4.37502 6.8332C4.72085 7.17904 5.28335 7.17904 5.62918 6.8332L6.45002 6.01237L7.78752 4.67487C8.06668 4.39154 7.86668 3.9082 7.46668 3.9082Z" fill="#6B7280"/>
              </svg>
            </div>
          )}
        </div>

        {/* {isExpandable && isExpanded && (
          <div className="absolute top-full left-0 right-0 bg-white p-4 rounded-lg shadow-lg mt-2 z-20">
            <div className="text-sm text-gray-700">
              <div className="mb-1"><strong>Type:</strong> Session</div>
              <div className="mb-1"><strong>Status:</strong> Active</div>
              <div><strong>Updated:</strong> {qcTimestamp}</div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
