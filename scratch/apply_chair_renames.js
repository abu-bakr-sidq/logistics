const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Find allProducts array definition
const allProductsStartIdx = content.indexOf('export const allProducts: Product[] =');
if (allProductsStartIdx === -1) {
  console.error('Could not find allProducts array definition');
  process.exit(1);
}

const headerText = content.substring(0, allProductsStartIdx);
const allProductsSub = content.substring(allProductsStartIdx);
const eqIdx = allProductsSub.indexOf('=');
const bracketStartIdx = allProductsSub.indexOf('[', eqIdx);
const arrayContent = allProductsSub.substring(bracketStartIdx).trim();
const arrayEndIdx = arrayContent.lastIndexOf('];');
const cleanJson = arrayContent.substring(0, arrayEndIdx + 1);

const allProducts = JSON.parse(cleanJson);
console.log('Original count of allProducts:', allProducts.length);

const nameMap = {
  // 1. Living Room Modern Sofas
  "Chair Furniture/hotel_fabric_wooden_hot_sale.png": "Living Room Modern Sofas",

  // 2. Dining Tables (Screenshot 1 & 3)
  "Chair Furniture/solid_oak_dining_chair_10.png": "Dining Table 6 Seater and 8 Seater",
  "Chair Furniture/metal_folding_chair_28.png": "Dining Table",
  "Chair Furniture/stackable_plastic_caf_chair_27.png": "Dining Table Set",
  "Chair Furniture/stackable_plastic_caf_chair_3.png": "Luxury Wooden dining table",
  "Chair Furniture/adjustable_swivel_bar_stool_15.png": "Luxury Wooden dining table",

  // 3. Row 12 (Screenshot 3)
  "Chair Furniture/mid_century_leather_lounge_chair_13.png": "Dining Chair",
  "Chair Furniture/high_back_pc_gaming_chair_30.png": "Luxury Modern Gaming Chair",
  "Chair Furniture/wedding_chair_6.png": "Wedding Chair",

  // 4. Row 13 (Screenshot 3)
  "Chair Furniture/dressing_table_5.png": "Minor Dressing Table",
  "Chair Furniture/counter_chair_7.png": "Counter Height Bar Stool",
  "Chair Furniture/mid_century_leather_lounge_chair_29.png": "Coffee Table",
  "Chair Furniture/sofa_chair_6.png": "Sofa Chair",

  // 5. Row 14 (Screenshot 3)
  "Chair Furniture/wood_table_2.png": "Wood Table Bench",
  "Chair Furniture/mid_century_leather_lounge_chair_37.png": "Fabric Sofa",
  "Chair Furniture/queen_bed_4.png": "Genuine Leather Sofa",
  "Chair Furniture/high_back_pc_gaming_chair_38.png": "Office Chair High Quality",

  // 6. Row 15 (Screenshot 3)
  "Chair Furniture/stackable_plastic_caf_chair_11.png": "Office Staff Chair",
  "Chair Furniture/high_back_pc_gaming_chair_22.png": "Luxury Office Desk and Chair",
  "Chair Furniture/solid_oak_dining_chair_34.png": "Office Furniture Wooden Staff Workstation",
  "Chair Furniture/ergonomic_office_task_chair_33.png": "Office table",

  // 7. Row 16 (Screenshot 3)
  "Chair Furniture/bean_bag_chair_lounger_32.png": "Side Table Sofa Coffee Table",
  "Chair Furniture/stackable_plastic_caf_chair_35.png": "Round Tea Table",
  "Chair Furniture/adjustable_swivel_bar_stool_31.png": "Light Table Lamp",
  "Chair Furniture/metal_folding_chair_36.png": "Light Table Lamp",
};

let updatedCount = 0;
let defaultCount = 0;

allProducts.forEach(p => {
  if (p.category === 'Chair Furniture') {
    if (nameMap[p.image]) {
      p.name = nameMap[p.image];
      updatedCount++;
    } else {
      p.name = "Modern Chair";
      defaultCount++;
    }
  }
});

console.log(`Updated ${updatedCount} products using nameMap.`);
console.log(`Updated ${defaultCount} products to "Modern Chair".`);

// Write modified array back to products.ts
const newArrayJson = JSON.stringify(allProducts, null, 2);
const outputContent = headerText + 'export const allProducts: Product[] = ' + newArrayJson + ';\n';
fs.writeFileSync('src/data/products.ts', outputContent, 'utf8');

console.log('src/data/products.ts has been successfully updated!');
