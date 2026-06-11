const fs = require('fs');
const path = require('path');

const tempDir = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.tempmediaStorage';
const chairDir = 'C:\\mern stack\\Logistics\\public\\images\\Chair Furniture';

const tempSizes = new Set(fs.readdirSync(tempDir).map(f => fs.statSync(path.join(tempDir, f)).size));

const chairFiles = fs.readdirSync(chairDir);
console.log('Chair files with no size match in temp storage:');
chairFiles.forEach(f => {
  const size = fs.statSync(path.join(chairDir, f)).size;
  if (!tempSizes.has(size)) {
    console.log(`- ${f} (size: ${size})`);
  }
});
