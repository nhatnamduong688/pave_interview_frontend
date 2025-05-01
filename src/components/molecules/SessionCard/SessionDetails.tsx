import * as React from 'react';
import { cn } from '../../../lib/utils';

interface SessionDetailsProps {
  isExpanded: boolean;
  sessionDetails?: {
    type?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  variant?: "elevated" | "flat";
}

export function SessionDetails({ isExpanded, sessionDetails, variant = "elevated" }: SessionDetailsProps) {
  const gridClassName = variant === "flat" 
    ? "grid grid-cols-2 gap-3" 
    : "grid grid-cols-2 gap-4";

  const containerClassName = variant === "flat"
    ? cn(
        "overflow-hidden transition-all duration-200 ease-in-out",
        isExpanded ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
      )
    : cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      );

  const contentClassName = variant === "flat"
    ? "pt-2 border-t border-gray-100 text-sm text-gray-600"
    : "mt-4 pt-3 border-t border-gray-100 text-base text-gray-600";

  return (
    <div className={containerClassName}>
      <div className={contentClassName}>
        {sessionDetails ? (
          <div className={gridClassName}>
            {sessionDetails.type && (
              <div>
                <span className="text-gray-500 font-medium">Loại sản phẩm:</span>
                <p>{sessionDetails.type}</p>
              </div>
            )}
            {sessionDetails.status && (
              <div>
                <span className="text-gray-500 font-medium">Trạng thái:</span>
                <p>{sessionDetails.status}</p>
              </div>
            )}
            {sessionDetails.createdAt && (
              <div>
                <span className="text-gray-500 font-medium">Ngày tạo:</span>
                <p>{sessionDetails.createdAt}</p>
              </div>
            )}
            {sessionDetails.updatedAt && (
              <div>
                <span className="text-gray-500 font-medium">Cập nhật lần cuối:</span>
                <p>{sessionDetails.updatedAt}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Thông tin chi tiết bổ sung sẽ hiển thị ở đây khi mở rộng.</p>
        )}
      </div>
    </div>
  );
} 