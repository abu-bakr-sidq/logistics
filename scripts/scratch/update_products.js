const fs = require('fs');

// Read products.ts
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Find allProducts array definition
const allProductsStartIdx = content.indexOf('export const allProducts: Product[] =');
const headerText = content.substring(0, allProductsStartIdx);
const allProductsSub = content.substring(allProductsStartIdx);
const eqIdx = allProductsSub.indexOf('=');
const bracketStartIdx = allProductsSub.indexOf('[', eqIdx);
const arrayContent = allProductsSub.substring(bracketStartIdx).trim();
const arrayEndIdx = arrayContent.lastIndexOf('];');
const cleanJson = arrayContent.substring(0, arrayEndIdx + 1);

// Parse the array
const allProducts = JSON.parse(cleanJson);
console.log('Original count of allProducts:', allProducts.length);

// Let's implement the mappings:
// 1. Car Bike Parts And Accessories
const bikeMapping = [
  "Bicycle Pedal",
  "Bicycle Kickstand",
  "Reflective Belt",
  "Gear Tail Hook Parts",
  "Candle Making Kit Set",
  "Motorcycle Handlebar",
  "Bike Handle Bars",
  "Foot Pegs Rest Pedal",
  "Road Bike Freewheel",
  "Metal Parts Aluminum",
  "Linde Forklift Parts",
  "Handlebar Riser Stem",
  "Disc Brake",
  "Racing Gloves",
  "Bike Handles",
  "Driver Seats",
  "Air Suspension Seat",
  "Bike Full Face Mask",
  "Bike Face Mask",
  "Full Face Mask",
  "Full Face Mask",
  "Bat Ear Racing Helmet",
  "Classic Leather Helmet",
  "Spiderman Racing Helmet",
  "Open Face Retro Helmet",
  "Helmet",
  "Open Face Motor Helmet",
  "Motorcycle Helmet",
  "Helmet",
  "Helmet"
];

// Let's filter and check count
let bikeIdx = 0;
allProducts.forEach(p => {
  if (p.category === "Car Bike Parts & Accessories" || p.image.startsWith("Car Bike Parts And Accessories/")) {
    if (bikeIdx < bikeMapping.length) {
      p.name = bikeMapping[bikeIdx];
      bikeIdx++;
    }
  }
});
console.log('Mapped Car Bike Parts And Accessories:', bikeIdx);

// 2. Boxes
const boxesMapping = [
  "Wooden Storage Basket",
  "Wheeled Storage Box",
  "Disposable Lunch Box",
  "Paper Taco Box",
  "Chicken Packaging Boxes",
  "Noodles Food Container",
  "Cheap Eco-friendly Box",
  "Triangular Pizza Box",
  "Gift-Get-Box",
  "Paper Food Packaging Box",
  "Coffee Box",
  "Packaging Paper Coffee Box",
  "Paper Packaging Boxes",
  "Pasta/Noodle Boxes",
  "Cat Litter Box for Large Cat",
  "Jewelry Box Storage",
  "Cat Litter Box",
  "Colour Packaging Cardboard",
  "Lunch Box",
  "Plastic Stackable Storage Box",
  "Fast Food Packaging Box",
  "Disposable Fast Food Boxes",
  "Customizable Jewelry Box",
  "Fast Food Container Box",
  "Toy Storage Box",
  "Heavy Duty Moving Carton Box",
  "Gift Box Contains Card",
  "Self Seal Logistics Paper Boxes",
  "Paper Bag for Clothes",
  "Customized Shoe Box Folding",
  "Magnet Boxes Matte Paper Gift Box"
];

let boxesIdx = 0;
allProducts.forEach(p => {
  if (p.category === "Boxes" || p.image.startsWith("boxes/")) {
    if (boxesIdx < boxesMapping.length) {
      p.name = boxesMapping[boxesIdx];
      boxesIdx++;
    }
  }
});
console.log('Mapped Boxes:', boxesIdx);

// 3. Bottles
const bottlesMapping = [
  "Portable Protein Holder",
  "Yoga Drinking Mug",
  "Kids Cartoon Water Bottle",
  "Kids Water Bottle",
  "Tumbler Cup Bottle",
  "Cute Bear Water Bottles",
  "Dumbbell Shaped Water Bottle",
  "Donut Water Bottle",
  "Portable Glass Bottle",
  "Strap Push Button Bottle",
  "Straw Water Bottle",
  "Sports PC Water Bottle",
  "Gift Set Bottle",
  "Portable Drinking Bottle",
  "Glass Water Bottle",
  "Children's Cute Water Bottle",
  "Big Straw Bottle",
  "Belly Water Bottle",
  "Folding Water Bottle",
  "Cute Panda Bottle",
  "Student Water Bottle",
  "Sport Glass Bottle",
  "Creative Water Bottle",
  "Glass Water Bottle",
  "Sports Bottle",
  "Glass bottles for drinking water",
  "Bottles for GYM",
  "Stainless steel water bottle",
  "Bottles for water",
  "Bottles for juice business"
];

let bottlesIdx = 0;
allProducts.forEach(p => {
  if (p.category === "Bottles" || p.image.startsWith("bottles/")) {
    if (bottlesIdx < bottlesMapping.length) {
      p.name = bottlesMapping[bottlesIdx];
      bottlesIdx++;
    }
  }
});
console.log('Mapped Bottles:', bottlesIdx);

// 4. Cell Phones Accessories
const cellMapping = [
  "Ceramic Mug",
  "Ceramic Art Vase",
  "Waterproof Mobile Case",
  "Waterproof Cell Bags",
  "Sport Phone Armband",
  "Running Arm Belt",
  "Swim Cell Phone Pouch",
  "Portable Cellphone Holder",
  "Phone Grip Holder",
  "Mobile GRIP",
  "Fast Charger",
  "Phone Strap",
  "Mobile Mount Phone Holders",
  "Cell Phone Stand",
  "Mobile Phone Bag Case",
  "Tripod Selfie Stick",
  "Neck Strap Shockproof",
  "Nylon Phone Bag",
  "Cell Phone Holder",
  "Magnetic Phone Holder",
  "Lens Protector",
  "Cell Phone Holder",
  "Cell Phone Holder",
  "Wall Mounted Storage Box",
  "Wall Mounted Phone Plug Holder",
  "Wall Charger Hook",
  "20W Type c Type-c Fast Charging",
  "Usb C Type C Charger Cable",
  "USB C PD Fast Charging",
  "US Power Pop-Up Socket",
  "Cell Phone Ring Holder",
  "Mobile Phone Stand"
];

let cellIdx = 0;
allProducts.forEach(p => {
  if (p.category === "Cell Phones Accessories" || p.image.startsWith("Cell Phones Accessories/")) {
    if (cellIdx < cellMapping.length) {
      p.name = cellMapping[cellIdx];
      cellIdx++;
    }
  }
});
console.log('Mapped Cell Phones Accessories:', cellIdx);

// 5. Ceramic
const ceramicMapping = [
  "Ceramic Mug",
  "Ceramic Art Vase",
  "Cartoon Ceramic Mug",
  "Ceramic Product",
  "Ceramic Espresso Cup",
  "Ceramic Bowls",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Japanese Plates",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Ceramic Product",
  "Flower Pottery",
  "Ceramic Coffee Cup",
  "Ceramic Vase",
  "Ceramic Vase French",
  "Ceramic Flower",
  "Ceramic Ginger Jar",
  "Creative Curved Ceramic",
  "Ceramic Espresso",
  "Ceramic Mugs",
  "Mugs ceramic",
  "Ceramic Snack Bowl"
];

let ceramicIdx = 0;
allProducts.forEach(p => {
  if (p.category === "Ceramic" || p.image.startsWith("ceramic/")) {
    if (ceramicIdx < ceramicMapping.length) {
      p.name = ceramicMapping[ceramicIdx];
      ceramicIdx++;
    }
  }
});
console.log('Mapped Ceramic:', ceramicIdx);

// Write modified array back to products.ts
const newArrayJson = JSON.stringify(allProducts, null, 2);

const outputContent = headerText + 'export const allProducts: Product[] = ' + newArrayJson + ';\n';
fs.writeFileSync('src/data/products.ts', outputContent, 'utf8');
console.log('Products file src/data/products.ts updated successfully!');
