const fs = require('fs');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', 'utf8');
const blocks = content.split('=== File: ');

const keywords = ['depicts', 'matches', 'represents', 'is card', 'is the', 'dining table', 'table lamp', 'sofa', 'chair', 'bar stool', 'dressing table', 'bench', 'bed', 'desk', 'workstation', 'work station', 'acrylic', 'green and grey', 'heart-back', 'nesting'];

  let out = '';
  blocks.forEach(block => {
    if (!block.trim()) return;
    const lines = block.split('\n');
    const filename = lines[0].split(' ===')[0];
    
    const matches = [];
    lines.forEach(line => {
      const l = line.toLowerCase();
      const hasKeyword = keywords.some(k => l.includes(k));
      const isDescriptive = !l.includes('category=') && !l.includes('sizebytes') && !l.includes('image=') && !l.includes('dirpath') && !l.includes('filepath');
      if (hasKeyword && isDescriptive) {
        matches.push(line.trim());
      }
    });

    if (matches.length > 0) {
      out += `=== File: ${filename} ===\n`;
      const uniqueMatches = Array.from(new Set(matches));
      uniqueMatches.forEach(m => {
        out += `  ${m}\n`;
      });
      out += '\n';
    }
  });

  fs.writeFileSync('C:\\mern stack\\Logistics\\scratch\\descriptive_matches.txt', out, 'utf8');
  console.log('Written scratch/descriptive_matches.txt');
