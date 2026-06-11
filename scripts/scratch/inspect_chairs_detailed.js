const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');
const allProductsStartIdx = content.indexOf('export const allProducts: Product[] =');
const allProductsSub = content.substring(allProductsStartIdx);
const eqIdx = allProductsSub.indexOf('=');
const bracketStartIdx = allProductsSub.indexOf('[', eqIdx);
const arrayContent = allProductsSub.substring(bracketStartIdx).trim();
const arrayEndIdx = arrayContent.lastIndexOf('];');
const cleanJson = arrayContent.substring(0, arrayEndIdx + 1);

const allProducts = JSON.parse(cleanJson);

let chairIdx = 0;
allProducts.forEach((p, idx) => {
  if (p.category === 'Chair Furniture') {
    chairIdx++;
    console.log(`ChairIdx=${chairIdx} ArrayIdx=${idx} image="${p.image}" name="${p.name}"`);
  }
});
