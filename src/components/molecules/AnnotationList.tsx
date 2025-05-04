import React, { useRef, useEffect } from 'react';
import { Divider, Typography, Button } from 'antd';
import { Indicator } from '../../store/slices/clickIndicatorSlice';

const { Title, Text } = Typography;

interface AnnotationListProps {
  indicators: Indicator[];
  onIndicatorClick: (id: string) => void;
  onRemoveIndicator?: (id: string) => void;
  onResetAllIndicators?: () => void;
}

const AnnotationList: React.FC<AnnotationListProps> = ({
  indicators,
  onIndicatorClick,
  onRemoveIndicator,
  onResetAllIndicators,
}) => {
  // Refs for the list and highlighted items
  const listContainerRef = useRef<HTMLDivElement>(null);
  const highlightedItemRef = useRef<HTMLDivElement>(null);

  // Scroll to highlighted item when it changes
  useEffect(() => {
    if (highlightedItemRef.current && listContainerRef.current) {
      highlightedItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [indicators.find(ind => ind.isHighlighted)?.id]);

  // Format coordinate display
  const formatCoordinate = (value: number) => value.toFixed(1);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <Title level={4} className="m-0">Damage Annotations</Title>
          <Text className="text-gray-500">{indicators.length} item(s)</Text>
        </div>
      </div>

      {/* Scrollable list of annotations */}
      <div 
        ref={listContainerRef}
        className="flex-1 overflow-auto p-2"
      >
        {indicators.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            <Text>No annotations yet</Text>
            <div className="mt-2">
              <Text className="text-xs text-gray-400">
                Click on the image to create annotations
              </Text>
            </div>
          </div>
        ) : (
          indicators.map((indicator, index) => (
            <div
              key={indicator.id}
              ref={indicator.isHighlighted ? highlightedItemRef : null}
              className={`p-3 mb-2 rounded-md cursor-pointer transition-colors duration-200 ${
                indicator.isHighlighted
                  ? 'bg-blue-50 border border-blue-300'
                  : 'hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => onIndicatorClick(indicator.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: indicator.color }}
                  />
                  <Text strong>Annotation {index + 1}</Text>
                </div>
                {onRemoveIndicator && (
                  <Button 
                    type="text" 
                    danger 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveIndicator(indicator.id);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Position: ({formatCoordinate(indicator.x)}%, {formatCoordinate(indicator.y)}%)
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action footer */}
      {onResetAllIndicators && indicators.length > 0 && (
        <div className="p-3 border-t border-gray-200">
          <Button 
            danger 
            block
            onClick={onResetAllIndicators}
          >
            Clear All Annotations
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnnotationList; 