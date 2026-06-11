const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Find allProducts array
const allProductsStartIdx = content.indexOf('export const allProducts: Product[] =');
const allProductsSub = content.substring(allProductsStartIdx);
const eqIdx = allProductsSub.indexOf('=');
const bracketStartIdx = allProductsSub.indexOf('[', eqIdx);
const arrayContent = allProductsSub.substring(bracketStartIdx).trim();
const arrayEndIdx = arrayContent.lastIndexOf('];');
const cleanJson = arrayContent.substring(0, arrayEndIdx + 1);

const allProducts = JSON.parse(cleanJson);

console.log('Search results for "Dining Table":');
allProducts.forEach((p, idx) => {
  if (p.name.toLowerCase().includes('dining table') || p.image.toLowerCase().includes('dining_table')) {
    console.log(`Index ${idx}: name="${p.name}", image="${p.image}", category="${p.category}"`);
  }
});
