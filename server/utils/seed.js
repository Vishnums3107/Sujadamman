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
        description: 'Premium L-shaped sofa with upscale fabric upholstery and deep seating for large living rooms.',
        price: 45000,
        category: furnitureCategories[0]._id,
        stock: 10,
        featured: true,
        images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Classic 3-Seater Sofa',
        description: 'Premium 3-seater sofa with elegant silhouette, durable frame, and plush cushioning.',
        price: 32000,
        category: furnitureCategories[0]._id,
        stock: 15,
        featured: false,
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Compact 2-Seater Fabric Sofa',
        description: 'Budget-friendly 2-seater sofa with space-saving design and breathable fabric finish.',
        price: 25500,
        category: furnitureCategories[0]._id,
        stock: 18,
        featured: false,
        images: ['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Recliner Sofa Set',
        description: 'Premium luxury recliner sofa set with padded armrests and ergonomic lumbar support.',
        price: 68000,
        category: furnitureCategories[0]._id,
        stock: 6,
        featured: true,
        images: ['https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=800&fit=crop'],
      },
      // Beds
      {
        name: 'King Size Wooden Bed',
        description: 'Premium solid wood king bed with elegant detailing and integrated storage drawers.',
        price: 55000,
        category: furnitureCategories[1]._id,
        stock: 8,
        featured: true,
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Queen Size Platform Bed',
        description: 'Premium queen platform bed with upholstered headboard and clean modern profile.',
        price: 38000,
        category: furnitureCategories[1]._id,
        stock: 12,
        featured: false,
        images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Hydraulic Storage Bed',
        description: 'Premium contemporary bed with hydraulic lift-up storage for blankets and essentials.',
        price: 47000,
        category: furnitureCategories[1]._id,
        stock: 9,
        featured: true,
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Minimalist Single Bed',
        description: 'Budget-friendly single bed frame with clean lines, ideal for guest rooms and studios.',
        price: 21000,
        category: furnitureCategories[1]._id,
        stock: 14,
        featured: false,
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop'],
      },
      // Mattresses
      {
        name: 'Memory Foam Mattress - King',
        description: 'Premium memory foam mattress with cooling gel technology and pressure-point relief.',
        price: 28000,
        category: homeEssentialsCategories[0]._id,
        stock: 20,
        featured: true,
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Orthopedic Mattress - Queen',
        description: 'Budget-friendly orthopedic mattress with reliable support for better spinal alignment.',
        price: 22000,
        category: homeEssentialsCategories[0]._id,
        stock: 25,
        featured: false,
        images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Latex Comfort Mattress - Double',
        description: 'Premium natural latex mattress with pressure-relief support and breathable top layer.',
        price: 26500,
        category: homeEssentialsCategories[0]._id,
        stock: 16,
        featured: true,
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Pocket Spring Mattress - Queen',
        description: 'Premium pocket spring mattress that reduces motion transfer for uninterrupted sleep.',
        price: 24500,
        category: homeEssentialsCategories[0]._id,
        stock: 19,
        featured: false,
        images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop'],
      },
      // Water Bottles
      {
        name: 'Stainless Steel Water Bottle 1L',
        description: 'Budget-friendly insulated stainless steel bottle that keeps drinks cold for 24 hours.',
        price: 899,
        category: homeEssentialsCategories[1]._id,
        stock: 100,
        featured: true,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Glass Water Bottle 750ml',
        description: 'Budget-friendly borosilicate glass water bottle with protective sleeve.',
        price: 649,
        category: homeEssentialsCategories[1]._id,
        stock: 150,
        featured: false,
        images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Copper Water Bottle 900ml',
        description: 'Premium hammered copper bottle with leak-proof cap and traditional wellness appeal.',
        price: 1199,
        category: homeEssentialsCategories[1]._id,
        stock: 95,
        featured: true,
        images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Kids Flip-Top Bottle 500ml',
        description: 'Budget-friendly BPA-free bottle with flip-top straw and carry loop for school use.',
        price: 499,
        category: homeEssentialsCategories[1]._id,
        stock: 180,
        featured: false,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=800&fit=crop'],
      },
      // Tiffin Boxes
      {
        name: 'Stainless Steel Tiffin Box 3-Tier',
        description: 'Budget-friendly 3-tier stainless steel tiffin with leak-proof containers.',
        price: 1299,
        category: homeEssentialsCategories[2]._id,
        stock: 80,
        featured: true,
        images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Insulated Lunch Box',
        description: 'Budget-friendly thermal insulated lunch box that keeps food hot or cold for hours.',
        price: 1599,
        category: homeEssentialsCategories[2]._id,
        stock: 60,
        featured: false,
        images: ['https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Bento Lunch Box 4-Compartment',
        description: 'Budget-friendly bento lunch box with separate compartments and locking clips.',
        price: 899,
        category: homeEssentialsCategories[2]._id,
        stock: 110,
        featured: true,
        images: ['https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Microwave Safe Meal Prep Box Set',
        description: 'Budget-friendly set of stackable meal prep boxes, microwave-safe and dishwasher-friendly.',
        price: 749,
        category: homeEssentialsCategories[2]._id,
        stock: 140,
        featured: false,
        images: ['https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200&h=800&fit=crop'],
      },
      // Sales-led assortment expansion (high-volume essentials + premium anchors)
      {
        name: 'Everyday Comfort 3-Seater Sofa',
        description: 'Budget-friendly 3-seater sofa designed for daily family use and repeat demand.',
        price: 29500,
        category: furnitureCategories[0]._id,
        stock: 24,
        featured: false,
        images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Premium Italian Leather Sofa',
        description: 'Premium leather sofa crafted for executive spaces and high-ticket sales.',
        price: 89000,
        category: furnitureCategories[0]._id,
        stock: 5,
        featured: true,
        images: ['https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Family Storage Bed - Queen',
        description: 'Premium queen bed with large under-bed storage, aligned to strong family-home demand.',
        price: 42500,
        category: furnitureCategories[1]._id,
        stock: 16,
        featured: true,
        images: ['https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Compact Hostel Single Bed',
        description: 'Budget-friendly single bed for student housing and bulk business orders.',
        price: 17999,
        category: furnitureCategories[1]._id,
        stock: 28,
        featured: false,
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Hotel Grade Mattress - Queen',
        description: 'Premium queen mattress optimized for hospitality projects and repeat institutional sales.',
        price: 33500,
        category: homeEssentialsCategories[0]._id,
        stock: 14,
        featured: true,
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Economy Foam Mattress - Single',
        description: 'Budget-friendly foam mattress with dependable comfort for high-volume turnover.',
        price: 9999,
        category: homeEssentialsCategories[0]._id,
        stock: 35,
        featured: false,
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Sports Sipper Bottle 1L',
        description: 'Budget-friendly sports bottle with quick-sip nozzle, a reliable fast-moving SKU.',
        price: 599,
        category: homeEssentialsCategories[1]._id,
        stock: 260,
        featured: false,
        images: ['https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Smart Temperature Bottle 500ml',
        description: 'Premium insulated bottle with LED temperature display for upsell-focused sales.',
        price: 1899,
        category: homeEssentialsCategories[1]._id,
        stock: 90,
        featured: true,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Office Meal Box Duo Pack',
        description: 'Budget-friendly dual lunch box set tailored for daily office commuters.',
        price: 699,
        category: homeEssentialsCategories[2]._id,
        stock: 230,
        featured: false,
        images: ['https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=1200&h=800&fit=crop'],
      },
      {
        name: 'Premium Steel Executive Tiffin',
        description: 'Premium stainless executive tiffin with thermal layers for corporate customers.',
        price: 2199,
        category: homeEssentialsCategories[2]._id,
        stock: 70,
        featured: true,
        images: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=800&fit=crop'],
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
