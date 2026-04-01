import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: categories,
    count: categories.length,
  });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    // Get products count for this category
    const productCount = await Product.countDocuments({ category: category._id });

    res.json({
      success: true,
      data: {
        ...category.toObject(),
        productCount,
      },
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, type, description } = req.body;

  // Check if category exists
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({
    name,
    type,
    description,
  });

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = req.body.name || category.name;
    category.type = req.body.type || category.type;
    category.description = req.body.description || category.description;

    const updatedCategory = await category.save();

    res.json({
      success: true,
      data: updatedCategory,
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    // Check if category has products
    const productCount = await Product.countDocuments({ category: category._id });

    if (productCount > 0) {
      res.status(400);
      throw new Error(
        `Cannot delete category. It has ${productCount} product(s) associated with it.`
      );
    }

    // Delete image from cloudinary if exists
    if (category.image) {
      try {
        const publicId = category.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`furniture-categories/${publicId}`);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Category not found');
  }
});

// @desc    Upload category image
// @route   POST /api/categories/:id/image
// @access  Private/Admin
export const uploadCategoryImage = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  // Delete old image if exists
  if (category.image) {
    try {
      const publicId = category.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`furniture-categories/${publicId}`);
    } catch (error) {
      console.error('Error deleting old image:', error);
    }
  }

  // Upload new image
  const uploadPromise = new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'furniture-categories',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      )
      .end(req.file.buffer);
  });

  try {
    const imageUrl = await uploadPromise;
    category.image = imageUrl;
    await category.save();

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error uploading image');
  }
});
