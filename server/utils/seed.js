import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Data cleared...');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@furniture.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Admin user created...');

    // Create categories
    const furnitureCategories = await Category.insertMany([
      {
        name: 'Sofas',
        type: 'Furniture',
        description: 'Comfortable and stylish sofas for your living room',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
      },
      {
        name: 'Beds',
        type: 'Furniture',
        description: 'Quality beds for a good night sleep',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop',
      },
    ]);

    const homeEssentialsCategories = await Category.insertMany([
      {
        name: 'Mattresses',
        type: 'Home Essentials',
        description: 'Premium mattresses for ultimate comfort',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
      },
      {
        name: 'Water Bottles',
        type: 'Home Essentials',
        description: 'Eco-friendly and durable water bottles',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=400&fit=crop',
      },
      {
        name: 'Tiffin Boxes',
        type: 'Home Essentials',
        description: 'Stylish and practical lunch boxes',
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600&h=400&fit=crop',
      },
    ]);

    console.log('Categories created...');

    // Create sample products
    const sampleProducts = [
      // Sofas
      {
        name: 'Modern L-Shape Sofa',
        description: 'Spacious L-shaped sofa with premium fabric upholstery. Perfect for large living rooms.',
        price: 45000,
        category: furnitureCategories[0]._id,
        stock: 10,
        featured: true,
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc'],
      },
      {
        name: 'Classic 3-Seater Sofa',
        description: 'Elegant 3-seater sofa with comfortable cushioning and durable frame.',
        price: 32000,
        category: furnitureCategories[0]._id,
        stock: 15,
        featured: false,
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7'],
      },
      // Beds
      {
        name: 'King Size Wooden Bed',
        description: 'Solid wood king size bed with elegant design and storage drawers.',
        price: 55000,
        category: furnitureCategories[1]._id,
        stock: 8,
        featured: true,
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'],
      },
      {
        name: 'Queen Size Platform Bed',
        description: 'Modern platform bed with upholstered headboard.',
        price: 38000,
        category: furnitureCategories[1]._id,
        stock: 12,
        featured: false,
        images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c'],
      },
      // Mattresses
      {
        name: 'Memory Foam Mattress - King',
        description: 'Premium memory foam mattress with cooling gel technology.',
        price: 28000,
        category: homeEssentialsCategories[0]._id,
        stock: 20,
        featured: true,
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304'],
      },
      {
        name: 'Orthopedic Mattress - Queen',
        description: 'Orthopedic support mattress for better spinal alignment.',
        price: 22000,
        category: homeEssentialsCategories[0]._id,
        stock: 25,
        featured: false,
        images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25'],
      },
      // Water Bottles
      {
        name: 'Stainless Steel Water Bottle 1L',
        description: 'Insulated stainless steel bottle keeps drinks cold for 24 hours.',
        price: 899,
        category: homeEssentialsCategories[1]._id,
        stock: 100,
        featured: true,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8'],
      },
      {
        name: 'Glass Water Bottle 750ml',
        description: 'Eco-friendly borosilicate glass water bottle with protective sleeve.',
        price: 649,
        category: homeEssentialsCategories[1]._id,
        stock: 150,
        featured: false,
        images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504'],
      },
      // Tiffin Boxes
      {
        name: 'Stainless Steel Tiffin Box 3-Tier',
        description: 'Traditional 3-tier stainless steel tiffin with leak-proof containers.',
        price: 1299,
        category: homeEssentialsCategories[2]._id,
        stock: 80,
        featured: true,
        images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf'],
      },
      {
        name: 'Insulated Lunch Box',
        description: 'Thermal insulated lunch box keeps food hot or cold for hours.',
        price: 1599,
        category: homeEssentialsCategories[2]._id,
        stock: 60,
        featured: false,
        images: ['https://images.unsplash.com/photo-1562095241-8c6714fd4178'],
      },
    ];

    await Product.insertMany(sampleProducts);

    console.log('Sample products created...');
    console.log('\n=================================');
    console.log('Database seeded successfully!');
    console.log('=================================');
    console.log('\nAdmin Credentials:');
    console.log('Email: admin@furniture.com');
    console.log('Password: admin123');
    console.log('=================================\n');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
