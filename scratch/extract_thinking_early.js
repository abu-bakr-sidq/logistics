const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl';

async function extractThinking() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const step = JSON.parse(line);
    if (step.step_index >= 3840 && step.step_index <= 3876) {
      if (step.thinking) {
        console.log(`Step ${step.step_index}:`);
        console.log(step.thinking);
        console.log('---');
      }
    }
  }
}

extractThinking();
