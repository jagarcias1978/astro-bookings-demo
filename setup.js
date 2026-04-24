const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Create src directory
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
  console.log('Created src directory');
}

// Create index.ts
const indexPath = path.join(srcDir, 'index.ts');
fs.writeFileSync(indexPath, 'console.log("Hello from TypeScript!");\n');
console.log('Created src/index.ts');

// Create dist directory (for output)
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
}

console.log('Setup complete!');
