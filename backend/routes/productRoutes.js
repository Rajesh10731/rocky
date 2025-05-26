const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// @route POST /api/products/add (with image upload)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      count: parseInt(req.body.count),
      image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Error adding product with image:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const { count } = req.body;
  try {
    await Product.findByIdAndUpdate(req.params.id, { count });
    res.json({ message: 'Count updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route POST /api/products/add-bulk
router.post('/add-bulk', async (req, res) => {
  try {
    const products = req.body;
    const inserted = await Product.insertMany(products);
    res.status(200).json({ message: 'Products inserted', data: inserted });
  } catch (error) {
    console.error("Error inserting products:", error);
    res.status(500).json({ message: 'Failed to insert products', error });
  }
});


// ✅ @route DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Optional: delete the image file from the server
    if (product.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(product.image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn('Image deletion failed:', err.message);
        }
      });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
