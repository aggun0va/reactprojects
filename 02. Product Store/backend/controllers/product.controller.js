import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('Error in fetching products: ', error.message);
    res.status(500).json({ success: false, message: 'Server Error get api/products' });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Please provide all fields.' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log('Error in Create product: ', error.message);
    // FIXED: Changed from 200 to 500
    res.status(500).json({ success: false, message: 'Server Error post api/products' }); 
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    if (!updateProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error put api/products' });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  // FIXED: Added safety check for invalid ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid Product Id format' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.status(200).json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error delete api/products' });
  }
};
