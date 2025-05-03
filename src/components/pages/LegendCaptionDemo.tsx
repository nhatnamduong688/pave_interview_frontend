import React from 'react';
import LegendCaption from '@/components/molecules/LegendCaption';
import { LegendWithSVG } from '@/components/molecules/Legend/LegendWithSVG';
import { Caption } from '@/components/molecules/Caption';
import { createSvgElement } from '@/utils/svg';
import vehicleDiagramSvg from '@/assets/svg/vehicle-diagram-legend.svg?raw';

const LegendCaptionDemo: React.FC = () => {
  // Create the vehicle diagram SVG element
  const vehicleDiagram = createSvgElement(vehicleDiagramSvg, { 
    width: 24, 
    height: 24 
  });
  
  // Create legend items using the vehicle diagram
  const legendItems = [
    { 
      icon: vehicleDiagram, 
      label: 'Vehicle Diagram'
    }
  ];

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Legend & Caption Components</h1>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold">LegendCaption Component</h2>
        <div className="flex flex-wrap gap-5 mt-4">
          <div className="border border-gray-200 p-4 rounded-lg">
            <LegendCaption 
              caption="Side view\nwith dimensions" 
              svgWidth={80}
              svgHeight={80}
            />
          </div>
          
          <div className="border border-gray-200 p-4 rounded-lg">
            <LegendCaption 
              caption="Vehicle diagram" 
              svgWidth={56}
              svgHeight={56}
            />
          </div>
          
          <div className="border border-gray-200 p-4 rounded-lg">
            <LegendCaption 
              svgWidth={40}
              svgHeight={40}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-6 mt-10">
        <div>
          <h2 className="text-xl font-semibold">Legend with Vehicle SVG</h2>
          <div className="mt-4">
            <LegendWithSVG 
              title="Vehicle Legend" 
              items={legendItems} 
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold">Caption with Vehicle SVG</h2>
          <div className="mt-4">
            <Caption
              icon={vehicleDiagram}
              title="Vehicle Diagram"
              description="Shows the side view of the vehicle with dimensions."
            />
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Usage in FooterBar</h2>
        <p className="mt-2">The LegendCaption component is used in the FooterBar on the left side.</p>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 overflow-auto">
          {`
// In FooterBar.tsx
import LegendCaption from './LegendCaption';

// ...

return (
  <footer className="w-full py-4 bg-white shadow-inner flex items-center justify-between">
    {/* Legend & Caption (Left) */}
    <div className="ml-4">
      <LegendCaption 
        caption={captionText}
        svgWidth={56}
        svgHeight={56}
      />
    </div>
    
    {/* ... rest of the footer ... */}
  </footer>
);
          `}
        </pre>
      </div>
    </div>
  );
};

export default LegendCaptionDemo; 