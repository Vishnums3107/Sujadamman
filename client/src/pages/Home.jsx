import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryService, productService } from '../services';
import ProductGrid from '../components/product/ProductGrid';
import ProductSkeleton from '../components/ProductSkeleton';

const Home = () => {
  const [sampleProducts, setSampleProducts] = useState([]);
  const [samplesLoading, setSamplesLoading] = useState(true);

  useEffect(() => {
    const fetchSampleProducts = async () => {
      setSamplesLoading(true);
      try {
        const categoriesRes = await categoryService.getCategories();
        const categories = categoriesRes?.data || [];

        if (!categories.length) {
          setSampleProducts([]);
          return;
        }

        const perCategoryRequests = categories.map((category) =>
          productService.getProducts({ category: category._id, limit: 2 })
        );

        const productsByCategory = await Promise.allSettled(perCategoryRequests);
        const merged = productsByCategory.flatMap((result) =>
          result.status === 'fulfilled' ? result.value?.data || [] : []
        );

        if (merged.length > 0) {
          setSampleProducts(merged);
          return;
        }

        const fallbackProducts = await productService.getProducts({ limit: 6 });
        setSampleProducts(fallbackProducts?.data || []);
      } catch (error) {
        console.error('Error fetching sample products:', error);
        setSampleProducts([]);
      } finally {
        setSamplesLoading(false);
      }
    };

    fetchSampleProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="bg-black text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl font-heading font-black leading-tight"
          >
            Bold Furniture for
            <span className="block text-gold-400">Modern Living</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Explore handcrafted furniture and home essentials built for comfort, durability, and modern everyday living.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products" className="btn-primary">Explore Collection</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Shop by Category</h2>
          <div className="section-accent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {['Sofas', 'Beds', 'Home Essentials'].map((name) => (
              <div key={name} className="card-elevated p-6 bg-white border border-black/10">
                <p className="text-xs uppercase tracking-wider text-primary-red font-semibold">Category</p>
                <h3 className="text-2xl font-bold mt-2">{name}</h3>
                <p className="text-gray-600 mt-2">Premium quality and timeless design for your space.</p>
                <Link to="/products" className="inline-block mt-5 text-primary-red font-semibold hover:underline">
                  Browse
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Sample Products from All Categories</h2>
          <div className="section-accent" />

          {samplesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : sampleProducts.length ? (
            <div className="mt-10">
              <ProductGrid products={sampleProducts} />
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">Product samples are not available right now.</p>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">See All Products</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Why Customers Choose Us</h2>
          <div className="section-accent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="card-elevated p-6 bg-white border border-black/10">
              <p className="text-xs uppercase tracking-wider text-primary-red font-semibold">Quality Focus</p>
              <h3 className="text-2xl font-bold mt-2">Premium Materials</h3>
              <p className="text-gray-600 mt-2">Every product is selected with attention to craftsmanship, long-term usability, and finish consistency.</p>
            </div>
            <div className="card-elevated p-6 bg-white border border-black/10">
              <p className="text-xs uppercase tracking-wider text-primary-red font-semibold">Design Support</p>
              <h3 className="text-2xl font-bold mt-2">Space-Friendly Solutions</h3>
              <p className="text-gray-600 mt-2">From compact apartments to larger homes, we help you choose practical layouts and coordinated pieces.</p>
            </div>
            <div className="card-elevated p-6 bg-white border border-black/10">
              <p className="text-xs uppercase tracking-wider text-primary-red font-semibold">Reliable Service</p>
              <h3 className="text-2xl font-bold mt-2">End-to-End Assistance</h3>
              <p className="text-gray-600 mt-2">Our team supports you from product discovery through purchase guidance and after-sales assistance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">How We Help You Furnish Better</h2>
          <div className="section-accent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold">Simple Buying Journey</h3>
              <ul className="mt-5 space-y-4 text-gray-700">
                <li><span className="font-semibold text-black">1. Discover:</span> Browse curated product categories with clear pricing and images.</li>
                <li><span className="font-semibold text-black">2. Compare:</span> Use product details to evaluate materials, style, and dimensions.</li>
                <li><span className="font-semibold text-black">3. Connect:</span> Reach our team for personalized recommendations and support.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary">Browse Products</Link>
                <Link to="/services" className="btn-outline">View Services</Link>
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold">At a Glance</h3>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="rounded-xl border border-black/10 p-4">
                  <p className="text-3xl font-black text-primary-red">100+</p>
                  <p className="text-sm text-gray-600 mt-1">Products Across Categories</p>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <p className="text-3xl font-black text-primary-red">3</p>
                  <p className="text-sm text-gray-600 mt-1">Core Service Divisions</p>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <p className="text-3xl font-black text-primary-red">24/7</p>
                  <p className="text-sm text-gray-600 mt-1">Support Inquiry Access</p>
                </div>
                <div className="rounded-xl border border-black/10 p-4">
                  <p className="text-3xl font-black text-primary-red">1</p>
                  <p className="text-sm text-gray-600 mt-1">Dedicated Team for Guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
