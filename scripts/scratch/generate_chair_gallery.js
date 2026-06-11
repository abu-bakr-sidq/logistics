const fs = require('fs');
const path = require('path');

const dirPath = 'C:\\mern stack\\Logistics\\public\\images\\Chair Furniture';
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.png'));

let md = '# Chair Furniture Images Gallery\n\n';
files.forEach(f => {
  const absolutePath = path.join(dirPath, f).replace(/\\/g, '/');
  md += `## ${f}\n\n![${f}](file:///${absolutePath})\n\n---\n\n`;
});

fs.writeFileSync('C:\\mern stack\\Logistics\\scratch\\chair_images.md', md, 'utf8');
console.log('Generated chair_images.md successfully!');
