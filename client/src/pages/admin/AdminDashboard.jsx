import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService, contactService, productService, serviceService } from '../../services';
import AdminShell from '../../components/admin/AdminShell';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0, totalServices: 0, totalContacts: 0, newContacts: 0 });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, servicesRes, contactsRes] = await Promise.all([
          productService.getProducts({ limit: 5 }),
          categoryService.getCategories(),
          serviceService.getServices(),
          contactService.getContacts({ limit: 5 }),
        ]);

        const contacts = contactsRes.data || [];
        setStats({
          totalProducts: productsRes.pagination?.total || 0,
          totalCategories: categoriesRes.count || 0,
          totalServices: servicesRes.count || 0,
          totalContacts: contactsRes.pagination?.total || 0,
          newContacts: contacts.filter((contact) => contact.status === 'new').length,
        });
        setRecentProducts(productsRes.data || []);
        setRecentContacts(contacts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminShell title="Admin Dashboard" subtitle="Overview of products, categories, services, and customer inquiries.">
      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading dashboard...</div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {[
              { label: 'Products', value: stats.totalProducts },
              { label: 'Categories', value: stats.totalCategories },
              { label: 'Services', value: stats.totalServices },
              { label: 'Contacts', value: stats.totalContacts },
              { label: 'New', value: stats.newContacts },
            ].map((item) => (
              <div key={item.label} className="border border-black/10 rounded-xl p-4 md:p-5 bg-white">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-3xl font-black text-black mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-7">
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading text-xl font-bold">Recent Products</h2>
                <Link to="/admin/products" className="text-primary-red text-sm font-semibold">Manage</Link>
              </div>
              <div className="border border-black/10 rounded-xl overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#F8F8F8]">
                    <tr>
                      <th className="text-left px-3 py-2">Name</th>
                      <th className="text-left px-3 py-2">Price</th>
                      <th className="text-left px-3 py-2">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.map((product) => (
                      <tr key={product._id} className="border-t border-black/10">
                        <td className="px-3 py-2">{product.name}</td>
                        <td className="px-3 py-2 text-primary-red font-semibold">₹{product.price?.toLocaleString?.()}</td>
                        <td className="px-3 py-2">{product.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-heading text-xl font-bold">Recent Contacts</h2>
                <Link to="/admin/contacts" className="text-primary-red text-sm font-semibold">Manage</Link>
              </div>
              <div className="border border-black/10 rounded-xl overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-[#F8F8F8]">
                    <tr>
                      <th className="text-left px-3 py-2">Name</th>
                      <th className="text-left px-3 py-2">Email</th>
                      <th className="text-left px-3 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContacts.map((contact) => (
                      <tr key={contact._id} className="border-t border-black/10">
                        <td className="px-3 py-2">{contact.name}</td>
                        <td className="px-3 py-2">{contact.email}</td>
                        <td className="px-3 py-2 capitalize">{contact.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      )}
    </AdminShell>
  );
};

export default AdminDashboard;
