import { useEffect, useState } from 'react';
import { FaEnvelope, FaEye, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import AdminShell from '../../components/admin/AdminShell';
import { contactService } from '../../services';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchContacts = async () => {
    try {
      const params = filter === 'all' ? {} : { status: filter };
      const res = await contactService.getContacts(params);
      setContacts(res.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const openContact = async (contact) => {
    setSelectedContact(contact);
    setShowModal(true);

    if (contact.status === 'new') {
      try {
        await contactService.updateContactStatus(contact._id, 'read');
        fetchContacts();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await contactService.updateContactStatus(id, status);
      toast.success('Status updated');
      fetchContacts();
      if (selectedContact?._id === id) setSelectedContact((prev) => ({ ...prev, status }));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const removeContact = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await contactService.deleteContact(id);
      toast.success('Inquiry deleted');
      fetchContacts();
      if (selectedContact?._id === id) setShowModal(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <AdminShell title="Customer Inquiries" subtitle="Review and manage incoming contact submissions.">
      <div className="mb-4 flex gap-2 flex-wrap">
        {['all', 'new', 'read', 'replied'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize border ${filter === status ? 'bg-primary-red text-white border-primary-red' : 'bg-white border-black/10 text-black'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading inquiries...</div>
      ) : contacts.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No inquiries found for this filter.</div>
      ) : (
        <div className="border border-black/10 rounded-xl overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8F8F8]">
              <tr>
                <th className="text-left px-3 py-3">Name</th>
                <th className="text-left px-3 py-3">Email</th>
                <th className="text-left px-3 py-3">Status</th>
                <th className="text-left px-3 py-3">Date</th>
                <th className="text-left px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-t border-black/10">
                  <td className="px-3 py-3 font-semibold">{contact.name}</td>
                  <td className="px-3 py-3">{contact.email}</td>
                  <td className="px-3 py-3 capitalize">{contact.status}</td>
                  <td className="px-3 py-3">{formatDate(contact.createdAt)}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openContact(contact)} className="px-3 py-1.5 border border-black/15 rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-gray-50">
                        <FaEye /> View
                      </button>
                      <button onClick={() => removeContact(contact._id)} className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 hover:bg-primary-red transition-colors">
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

      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-black/10 shadow-lg">
            <div className="p-5 border-b border-black/10 flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold">Inquiry Details</h3>
              <button onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>

            <div className="p-5 space-y-4">
              <div><p className="text-sm text-gray-500">Name</p><p className="font-semibold">{selectedContact.name}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><a className="text-primary-red" href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a></div>
              {selectedContact.phone ? <div><p className="text-sm text-gray-500">Phone</p><p>{selectedContact.phone}</p></div> : null}
              <div><p className="text-sm text-gray-500">Message</p><p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p></div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <select className="input-field" value={selectedContact.status} onChange={(e) => updateStatus(selectedContact._id, e.target.value)}>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a className="btn-primary w-full justify-center" href={`mailto:${selectedContact.email}`}><FaEnvelope className="mr-2" /> Reply</a>
                <button className="btn-secondary w-full" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
};

export default AdminContacts;
