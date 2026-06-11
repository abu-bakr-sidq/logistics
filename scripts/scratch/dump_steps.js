const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl';

async function dumpSteps() {
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const step = JSON.parse(line);
    if (step.step_index >= 3840 && step.step_index <= 3885) {
      console.log(`====================== STEP ${step.step_index} (${step.type}) ======================`);
      if (step.thinking) {
        console.log(`THINKING:\n${step.thinking}\n`);
      }
      if (step.content) {
        console.log(`CONTENT:\n${step.content}\n`);
      }
      if (step.tool_calls) {
        console.log(`TOOL CALLS:\n${JSON.stringify(step.tool_calls, null, 2)}\n`);
      }
    }
  }
}

dumpSteps();
