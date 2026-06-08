const fs = require('fs');
const path = require('path');

const tempDir = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.tempmediaStorage';
const files = fs.readdirSync(tempDir).map(f => {
  const stat = fs.statSync(path.join(tempDir, f));
  return { name: f, size: stat.size, mtime: stat.mtime };
}).sort((a, b) => b.mtime - a.mtime); // Newest first

console.log('Temp media files sorted by mtime (newest first):');
files.forEach(f => {
  console.log(`${f.name}: size=${f.size}, mtime=${f.mtime.toISOString()}`);
});
