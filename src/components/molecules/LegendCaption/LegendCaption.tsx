import React from 'react';
import vehicleDiagramSvg from '../../../assets/svg/vehicle-diagram-legend.svg?raw';

interface LegendCaptionProps {
  caption?: string;
  className?: string;
}

// Design tokens
const DESIGN_TOKENS = {
  GAP_8: '8px',  // Gap/8 token
  WIDTH: 253,    // Width as a number without px
  HEIGHT: 126.61526489257812
};

/**
 * LegendCaption component - displays the vehicle diagram SVG with optional caption text embedded in the SVG
 * Follows Figma specs (Frame 97)
 */
const LegendCaption: React.FC<LegendCaptionProps> = ({
  caption,
  className = '',
}) => {
  // Create SVG with embedded caption
  const createSvgWithCaption = () => {
    try {
      // Parse the original SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(vehicleDiagramSvg, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      // Maintain aspect ratio but fit within the container
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

      // Get or set viewBox to ensure proper scaling
      if (!svgElement.hasAttribute('viewBox')) {
        // If no viewBox exists, create one based on original dimensions
        const originalWidth = svgElement.getAttribute('width') || '100';
        const originalHeight = svgElement.getAttribute('height') || '100';
        svgElement.setAttribute('viewBox', `0 0 ${originalWidth} ${originalHeight}`);
      }

      // If there's a caption, add it to the SVG
      if (caption) {
        // Create text element for the caption
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', '50%');
        textElement.setAttribute('y', '90%'); // Position below the diagram
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('font-family', 'monospace');
        textElement.setAttribute('font-size', '12');
        textElement.setAttribute('fill', '#4A5568');

        // Split caption by newlines and create tspan elements
        const lines = caption.split('\n');
        lines.forEach((line, index) => {
          const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
          tspan.setAttribute('x', '50%');
          tspan.setAttribute('dy', index === 0 ? '0' : '1.2em');
          tspan.textContent = line;
          textElement.appendChild(tspan);
        });

        // Add text element to SVG
        // svgElement.appendChild(textElement);
      }

      // Return the modified SVG as a string
      return new XMLSerializer().serializeToString(svgDoc);
    } catch (error) {
      console.error('Error modifying SVG:', error);
      return vehicleDiagramSvg; // Return original if there's an error
    }
  };

  return (
    <div
      className={`${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        padding: 0,
        gap: DESIGN_TOKENS.GAP_8,
        width: DESIGN_TOKENS.WIDTH,
        height: DESIGN_TOKENS.HEIGHT,
        flex: 'none',
        order: 0,
        flexGrow: 0,
        overflow: 'hidden',
        backgroundColor: '#fff', // Add background color to visualize the container
        borderRadius: '4px', // Optional: add slight rounding
      }}
    >
      <div
        style={{
          width: '90%', // Use 90% of container to avoid stretching to edges
          height: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        dangerouslySetInnerHTML={{ __html: createSvgWithCaption() }}
      />
    </div>
  );
};

export default LegendCaption;
