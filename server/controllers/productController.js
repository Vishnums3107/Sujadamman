import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop';

const withResolvedImages = (productDoc) => {
  const product = productDoc.toObject ? productDoc.toObject() : productDoc;
  const normalizedImages = Array.isArray(product.images)
    ? product.images.filter((image) => typeof image === 'string' && image.trim())
    : [];

  if (normalizedImages.length > 0) {
    return { ...product, images: normalizedImages };
  }

  const categoryImage =
    product?.category && typeof product.category === 'object' && typeof product.category.image === 'string'
      ? product.category.image.trim()
      : '';

  return {
    ...product,
    images: [categoryImage || DEFAULT_PRODUCT_IMAGE],
  };
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build query
  const query = {};

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by featured
  if (req.query.featured) {
    query.featured = req.query.featured === 'true';
  }

  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
  }

  // Search by name or description
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Execute query
  const products = await Product.find(query)
    .populate('category', 'name type image')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments(query);

  res.json({
    success: true,
    data: products.map(withResolvedImages),
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'category',
    'name type description image'
  );

  if (product) {
    res.json({
      success: true,
      data: withResolvedImages(product),
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, featured } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    featured: featured || false,
    images: [],
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
    product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;

    const updatedProduct = await product.save();

    res.json({
      success: true,
      data: updatedProduct,
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Delete images from cloudinary
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        try {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error('Error deleting image from Cloudinary:', error);
        }
      }
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private/Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('Please upload at least one image');
  }

  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'furniture-products',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        )
        .end(file.buffer);
    });
  });

  try {
    const imageUrls = await Promise.all(uploadPromises);
    product.images = [...product.images, ...imageUrls];
    await product.save();

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error uploading images');
  }
});

// @desc    Delete product image
// @route   DELETE /api/products/:id/images
// @access  Private/Admin
export const deleteProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { imageUrl } = req.body;

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!imageUrl) {
    res.status(400);
    throw new Error('Please provide image URL');
  }

  // Remove from database
  product.images = product.images.filter((img) => img !== imageUrl);
  await product.save();

  // Delete from Cloudinary
  try {
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`furniture-products/${publicId}`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }

  res.json({
    success: true,
    data: product,
  });
});
