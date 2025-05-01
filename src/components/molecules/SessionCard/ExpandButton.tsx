import * as React from 'react';

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  variant?: "elevated" | "flat";
}

export function ExpandButton({ isExpanded, onClick, variant = "elevated" }: ExpandButtonProps) {
  if (variant === "flat") {
    return (
      <button
        onClick={onClick}
        className="ml-1 focus:outline-none text-gray-400"
        aria-label={isExpanded ? "Collapse details" : "Expand details"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className="ml-auto focus:outline-none transition-transform bg-gray-100 hover:bg-gray-200 rounded-full p-2"
      aria-label={isExpanded ? "Collapse details" : "Expand details"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isExpanded ? "rotate-180" : ""
        }`}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
} 