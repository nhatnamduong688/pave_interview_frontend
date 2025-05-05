import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: number | string;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rowGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  columnGap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Grid component for creating grid layouts
 */
const Grid: React.FC<GridProps> = ({
  children,
  columns = 1,
  gap,
  rowGap,
  columnGap,
  alignItems,
  justifyItems,
  className = '',
  style = {},
}) => {
  // Convert gap sizes to CSS variables
  const getGapSize = (size?: string) => {
    if (!size) return undefined;
    return `var(--spacing-${size})`;
  };

  // Create grid template columns
  const getGridTemplateColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, minmax(0, 1fr))`;
    }
    return columns;
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(),
    gap: getGapSize(gap),
    rowGap: getGapSize(rowGap),
    columnGap: getGapSize(columnGap),
    alignItems,
    justifyItems,
    ...style,
  };

  return (
    <div className={`grid ${className}`} style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid; 