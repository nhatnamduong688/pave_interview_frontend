#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Đường dẫn đến các file
const srcFile = path.join(process.cwd(), 'src/data/initialData.temp.ts');
const destFile = path.join(process.cwd(), 'src/data/initialData.ts');

// Kiểm tra xem file tạm có tồn tại không
if (!fs.existsSync(srcFile)) {
  console.error('File initialData.temp.ts không tồn tại!');
  process.exit(1);
}

// Thay thế file
try {
  const content = fs.readFileSync(srcFile, 'utf8');
  fs.writeFileSync(destFile, content);
  console.log('Đã thay thế initialData.ts thành công!');
} catch (error) {
  console.error('Lỗi khi thay thế file:', error);
  process.exit(1);
}
