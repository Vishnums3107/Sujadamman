import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaChevronDown } from 'react-icons/fa';
import { contactService } from '../services';
import Container from '../components/ui/Container';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const validate = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) nextErrors.name = 'Name is required';
    if (!email) nextErrors.email = 'Email is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email';
    if (!message) nextErrors.message = 'Message is required';

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      };

      await contactService.submitContact(payload);
      toast.success('Message sent successfully. We will reach out soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      const apiErrors = error.response?.data?.errors || [];
      if (apiErrors.length) {
        const fieldErrors = apiErrors.reduce((acc, item) => {
          if (item?.field) acc[item.field] = item.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
        toast.error(apiErrors[0].message || 'Invalid form input.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit form.');
      }
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: 'What are your delivery options?',
      answer: 'Standard delivery usually takes 3-7 business days, depending on your location and order type.',
    },
    {
      question: 'Do you handle bulk business orders?',
      answer: 'Yes, we support bulk furniture and essentials orders for offices, institutions, and hospitality projects.',
    },
    {
      question: 'How can I request product customization?',
      answer: 'Share your requirements through this form and our team will respond with available options.',
    },
  ];

  const distributionAreas = ['Salem', 'Namakkal', 'Erode', 'Dharmapuri', 'Krishnagiri', 'Hosur'];

  const companyProfiles = [
    {
      name: 'Subpy Wooden Furnitures',
      shortName: 'SWF',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      address: '311/210-A, Puthur Ittery Road, A.L.D. Vazhagam, Nethimedu, Salem - 636 002',
      email: 'subpywooden@gmail.com',
      contacts: [
        { person: 'S. Sekar', phone: '98428 11797' },
        { person: 'S. Balaji', phone: '97876 12354' },
        { person: 'S. Yuwanraj', phone: '70107 13517' },
      ],
      brands: ['Reliance', 'Gala', 'Pexpo', 'Sleepywell', 'Recron', 'Gimi', 'Sahil', 'Montavo', 'Kurl-on'],
    },
    {
      name: 'Sujadamman',
      shortName: 'SJM',
      image:
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80',
      address: '315/210-A, Puttur Ittery Road, A.L.D. Vazhagam, Nethimedu, Salem - 636 002',
      email: 'sujadamman@gmail.com',
      contacts: [
        { person: 'S. Sekar', phone: '98428 11797' },
        { person: 'S. Balaji', phone: '97876 12354' },
      ],
      brands: ['Recron', 'SignoraWare', 'Asian', 'Gala', 'Montavo', 'Beautex', 'Pradeep', 'Sahil'],
    },
  ];

  return (
    <div className="bg-[#F8F8F8] min-h-screen py-10">
      <Container>
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-black">Contact</h1>
          <div className="h-[2px] w-16 bg-primary-red mt-3" />
          <p className="text-gray-600 mt-4 max-w-2xl">Share your inquiry and view our official company details below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="floating-group">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder=" "
                  aria-invalid={!!errors.name}
                  required
                />
                <label htmlFor="name">Name *</label>
                {errors.name ? <p className="text-red-600 text-xs mt-1">{errors.name}</p> : null}
              </div>

              <div className="floating-group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  placeholder=" "
                  aria-invalid={!!errors.email}
                  required
                />
                <label htmlFor="email">Email *</label>
                {errors.email ? <p className="text-red-600 text-xs mt-1">{errors.email}</p> : null}
              </div>

              <div className="floating-group">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="input-field"
                  placeholder=" "
                />
                <label htmlFor="phone">Phone</label>
              </div>

              <div className="floating-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  rows="6"
                  className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                  placeholder=" "
                  aria-invalid={!!errors.message}
                  required
                />
                <label htmlFor="message">Message *</label>
                {errors.message ? <p className="text-red-600 text-xs mt-1">{errors.message}</p> : null}
              </div>

              <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
                {loading ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-black/10 rounded-2xl overflow-hidden h-[320px] shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Nethimedu%20Salem&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Salem Location Map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-heading font-bold mb-4">FAQ</h3>
              <div className="space-y-2">
                {faqs.map((item, index) => (
                  <div key={item.question} className="border border-black/10 rounded-xl overflow-hidden">
                    <button
                      className="w-full px-4 py-3 text-left flex items-center justify-between"
                      onClick={() => setOpenFaq((prev) => (prev === index ? -1 : index))}
                      aria-expanded={openFaq === index}
                    >
                      <span className="font-medium">{item.question}</span>
                      <FaChevronDown className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-sm text-gray-600">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-heading font-black">Business Profiles</h2>
          <div className="h-[2px] w-16 bg-primary-red mt-3" />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
            {companyProfiles.map((company) => (
              <article key={company.name} className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-black text-white flex items-center justify-center font-black tracking-wide">
                    {company.shortName}
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold">{company.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">Official Business Profile</p>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-black/10 mt-5">
                  <img
                    src={company.image}
                    alt={`${company.name} showroom display`}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                </div>

                <p className="text-gray-700 mt-3">{company.address}</p>
                <p className="text-gray-700 mt-2">
                  Email:{' '}
                  <a className="text-primary-red hover:underline" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </p>

                <div className="mt-5">
                  <p className="text-sm uppercase tracking-wide text-gray-500">Contact Persons</p>
                  <ul className="mt-2 space-y-1 text-gray-800">
                    {company.contacts.map((contact) => (
                      <li key={`${company.name}-${contact.phone}`}>{contact.person}: {contact.phone}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="text-sm uppercase tracking-wide text-gray-500">Distributor & Stockist Areas</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {distributionAreas.map((area) => (
                      <span key={`${company.name}-${area}`} className="px-3 py-1 text-xs rounded-full border border-black/15 bg-[#F8F8F8]">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm uppercase tracking-wide text-gray-500">Associated Brands</p>
                  <p className="text-gray-700 mt-2 text-sm leading-relaxed">{company.brands.join(' | ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Contact;
