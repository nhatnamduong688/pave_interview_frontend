import * as React from 'react';
import { cn } from '../../lib/utils';

interface Tag {
  text: string;
  type: "yellow" | "blue" | "green" | "red" | "purple" | "gray";
}

interface SimpleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  productId?: string;
  tags?: Tag[];
  qcStatus?: string;
  qcTimestamp?: string;
}

export function SimpleCard({
  productId = "TOA-8GASMDUDFT",
  tags = [],
  qcStatus = "QC Passed:",
  qcTimestamp = "2 days ago, 3:03:58 PM",
  className,
  ...props
}: SimpleCardProps) {
  const getTagStyles = (type: Tag["type"]) => {
    switch (type) {
      case "yellow":
        return "bg-amber-50 text-amber-900 border border-amber-100";
      case "blue":
        return "bg-blue-50 text-blue-900 border border-blue-100";
      case "green":
        return "bg-green-50 text-green-800 border border-green-100";
      case "red":
        return "bg-red-50 text-red-800 border border-red-100";
      case "purple":
        return "bg-purple-50 text-purple-800 border border-purple-100";
      case "gray":
        return "bg-gray-50 text-gray-800 border border-gray-100";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-100";
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-3xl py-4 px-5 shadow-sm w-full max-w-md",
        className
      )}
      style={{
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
      }}
      {...props}
    >
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl font-semibold text-gray-700 font-mono">
          {productId}
        </h3>
        <div className="flex gap-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "inline-flex px-3 py-0.5 text-sm font-medium rounded-full",
                getTagStyles(tag.type)
              )}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center text-gray-400 text-sm">
        <span>{qcStatus}</span>
        {qcTimestamp && (
          <span className="ml-1 text-gray-500">{qcTimestamp}</span>
        )}
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
          className="ml-1 text-gray-400"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  );
}
