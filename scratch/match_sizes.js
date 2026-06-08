const fs = require('fs');
const path = require('path');

const tempDir = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.tempmediaStorage';
const chairDir = 'C:\\mern stack\\Logistics\\public\\images\\Chair Furniture';

const tempFiles = fs.readdirSync(tempDir).map(f => {
  const s = fs.statSync(path.join(tempDir, f)).size;
  return { name: f, size: s };
});

const chairFiles = fs.readdirSync(chairDir).map(f => {
  const s = fs.statSync(path.join(chairDir, f)).size;
  return { name: f, size: s };
});

console.log('Matches by size:');
tempFiles.forEach(t => {
  const match = chairFiles.find(c => c.size === t.size);
  if (match) {
    console.log(`${t.name} (size: ${t.size}) matches ${match.name}`);
  } else {
    console.log(`${t.name} (size: ${t.size}) HAS NO MATCH`);
  }
});
