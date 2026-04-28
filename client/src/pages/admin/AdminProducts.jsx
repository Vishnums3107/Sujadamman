import { useEffect, useState } from 'react';
import { FaEdit, FaImage, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AdminShell from '../../components/admin/AdminShell';
import { categoryService, productService } from '../../services';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  featured: false,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productService.getProducts({ limit: 100 }),
        categoryService.getCategories(),
      ]);
      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?._id || '',
        stock: product.stock,
        featured: product.featured,
      });
    } else {
      setEditingProduct(null);
      setFormData(emptyForm);
    }

    setImageFiles([]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageFiles([]);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = editingProduct
        ? await productService.updateProduct(editingProduct._id, formData)
        : await productService.createProduct(formData);

      if (imageFiles.length > 0) {
        const payload = new FormData();
        imageFiles.forEach((file) => payload.append('images', file));
        await productService.uploadImages(result.data._id, payload, {
          replace: editingProduct ? 'true' : 'false',
        });
      }

      toast.success(editingProduct ? 'Product updated' : 'Product created');
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productService.deleteProduct(id);
      toast.success('Product deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <AdminShell
      title="Manage Products"
      subtitle="Table-based product management with clean modal forms."
      actions={
        <button onClick={() => openModal()} className="btn-primary">
          <FaPlus className="mr-2" /> Add Product
        </button>
      }
    >
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading products...</div>
      ) : (
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8F8F8]">
              <tr>
                <th className="text-left px-3 py-3">Product</th>
                <th className="text-left px-3 py-3">Category</th>
                <th className="text-left px-3 py-3">Price</th>
                <th className="text-left px-3 py-3">Stock</th>
                <th className="text-left px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t border-black/10">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.images?.[0] || 'https://via.placeholder.com/100'} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-black/10" />
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">{product.category?.name || '-'}</td>
                  <td className="px-3 py-3 text-primary-red font-semibold">₹{product.price?.toLocaleString?.()}</td>
                  <td className="px-3 py-3">{product.stock}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(product)} className="px-3 py-1.5 border border-black/15 rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-gray-50">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => removeProduct(product._id)} className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-primary-red transition-colors">
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-black/10 shadow-lg">
            <div className="p-5 border-b border-black/10 flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={closeModal}><FaTimes /></button>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              <input className="input-field" placeholder="Product name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required />
              <textarea className="input-field" rows="4" placeholder="Description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} required />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input className="input-field" type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))} required />
                <input className="input-field" type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))} required />
                <select className="input-field" value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} required>
                  <option value="">Select category</option>
                  {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
                </select>
              </div>

              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))} />
                Featured Product
              </label>

              <div>
                <label className="text-sm font-medium block mb-2"><FaImage className="inline mr-2" /> Upload images</label>
                <input className="input-field" type="file" multiple accept="image/*" onChange={(e) => setImageFiles(Array.from(e.target.files || []))} />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="button" className="btn-secondary w-full" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary w-full" disabled={loading}>{editingProduct ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
};

export default AdminProducts;
