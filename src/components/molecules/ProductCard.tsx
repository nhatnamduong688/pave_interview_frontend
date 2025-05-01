import * as React from 'react';
import { cn } from '../../lib/utils';

interface Tag {
  text: string;
  type: "yellow" | "blue" | "green" | "red" | "purple" | "gray";
}

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  productId: string;
  tags?: Tag[];
  qcStatus?: string;
  qcTimestamp?: string;
  isExpandable?: boolean;
  productImage?: string;
  productDescription?: string;
  productDetails?: {
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

export function ProductCard({
  productId,
  tags = [],
  qcStatus = "QC Passed:",
  qcTimestamp,
  isExpandable = true,
  productImage,
  productDescription,
  productDetails,
  colorStrip,
  variant = "elevated",
  clipStyle = "normal",
  isSkewed = false,
  skewAngle = "-20deg",
  className,
  ...props
}: ProductCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getTagBgColor = (type: Tag["type"]) => {
    switch (type) {
      case "yellow": return "#fef3c7"; // amber-100
      case "blue": return "#dbeafe"; // blue-100
      case "green": return "#dcfce7"; // green-100
      case "red": return "#fee2e2"; // red-100
      case "purple": return "#f3e8ff"; // purple-100
      case "gray": return "#f3f4f6"; // gray-100
      default: return "#f3f4f6"; // gray-100
    }
  };

  const getTagTextColor = (type: Tag["type"]) => {
    switch (type) {
      case "yellow": return "#78350f"; // amber-900
      case "blue": return "#1e3a8a"; // blue-900
      case "green": return "#166534"; // green-900
      case "red": return "#991b1b"; // red-900
      case "purple": return "#581c87"; // purple-900
      case "gray": return "#1f2937"; // gray-800
      default: return "#1f2937"; // gray-800
    }
  };

  const getTagBorderColor = (type: Tag["type"]) => {
    switch (type) {
      case "yellow": return "#fcd34d"; // amber-300
      case "blue": return "#93c5fd"; // blue-300
      case "green": return "#86efac"; // green-300
      case "red": return "#fca5a5"; // red-300
      case "purple": return "#d8b4fe"; // purple-300
      case "gray": return "#d1d5db"; // gray-300
      default: return "#d1d5db"; // gray-300
    }
  };

  const getQCStatusColors = () => {
    if (qcStatus.includes("Failed")) {
      return { bg: "#fee2e2", text: "#b91c1c", border: "#fca5a5" }; // red
    }
    if (qcStatus.includes("Passed")) {
      return { bg: "#dcfce7", text: "#15803d", border: "#86efac" }; // green
    }
    if (qcStatus.includes("Pending")) {
      return { bg: "#fef3c7", text: "#92400e", border: "#fcd34d" }; // amber
    }
    return { bg: "#f3f4f6", text: "#4b5563", border: "#d1d5db" }; // gray
  };

  const getColorStripClass = () => {
    switch (colorStrip) {
      case "blue": return "bg-blue-500";
      case "green": return "bg-green-500";
      case "red": return "bg-red-500";
      case "yellow": return "bg-yellow-500";
      case "purple": return "bg-purple-500";
      case "gray": return "bg-gray-500";
      default: return "";
    }
  };

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
    transform: `skew(${skewAngle.startsWith('-') ? skewAngle.substring(1) : `-${skewAngle}`})`,
    WebkitTransform: `skew(${skewAngle.startsWith('-') ? skewAngle.substring(1) : `-${skewAngle}`})`,
    display: 'block',
  } : {};

  if (variant === "flat") {
    return (
      <div
        className={cn(
          "bg-white rounded-xl p-4 border border-gray-100 relative",
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
        {/* Color strip - quay lại sử dụng Tailwind classes */}
        {colorStrip && (
          <div 
            className={cn(
              "absolute top-0 left-0 right-0 h-1 z-10",
              clipStyle === "normal" && !isSkewed && "rounded-t-xl",
              getColorStripClass()
            )}
          ></div>
        )}
        
        <div style={skewFixStyle}>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-medium text-gray-800 font-mono">
              {productId}
            </h3>
            <div className="flex gap-1 ml-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    borderRadius: '0.375rem',
                    backgroundColor: getTagBgColor(tag.type),
                    color: getTagTextColor(tag.type),
                    border: `1px solid ${getTagBorderColor(tag.type)}`
                  }}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center text-gray-500 mt-1 text-sm">
            <span>{qcStatus}</span>
            {qcTimestamp && (
              <span className="ml-1">{qcTimestamp}</span>
            )}
            {isExpandable && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
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
            )}
          </div>

          {isExpandable && (
            <div 
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                isExpanded ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
              )}
            >
              <div className="pt-2 border-t border-gray-100 text-sm text-gray-600">
                {productDetails ? (
                  <div className="grid grid-cols-2 gap-3">
                    {productDetails.type && (
                      <div>
                        <span className="text-gray-500 font-medium">Loại sản phẩm:</span>
                        <p>{productDetails.type}</p>
                      </div>
                    )}
                    {productDetails.status && (
                      <div>
                        <span className="text-gray-500 font-medium">Trạng thái:</span>
                        <p>{productDetails.status}</p>
                      </div>
                    )}
                    {productDetails.createdAt && (
                      <div>
                        <span className="text-gray-500 font-medium">Ngày tạo:</span>
                        <p>{productDetails.createdAt}</p>
                      </div>
                    )}
                    {productDetails.updatedAt && (
                      <div>
                        <span className="text-gray-500 font-medium">Cập nhật lần cuối:</span>
                        <p>{productDetails.updatedAt}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>Thông tin chi tiết bổ sung sẽ hiển thị ở đây khi mở rộng.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white rounded-[24px] border-0 shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-6 max-w-3xl relative",
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
      {/* Color strip - quay lại sử dụng Tailwind classes */}
      {colorStrip && (
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 h-1 z-10",
            clipStyle === "normal" && !isSkewed && "rounded-t-[24px]",
            getColorStripClass()
          )}
        ></div>
      )}

      <div style={skewFixStyle}>
        <div className="flex flex-wrap items-center gap-4">
          {productImage && (
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm mr-2">
              <img src={productImage} alt={productId} className="h-full w-full object-cover" />
            </div>
          )}
          
          <h3 className="text-2xl tracking-wide font-medium text-gray-800 leading-none">
            {productId}
          </h3>
          {tags.map((tag, index) => (
            <span
              key={index}
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
              }}
              className="hover:shadow-sm"
            >
              {tag.text}
            </span>
          ))}
        </div>

        {productDescription && (
          <div className="mt-3 text-gray-600">
            {productDescription}
          </div>
        )}

        <div className="flex items-center mt-4 text-lg">
          <span
            style={{
              fontWeight: 'normal',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '1rem',
              border: `1px solid ${getQCStatusColors().border}`,
              backgroundColor: getQCStatusColors().bg,
              color: getQCStatusColors().text
            }}
          >
            {qcStatus}
            {qcTimestamp && (
              <span className="ml-1 font-normal">{qcTimestamp}</span>
            )}
          </span>
          
          {isExpandable && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
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
          )}
        </div>

        <div 
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="mt-4 pt-3 border-t border-gray-100 text-base text-gray-600">
            {productDetails ? (
              <div className="grid grid-cols-2 gap-4">
                {productDetails.type && (
                  <div>
                    <span className="text-gray-500 font-medium">Loại sản phẩm:</span>
                    <p>{productDetails.type}</p>
                  </div>
                )}
                {productDetails.status && (
                  <div>
                    <span className="text-gray-500 font-medium">Trạng thái:</span>
                    <p>{productDetails.status}</p>
                  </div>
                )}
                {productDetails.createdAt && (
                  <div>
                    <span className="text-gray-500 font-medium">Ngày tạo:</span>
                    <p>{productDetails.createdAt}</p>
                  </div>
                )}
                {productDetails.updatedAt && (
                  <div>
                    <span className="text-gray-500 font-medium">Cập nhật lần cuối:</span>
                    <p>{productDetails.updatedAt}</p>
                  </div>
                )}
              </div>
            ) : (
              <p>Thông tin chi tiết bổ sung sẽ hiển thị ở đây khi mở rộng.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 