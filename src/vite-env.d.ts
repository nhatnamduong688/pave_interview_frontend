/// <reference types="vite/client" />

// SVG imports
declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
