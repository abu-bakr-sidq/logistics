const fs = require('fs');
const path = require('path');
const readline = require('readline');

const chairDir = 'C:\\mern stack\\Logistics\\public\\images\\Chair Furniture';
const logPath = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl';

const chairFiles = fs.readdirSync(chairDir).filter(f => f.endsWith('.png'));

async function searchAll() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const steps = [];
  for await (const line of rl) {
    steps.push(JSON.parse(line));
  }

  let out = '';
  chairFiles.forEach(file => {
    out += `=== File: ${file} ===\n`;
    let found = false;
    steps.forEach(s => {
      const content = s.content || '';
      const thinking = s.thinking || '';
      if (content.includes(file) || thinking.includes(file)) {
        found = true;
        out += `  Step ${s.step_index} (${s.type}):\n`;
        if (s.thinking && s.thinking.includes(file)) {
          const idx = s.thinking.indexOf(file);
          const snippet = s.thinking.substring(Math.max(0, idx - 100), Math.min(s.thinking.length, idx + file.length + 150));
          out += `    Thinking snippet: ...${snippet}...\n`;
        }
        if (s.content && s.content.includes(file)) {
          const idx = s.content.indexOf(file);
          const snippet = s.content.substring(Math.max(0, idx - 100), Math.min(s.content.length, idx + file.length + 150));
          out += `    Content snippet: ...${snippet}...\n`;
        }
      }
    });
    if (!found) {
      out += '  NOT FOUND IN LOGS\n';
    }
  });

  fs.writeFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', out, 'utf8');
  console.log('Written scratch/search_utf8.txt');
}

searchAll();
