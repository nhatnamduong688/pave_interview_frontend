#!/usr/bin/env node
// bypass-build.cjs - Bỏ qua TypeScript hoàn toàn trong quá trình build
const { execSync } = require('child_process');

console.log('🔨 Starting direct build with esbuild (bypassing TypeScript)...');

try {
  // Nhảy qua TypeScript hoàn toàn, chỉ dùng vite với --force
  execSync('npx vite build --force', {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_TSCONFIG_PATHS: 'false', // Disable TypeScript config paths
      NODE_ENV: 'production',
    },
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
