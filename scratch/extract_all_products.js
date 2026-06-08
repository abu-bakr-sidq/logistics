const fs = require('fs');

// Read the products.ts content
let content = fs.readFileSync('src/data/products.ts', 'utf8');

// Strip TypeScript annotations and exports to make it valid JS
// We will replace "export type Product = { ... };" with empty string
content = content.replace(/export type Product = [\s\S]*?};/, '');
// Replace "export const popularProducts: Product[] =" with "const popularProducts ="
content = content.replace(/export const popularProducts:\s*Product\[\]\s*=/g, 'const popularProducts =');
// Replace "export const allProducts: Product[] =" with "const allProducts ="
content = content.replace(/export const allProducts:\s*Product\[\]\s*=/g, 'const allProducts =');

// Add a line to export the arrays as commonjs
content += '\nmodule.exports = { popularProducts, allProducts };';

// Write to a temporary file
fs.writeFileSync('scratch/temp_products.js', content, 'utf8');

// Now load it and dump all products
const { allProducts } = require('./temp_products.js');
console.log('Total products in allProducts:', allProducts.length);

const categories = [...new Set(allProducts.map(p => p.category))];
console.log('Categories:', categories);

// Dump all products to scratch/all_products_dump.json
fs.writeFileSync('scratch/all_products_dump.json', JSON.stringify(allProducts, null, 2), 'utf8');
console.log('Dumped all products to scratch/all_products_dump.json');
