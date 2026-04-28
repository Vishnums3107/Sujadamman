import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaChevronDown, FaFilter, FaSearch } from 'react-icons/fa';
import { categoryService, productService } from '../services';
import ProductGrid from '../components/product/ProductGrid';
import ProductSkeleton from '../components/ProductSkeleton';
import Modal from '../components/ui/Modal';
import Container from '../components/ui/Container';
import Input from '../components/ui/Input';
import OptimizedImage from '../components/ui/OptimizedImage';
import { getProductImage } from '../data/productImage';

const PRICE_TIERS = {
  budget: { label: 'Budget Picks', min: '0', max: '5000' },
  premium: { label: 'Premium Picks', min: '25000', max: '' },
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const pageNumbers = useMemo(
    () => Array.from({ length: pagination.pages || 0 }, (_, index) => index + 1),
    [pagination.pages]
  );

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    priceTier: searchParams.get('priceTier') || '',
    page: parseInt(searchParams.get('page'), 10) || 1,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getCategories();
        setCategories(res.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          ...(filters.search ? { search: filters.search } : {}),
          ...(filters.category ? { category: filters.category } : {}),
          ...(filters.minPrice ? { minPrice: filters.minPrice } : {}),
          ...(filters.maxPrice ? { maxPrice: filters.maxPrice } : {}),
          limit: 18,
          page: filters.page,
        };

        const res = await productService.getProducts(params);
        setProducts(res.data || []);
        setPagination(res.pagination || {});
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const updateParams = (nextFilters) => {
    const params = {};
    Object.entries(nextFilters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    setSearchParams(params);
  };

  const updateFilter = (key, value) => {
    const next = { ...filters, [key]: value, page: 1 };

    if (key === 'priceTier') {
      const selectedTier = PRICE_TIERS[value];
      if (selectedTier) {
        next.minPrice = selectedTier.min;
        next.maxPrice = selectedTier.max;
      } else {
        next.minPrice = '';
        next.maxPrice = '';
      }
    }

    if ((key === 'minPrice' || key === 'maxPrice') && filters.priceTier) {
      next.priceTier = '';
    }

    setFilters(next);
    updateParams(next);
  };

  const changePage = (page) => {
    const next = { ...filters, page };
    setFilters(next);
    updateParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    const reset = { search: '', category: '', minPrice: '', maxPrice: '', priceTier: '', page: 1 };
    setFilters(reset);
    setSearchParams({});
  };

  const FiltersPanel = (
    <div className="bg-white border border-black/10 rounded-2xl shadow-md p-5 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg flex items-center gap-2"><FaFilter className="text-primary-red" /> Filters</h2>
        <button onClick={clearFilters} className="text-sm text-primary-red font-semibold">Clear</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-black mb-2 block">Search</label>
          <div className="relative">
            <Input
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search products"
              className="pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-2 block">Category</label>
          <select className="input-field" value={filters.category} onChange={(e) => updateFilter('category', e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-2 block">Price Tier</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateFilter('priceTier', 'budget')}
              className={`rounded-lg px-3 py-2 text-xs font-semibold border transition ${filters.priceTier === 'budget' ? 'bg-primary-red text-white border-primary-red' : 'bg-white border-black/10 text-black hover:border-primary-red/40'}`}
            >
              Budget (<span aria-hidden>₹</span>5,000)
            </button>
            <button
              type="button"
              onClick={() => updateFilter('priceTier', 'premium')}
              className={`rounded-lg px-3 py-2 text-xs font-semibold border transition ${filters.priceTier === 'premium' ? 'bg-primary-red text-white border-primary-red' : 'bg-white border-black/10 text-black hover:border-primary-red/40'}`}
            >
              Premium (25,000+)
            </button>
          </div>
          {filters.priceTier ? (
            <button
              type="button"
              onClick={() => updateFilter('priceTier', '')}
              className="mt-2 text-xs font-semibold text-primary-red"
            >
              Remove price tier
            </button>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-medium text-black mb-2 block">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              placeholder="Min"
            />
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              placeholder="Max"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Tip: Search for "budget" or "premium" to match curated descriptions.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-10 bg-[#F8F8F8] min-h-screen">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-black">Products</h1>
          <div className="h-[2px] w-16 bg-primary-red mx-auto mt-3" />
          <p className="text-gray-600 mt-4">Browse premium furniture and home essentials.</p>
        </div>

        <div className="mb-5 lg:hidden">
          <button
            onClick={() => setShowMobileFilters((prev) => !prev)}
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm"
          >
            <span className="font-semibold flex items-center gap-2"><FaFilter className="text-primary-red" /> Filters</span>
            <FaChevronDown className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>{FiltersPanel}</aside>

          <section>
            <div className="bg-white border border-black/10 rounded-xl px-4 py-3 mb-6 shadow-sm">
              <p className="text-sm text-gray-600">
                {pagination.total ? `Showing ${products.length} of ${pagination.total} products` : 'No products found'}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => <ProductSkeleton key={item} />)}
              </div>
            ) : products.length ? (
              <>
                <ProductGrid products={products} onQuickView={setQuickViewProduct} />
                {pagination.pages > 1 && (
                  <div className="mt-10 flex justify-center items-center gap-2">
                    <button
                      className="px-4 py-2 bg-white border border-black/10 rounded-lg text-sm"
                      disabled={filters.page === 1}
                      onClick={() => changePage(filters.page - 1)}
                    >
                      Previous
                    </button>
                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className={`w-10 h-10 rounded-lg text-sm font-semibold border ${filters.page === pageNumber ? 'bg-primary-red text-white border-primary-red' : 'bg-white border-black/10 text-black'}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      className="px-4 py-2 bg-white border border-black/10 rounded-lg text-sm"
                      disabled={filters.page === pagination.pages}
                      onClick={() => changePage(filters.page + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white border border-black/10 rounded-2xl p-14 text-center shadow-sm">
                <div className="text-6xl">🪑</div>
                <p className="font-bold text-2xl mt-4">No matching products</p>
                <p className="text-gray-600 mt-2">Try adjusting your filters to explore more products.</p>
                <button onClick={clearFilters} className="btn-primary mt-6">Reset Filters</button>
              </div>
            )}
          </section>
        </div>
      </Container>

      <Modal open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} title={quickViewProduct?.name || 'Quick View'}>
        {quickViewProduct ? (
          <div className="space-y-4">
            <OptimizedImage
              src={getProductImage(quickViewProduct, 0)}
              alt={quickViewProduct.name}
              loading="eager"
              className="w-full h-64 object-cover rounded-xl"
            />
            <p className="text-gray-600">{quickViewProduct.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-red">₹{quickViewProduct.price?.toLocaleString?.()}</span>
              <Link to={`/products/${quickViewProduct._id}`} className="btn-primary" onClick={() => setQuickViewProduct(null)}>
                Open Details
              </Link>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Products;
