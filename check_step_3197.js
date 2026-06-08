const fs = require('fs');

// We saved PopularProductsSection_ver_12.tsx earlier, but wait, the cleanup script deleted it!
// Oh, the cleanup script deleted SourcingProcessSection_ver_* and PopularProductsSection_ver_*.
// But wait! We can search for Step 3197's VIEW_FILE log in transcript.jsonl again!
// Let's write a script that parses transcript.jsonl and extracts the VIEW_FILE log at Step 3197.

const logPath = "C:\\Users\\jabub\\.gemini\\antigravity\\brain\\60877896-39e8-4427-b594-1abdf9d0ceef\\.system_generated\\logs\\transcript.jsonl";

async function main() {
  const readline = require('readline');
  const fileStream = fs.createReadStream(logPath, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let data;
    try {
      data = JSON.parse(line);
    } catch (e) { continue; }

    if (data.step_index === 3197 && data.type === "VIEW_FILE") {
      const content = data.content || "";
      console.log(`=== VIEW_FILE at Step 3197 ===`);
      console.log(`Contains inquiryProduct: ${content.includes('inquiryProduct')}`);
      console.log(`Contains inquiryForm: ${content.includes('inquiryForm')}`);
      console.log(`Contains submitted: ${content.includes('submitted')}`);
      console.log(`Contains modal code: ${content.includes('RFQ CONSOLE')}`);
      console.log(`Contains Request Custom Quote: ${content.includes('Request Custom Quote')}`);
      console.log(`Contains Inquire Sourcing: ${content.includes('Inquire Sourcing')}`);
    }
  }
}

main();
