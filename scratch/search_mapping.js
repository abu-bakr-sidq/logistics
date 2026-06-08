const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl';

async function searchMapping() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('Dining Table Set') || line.includes('Luxury Modern Gaming Chair') || line.includes('Office Furniture Wooden Staff Workstation')) {
      const step = JSON.parse(line);
      console.log(`Step ${step.step_index}: type=${step.type}`);
      if (step.content) {
        console.log(step.content.substring(0, 1000));
      }
      if (step.tool_calls) {
        console.log(JSON.stringify(step.tool_calls).substring(0, 1000));
      }
      console.log('===');
    }
  }
}

searchMapping();
