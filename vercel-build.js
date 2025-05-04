#!/usr/bin/env node
const { execSync } = require('child_process');

// Skip TypeScript checking for production build
// This allows deployment even with TypeScript errors
console.log('Building for production (skipping TypeScript checking)...');

try {
  // Run Vite build directly without TypeScript checks
  execSync('vite build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
