const fs = require('fs');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', 'utf8');
const blocks = content.split('=== File: ');

blocks.forEach(block => {
  if (!block.trim()) return;
  const lines = block.split('\n');
  const filename = lines[0].split(' ===')[0];
  
  // Find any step that has a detailed "Model Thinking" snippet containing "breakthrough" or "depicts" or "matches" or "corresponds" or "is actually" or "linked"
  const mappings = [];
  lines.forEach(line => {
    if (line.includes('Thinking snippet:') && (
      line.includes('breakthrough') || 
      line.includes('depicts') || 
      line.includes('matches') || 
      line.includes('corresponds') || 
      line.includes('is actually') || 
      line.includes('linked') ||
      line.includes('represents')
    )) {
      mappings.push(line.trim());
    }
  });

  if (mappings.length > 0) {
    console.log(`File: ${filename}`);
    mappings.forEach(m => console.log(`  - ${m}`));
    console.log('---');
  }
});
