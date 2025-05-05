#!/usr/bin/env node
// bypass-build.cjs - Bỏ qua TypeScript hoàn toàn trong quá trình build
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build with permissive TypeScript settings...');

// Đường dẫn đến các file cấu hình
const originalTsConfigPath = path.join(process.cwd(), 'tsconfig.json');
const vercelTsConfigPath = path.join(process.cwd(), 'tsconfig.vercel.json');
const backupTsConfigPath = path.join(process.cwd(), 'tsconfig.original.json');

try {
  // Backup file tsconfig.json gốc
  if (fs.existsSync(originalTsConfigPath)) {
    console.log('Backing up original tsconfig.json...');
    fs.copyFileSync(originalTsConfigPath, backupTsConfigPath);
  }

  // Thay thế bằng file tsconfig.vercel.json
  if (fs.existsSync(vercelTsConfigPath)) {
    console.log('Using tsconfig.vercel.json for build...');
    fs.copyFileSync(vercelTsConfigPath, originalTsConfigPath);
  }

  // Chạy build với cấu hình TypeScript lỏng lẻo
  execSync('npx vite build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
} finally {
  // Khôi phục lại file tsconfig.json gốc
  if (fs.existsSync(backupTsConfigPath)) {
    console.log('Restoring original tsconfig.json...');
    fs.copyFileSync(backupTsConfigPath, originalTsConfigPath);
    fs.unlinkSync(backupTsConfigPath);
  }
}
