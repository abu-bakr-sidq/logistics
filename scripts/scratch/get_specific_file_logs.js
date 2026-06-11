const fs = require('fs');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', 'utf8');
const blocks = content.split('=== File: ');

blocks.forEach(block => {
  if (!block.trim()) return;
  const lines = block.split('\n');
  const filename = lines[0].split(' ===')[0];
  
  if (filename === 'stackable_plastic_caf_chair_3.png' || filename === 'adjustable_swivel_bar_stool_15.png') {
    console.log(`=== File: ${filename} ===`);
    lines.forEach(line => {
      if (line.includes('Thinking snippet:') || line.includes('Content snippet:')) {
        console.log(`  ${line.trim()}`);
      }
    });
    console.log('');
  }
});
