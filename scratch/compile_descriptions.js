const fs = require('fs');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\descriptive_matches.txt', 'utf8');
const blocks = content.split('=== File: ');

const mappings = {};

blocks.forEach(block => {
  if (!block.trim()) return;
  const lines = block.split('\n');
  const filename = lines[0].split(' ===')[0];
  
  // Find lines that have model comments about what it actually is or matches
  let desc = '';
  lines.forEach(line => {
    const l = line.toLowerCase();
    if (l.includes('is actually') || l.includes('depicts') || l.includes('represents') || l.includes('matches') || l.includes('corresponds') || l.includes('linked to')) {
      // Clean up the snippet
      let cleaned = line.trim();
      if (cleaned.length > desc.length) {
        desc = cleaned;
      }
    }
  });

  if (desc) {
    mappings[filename] = desc;
  }
});

console.log(JSON.stringify(mappings, null, 2));
