#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Backup tsconfig.json
const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
let originalTsconfig = null;

// Đường dẫn đến các file initialData
const srcFile = path.join(process.cwd(), 'src/data/initialData.temp.ts');
const destFile = path.join(process.cwd(), 'src/data/initialData.ts');
let originalInitialData = null;

try {
  console.log('Starting force build process...');

  // Thay thế file initialData.ts nếu có file tạm
  if (fs.existsSync(srcFile)) {
    // Backup file gốc
    if (fs.existsSync(destFile)) {
      originalInitialData = fs.readFileSync(destFile, 'utf8');
    }

    // Thay thế bằng file tạm
    const content = fs.readFileSync(srcFile, 'utf8');
    fs.writeFileSync(destFile, content);
    console.log('Đã thay thế initialData.ts thành công!');
  }

  // Backup tsconfig if it exists
  if (fs.existsSync(tsconfigPath)) {
    originalTsconfig = fs.readFileSync(tsconfigPath, 'utf8');
    console.log('Backing up original tsconfig.json');

    // Create a minimal tsconfig that ignores type checking
    const minimalTsconfig = {
      compilerOptions: {
        noEmit: true,
        skipLibCheck: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        noImplicitAny: false,
        strict: false,
        allowJs: true,
        checkJs: false,
      },
      include: ['src'],
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(minimalTsconfig, null, 2));
    console.log('Created minimal tsconfig.json that ignores type errors');
  }

  // Run vite build
  console.log('Running vite build...');
  execSync('npx vite build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      SKIP_TYPESCRIPT: 'true',
    },
  });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} finally {
  // Restore original files
  if (originalTsconfig) {
    console.log('Restoring original tsconfig.json');
    fs.writeFileSync(tsconfigPath, originalTsconfig);
  }

  if (originalInitialData) {
    console.log('Restoring original initialData.ts');
    fs.writeFileSync(destFile, originalInitialData);
  }
}
