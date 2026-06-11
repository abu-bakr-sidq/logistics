const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\mern stack\\Logistics\\public\\images';
const unmatchedSizes = [2397999, 2729410, 3258965, 3927088, 3582907];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push({ path: fullPath, size: stat.size });
    }
  });
  return results;
}

const allImages = walk(rootDir);
console.log('Searching matches in all public/images directories:');
unmatchedSizes.forEach(targetSize => {
  const match = allImages.find(img => img.size === targetSize);
  if (match) {
    console.log(`Size ${targetSize} matches ${match.path}`);
  } else {
    // Look for close sizes (within 100 bytes)
    const closeMatches = allImages.filter(img => Math.abs(img.size - targetSize) < 5000);
    if (closeMatches.length > 0) {
      console.log(`Size ${targetSize} close matches:`);
      closeMatches.forEach(m => console.log(`  - ${m.path} (size: ${m.size}, diff: ${m.size - targetSize})`));
    } else {
      console.log(`Size ${targetSize} has absolutely no match`);
    }
  }
});
