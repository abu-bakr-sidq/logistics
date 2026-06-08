const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tempDir = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.tempmediaStorage';
const logPath = 'C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl';

const tempFiles = fs.readdirSync(tempDir).map(f => {
  const stat = fs.statSync(path.join(tempDir, f));
  return { name: f, size: stat.size, mtime: stat.mtime };
});

async function mapFiles() {
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
  tempFiles.forEach(tf => {
    const mtimeMs = tf.mtime.getTime();
    const matchingStep = steps.find(s => {
      if (s.type === 'VIEW_FILE' && s.created_at) {
        const stepTime = new Date(s.created_at).getTime();
        return Math.abs(stepTime - mtimeMs) < 10000;
      }
      return false;
    });

    if (matchingStep) {
      const modelStep = steps.find(s => s.step_index === matchingStep.step_index - 1);
      out += `Temp File: ${tf.name} (size: ${tf.size})\n`;
      out += `Mapped Step: ${matchingStep.step_index} (tool call)\n`;
      if (modelStep) {
        out += `Model Thinking: ${modelStep.thinking || 'None'}\n`;
        out += `Model Content: ${modelStep.content || 'None'}\n`;
      }
      out += '--------------------------------------------------\n';
    } else {
      out += `Temp File: ${tf.name} (size: ${tf.size}) -> No matching step found\n`;
      out += '--------------------------------------------------\n';
    }
  });

  fs.writeFileSync('C:\\mern stack\\Logistics\\scratch\\mapped_thinking.txt', out, 'utf8');
  console.log('Written scratch/mapped_thinking.txt');
}

mapFiles();
