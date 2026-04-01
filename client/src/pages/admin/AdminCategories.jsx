import { useEffect, useState } from 'react';
import { FaEdit, FaImage, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AdminShell from '../../components/admin/AdminShell';
import { categoryService } from '../../services';

const emptyForm = { name: '', type: 'Furniture', description: '' };

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, type: category.type, description: category.description || '' });
    } else {
      setEditingCategory(null);
      setFormData(emptyForm);
    }
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData(emptyForm);
    setImageFile(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = editingCategory
        ? await categoryService.updateCategory(editingCategory._id, formData)
        : await categoryService.createCategory(formData);

      if (imageFile) {
        const payload = new FormData();
        payload.append('image', imageFile);
        await categoryService.uploadImage(res.data._id, payload);
      }

      toast.success(editingCategory ? 'Category updated' : 'Category created');
      closeModal();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.response?.data?.message || 'Failed to save category');
      setLoading(false);
    }
  };

  const removeCategory = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await categoryService.deleteCategory(id);
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  return (
    <AdminShell
      title="Manage Categories"
      subtitle="Maintain product taxonomy for storefront filtering and browsing."
      actions={
        <button onClick={() => openModal()} className="btn-primary">
          <FaPlus className="mr-2" /> Add Category
        </button>
      }
    >
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading categories...</div>
      ) : (
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8F8F8]">
              <tr>
                <th className="text-left px-3 py-3">Category</th>
                <th className="text-left px-3 py-3">Type</th>
                <th className="text-left px-3 py-3">Description</th>
                <th className="text-left px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t border-black/10">
                  <td className="px-3 py-3 font-semibold">{category.name}</td>
                  <td className="px-3 py-3">{category.type}</td>
                  <td className="px-3 py-3 line-clamp-1">{category.description || '-'}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(category)} className="px-3 py-1.5 border border-black/15 rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-gray-50">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => removeCategory(category._id)} className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-primary-red transition-colors">
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
          <div className="w-full max-w-lg bg-white rounded-2xl border border-black/10 shadow-lg">
            <div className="p-5 border-b border-black/10 flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={closeModal}><FaTimes /></button>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              <input className="input-field" placeholder="Category name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required />
              <select className="input-field" value={formData.type} onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))} required>
                <option value="Furniture">Furniture</option>
                <option value="Home Essentials">Home Essentials</option>
              </select>
              <textarea className="input-field" rows="4" placeholder="Description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />

              <div>
                <label className="text-sm font-medium block mb-2"><FaImage className="inline mr-2" /> Upload image</label>
                <input className="input-field" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="button" className="btn-secondary w-full" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary w-full" disabled={loading}>{editingCategory ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
};

export default AdminCategories;
