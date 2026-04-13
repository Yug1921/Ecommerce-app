const fs = require('fs/promises');
const { isValidImageFile } = require('../utils/imageValidation');

function uploadProductImage(req, res, next) {
  const run = async () => {
    if (!req.file) {
      return next({ statusCode: 400, message: 'Image file is required' });
    }

    const isValidImage = await isValidImageFile(req.file.path);
    if (!isValidImage) {
      await fs.unlink(req.file.path).catch(() => null);
      return next({ statusCode: 400, message: 'Uploaded file is not a valid image' });
    }

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/products/${req.file.filename}`
      }
    });
  };

  run().catch(next);
}

module.exports = {
  uploadProductImage
};
