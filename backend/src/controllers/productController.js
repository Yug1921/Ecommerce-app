const fs = require('fs/promises');
const { createProduct, listProducts, getProductById } = require('../services/productStore');
const { isValidImageFile } = require('../utils/imageValidation');

async function createCatalogProduct(req, res, next) {
  try {
    if (!req.file) {
      return next({ statusCode: 400, message: 'Product image is required' });
    }

    const isValidImage = await isValidImageFile(req.file.path);
    if (!isValidImage) {
      await fs.unlink(req.file.path).catch(() => null);
      return next({ statusCode: 400, message: 'Uploaded file is not a valid image' });
    }

    const { title, description, price } = req.body;
    const imageUrl = `/uploads/products/${req.file.filename}`;

    const product = await createProduct({
      title,
      description,
      price,
      imageUrl,
      ownerId: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: {
        product
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function getCatalogProducts(_req, res, next) {
  try {
    const products = await listProducts();
    return res.json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function getCatalogProductById(req, res, next) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return next({ statusCode: 404, message: 'Product not found' });
    }

    return res.json({
      success: true,
      data: {
        product
      }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createCatalogProduct,
  getCatalogProducts,
  getCatalogProductById
};
