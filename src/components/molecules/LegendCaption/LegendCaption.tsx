import React from 'react';
import { createSvgElement } from '@/utils/svg';
import vehicleDiagramSvg from '@/assets/svg/vehicle-diagram-legend.svg?raw';

interface LegendCaptionProps {
  caption?: string;
  className?: string;
  svgWidth?: number;
  svgHeight?: number;
}

/**
 * LegendCaption component - displays the vehicle diagram SVG with optional caption text
 */
const LegendCaption: React.FC<LegendCaptionProps> = ({
  caption,
  className = '',
  svgWidth = 56,
  svgHeight = 56
}) => {
  // Create SVG element from the imported SVG
  const vehicleDiagram = createSvgElement(vehicleDiagramSvg, {
    width: svgWidth,
    height: svgHeight,
    className: "block"
  });

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="flex justify-center items-center">
        {vehicleDiagram}
      </div>
      {/*{caption && (*/}
      {/*  <span className="font-mono text-xs leading-tight text-center text-gray-700 whitespace-pre-line max-w-full">*/}
      {/*    {caption}*/}
      {/*  </span>*/}
      {/*)}*/}
    </div>
  );
};

export default LegendCaption;
