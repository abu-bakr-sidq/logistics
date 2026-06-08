const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');
const allProductsStartIdx = content.indexOf('export const allProducts: Product[] =');
const popularProductsStartIdx = content.indexOf('export const popularProducts: Product[] =');

const popularSub = content.substring(popularProductsStartIdx, allProductsStartIdx);
const eqIdx = popularSub.indexOf('=');
const bracketStartIdx = popularSub.indexOf('[', eqIdx);
const arrayContent = popularSub.substring(bracketStartIdx).trim();
const arrayEndIdx = arrayContent.lastIndexOf('];');
const cleanJson = arrayContent.substring(0, arrayEndIdx + 1);

const popularProducts = JSON.parse(cleanJson);
const popularChairs = popularProducts.filter(p => p.category === 'Chair Furniture');
console.log('Popular chairs:', popularChairs.length);
popularChairs.forEach(c => console.log(c.image + ' : ' + c.name));
