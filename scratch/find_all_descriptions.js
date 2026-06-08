const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', 'utf8');
const blocks = content.split('=== File: ');

const filenames = fs.readdirSync('public/images/Chair Furniture');

filenames.forEach(filename => {
  let found = [];
  blocks.forEach(block => {
    if (block.startsWith(filename)) {
      const lines = block.split('\n');
      lines.forEach(line => {
        const l = line.toLowerCase();
        if (l.includes('actually') || l.includes('depicts') || l.includes('represents') || l.includes('matches') || l.includes('corresponds') || l.includes('screenshot') || l.includes('card')) {
          found.push(line.trim());
        }
      });
    }
  });
  if (found.length > 0) {
    console.log(`=== File: ${filename} ===`);
    Array.from(new Set(found)).forEach(f => console.log(`  ${f}`));
    console.log('');
  }
});
