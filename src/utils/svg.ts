import React from 'react';

/**
 * Creates an SVG React element from raw SVG string content
 * @param svgContent The raw SVG string
 * @param props Additional props to apply to the SVG element
 * @returns React element with the SVG content
 */
export const createSvgElement = (
  svgContent: string, 
  props: React.SVGProps<SVGSVGElement> = {}
): React.ReactElement => {
  // Parse the SVG content to extract the SVG attributes
  const svgMatch = svgContent.match(/<svg[^>]*>/);
  if (!svgMatch) {
    throw new Error('Invalid SVG content');
  }

  // Extract existing attributes
  const attributesRegex = /(\w+)=["']([^"']*)["']/g;
  const attributes: Record<string, string> = {};
  let match;
  while ((match = attributesRegex.exec(svgMatch[0])) !== null) {
    const [, name, value] = match;
    attributes[name] = value;
  }

  // Extract inner content
  const innerContent = svgContent
    .replace(svgMatch[0], '')
    .replace('</svg>', '');

  // Create SVG element with combined attributes and inner content
  return React.createElement(
    'svg',
    {
      ...attributes,
      ...props,
      dangerouslySetInnerHTML: { __html: innerContent }
    }
  );
};

/**
 * Example of using imported SVG files as React components
 */
export const SVGExample = () => {
  // Import SVG files using Vite's import mechanism
  // Example usage:
  // import svgContent from '@/assets/svg/icon.svg?raw';
  // 
  // Then use:
  // const SvgIcon = createSvgElement(svgContent, { width: 24, height: 24 });
  // return <div>{SvgIcon}</div>;
  
  return null;
}; 