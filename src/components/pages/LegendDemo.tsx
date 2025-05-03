import React from 'react';
import { LegendWithSVG } from '@/components/molecules/Legend/LegendWithSVG';
import { Caption } from '@/components/molecules/Caption';
import { createSvgElement } from '@/utils/svg';

// In a real implementation, you would import your SVG files like this:
// import circleIconSvg from '@/assets/svg/circle-icon.svg?raw';
// import squareIconSvg from '@/assets/svg/square-icon.svg?raw';

// For this example, we'll use placeholder SVGs
const circleIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="8" fill="#4299E1" />
</svg>`;

const squareIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="4" width="16" height="16" fill="#F56565" />
</svg>`;

const triangleIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 4L20 18H4L12 4Z" fill="#68D391" />
</svg>`;

const infoIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="#4A5568" stroke-width="2"/>
  <path d="M12 7V12" stroke="#4A5568" stroke-width="2" stroke-linecap="round"/>
  <circle cx="12" cy="16" r="1" fill="#4A5568"/>
</svg>`;

const LegendDemo: React.FC = () => {
  // Create SVG elements
  const circleIcon = createSvgElement(circleIconSvg);
  const squareIcon = createSvgElement(squareIconSvg);
  const triangleIcon = createSvgElement(triangleIconSvg);
  const infoIcon = createSvgElement(infoIconSvg);
  
  const legendItems = [
    { icon: circleIcon, label: 'Circle Item' },
    { icon: squareIcon, label: 'Square Item' },
    { icon: triangleIcon, label: 'Triangle Item' },
  ];

  return (
    <div className="legend-demo" style={{ padding: '20px' }}>
      <h1>Legend & Caption Components</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '20px' }}>
        <div>
          <h2>Legend Component</h2>
          <LegendWithSVG 
            title="Chart Legend" 
            items={legendItems} 
          />
        </div>
        
        <div>
          <h2>Caption Component</h2>
          <Caption
            icon={infoIcon}
            title="Important Information"
            description="This is an example of a caption with an SVG icon. Use captions to provide context or explanations."
          />
          
          <Caption
            icon={circleIcon}
            title="Circle Caption"
            description="The circle represents data points in the chart."
          />
        </div>
      </div>
      
      <h2 style={{ marginTop: '40px' }}>How to use with your SVG files:</h2>
      <pre style={{ background: '#f0f0f0', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
        {`
// 1. Import your SVG files (exported from Figma)
import yourSvgIcon from '@/assets/svg/your-icon.svg?raw';

// 2. Create SVG elements using the utility
const svgElement = createSvgElement(yourSvgIcon, { 
  width: 24, 
  height: 24,
  // Add any additional SVG props here
});

// 3. Use them in components
const legendItems = [
  { icon: svgElement, label: 'Your Legend Item' },
  // Add more items...
];

// Legend component
<LegendWithSVG items={legendItems} />

// Caption component
<Caption
  icon={svgElement}
  title="Your Caption Title"
  description="Your caption description"
/>
        `}
      </pre>
    </div>
  );
};

export default LegendDemo; 