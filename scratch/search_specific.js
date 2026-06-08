const fs = require('fs');

const content = fs.readFileSync('C:\\mern stack\\Logistics\\scratch\\search_utf8.txt', 'utf8');
const blocks = content.split('=== File: ');

const targets = ['stackable_plastic_caf_chair_3.png', 'adjustable_swivel_bar_stool_15.png'];

targets.forEach(target => {
  console.log(`==== Search for ${target} ====`);
  blocks.forEach(block => {
    if (block.startsWith(target)) {
      console.log(block.substring(0, 1500));
      console.log('--------------------------------------------------');
    }
  });
});
