import asyncHandler from 'express-async-handler';
import Service from '../models/Service.js';

const defaultServices = [
  {
    icon: 'FaCouch',
    title: 'Custom Sofa Manufacturing',
    description: 'Premium sofa sets designed for comfort and long-term durability.',
    division: 'Furniture',
  },
  {
    icon: 'FaBed',
    title: 'Bed Frame & Cot Production',
    description: 'Strong and modern bed systems for homes and hospitality projects.',
    division: 'Furniture',
  },
  {
    icon: 'FaDraftingCompass',
    title: 'Interior Furniture Solutions',
    description: 'End-to-end planning support for coordinated interior furniture.',
    division: 'Furniture',
  },
  {
    icon: 'FaIndustry',
    title: 'Private Label Manufacturing',
    description: 'White-label production support for growing retail brands.',
    division: 'Home Essentials',
  },
  {
    icon: 'FaTruck',
    title: 'Wholesale Supply',
    description: 'Reliable high-volume supply with consistent dispatch timelines.',
    division: 'Home Essentials',
  },
  {
    icon: 'FaTags',
    title: 'Custom Branding',
    description: 'Branding and packaging customization for institutional orders.',
    division: 'Home Essentials',
  },
  {
    icon: 'FaHeadset',
    title: 'After-Sales Support',
    description: 'Fast operational support for installation and service follow-up.',
    division: 'Business',
  },
  {
    icon: 'FaShieldAlt',
    title: 'Warranty Services',
    description: 'Structured warranty workflow for eligible products and parts.',
    division: 'Business',
  },
  {
    icon: 'FaHandshake',
    title: 'Dealer Network Support',
    description: 'Partnership model for dealers and distributors.',
    division: 'Business',
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
    data: services,
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
    data: service,
  });
});

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res) => {
  const { title, description, icon, division } = req.body;

  const service = await Service.create({
    title,
    description,
    icon,
    division,
  });

  res.status(201).json({
    success: true,
    data: service,
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

  service.title = req.body.title || service.title;
  service.description = req.body.description || service.description;
  service.icon = req.body.icon || service.icon;
  service.division = req.body.division || service.division;

  const updatedService = await service.save();

  res.json({
    success: true,
    data: updatedService,
  });
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

  await service.deleteOne();

  res.json({
    success: true,
    message: 'Service deleted successfully',
  });
});
