#!/usr/bin/env node
const { execSync } = require('child_process');

// Check if we're running on Vercel
const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;

console.log('Building for', isVercel ? 'Vercel' : 'local environment');
console.log('Skipping TypeScript checking...');

try {
  // Run Vite build directly without TypeScript checks
  // Additional flags for compatibility
  execSync('npx vite build --emptyOutDir', {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Force CI mode
      CI: 'true',
      // Skip TS checks
      SKIP_TYPESCRIPT: 'true',
    },
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
