const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl';

async function searchLogs() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  for await (const line of rl) {
    lineCount++;
    if (line.includes('Dining Table 6 Seater') || line.includes('high_back_pc_gaming_chair_22') || line.includes('solid_oak_dining_chair_34')) {
      console.log(`Line ${lineCount}:`);
      // truncate print to avoid flooding
      const lineStr = line.length > 500 ? line.substring(0, 500) + '...' : line;
      console.log(lineStr);
    }
  }
}

searchLogs();
