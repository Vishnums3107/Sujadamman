export const distributionAreas = ['Salem', 'Namakkal', 'Erode', 'Dharmapuri', 'Krishnagiri', 'Hosur'];

export const companyProfiles = [
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

const normalizePhoneForWhatsApp = (phoneNumber) => {
  const digits = `${phoneNumber || ''}`.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
};

export const getPrimaryWhatsAppNumber = () => {
  const rawPhone = companyProfiles?.[0]?.contacts?.[0]?.phone;
  return normalizePhoneForWhatsApp(rawPhone);
};