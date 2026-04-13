const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataDir = path.resolve(__dirname, '../../data');
const productsFile = path.join(dataDir, 'products.json');

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(productsFile);
  } catch (_error) {
    await fs.writeFile(productsFile, '[]', 'utf8');
  }
}

async function readProducts() {
  await ensureStore();
  const raw = await fs.readFile(productsFile, 'utf8');
  return JSON.parse(raw);
}

async function writeProducts(products) {
  await ensureStore();
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2), 'utf8');
}

async function createProduct({ title, description, price, imageUrl, ownerId }) {
  const products = await readProducts();
  const now = new Date().toISOString();

  const product = {
    id: `local-${uuidv4()}`,
    title,
    description,
    price: Number(price),
    image: imageUrl,
    ownerId,
    createdAt: now,
    updatedAt: now
  };

  products.unshift(product);
  await writeProducts(products);

  return product;
}

async function listProducts() {
  return readProducts();
}

async function getProductById(productId) {
  const products = await readProducts();
  return products.find((product) => product.id === productId) || null;
}

module.exports = {
  createProduct,
  listProducts,
  getProductById
};
