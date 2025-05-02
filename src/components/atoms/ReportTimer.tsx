import React from 'react';

// Các icon cho component
const ReportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00001 1.33331C8.31149 1.33331 8.59309 1.50108 8.73245 1.77843L14.399 13.1118C14.5396 13.3915 14.5057 13.7271 14.322 13.9739C14.1382 14.2207 13.8321 14.3333 13.5556 14.3333H2.44445C2.16797 14.3333 1.86185 14.2207 1.67804 13.9739C1.49423 13.7271 1.46037 13.3915 1.60104 13.1118L7.26756 1.77843C7.40693 1.50108 7.68853 1.33331 8.00001 1.33331Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 5.33331V8.66665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 11.3333H8.00667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TimerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.375" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export type ReportTimerVariant = 'report' | 'timer';

export interface ReportTimerProps {
  variant?: ReportTimerVariant;
  label: string;
  onClick?: () => void;
  className?: string;
}

const ReportTimer: React.FC<ReportTimerProps> = ({
  variant = 'report',
  label,
  onClick,
  className = '',
}) => {
  // Các styles dựa trên variants
  const styles = {
    report: {
      container: 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50',
      iconWrapper: '',
      textWrapper: ''
    },
    timer: {
      container: 'text-green-800 hover:bg-green-200',
      iconWrapper: '',
      textWrapper: 'font-medium'
    }
  };

  // Lấy style theo variant
  const currentStyle = styles[variant];

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1 
        py-1 px-4
        font-mono text-sm font-medium leading-tight
        rounded-full border 
        transition-colors duration-150
        ${className}
      `}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        backgroundColor: variant === 'timer' ? '#DCFCE7' : 'white',
        borderColor: variant === 'timer' ? '#A7F3D0' : '#D1D5DB',
        color: variant === 'timer' ? '#065F46' : '#6B7280',
        borderWidth: '1px',
      }}
    >
      <span className="flex items-center justify-center">
        {variant === 'report' ? <ReportIcon /> : <TimerIcon />}
      </span>
      <span>{label}</span>
    </button>
  );
};

export default ReportTimer; 