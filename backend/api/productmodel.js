const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Product = require('../models/Product');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// @route POST /api/products
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      count: parseInt(req.body.count),
      image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: err.message });
  }
});

// Export the router
module.exports = router;

// Other routes (get, update, etc.) can remain as is.
