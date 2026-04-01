import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { serviceService } from '../services';
import ServiceCard from '../components/service/ServiceCard';
import Container from '../components/ui/Container';

const defaultServices = {
  Furniture: [
    { 
      icon: 'FaCouch', 
      title: 'Custom Sofa Manufacturing', 
      description: 'Premium sofa sets designed for comfort and long-term durability.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'
    },
    { 
      icon: 'FaBed', 
      title: 'Bed Frame & Cot Production', 
      description: 'Strong and modern bed systems for homes and hospitality projects.',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop'
    },
    { 
      icon: 'FaDraftingCompass', 
      title: 'Interior Furniture Solutions', 
      description: 'End-to-end planning support for coordinated interior furniture.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop'
    },
  ],
  'Home Essentials': [
    { 
      icon: 'FaIndustry', 
      title: 'Private Label Manufacturing', 
      description: 'White-label production support for growing retail brands.',
      image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop'
    },
    { 
      icon: 'FaTruck', 
      title: 'Wholesale Supply', 
      description: 'Reliable high-volume supply with consistent dispatch timelines.',
      image: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&h=600&fit=crop'
    },
    { 
      icon: 'FaTags', 
      title: 'Custom Branding', 
      description: 'Branding and packaging customization for institutional orders.',
      image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&h=600&fit=crop'
    },
  ],
  Business: [
    { 
      icon: 'FaHeadset', 
      title: 'After-Sales Support', 
      description: 'Fast operational support for installation and service follow-up.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
    },
    { 
      icon: 'FaShieldAlt', 
      title: 'Warranty Services', 
      description: 'Structured warranty workflow for eligible products and parts.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop'
    },
    { 
      icon: 'FaHandshake', 
      title: 'Dealer Network Support', 
      description: 'Partnership model for dealers and distributors.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop'
    },
  ],
};

const divisionFallbackImages = {
  Furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
  ],
  'Home Essentials': [
    'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&h=600&fit=crop',
  ],
  Business: [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
  ],
};

const getServiceImage = (service, sectionKey, index) => {
  if (service?.image) return service.image;

  const defaultMatch = (defaultServices[sectionKey] || []).find((item) => item.title === service.title);
  if (defaultMatch?.image) return defaultMatch.image;

  const divisionImages = divisionFallbackImages[sectionKey] || [];
  if (divisionImages.length) {
    return divisionImages[index % divisionImages.length];
  }

  return undefined;
};

const Services = () => {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceService.getServices();
        if (!res?.data?.length) return;

        const grouped = { Furniture: [], 'Home Essentials': [], Business: [] };
        res.data.forEach((item) => {
          if (grouped[item.division]) grouped[item.division].push(item);
        });

        setServices({
          Furniture: grouped.Furniture.length ? grouped.Furniture : defaultServices.Furniture,
          'Home Essentials': grouped['Home Essentials'].length ? grouped['Home Essentials'] : defaultServices['Home Essentials'],
          Business: grouped.Business.length ? grouped.Business : defaultServices.Business,
        });
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const sections = useMemo(
    () => [
      { key: 'Furniture', title: 'Furniture Services', bg: 'bg-white', titleColor: 'text-black' },
      { key: 'Home Essentials', title: 'Home Essentials Services', bg: 'bg-[#F8F8F8]', titleColor: 'text-black' },
      { key: 'Business', title: 'Business Support Services', bg: 'bg-[#1A1A1A]', titleColor: 'text-white' },
    ],
    []
  );

  return (
    <div>
      <section className="bg-[#111111] text-white py-20 md:py-24 render-auto">
        <Container>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-black">Services</h1>
            <div className="h-[2px] w-20 bg-primary-red mt-4" />
            <p className="text-gray-300 mt-6 text-lg">
              Structured capabilities across furniture, home essentials, and business support operations.
            </p>
          </motion.div>
        </Container>
      </section>

      {sections.map((section) => (
        <section key={section.key} className={`${section.bg} py-16 render-auto`}>
          <Container>
            <div className="mb-10 text-center">
              <h2 className={`text-3xl md:text-4xl font-heading font-bold ${section.titleColor}`}>{section.title}</h2>
              <div className="h-[2px] w-16 bg-primary-red mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(services[section.key] || []).map((service, index) => (
                <ServiceCard
                  key={`${section.key}-${service.title}`}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  details={service.description}
                  image={getServiceImage(service, section.key, index)}
                />
              ))}
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
};

export default Services;
