import * as React from 'react';

interface QCStatusProps {
  status: string;
  timestamp?: string;
}

export function QCStatus({ status, timestamp }: QCStatusProps) {
  const getQCStatusColors = () => {
    if (status?.includes("Failed")) {
      return { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" }; // red
    }
    if (status?.includes("Passed")) {
      return { bg: "#dcfce7", text: "#15803d", border: "#86efac" }; // green
    }
    if (status?.includes("Pending")) {
      return { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" }; // amber
    }
    return { bg: "#f3f4f6", text: "#4b5563", border: "#d1d5db" }; // gray
  };

  const colors = getQCStatusColors();

  return (
    <span
      style={{
        fontWeight: 'normal',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '1rem',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        color: colors.text
      }}
    >
      {status}
      {timestamp && (
        <span className="ml-1 font-normal">{timestamp}</span>
      )}
    </span>
  );
} 