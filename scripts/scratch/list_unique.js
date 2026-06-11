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
const uniq = Array.from(new Set(allProducts.filter(p => p.category === 'Chair Furniture').map(p => p.image)));
console.log('Unique images:', uniq.length);
uniq.forEach((img, idx) => console.log(`${idx + 1}: ${img}`));
