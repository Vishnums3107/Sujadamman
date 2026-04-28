import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import Service from '../models/Service.js';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_UPLOADS_DIR = path.resolve(__dirname, '../uploads/services');

const DEFAULT_SERVICE_IMAGES = {
  Furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
  'Home Essentials': 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop',
  Business: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
};

const hasCloudinaryConfig = () =>
  Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

const ensureLocalUploadsDir = async () => {
  await fs.mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
};

const saveLocalImage = async (file, req) => {
  await ensureLocalUploadsDir();
  const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
  const fileName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
  const filePath = path.join(LOCAL_UPLOADS_DIR, fileName);
  await fs.writeFile(filePath, file.buffer);
  return `${req.protocol}://${req.get('host')}/uploads/services/${fileName}`;
};

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'furniture-services',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      )
      .end(file.buffer);
  });

const getCloudinaryPublicIdFromUrl = (imageUrl) => {
  if (typeof imageUrl !== 'string' || !imageUrl.includes('res.cloudinary.com')) {
    return null;
  }

  const cleanUrl = imageUrl.split('?')[0];
  const fileName = cleanUrl.split('/').pop();
  if (!fileName) return null;

  return `furniture-services/${fileName.split('.')[0]}`;
};

const removeLocalImage = async (imageUrl) => {
  if (typeof imageUrl !== 'string' || !imageUrl.includes('/uploads/services/')) return;

  const fileName = imageUrl.split('/uploads/services/')[1];
  if (!fileName) return;

  const filePath = path.join(LOCAL_UPLOADS_DIR, fileName);
  try {
    await fs.unlink(filePath);
  } catch {
    // Ignore missing file errors during cleanup.
  }
};

const deleteStoredImage = async (imageUrl) => {
  if (!imageUrl) return;

  if (imageUrl.includes('/uploads/services/')) {
    await removeLocalImage(imageUrl);
    return;
  }

  if (!hasCloudinaryConfig()) return;

  const publicId = getCloudinaryPublicIdFromUrl(imageUrl);
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};

const withResolvedImage = (serviceDoc) => {
  const service = serviceDoc?.toObject ? serviceDoc.toObject() : serviceDoc;
  const normalizedImage = typeof service?.image === 'string' ? service.image.trim() : '';

  return {
    ...service,
    image: normalizedImage || DEFAULT_SERVICE_IMAGES[service?.division] || '',
  };
};

const defaultServices = [
  {
    icon: 'FaCouch',
    title: 'Custom Sofa Manufacturing',
    description: 'Premium sofa sets designed for comfort and long-term durability.',
    division: 'Furniture',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaBed',
    title: 'Bed Frame & Cot Production',
    description: 'Strong and modern bed systems for homes and hospitality projects.',
    division: 'Furniture',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaDraftingCompass',
    title: 'Interior Furniture Solutions',
    description: 'End-to-end planning support for coordinated interior furniture.',
    division: 'Furniture',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaIndustry',
    title: 'Private Label Manufacturing',
    description: 'White-label production support for growing retail brands.',
    division: 'Home Essentials',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaTruck',
    title: 'Wholesale Supply',
    description: 'Reliable high-volume supply with consistent dispatch timelines.',
    division: 'Home Essentials',
    image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaTags',
    title: 'Custom Branding',
    description: 'Branding and packaging customization for institutional orders.',
    division: 'Home Essentials',
    image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaHeadset',
    title: 'After-Sales Support',
    description: 'Fast operational support for installation and service follow-up.',
    division: 'Business',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Warranty Services',
    description: 'Structured warranty workflow for eligible products and parts.',
    division: 'Business',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
  },
  {
    icon: 'FaHandshake',
    title: 'Dealer Network Support',
    description: 'Partnership model for dealers and distributors.',
    division: 'Business',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
  },
];

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res) => {
  const totalServices = await Service.countDocuments();
  if (totalServices === 0) {
    await Service.insertMany(defaultServices);
  }

  const query = {};

  if (req.query.division) {
    query.division = req.query.division;
  }

  const services = await Service.find(query).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: services.length,
    data: services.map(withResolvedImage),
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.json({
    success: true,
    data: withResolvedImage(service),
  });
});

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res) => {
  const title = req.body.title?.trim();
  const description = req.body.description?.trim();
  const icon = req.body.icon?.trim() || 'FaBoxes';
  const division = req.body.division?.trim() || 'Furniture';
  const image = typeof req.body.image === 'string' ? req.body.image.trim() : '';

  const service = await Service.create({
    title,
    description,
    icon,
    division,
    image,
  });

  res.status(201).json({
    success: true,
    data: withResolvedImage(service),
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  if (req.body.title !== undefined) {
    service.title = req.body.title?.trim() || service.title;
  }
  if (req.body.description !== undefined) {
    service.description = req.body.description?.trim() || service.description;
  }
  if (req.body.icon !== undefined) {
    service.icon = req.body.icon?.trim() || service.icon;
  }
  if (req.body.division !== undefined) {
    service.division = req.body.division?.trim() || service.division;
  }
  if (req.body.image !== undefined) {
    service.image = typeof req.body.image === 'string' ? req.body.image.trim() : service.image;
  }

  const updatedService = await service.save();

  res.json({
    success: true,
    data: withResolvedImage(updatedService),
  });
});

// @desc    Upload service image
// @route   POST /api/services/:id/image
// @access  Private/Admin
export const uploadServiceImage = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  try {
    const imageUrl = hasCloudinaryConfig()
      ? await uploadToCloudinary(req.file).catch(() => saveLocalImage(req.file, req))
      : await saveLocalImage(req.file, req);

    const previousImage = service.image?.trim();
    service.image = imageUrl;
    await service.save();

    if (previousImage && previousImage !== imageUrl) {
      await deleteStoredImage(previousImage);
    }

    res.json({
      success: true,
      data: withResolvedImage(service),
    });
  } catch (error) {
    res.status(500);
    throw new Error(error?.message || 'Error uploading image');
  }
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  if (service.image) {
    await deleteStoredImage(service.image);
  }

  await service.deleteOne();

  res.json({
    success: true,
    message: 'Service deleted successfully',
  });
});
