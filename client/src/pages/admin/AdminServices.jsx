import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AdminShell from '../../components/admin/AdminShell';
import { serviceService } from '../../services';

const emptyForm = { title: '', description: '', icon: 'FaBoxes', division: 'Furniture' };

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchServices = async () => {
    try {
      const res = await serviceService.getServices();
      setServices(res.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({ title: service.title, description: service.description, icon: service.icon, division: service.division });
    } else {
      setEditingService(null);
      setFormData(emptyForm);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData(emptyForm);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (editingService) {
        await serviceService.updateService(editingService._id, formData);
        toast.success('Service updated');
      } else {
        await serviceService.createService(formData);
        toast.success('Service created');
      }

      closeModal();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error(error.response?.data?.message || 'Failed to save service');
      setLoading(false);
    }
  };

  const removeService = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await serviceService.deleteService(id);
      toast.success('Service deleted');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  return (
    <AdminShell
      title="Manage Services"
      subtitle="Control service cards shown on the public services page."
      actions={
        <button onClick={() => openModal()} className="btn-primary">
          <FaPlus className="mr-2" /> Add Service
        </button>
      }
    >
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading services...</div>
      ) : (
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8F8F8]">
              <tr>
                <th className="text-left px-3 py-3">Title</th>
                <th className="text-left px-3 py-3">Division</th>
                <th className="text-left px-3 py-3">Icon</th>
                <th className="text-left px-3 py-3">Description</th>
                <th className="text-left px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-t border-black/10">
                  <td className="px-3 py-3 font-semibold">{service.title}</td>
                  <td className="px-3 py-3">{service.division}</td>
                  <td className="px-3 py-3">{service.icon}</td>
                  <td className="px-3 py-3 line-clamp-1">{service.description}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(service)} className="px-3 py-1.5 border border-black/15 rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-gray-50">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => removeService(service._id)} className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-primary-red transition-colors">
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
          <div className="w-full max-w-xl bg-white rounded-2xl border border-black/10 shadow-lg">
            <div className="p-5 border-b border-black/10 flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={closeModal}><FaTimes /></button>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              <input className="input-field" placeholder="Title" value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} required />
              <textarea className="input-field" rows="4" placeholder="Description" value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select className="input-field" value={formData.division} onChange={(e) => setFormData((prev) => ({ ...prev, division: e.target.value }))} required>
                  <option value="Furniture">Furniture</option>
                  <option value="Home Essentials">Home Essentials</option>
                  <option value="Business">Business</option>
                </select>
                <input className="input-field" placeholder="Icon (e.g., FaCouch)" value={formData.icon} onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))} required />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="button" className="btn-secondary w-full" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary w-full" disabled={loading}>{editingService ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
};

export default AdminServices;
