import React from 'react';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Flex component for creating flexible layouts
 */
const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'stretch',
  gap,
  className = '',
  style = {},
}) => {
  // Convert justify and align values to CSS values
  const getJustifyContent = () => {
    switch (justify) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      case 'evenly': return 'space-evenly';
      default: return justify;
    }
  };

  const getAlignItems = () => {
    switch (align) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      default: return align;
    }
  };

  // Convert gap sizes to CSS variables
  const getGapSize = (gap?: string) => {
    if (!gap) return undefined;
    return `var(--spacing-${gap})`;
  };

  const flexStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: getJustifyContent(),
    alignItems: getAlignItems(),
    gap: getGapSize(gap),
    ...style,
  };

  return (
    <div className={`flex ${className}`} style={flexStyle}>
      {children}
    </div>
  );
};

export default Flex; 