const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const tempDir = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.tempmediaStorage';
const unmatched = [
  'media_60877896-39e8-4427-b594-1abdf9d0ceef_1780913884989.png',
  'media_60877896-39e8-4427-b594-1abdf9d0ceef_1780913912985.png',
  'media_60877896-39e8-4427-b594-1abdf9d0ceef_1780914000730.png',
  'media_60877896-39e8-4427-b594-1abdf9d0ceef_1780914098296.png',
  'media_60877896-39e8-4427-b594-1abdf9d0ceef_1780914273934.png'
];

async function inspect() {
  for (const f of unmatched) {
    const filePath = path.join(tempDir, f);
    if (fs.existsSync(filePath)) {
      try {
        const metadata = await sharp(filePath).metadata();
        console.log(`${f}: size=${fs.statSync(filePath).size}, width=${metadata.width}, height=${metadata.height}`);
      } catch (err) {
        console.log(`Error reading ${f}: ${err.message}`);
      }
    } else {
      console.log(`${f} does not exist`);
    }
  }
}

inspect();
