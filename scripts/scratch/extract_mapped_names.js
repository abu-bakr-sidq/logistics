const fs = require('fs');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', 'utf8');
const blocks = content.split('=== File: ');

blocks.forEach(block => {
  if (!block.trim()) return;
  const lines = block.split('\n');
  const filename = lines[0].split(' ===')[0];
  
  // Find any line containing "depicts", "matches", "represents", "is Card", "is the", "table lamp", "sofa", etc.
  const relevantLines = [];
  lines.forEach(line => {
    const l = line.toLowerCase();
    if (l.includes('depicts') || l.includes('matches') || l.includes('represents') || l.includes('is card') || l.includes('is the') || l.includes('dining table') || l.includes('table lamp') || l.includes('sofa') || l.includes('chair') || l.includes('bar stool') || l.includes('dressing table')) {
      relevantLines.push(line.trim());
    }
  });

  if (relevantLines.length > 0) {
    console.log(`File: ${filename}`);
    relevantLines.forEach(rl => console.log(`  - ${rl}`));
    console.log('---');
  }
});
