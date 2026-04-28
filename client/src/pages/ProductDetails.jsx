import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { productService } from '../services';
import LoadingSpinner from '../components/LoadingSpinner';
import Container from '../components/ui/Container';
import OptimizedImage from '../components/ui/OptimizedImage';
import { getPrimaryWhatsAppNumber } from '../data/companyProfiles';
import { getProductImage } from '../data/productImage';
import { getLocalProductById, LOCAL_PRODUCTS } from '../data/localProducts';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const localProduct = getLocalProductById(id);
        if (localProduct) {
          setProduct(localProduct);
          const localRelated = LOCAL_PRODUCTS.filter(
            (item) => item._id !== id && item.category?.type === localProduct.category?.type
          );
          setRelatedProducts(localRelated.slice(0, 8));
          return;
        }

        const res = await productService.getProduct(id);
        setProduct(res.data);

        if (res.data?.category?._id) {
          const relatedRes = await productService.getProducts({ category: res.data.category._id, limit: 8 });
          setRelatedProducts((relatedRes.data || []).filter((item) => item._id !== id));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const buildInquiryMessage = () => {
    if (!product) return '';

    const productUrl = `${window.location.origin}${window.location.pathname}#/products/${product._id || id}`;
    const availability = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';

    return [
      'Hi, I am interested in this product.',
      '',
      `Product: ${product.name}`,
      `Price: Rs. ${product.price.toLocaleString()}`,
      `Availability: ${availability}`,
      `Link: ${productUrl}`,
    ].join('\n');
  };

  const inquireWhatsApp = () => {
    if (!product) return;
    const phoneNumber = getPrimaryWhatsAppNumber();
    if (!phoneNumber) {
      toast.error('WhatsApp number is not available right now.');
      return;
    }

    const message = buildInquiryMessage();

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <LoadingSpinner />;
  if (!product) return null;

  const images = product.images?.length ? product.images : [getProductImage(product, 0)];

  return (
    <div className="bg-[#F8F8F8] min-h-screen py-8">
      <Container>
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-black hover:text-primary-red mb-6">
          <FaArrowLeft /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <div className="bg-white border border-black/10 rounded-2xl shadow-md overflow-hidden">
              <OptimizedImage
                src={images[selectedImage]}
                alt={product.name}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-[460px] object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border ${selectedImage === index ? 'border-primary-red' : 'border-black/10'}`}
                  >
                    <OptimizedImage src={image} alt={`${product.name} ${index + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 }}
            className="lg:sticky lg:top-24 bg-white border border-black/10 rounded-2xl p-6 shadow-md"
          >
            {product.featured ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-700 border border-gold-300 mb-3">
                Featured Product
              </span>
            ) : null}
            <h1 className="text-3xl font-heading font-bold leading-tight">{product.name}</h1>
            <p className="text-primary-red text-4xl font-black mt-4">Rs. {product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>

            <div className="mt-6 border-b border-black/10 flex gap-2">
              {['description', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 ${activeTab === tab ? 'border-primary-red text-black' : 'border-transparent text-gray-500'}`}
                >
                  {tab === 'description' ? 'Description' : 'Specifications'}
                </button>
              ))}
            </div>

            <div className="mt-4 text-gray-700 leading-relaxed">
              {activeTab === 'description' ? (
                <p>{product.description}</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  <li><span className="font-semibold">Category:</span> {product.category?.name || 'N/A'}</li>
                  <li><span className="font-semibold">Type:</span> {product.category?.type || 'N/A'}</li>
                  <li><span className="font-semibold">Stock:</span> {product.stock}</li>
                </ul>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <Link
                to="/contact"
                state={{ prefillMessage: buildInquiryMessage() }}
                className="btn-primary w-full justify-center"
              >
                <FaEnvelope className="mr-2" /> Inquiry
              </Link>
              <button onClick={inquireWhatsApp} className="btn-outline w-full justify-center">
                <FaWhatsapp className="mr-2" /> WhatsApp
              </button>
            </div>
          </motion.aside>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-heading font-bold">Related Products</h2>
            <div className="h-[2px] w-16 bg-primary-red mt-3" />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 8).map((item) => (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  className="w-full bg-white border border-black/10 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <OptimizedImage
                    src={getProductImage(item, 0)}
                    alt={item.name}
                    wrapperClassName="w-full h-44"
                  />
                  <div className="p-3">
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-primary-red font-bold mt-1">Rs. {item.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;
