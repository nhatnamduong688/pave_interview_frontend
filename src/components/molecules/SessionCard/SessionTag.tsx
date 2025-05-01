import * as React from 'react';

export interface Tag {
  text: string;
  type: "yellow" | "blue" | "green" | "red" | "purple" | "gray";
}

interface SessionTagProps {
  tag: Tag;
  variant?: "elevated" | "flat";
}

export function SessionTag({tag, variant = "elevated"}: SessionTagProps) {
  const getTagBgColor = (type: Tag["type"]) => {
    switch (type) {
      case "yellow":
        return "#fef3c7"; // amber-100
      case "blue":
        return "#dbeafe"; // blue-100
      case "green":
        return "#dcfce7"; // green-100
      case "red":
        return "#fee2e2"; // red-100
      case "purple":
        return "#f3e8ff"; // purple-100
      case "gray":
        return "#f3f4f6"; // gray-100
      default:
        return "#f3f4f6"; // gray-100
    }
  };

  const getTagTextColor = (type: Tag["type"]) => {
    switch (type) {
      case "yellow":
        return "#78350f"; // amber-900
      case "blue":
        return "#1e3a8a"; // blue-900
      case "green":
        return "#166534"; // green-900
      case "red":
        return "#991b1b"; // red-900
      case "purple":
        return "#581c87"; // purple-900
      case "gray":
        return "#1f2937"; // gray-800
      default:
        return "#1f2937"; // gray-800
    }
  };

  const getTagBorderColor = (type: Tag["type"]) => {
    switch (type) {
      case "yellow":
        return "#fcd34d"; // amber-300
      case "blue":
        return "#93c5fd"; // blue-300
      case "green":
        return "#86efac"; // green-300
      case "red":
        return "#fca5a5"; // red-300
      case "purple":
        return "#d8b4fe"; // purple-300
      case "gray":
        return "#d1d5db"; // gray-300
      default:
        return "#d1d5db"; // gray-300
    }
  };

  if (variant === "flat") {
    return (
      <span
        style={{
          display: 'inline-flex',
          padding: '0.25rem 0.5rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          borderRadius: '0.375rem',
          backgroundColor: getTagBgColor(tag.type),
          color: getTagTextColor(tag.type),
          border: `1px solid ${getTagBorderColor(tag.type)}`,
          width: '18px',
          height: '13px',
        }}
      >
        {tag.text}
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        padding: '0.375rem 1rem',
        fontSize: '1rem',
        fontWeight: '500',
        borderRadius: '1rem',
        backgroundColor: getTagBgColor(tag.type),
        color: getTagTextColor(tag.type),
        border: `2px solid ${getTagBorderColor(tag.type)}`,
        transition: 'all 150ms',
        width: '18px',
        height: '13px',
      }}
      className="hover:shadow-sm"
    >
      {tag.text}
    </span>
  );
}
